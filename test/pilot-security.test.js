import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { PGlite } from '@electric-sql/pglite';
import pilotCopy from '../src/pilotCopy.js';

const owner = '10000000-0000-0000-0000-000000000001';
const other = '10000000-0000-0000-0000-000000000002';

test('pilot copy is complete in all ten languages', () => {
  assert.deepEqual(Object.keys(pilotCopy).sort(), ['de','en','es','fr','hr','it','nb','sq','sv','tr']);
  for (const copy of Object.values(pilotCopy)) {
    assert.deepEqual(Object.keys(copy), Object.keys(pilotCopy.de));
    assert.ok(Object.values(copy).every(value => typeof value === 'string' && value.trim()));
  }
});

test('guest guide, publishing, quota and owner boundaries', async t => {
  const db = new PGlite();
  t.after(() => db.close());
  // Provide the Supabase-owned auth/storage objects for the local PostgreSQL fixture.
  await db.exec(`
    create role anon;
    create role authenticated;
    create role service_role bypassrls;
    create schema auth;
    create table auth.users (id uuid primary key);
    grant usage on schema auth to authenticated, anon;
    create function auth.uid() returns uuid language sql stable as
      $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
    create function public.rls_auto_enable() returns event_trigger language plpgsql as $$ begin end; $$;
    create schema storage;
    create table storage.buckets (id text primary key, name text, public boolean, file_size_limit bigint, allowed_mime_types text[]);
    create table storage.objects (bucket_id text, name text);
    alter table storage.objects enable row level security;
    create function storage.foldername(text) returns text[] language sql immutable as $$ select string_to_array($1, '/') $$;
    insert into auth.users values ('${owner}'), ('${other}');
  `);

  const dir = new URL('../supabase/migrations/', import.meta.url);
  const files = (await readdir(dir)).filter(name => name.endsWith('.sql')).sort();
  for (const file of files) await db.exec(await readFile(new URL(file, dir), 'utf8'));

  async function role(name, id = '') {
    await db.exec(`reset role; set role ${name}; set request.jwt.claim.sub = '${id}'`);
  }
  async function read(slug) {
    return (await db.query('select * from public.gm24_read_guest_guide($1)', [slug])).rows;
  }
  function add(slug, id = owner) {
    return db.query('insert into public.gm24_hotels (owner_id, slug, name) values ($1, $2, $2)', [id, slug]);
  }
  function draft(slug, value) {
    return db.query('update public.gm24_hotels set profile=$2 where slug=$1', [slug, value]);
  }
  function publish(slug) {
    return db.query("update public.gm24_hotels set public_content=profile where slug=$1", [slug]);
  }
  async function track(slug, page) {
    return (await db.query('select public.gm24_record_guest_event($1,$2) as status', [slug, page])).rows[0].status;
  }

  await role('authenticated', owner);
  await add('first-hotel');
  await add('second-hotel');
  await add('third-hotel');
  await assert.rejects(add('fourth-hotel'), { code: '23514' });
  await assert.rejects(add('other-hotel', other), { code: '42501' });
  await assert.rejects(db.exec("update public.gm24_accounts set subscription_status='active'"), { code: '42501' });
  await db.exec("update public.gm24_accounts set requested_plan_code='business'");

  const profile = {
    hotel: { name: 'Guest Hotel', showWifi: true, wifiPass: 'fixture-wifi', wifiSsid: 'guest-network', privateToken: 'discard' },
    categories: [{
      id: 'known', presetId: 'wifi_internet',
      fieldValues: { network_name: 'guest-network', wifi_password: 'fixture-wifi', opening_hours: '09:00', checkout_tasks: ['fixture-task'], private_code: 'discard' },
    }],
  };
  await draft('first-hotel', profile);
  assert.deepEqual(await read('first-hotel'), []);
  await publish('first-hotel');
  const [published] = await read('first-hotel');
  assert.equal(published.name, 'Guest Hotel');
  assert.equal(published.public_content.hotel.wifiPass, undefined);
  assert.equal(published.public_content.hotel.privateToken, undefined);
  assert.equal(published.public_content.categories[0].fieldValues.wifi_password, undefined);
  assert.equal(published.public_content.categories[0].fieldValues.private_code, undefined);
  assert.equal(published.public_content.categories[0].fieldValues.opening_hours, '09:00');
  assert.deepEqual(published.public_content.categories[0].fieldValues.checkout_tasks, ['fixture-task']);

  await draft('first-hotel', { ...profile, hotel: { ...profile.hotel, name: 'New Draft', publishGuestWifi: true } });
  assert.equal((await read('first-hotel'))[0].name, 'Guest Hotel');
  await publish('first-hotel');
  assert.equal((await read('first-hotel'))[0].public_content.hotel.wifiPass, 'fixture-wifi');
  await assert.rejects(draft('first-hotel', {hotel:{logoUrl:'https://example.invalid/image.jpg'}}), { code: '23514' });

  await role('authenticated', other);
  assert.equal((await read('first-hotel'))[0].name, 'New Draft');
  assert.equal((await db.query("select profile from public.gm24_hotels where slug='first-hotel'")).rows.length, 0);
  assert.equal((await db.query("delete from public.gm24_hotels where slug='first-hotel' returning id")).rows.length, 0);
  await add('other-hotel', other);
  await assert.rejects(db.exec("delete from public.gm24_hotels where slug='other-hotel'"), { code: '23514' });

  await role('anon');
  assert.equal((await read('first-hotel'))[0].name, 'New Draft');
  assert.deepEqual(await read('second-hotel'), []);
  assert.deepEqual(await read('invalid-slug'), []);
  await assert.rejects(db.exec('select * from public.gm24_accounts'), { code: '42501' });
  await assert.rejects(track('first-hotel','guest_home'), { code: '42501' });

  await role('service_role');
  assert.equal(await track('second-hotel','guest_home'), 404);
  assert.equal(await track('first-hotel','category_made_up'), 400);
  assert.equal(await track('first-hotel','category_known'), 200);
  await db.transaction(async tx => {
    const args = ['first-hotel','guest_home'];
    for (let i = 0; i < 600; i++) {
      const result = await tx.query('select public.gm24_record_guest_event($1,$2) as status', args);
      if (result.rows[0].status === 429) {
        assert.ok(i >= 599, 'only an earlier same-minute test event can consume a slot');
        break;
      }
      assert.equal(result.rows[0].status, 200);
    }
    const result = await tx.query('select public.gm24_record_guest_event($1,$2) as status', args);
    assert.equal(result.rows[0].status, 429);
  });

  await db.exec(`reset role; update public.gm24_accounts set trial_ends_at=now()-interval '1 second' where owner_id='${owner}'`);
  await role('anon');
  assert.deepEqual(await read('first-hotel'), []);
  await role('service_role');
  assert.equal(await track('first-hotel','guest_home'), 404);
  await role('authenticated', owner);
  await assert.rejects(db.exec('delete from public.gm24_hotels'), { code: '23514' });
  assert.equal((await db.query('select count(*)::integer as total from public.gm24_hotels')).rows[0].total, 3);
});
