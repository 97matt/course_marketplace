import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sdauswbtuhvswetrdvji.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkYXVzd2J0dWh2c3dldHJkdmppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NDMxOTgsImV4cCI6MjA2NzUxOTE5OH0.l-rCaA63v_o1xn1OeeY1rEe51I7LcD6_Nqf3dwqgwy8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
