const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const today = new Date().toISOString().split('T')[0];
            
            const { data: existing, error: selectError } = await supabase
                .from('visitor_stats')
                .select('*')
                .eq('visit_date', today)
                .single();
            
            if (selectError && selectError.code !== 'PGRST116') {
                throw selectError;
            }
            
            if (existing) {
                await supabase
                    .from('visitor_stats')
                    .update({ 
                        visit_count: existing.visit_count + 1,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', existing.id);
            } else {
                await supabase
                    .from('visitor_stats')
                    .insert({
                        visit_date: today,
                        visit_count: 1,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    });
            }
            
            const { data: totalData, error: totalError } = await supabase
                .from('visitor_stats')
                .select('visit_count')
                .sum('visit_count');
            
            const totalVisitors = totalData && totalData[0]?.visit_count ? parseInt(totalData[0].visit_count) : 0;
            
            res.status(200).json({
                success: true,
                totalVisitors,
                visitorNumber: totalVisitors
            });
        } else {
            res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('访客统计错误:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = handler;