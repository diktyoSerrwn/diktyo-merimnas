import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://czavamzmemmwngtsuyxe.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6YXZhbXptZW1td25ndHN1eXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwODEwNzQsImV4cCI6MjEwNTY1NzA3NH0.B2DExEpom6cA4YGgU3frAZv75DFFNHmz2AebLPnypIs' // <-- Βάλε εδώ το παλιό σου κλειδί που ξεκινάει από eyJ

export const supabase = createClient(supabaseUrl, supabaseAnonKey)