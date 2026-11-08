import { supabase } from '../lib/supabaseClient.js';

const accommodationFields = 'id, owner_id, slug, name, profile, public_content, created_at';
const accountFields =
  'owner_id, plan_code, subscription_status, trial_started_at, trial_ends_at, paid_until, requested_plan_code';

async function listAccommodations(ownerId) {
  const { data, error } = await supabase
    .from('gm24_hotels')
    .select(accommodationFields)
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
}

export function insertAccommodation(ownerId, slug, name, profile) {
  return supabase
    .from('gm24_hotels')
    .insert({
      owner_id: ownerId,
      slug,
      name,
      profile,
      public_content: {},
    })
    .select(accommodationFields)
    .single();
}

export async function loadGuideWorkspace(ownerId) {
  let records = await listAccommodations(ownerId);
  if (!records.length) {
    const slug = `hotel-${ownerId.replace(/-/g, '').slice(0, 12)}`;
    const { data, error } = await insertAccommodation(ownerId, slug, 'Meine Unterkunft', {});
    if (error && error.code !== '23505') throw error;
    records = data ? [data] : await listAccommodations(ownerId);
    if (!records.length) throw error;
  }

  const { data: account, error } = await supabase
    .from('gm24_accounts')
    .select(accountFields)
    .eq('owner_id', ownerId)
    .maybeSingle();
  if (error) throw error;
  return { records, account };
}

export function removeAccommodation(ownerId, accommodationId) {
  return supabase
    .from('gm24_hotels')
    .delete()
    .eq('id', accommodationId)
    .eq('owner_id', ownerId)
    .select('id')
    .single();
}

export function savePackagePreference(ownerId, planCode) {
  return supabase
    .from('gm24_accounts')
    .update({ requested_plan_code: planCode })
    .eq('owner_id', ownerId)
    .select(accountFields)
    .single();
}

export function saveAccommodation(ownerId, accommodationId, values) {
  return supabase
    .from('gm24_hotels')
    .update(values)
    .eq('id', accommodationId)
    .eq('owner_id', ownerId)
    .select(accommodationFields)
    .single();
}
