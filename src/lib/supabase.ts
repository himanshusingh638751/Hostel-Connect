import { createClient } from '@supabase/supabase-js';

let envUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dbpmcqygevxwwievuxja.supabase.co';
if (envUrl && !envUrl.startsWith('http')) {
  envUrl = `https://${envUrl}`;
  if (!envUrl.includes('.supabase.co')) {
    envUrl = `https://${import.meta.env.VITE_SUPABASE_URL}.supabase.co`;
  }
}
const supabaseUrl = envUrl || 'https://dbpmcqygevxwwievuxja.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_LkXaEFXB5EM4nSR0vKy--Q_Idhp1xP7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

