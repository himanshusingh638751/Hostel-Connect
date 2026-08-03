import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://dbpmcqygevxwwievuxja.supabase.co', 'sb_publishable_LkXaEFXB5EM4nSR0vKy--Q_Idhp1xP7');
async function test() {
  const { data, error } = await supabase.from('users').select('*');
  console.log(data);
  console.log(error);
}
test();
