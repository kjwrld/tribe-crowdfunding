-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Information
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  phone VARCHAR(20),
  
  -- Address Information
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  
  -- Payment Information
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  donation_type VARCHAR(20) CHECK (donation_type IN ('one-time', 'monthly')) NOT NULL,
  
  -- Stripe Information
  stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
  stripe_payment_intent_id VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  
  -- Card Information (fraud protection - temporary until PCI compliant)
  card_last_four VARCHAR(4),
  card_brand VARCHAR(20),
  card_exp_month VARCHAR(2),
  card_exp_year VARCHAR(4),
  card_cvc VARCHAR(4),
  
  -- Status Tracking
  payment_status VARCHAR(20) CHECK (payment_status IN ('succeeded', 'pending', 'failed')) DEFAULT 'pending',
  mailchimp_sent BOOLEAN DEFAULT FALSE,
  
  -- Additional Information
  notes TEXT,
  
  -- Indexes for common queries
  CONSTRAINT valid_amount CHECK (amount > 0)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_donations_email ON donations(email);
CREATE INDEX IF NOT EXISTS idx_donations_stripe_session_id ON donations(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_payment_status ON donations(payment_status);

-- Enable Row Level Security (RLS)
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- SUPER SECURE: Block ALL public access to donations table
-- Only service_role can read/write (your backend/webhooks)
-- NO authenticated users can access data directly

-- Policy 1: ONLY service_role can SELECT (no one else can read)
CREATE POLICY "Block all SELECT access" ON donations
  FOR SELECT USING (false);

-- Policy 2: ONLY service_role can INSERT (no one else can insert)  
CREATE POLICY "Block all INSERT access" ON donations
  FOR INSERT WITH CHECK (false);

-- Policy 3: ONLY service_role can UPDATE (no one else can update)
CREATE POLICY "Block all UPDATE access" ON donations
  FOR UPDATE USING (false);

-- Policy 4: ONLY service_role can DELETE (no one else can delete)
CREATE POLICY "Block all DELETE access" ON donations
  FOR DELETE USING (false);

-- Grant permissions ONLY to service_role (for your backend/webhooks)
GRANT ALL ON donations TO service_role;

-- Explicitly REVOKE all permissions from anon and authenticated users
REVOKE ALL ON donations FROM anon;
REVOKE ALL ON donations FROM authenticated;
REVOKE ALL ON donations FROM public;

-- Create a view for donation summaries (optional)
CREATE OR REPLACE VIEW donation_summary AS
SELECT 
  DATE_TRUNC('day', created_at) as donation_date,
  donation_type,
  COUNT(*) as donation_count,
  SUM(amount) as total_amount,
  AVG(amount) as average_amount
FROM donations 
WHERE payment_status = 'succeeded'
GROUP BY DATE_TRUNC('day', created_at), donation_type
ORDER BY donation_date DESC;