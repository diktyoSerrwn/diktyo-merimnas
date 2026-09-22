import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://czavamzmemmwngtsuyxe.supabase.co'
const supabaseAnonKey = 'sb_publishable_0RnX1x6GhXFrXdkBjMU-tw_K82fg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)