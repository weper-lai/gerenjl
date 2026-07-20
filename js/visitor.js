const SUPABASE_URL = 'https://nfikngtirtqgxtihkous.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_MVKHL8LctqsdEbkaBM4_cQ_UnfyGhkO';

async function trackVisitor() {
    try {
        const today = new Date().toISOString().split('T')[0];
        
        const headers = {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
        };
        
        const existingResponse = await fetch(
            `${SUPABASE_URL}/rest/v1/visitor_stats?visit_date=eq.${today}&select=*`,
            { headers }
        );
        const existingData = await existingResponse.json();
        
        let newCount = 1;
        if (Array.isArray(existingData) && existingData.length > 0) {
            const existing = existingData[0];
            newCount = existing.visit_count + 1;
            await fetch(
                `${SUPABASE_URL}/rest/v1/visitor_stats?id=eq.${existing.id}`,
                {
                    method: 'PATCH',
                    headers,
                    body: JSON.stringify({
                        visit_count: newCount,
                        updated_at: new Date().toISOString()
                    })
                }
            );
        } else {
            await fetch(
                `${SUPABASE_URL}/rest/v1/visitor_stats`,
                {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        visit_date: today,
                        visit_count: 1,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    })
                }
            );
        }
        
        const totalResponse = await fetch(
            `${SUPABASE_URL}/rest/v1/visitor_stats?select=visit_count`,
            { headers }
        );
        const totalData = await totalResponse.json();
        
        let totalVisitors = 0;
        if (Array.isArray(totalData)) {
            totalVisitors = totalData.reduce((sum, row) => sum + (row.visit_count || 0), 0);
        }
        
        updateVisitorDisplay({ totalVisitors });
    } catch (error) {
        console.error('访客统计错误:', error);
        updateVisitorDisplay({ totalVisitors: 'N/A' });
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
    setTimeout(trackVisitor, 1000);
});