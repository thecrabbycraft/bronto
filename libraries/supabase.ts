import { createClient } from 'supabase/mod.ts'

export const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'http://localhost:8080'
export const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || 'anonymous'

const options = {
    schema: 'public',
    headers: { 'x-app-name': 'fltr-link' },
    detectSessionInUrl: false,
    autoRefreshToken: true,
    persistSession: true,
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options)
