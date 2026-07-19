const SUPABASE_URL = 'https://nfikngtirtqgxtihkous.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_MVKHL8LctqsdEbkaBM4_cQ_UnfyGhkO';

let supabase = null;

function initSupabase() {
    if (window.supabase && window.supabase.createClient) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } else {
        console.error('Supabase SDK 未加载');
    }
}

async function trackVisitor() {
    initSupabase();
    
    if (!supabase) {
        console.error('Supabase 初始化失败');
        return;
    }
    
    try {
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
            .select('visit_count');
        
        const totalVisitors = totalData ? totalData.reduce((sum, row) => sum + (row.visit_count || 0), 0) : 0;
        
        updateVisitorDisplay({ totalVisitors });
    } catch (error) {
        console.error('访客统计错误:', error);
    }
}

function updateVisitorDisplay(data) {
    const visitorNumber = document.getElementById('visitor-number');
    const visitorBadge = document.getElementById('visitor-badge');
    
    if (visitorNumber && data.totalVisitors) {
        visitorNumber.textContent = data.totalVisitors;
        visitorNumber.classList.add('visitor-badge');
    }
    
    if (visitorBadge) {
        visitorBadge.classList.add('visitor-badge');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    trackVisitor();
});