import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL. Add it to .env.local with your Supabase project URL.'
  )
}

if (!supabaseKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Add a public Supabase key to .env.local.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
