import { createClient } from 'https://esm.sh/@neondatabase/neon-js@0.6.2-beta?bundle';

export const AUTH_URL = 'https://ep-solitary-recipe-afmlifru.neonauth.c-2.us-west-2.aws.neon.tech/neondb/auth';
export const DATA_API_URL = 'https://ep-solitary-recipe-afmlifru.apirest.c-2.us-west-2.aws.neon.tech/neondb/rest/v1';

export const client = createClient({
  auth: { url: AUTH_URL },
  dataApi: { url: DATA_API_URL },
}, {
  auth: { allowAnonymous: true },
});

export async function loadSettings() {
  const { data, error } = await client.from('site_settings').select('key,value');
  if (error) throw error;
  return Object.fromEntries((data || []).map(row => [row.key, row.value]));
}

export async function loadHotspots(includeInactive=false) {
  let query = client.from('map_hotspots').select('*').order('sort_order', { ascending: true });
  if (!includeInactive) query = query.eq('is_active', true);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function loadNeighborhoods() {
  const { data, error } = await client.from('neighborhoods').select('*').order('sort_order', { ascending: true });
  if (error) throw error;
  return data || [];
}
