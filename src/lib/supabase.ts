import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bgqqexyhocbtiqdnrixq.supabase.co'
const supabaseAnonKey = 'sb_publishable_oaBZuO6-34zKp4w9wQP8xA_MFiykLwf'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
