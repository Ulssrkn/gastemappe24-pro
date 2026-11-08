create schema if not exists gm24_private;
revoke all on schema gm24_private from public;
grant usage on schema gm24_private to anon, authenticated;

create index if not exists gm24_hotels_owner_id_idx on public.gm24_hotels (owner_id);

-- Copy only typed display fields. Unknown keys and nested objects are discarded.
create function gm24_private.text_fields(p_object jsonb, p_keys text[])
returns jsonb language sql immutable set search_path = '' as $$
  select coalesce(jsonb_object_agg(key, left(value #>> '{}', 4000)), '{}'::jsonb)
  from jsonb_each(case when jsonb_typeof(p_object) = 'object' then p_object else '{}'::jsonb end)
  where key = any(p_keys) and jsonb_typeof(value) = 'string';
$$;

create function gm24_private.translated_text(p_object jsonb)
returns jsonb language sql immutable set search_path = '' as $$
  select gm24_private.text_fields(p_object, array['de','en','tr','fr','hr','it','es','sv','no','nb','sq','cs']);
$$;

create function gm24_private.project_category(p_category jsonb, p_show_wifi boolean)
returns jsonb language sql immutable set search_path = '' as $$
  select gm24_private.text_fields(p_category, array['presetId','categoryId','icon','customTitle','title','customText'])
    || jsonb_build_object(
      'id', case when jsonb_typeof(p_category->'id') in ('string','number') then left(p_category->>'id', 128) end,
      'customTextTranslations', gm24_private.translated_text(p_category->'customTextTranslations'),
      'fieldValues', coalesce((
        select jsonb_object_agg(key, value) from jsonb_each(
          case when jsonb_typeof(p_category->'fieldValues') = 'object' then p_category->'fieldValues' else '{}'::jsonb end
        )
        where regexp_replace(key, '__customText$', '') = any(array[
          'accessibility_features','arrival_note','arrival_options','attraction_types','attractions_note','bar_hours',
          'bathrobe_service','bathroom_features','bed_types','bike_rental','breakfast_hours','breakfast_type',
          'building_areas','cert_name','cert_number','charging_station','checkin_method','checkin_time',
          'checkout_method','checkout_tasks','checkout_time','child_equipment','children_options','cleaning_policy',
          'climate_features','concept_description','contact_channels','contact_hours','elevator_features','emergency_info',
          'emergency_numbers','emergency_phone','ev_options','excursion_note','family_room_features','fitness_hours',
          'fitness_options','guest_info','hiking_tips','hotel_description','house_rules','kitchen_warm',
          'laundry_options','laundry_service','linen_policy','luggage_options','luggage_storage','mattress_type',
          'minibar_policy','multilingual_staff','nature_activities','network_name','opening_hours','outdoor_space',
          'parking_options','pet_policy','pillow_menu','pool_hours','pool_type','public_transport',
          'reception_hours','reception_services','restaurant_areas','restaurant_hours','room_accessibility','room_amenities',
          'room_capacity','room_floor_number','room_max_guests','room_outdoor_view','room_smoking_policy','room_technology',
          'rules_note','safe_options','smoking_policy','spa_hours','sustainability_features','sustainability_note',
          'tour_options','towel_policy','transport_note','transport_types','tv_features','wellness_facilities',
          'wellness_hours','wellness_services','wifi_available','wifi_password','wifi_services'
        ])
        and (p_show_wifi or key not in ('network_name','network_name__customText','wifi_password','wifi_password__customText'))
        and case jsonb_typeof(value)
          when 'boolean' then true
          when 'number' then true
          when 'string' then length(value #>> '{}') <= 4000
          when 'array' then jsonb_array_length(value) <= 80
            and not jsonb_path_exists(value, '$[*] ? (@.type() != "string")') and length(value::text) <= 12000
          else false
        end
      ), '{}'::jsonb) || jsonb_build_object('contentCards', coalesce((
        select jsonb_agg(gm24_private.text_fields(card, array['id','title','description','address','url','phone','hours'])
            || jsonb_build_object('descriptionTranslations', gm24_private.translated_text(card->'descriptionTranslations')) order by position)
        from jsonb_array_elements(case when jsonb_typeof(p_category #> '{fieldValues,contentCards}') = 'array'
          then p_category #> '{fieldValues,contentCards}' else '[]'::jsonb end) with ordinality as cards(card, position)
        where jsonb_typeof(card) = 'object'
      ), '[]'::jsonb))
    );
$$;

create function gm24_private.project_guest_content(p_snapshot jsonb, p_name text)
returns jsonb language sql immutable set search_path = '' as $$
  with source as (
    select p_snapshot->'hotel' as hotel,
      coalesce(p_snapshot #> '{hotel,publishGuestWifi}' = 'true'::jsonb
        and p_snapshot #> '{hotel,showWifi}' = 'true'::jsonb, false) as show_wifi
    where jsonb_typeof(p_snapshot->'hotel') = 'object'
  )
  select coalesce((
    select jsonb_build_object(
      'hotel', gm24_private.text_fields(hotel, array['locationTitle','address','phone','email','website',
        'reviewPlatform','googleReviewUrl','themeColor','breakfastTime','checkInOut','parkingInfo'])
        || jsonb_build_object(
          'name', coalesce(nullif(gm24_private.text_fields(hotel, array['name'])->>'name', ''), p_name),
          'showWifi', hotel->'showWifi' = 'true'::jsonb,
          'showParking', hotel->'showParking' = 'true'::jsonb,
          'showBreakfast', hotel->'showBreakfast' = 'true'::jsonb,
          'showCheckInOut', hotel->'showCheckInOut' = 'true'::jsonb,
          'publishGuestWifi', show_wifi,
          'logoUrl', case when hotel->>'logoUrl' ~* '^(https://|data:image/(png|jpeg|webp|avif|gif);base64,)' then hotel->>'logoUrl' else '' end,
          'images', coalesce((
            select jsonb_agg(image order by position)
            from jsonb_array_elements_text(case when jsonb_typeof(hotel->'images') = 'array'
              then hotel->'images' else '[]'::jsonb end) with ordinality as images(image, position)
            where position <= 5 and image ~* '^(https://|data:image/(png|jpeg|webp|avif|gif);base64,)'
          ), '[]'::jsonb),
          'quickAccessContent', coalesce((
            select jsonb_object_agg(language, cards) from (
              select language, jsonb_object_agg(card_key, gm24_private.text_fields(card, array['title','description'])) as cards
              from jsonb_each(case when jsonb_typeof(hotel->'quickAccessContent') = 'object'
                then hotel->'quickAccessContent' else '{}'::jsonb end) as localized(language, entries)
              cross join lateral jsonb_each(case when jsonb_typeof(entries) = 'object'
                then entries else '{}'::jsonb end) as quick_cards(card_key, card)
              where language in ('de','en','tr','fr','hr','it','es','sv','no','nb','sq','cs')
                and card_key in ('wifi','parking','breakfast','checkin')
              group by language
            ) as quick_access
          ), '{}'::jsonb)
        )
        || case when show_wifi then gm24_private.text_fields(hotel, array['wifiSsid','wifiPass']) else '{}'::jsonb end,
      'categories', coalesce((
        select jsonb_agg(gm24_private.project_category(category, show_wifi) order by position)
        from jsonb_array_elements(case when jsonb_typeof(p_snapshot->'categories') = 'array'
          then p_snapshot->'categories' else '[]'::jsonb end) with ordinality as categories(category, position)
        where jsonb_typeof(category) = 'object'
      ), '[]'::jsonb)
    )
    from source
  ), '{}'::jsonb);
$$;

-- Private definer reads only the requested published guide, including when the visitor
-- has an unrelated signed-in operator session. The exposed wrapper runs as invoker.
create function gm24_private.read_guest_guide(p_slug text)
returns table (slug text, name text, public_content jsonb)
language sql stable security definer set search_path = '' as $$
  select h.slug, content.value #>> '{hotel,name}', content.value
  from public.gm24_hotels h
  join public.gm24_accounts a on a.owner_id = h.owner_id
  cross join lateral (select gm24_private.project_guest_content(h.public_content, 'Gastemappe24 Pro') as value) content
  where p_slug ~ '^[a-z0-9][a-z0-9-]{2,59}$' and h.slug = p_slug
    and h.public_content <> '{}'::jsonb and content.value <> '{}'::jsonb
    and (a.subscription_status = 'active' or (a.subscription_status = 'trial' and a.trial_ends_at > now()));
$$;

create function public.gm24_read_guest_guide(p_slug text)
returns table (slug text, name text, public_content jsonb)
language sql stable security invoker set search_path = '' as $$
  select * from gm24_private.read_guest_guide(p_slug);
$$;

revoke all on function gm24_private.text_fields(jsonb, text[]),
  gm24_private.translated_text(jsonb), gm24_private.project_category(jsonb, boolean),
  gm24_private.project_guest_content(jsonb, text), gm24_private.read_guest_guide(text)
  from public, anon, authenticated;
revoke all on function public.gm24_read_guest_guide(text) from public, anon, authenticated;
grant execute on function gm24_private.read_guest_guide(text), public.gm24_read_guest_guide(text) to anon, authenticated;

-- Replaces the older invoker view. Keep the object for rollback inspection without Data API access.
revoke all on public.gm24_guest_pages from public, anon, authenticated;
revoke all on public.gm24_hotels, public.gm24_analytics_daily from anon;
revoke select (slug, name, public_content) on public.gm24_hotels from anon;
drop policy if exists "Public can read published guest pages" on public.gm24_hotels;

-- Existing drafts and snapshots stay in place. Project every new publication server-side.
-- Pilot media is read-only except for removing media already attached to this property.
create function gm24_private.prepare_publication()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  old_hotel jsonb := case when tg_op = 'UPDATE' then coalesce(old.profile->'hotel', '{}'::jsonb) else '{}'::jsonb end;
  new_hotel jsonb := coalesce(new.profile->'hotel', '{}'::jsonb);
  old_images jsonb := case when jsonb_typeof(old_hotel->'images') = 'array' then old_hotel->'images' else '[]'::jsonb end;
  new_images jsonb := case when jsonb_typeof(new_hotel->'images') = 'array' then new_hotel->'images' else '[]'::jsonb end;
begin
  if (tg_op = 'INSERT' or new.profile is distinct from old.profile) and (
    (coalesce(new_hotel->>'logoUrl', '') <> '' and new_hotel->>'logoUrl' is distinct from old_hotel->>'logoUrl')
    or (new_images is distinct from old_images and (
      jsonb_array_length(new_images) > jsonb_array_length(old_images)
      or not old_images @> new_images
    ))
  ) then
    raise exception 'New media uploads are paused during the pilot' using errcode = '23514';
  end if;

  if (tg_op = 'INSERT' and new.public_content <> '{}'::jsonb)
     or (tg_op = 'UPDATE' and new.public_content is distinct from old.public_content and new.public_content <> '{}'::jsonb) then
    new.public_content := gm24_private.project_guest_content(new.profile, new.name);
  end if;
  return new;
end;
$$;

revoke all on function gm24_private.prepare_publication() from public, anon, authenticated;
create trigger gm24_prepare_publication before insert or update on public.gm24_hotels
  for each row execute function gm24_private.prepare_publication();

drop policy if exists "Public can view published guest media" on storage.objects;
drop policy if exists "Owners upload their guest media" on storage.objects;
drop policy if exists "Owners update their guest media" on storage.objects;

-- Use the same owner lock as the insert quota; account removals by an administrator
-- can still cascade. Under stronger isolation, the account row write forces a retry.
create function gm24_private.preserve_last_accommodation()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is distinct from old.owner_id then
    return old;
  end if;
  perform pg_advisory_xact_lock(hashtextextended(old.owner_id::text, 240324));
  update public.gm24_accounts set owner_id = old.owner_id where owner_id = old.owner_id;
  if not exists (select 1 from public.gm24_hotels h where h.owner_id = old.owner_id and h.id <> old.id) then
    raise exception 'The last accommodation cannot be deleted' using errcode = '23514';
  end if;
  return old;
end;
$$;
revoke all on function gm24_private.preserve_last_accommodation() from public, anon, authenticated;
create trigger gm24_preserve_last_accommodation before delete on public.gm24_hotels
  for each row execute function gm24_private.preserve_last_accommodation();

-- The Edge Function is the only caller. Validation, the 600/minute quota, and the
-- counter update use the same transaction without storing a visitor identifier.
create function public.gm24_record_guest_event(p_slug text, p_event text)
returns integer language plpgsql security invoker set search_path = '' as $$
declare
  guest_hotel public.gm24_hotels%rowtype;
begin
  if p_slug is null or p_slug !~ '^[a-z0-9][a-z0-9-]{2,59}$' or p_event is null
     or not (p_event in ('guest_home','guest_services','guest_route','guest_review','action_route','action_wifi_copy',
          'action_review','action_call','action_website','feedback_helpful','feedback_not_helpful')
          or p_event ~ '^category_[A-Za-z0-9_-]{1,68}$') then
    return 400;
  end if;
  select h.* into guest_hotel
  from public.gm24_hotels h join public.gm24_accounts a on a.owner_id = h.owner_id
  where h.slug = p_slug and jsonb_typeof(h.public_content->'hotel') = 'object'
    and (a.subscription_status = 'active' or (a.subscription_status = 'trial' and a.trial_ends_at > now()));
  if not found then
    return 404;
  end if;
  if p_event like 'category\_%' and not exists (
    select 1 from jsonb_array_elements(case when jsonb_typeof(guest_hotel.public_content->'categories') = 'array'
      then guest_hotel.public_content->'categories' else '[]'::jsonb end) as entries(category)
    where jsonb_typeof(category->'id') in ('string','number')
      and p_event = 'category_' || left(regexp_replace(left(category->>'id', 128), '[^A-Za-z0-9_-]', '', 'g'), 68)
  ) then
    return 400;
  end if;
  if not public.gm24_check_analytics_rate_limit(guest_hotel.id) then
    return 429;
  end if;
  perform public.gm24_increment_page_view(guest_hotel.id, p_event);
  return 200;
end;
$$;
revoke all on function public.gm24_record_guest_event(text, text) from public, anon, authenticated;
grant execute on function public.gm24_record_guest_event(text, text) to service_role;
grant select on public.gm24_hotels, public.gm24_accounts to service_role;
