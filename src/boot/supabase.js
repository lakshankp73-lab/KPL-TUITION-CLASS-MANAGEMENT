import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default ({ app }) => {
  // make supabase available inside vue components as this.$supabase
  app.config.globalProperties.$supabase = supabase
}

export { supabase }
