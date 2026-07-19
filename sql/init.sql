CREATE TABLE IF NOT EXISTS visitor_stats (
    id SERIAL PRIMARY KEY,
    visit_date DATE NOT NULL,
    visit_count INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_visitor_date 
ON visitor_stats(visit_date);

ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert on visitor_stats"
ON visitor_stats
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow anonymous select on visitor_stats"
ON visitor_stats
FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow anonymous update on visitor_stats"
ON visitor_stats
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);