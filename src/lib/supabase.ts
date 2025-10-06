import { createClient } from '@supabase/supabase-js'

// Public client for general use (with RLS protection)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Service role client for database operations (bypasses RLS)
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Public client (RLS protected)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Service client for backend operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types
export interface DonationRecord {
  id?: string
  created_at?: string
  email: string
  first_name: string
  last_name?: string
  phone?: string
  address_line1?: string
  address_line2?: string
  city?: string
  state?: string
  postal_code?: string
  country?: string
  amount: number
  currency: string
  donation_type: 'one-time' | 'monthly'
  stripe_session_id: string
  stripe_payment_intent_id?: string
  stripe_customer_id?: string
  card_last_four?: string
  card_brand?: string
  payment_status: 'succeeded' | 'pending' | 'failed'
  mailchimp_sent: boolean
  notes?: string
}

// Function to insert a new donation record (uses admin client to bypass RLS)
export async function insertDonation(donation: Omit<DonationRecord, 'id' | 'created_at'>) {
  const { data, error } = await supabaseAdmin
    .from('donations')
    .insert([donation])
    .select()
    .single()

  if (error) {
    console.error('Error inserting donation:', error)
    throw error
  }

  return data
}

// Function to update a donation record (uses admin client to bypass RLS)
export async function updateDonation(id: string, updates: Partial<DonationRecord>) {
  const { data, error } = await supabaseAdmin
    .from('donations')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating donation:', error)
    throw error
  }

  return data
}

// Function to get donation by Stripe session ID (uses admin client to bypass RLS)
export async function getDonationBySessionId(sessionId: string) {
  const { data, error } = await supabaseAdmin
    .from('donations')
    .select('*')
    .eq('stripe_session_id', sessionId)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
    console.error('Error fetching donation:', error)
    throw error
  }

  return data
}

// Function to get all donations (with pagination) - uses admin client to bypass RLS
export async function getDonations(limit = 50, offset = 0) {
  const { data, error, count } = await supabaseAdmin
    .from('donations')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching donations:', error)
    throw error
  }

  return { data, count }
}