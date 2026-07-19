function showSkillDetail(skillName) {
    const demoWindow = document.createElement('div');
    demoWindow.className = 'fullscreen-demo';
    demoWindow.id = 'fullscreen-demo';
    
    const skillInfo = getSkillInfo(skillName);
    
    demoWindow.innerHTML = `
        <div class="demo-glow"></div>
        <div class="demo-header">
            <div class="demo-title">
                <i class="${skillInfo.icon} text-3xl"></i>
                <h2>${skillName}</h2>
            </div>
            <div class="demo-actions">
                <button class="demo-btn demo-btn-fullscreen" id="demo-fullscreen">
                    <i class="fas fa-expand"></i> 全屏
                </button>
                <button class="demo-btn demo-btn-close" id="demo-close">
                    <i class="fas fa-times"></i> 关闭
                </button>
            </div>
        </div>
        <div class="demo-body">
            <div class="demo-sidebar">
                <h3>核心能力</h3>
                <div class="skill-tags">
                    ${skillInfo.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
                </div>
                <h3 style="margin-top: 2rem;">项目亮点</h3>
                <ul class="space-y-2 mt-1">
                    ${skillInfo.highlights.map(h => `<li class="text-sm text-text-secondary">• ${h}</li>`).join('')}
                </ul>
                <h3 style="margin-top: 2rem;">技术栈</h3>
                <div class="skill-tags">
                    ${skillInfo.stack.map(s => `<span class="skill-tag" style="background: rgba(147, 51, 234, 0.15); color: #a78bfa; border-color: rgba(147, 51, 234, 0.3);">${s}</span>`).join('')}
                </div>
            </div>
            <div class="demo-content">
                        <div class="project-header">
                            <h3>${skillInfo.projectName}</h3>
                            <p>${skillInfo.projectDesc}</p>
                        </div>
                        <div class="project-showcase" id="project-demo-area">
                    <div class="demo-loading">
                        <div class="loading-spinner"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(demoWindow);
    
    setTimeout(() => {
        demoWindow.classList.add('active');
        loadProjectDemo(skillName);
    }, 50);
    
    const closeBtn = document.getElementById('demo-close');
    closeBtn.addEventListener('click', () => {
        demoWindow.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(demoWindow);
        }, 500);
    });
    
    const fullscreenBtn = document.getElementById('demo-fullscreen');
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            demoWindow.requestFullscreen().catch(err => {});
        } else {
            document.exitFullscreen();
        }
    });
}

function loadProjectDemo(skillName) {
    const demoArea = document.getElementById('project-demo-area');
    if (!demoArea) return;
    
    if (skillName === 'Java') {
        demoArea.innerHTML = `
            <div class="relative w-full h-full min-h-[500px]">
                <div class="iframe-loading-overlay" id="iframe-loading">
                    <div class="loading-spinner"></div>
                    <span class="text-text-muted text-sm mt-4">正在加载后台管理系统...</span>
                </div>
                <iframe 
                    id="java-admin-frame" 
                    src="/demos/java-admin.html" 
                    class="w-full h-full min-h-[500px] rounded-xl border-0 opacity-0 transition-opacity duration-500"
                    style="background: #0f172a;"
                ></iframe>
            </div>
        `;
        setTimeout(() => {
            const iframe = document.getElementById('java-admin-frame');
            const loading = document.getElementById('iframe-loading');
            if (iframe) {
                iframe.addEventListener('load', () => {
                    loading.style.display = 'none';
                    iframe.style.opacity = '1';
                });
                iframe.onreadystatechange = function() {
                    if (iframe.readyState === 'complete') {
                        loading.style.display = 'none';
                        iframe.style.opacity = '1';
                    }
                };
                setTimeout(() => {
                    loading.style.display = 'none';
                    iframe.style.opacity = '1';
                }, 3000);
            }
        }, 100);
    } else if (skillName === 'Python') {
        demoArea.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-medium">数据可视化分析</span>
                    <button id="python-run-btn" class="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors">运行分析</button>
                </div>
                <canvas id="python-chart" width="600" height="250" class="w-full rounded-lg bg-black/30"></canvas>
                <div id="python-output" class="bg-black/30 rounded-lg p-3 font-mono text-xs text-text-secondary"></div>
            </div>
        `;
        setTimeout(() => {
            const btn = document.getElementById('python-run-btn');
            const output = document.getElementById('python-output');
            if (btn && output) {
                btn.addEventListener('click', () => {
                    output.innerHTML = '<span class="text-yellow-400">正在分析数据...</span>';
                    const canvas = document.getElementById('python-chart');
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    
                    const data = [45, 68, 52, 89, 73, 92, 61];
                    const labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
                    const colors = ['#3b82f6', '#f97316', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];
                    const maxVal = Math.max(...data);
                    
                    const barWidth = 60;
                    const gap = 20;
                    const startX = 40;
                    const maxHeight = 200;
                    
                    data.forEach((val, idx) => {
                        const x = startX + idx * (barWidth + gap);
                        const height = (val / maxVal) * maxHeight;
                        const gradient = ctx.createLinearGradient(x, 240 - height, x, 240);
                        gradient.addColorStop(0, colors[idx]);
                        gradient.addColorStop(1, colors[idx] + '80');
                        ctx.fillStyle = gradient;
                        ctx.fillRect(x, 240 - height, barWidth, height);
                        ctx.fillStyle = '#9ca3af';
                        ctx.font = '12px Arial';
                        ctx.textAlign = 'center';
                        ctx.fillText(labels[idx], x + barWidth / 2, 240 + 20);
                        ctx.fillText(val, x + barWidth / 2, 240 - height - 10);
                    });
                    
                    setTimeout(() => {
                        output.innerHTML = `
                            <span class="text-green-400">分析完成!</span><br>
                            <span class="text-text-muted">数据总数: 1,258,340 条</span><br>
                            <span class="text-text-muted">平均值: ${(data.reduce((a,b)=>a+b,0)/data.length).toFixed(1)}</span><br>
                            <span class="text-text-muted">处理耗时: 0.042s</span>
                        `;
                    }, 500);
                });
            }
        }, 100);
    } else if (skillName === 'JavaScript') {
        demoArea.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-medium">Canvas 粒子动画引擎</span>
                    <div class="flex gap-2">
                        <button id="js-play-btn" class="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"><i class="fas fa-play"></i></button>
                        <button id="js-pause-btn" class="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"><i class="fas fa-pause"></i></button>
                    </div>
                </div>
                <canvas id="js-canvas" width="600" height="300" class="w-full rounded-lg bg-black/30"></canvas>
            </div>
        `;
        setTimeout(() => {
            const canvas = document.getElementById('js-canvas');
            const ctx = canvas.getContext('2d');
            let particles = [];
            let animationId;
            let isPlaying = true;
            
            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.vx = (Math.random() - 0.5) * 1.5;
                    this.vy = (Math.random() - 0.5) * 1.5;
                    this.size = Math.random() * 4 + 1;
                    this.color = `hsl(${Math.random() * 60 + 180}, 70%, 60%)`;
                    this.alpha = Math.random() * 0.5 + 0.3;
                }
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                }
                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.globalAlpha = this.alpha;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            }
            
            function animate() {
                if (!isPlaying) return;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(p => { p.update(); p.draw(); });
                animationId = requestAnimationFrame(animate);
            }
            
            for (let i = 0; i < 50; i++) particles.push(new Particle());
            animate();
            
            const playBtn = document.getElementById('js-play-btn');
            const pauseBtn = document.getElementById('js-pause-btn');
            if (playBtn) playBtn.addEventListener('click', () => { isPlaying = true; animate(); });
            if (pauseBtn) pauseBtn.addEventListener('click', () => { isPlaying = false; });
        }, 100);
    } else if (skillName === 'C++') {
        demoArea.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-medium">3D 图形渲染演示</span>
                    <button id="cpp-rotate-btn" class="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors">旋转动画</button>
                </div>
                <canvas id="cpp-canvas" width="600" height="300" class="w-full rounded-lg bg-black/30"></canvas>
            </div>
        `;
        setTimeout(() => {
            const btn = document.getElementById('cpp-rotate-btn');
            const canvas = document.getElementById('cpp-canvas');
            const ctx = canvas.getContext('2d');
            let angle = 0;
            let isRotating = false;
            
            function drawCube() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const cx = canvas.width / 2;
                const cy = canvas.height / 2;
                const size = 80;
                
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(angle);
                
                ctx.strokeStyle = '#3b82f6';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.strokeRect(-size, -size, size * 2, size * 2);
                
                ctx.strokeStyle = '#06b6d4';
                ctx.beginPath();
                ctx.moveTo(size, -size); ctx.lineTo(size * 1.5, -size * 0.5);
                ctx.moveTo(size, size); ctx.lineTo(size * 1.5, size * 0.5);
                ctx.moveTo(-size, -size); ctx.lineTo(-size * 0.5, -size * 1.5);
                ctx.moveTo(-size, size); ctx.lineTo(-size * 0.5, size * 1.5);
                ctx.stroke();
                
                ctx.strokeStyle = '#8b5cf6';
                ctx.beginPath();
                ctx.moveTo(size * 1.5, -size * 0.5); ctx.lineTo(-size * 0.5, -size * 1.5);
                ctx.moveTo(size * 1.5, size * 0.5); ctx.lineTo(-size * 0.5, size * 1.5);
                ctx.stroke();
                
                ctx.restore();
                
                if (isRotating) {
                    angle += 0.02;
                    requestAnimationFrame(drawCube);
                }
            }
            
            if (btn) {
                btn.addEventListener('click', () => {
                    isRotating = !isRotating;
                    btn.textContent = isRotating ? '停止旋转' : '旋转动画';
                    if (isRotating) drawCube();
                });
            }
            drawCube();
        }, 100);
    } else if (skillName === 'MySQL') {
        demoArea.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-medium">SQL 查询执行器</span>
                    <button id="mysql-run-btn" class="px-3 py-1.5 bg-orange-500/20 text-orange-400 rounded-lg text-sm hover:bg-orange-500/30 transition-colors">执行查询</button>
                </div>
                <div class="bg-black/30 rounded-lg p-4 font-mono text-xs text-text-secondary">SELECT * FROM users WHERE status = 'active' ORDER BY created_at DESC LIMIT 10</div>
                <div id="mysql-result" class="bg-black/30 rounded-lg p-4 font-mono text-xs min-h-[150px]"><span class="text-text-muted">等待查询...</span></div>
            </div>
        `;
        setTimeout(() => {
            const btn = document.getElementById('mysql-run-btn');
            const result = document.getElementById('mysql-result');
            if (btn && result) {
                btn.addEventListener('click', () => {
                    result.innerHTML = '<span class="text-yellow-400">正在执行查询...</span>';
                    setTimeout(() => {
                        result.innerHTML = `
                            <div class="text-green-400 mb-2">+----+--------+----------+----------------------+---------------------+</div>
                            <div class="text-text-secondary">| id | name   | status   | email                | created_at          |</div>
                            <div class="text-green-400">+----+--------+----------+----------------------+---------------------+</div>
                            <div class="text-text-secondary">|  1 | 张三   | active   | zhang@example.com    | 2024-01-15 10:30:00 |</div>
                            <div class="text-text-secondary">|  2 | 李四   | active   | li@example.com       | 2024-01-14 09:15:00 |</div>
                            <div class="text-text-secondary">|  3 | 王五   | active   | wang@example.com     | 2024-01-13 14:20:00 |</div>
                            <div class="text-text-secondary">|  4 | 赵六   | active   | zhao@example.com     | 2024-01-12 11:45:00 |</div>
                            <div class="text-green-400">+----+--------+----------+----------------------+---------------------+</div>
                            <div class="text-text-muted mt-2">4 rows in set (0.001 sec)</div>
                        `;
                    }, 600);
                });
            }
        }, 100);
    } else if (skillName === 'PostgreSQL') {
        demoArea.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-medium">PostgreSQL 查询演示</span>
                    <button id="postgres-run-btn" class="px-3 py-1.5 bg-orange-500/20 text-orange-400 rounded-lg text-sm hover:bg-orange-500/30 transition-colors">执行查询</button>
                </div>
                <div class="bg-black/30 rounded-lg p-4 font-mono text-xs text-text-secondary">SELECT date_trunc('day', created_at) as day, COUNT(*) FROM events GROUP BY day ORDER BY day LIMIT 7</div>
                <canvas id="postgres-chart" width="600" height="180" class="w-full rounded-lg bg-black/30"></canvas>
                <div id="postgres-output" class="bg-black/30 rounded-lg p-3 font-mono text-xs text-text-secondary"></div>
            </div>
        `;
        setTimeout(() => {
            const btn = document.getElementById('postgres-run-btn');
            const output = document.getElementById('postgres-output');
            if (btn && output) {
                btn.addEventListener('click', () => {
                    output.innerHTML = '<span class="text-yellow-400">正在分析数据...</span>';
                    const canvas = document.getElementById('postgres-chart');
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    
                    const data = [45, 68, 52, 89, 73, 92, 61];
                    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                    const maxVal = Math.max(...data);
                    
                    data.forEach((val, idx) => {
                        const x = 30 + idx * 75;
                        const y = 160 - (val / maxVal) * 130;
                        const width = 50;
                        const height = (val / maxVal) * 130;
                        
                        const gradient = ctx.createLinearGradient(x, y, x, 160);
                        gradient.addColorStop(0, '#f97316');
                        gradient.addColorStop(1, '#ea580c');
                        
                        ctx.fillStyle = gradient;
                        ctx.fillRect(x, y, width, height);
                        
                        ctx.fillStyle = '#9ca3af';
                        ctx.font = '11px Arial';
                        ctx.textAlign = 'center';
                        ctx.fillText(labels[idx], x + width / 2, 175);
                    });
                    
                    setTimeout(() => {
                        output.innerHTML = `
                            <span class="text-green-400">分析完成!</span><br>
                            <span class="text-text-muted">总行数: 1,258,340</span><br>
                            <span class="text-text-muted">平均响应: 0.042s</span><br>
                            <span class="text-text-muted">查询优化: 已使用索引</span>
                        `;
                    }, 500);
                });
            }
        }, 100);
    } else if (skillName === 'MongoDB') {
        demoArea.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-medium">MongoDB 文档查询</span>
                    <button id="mongo-run-btn" class="px-3 py-1.5 bg-orange-500/20 text-orange-400 rounded-lg text-sm hover:bg-orange-500/30 transition-colors">查询集合</button>
                </div>
                <div class="bg-black/30 rounded-lg p-4 font-mono text-xs text-text-secondary">db.applications.find({ type: "service" })</div>
                <div id="mongo-documents" class="bg-black/30 rounded-lg p-4 font-mono text-xs min-h-[150px]"><span class="text-text-muted">等待查询...</span></div>
            </div>
        `;
        setTimeout(() => {
            const btn = document.getElementById('mongo-run-btn');
            const docs = document.getElementById('mongo-documents');
            if (btn && docs) {
                btn.addEventListener('click', () => {
                    docs.innerHTML = '<span class="text-yellow-400">正在查询集合...</span>';
                    setTimeout(() => {
                        docs.innerHTML = `
                            <span class="text-cyan-400">{</span><br>
                            <span class="text-text-muted">&nbsp;&nbsp;"_id": "60d21b4667d0d8992e610c85",</span><br>
                            <span class="text-text-muted">&nbsp;&nbsp;"name": "用户管理系统",</span><br>
                            <span class="text-text-muted">&nbsp;&nbsp;"type": "application",</span><br>
                            <span class="text-text-muted">&nbsp;&nbsp;"version": "1.0.0",</span><br>
                            <span class="text-text-muted">&nbsp;&nbsp;"tags": ["backend", "api"]</span><br>
                            <span class="text-cyan-400">}</span><br><br>
                            <span class="text-cyan-400">{</span><br>
                            <span class="text-text-muted">&nbsp;&nbsp;"_id": "60d21b4667d0d8992e610c86",</span><br>
                            <span class="text-text-muted">&nbsp;&nbsp;"name": "数据统计服务",</span><br>
                            <span class="text-text-muted">&nbsp;&nbsp;"type": "service",</span><br>
                            <span class="text-text-muted">&nbsp;&nbsp;"version": "2.1.0",</span><br>
                            <span class="text-text-muted">&nbsp;&nbsp;"tags": ["analytics", "data"]</span><br>
                            <span class="text-cyan-400">}</span>
                        `;
                    }, 600);
                });
            }
        }, 100);
    } else if (skillName === 'Redis') {
        demoArea.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-medium">Redis 缓存操作</span>
                    <div class="flex gap-2">
                        <button id="redis-set-btn" class="px-3 py-1.5 bg-orange-500/20 text-orange-400 rounded-lg text-sm hover:bg-orange-500/30 transition-colors">SET</button>
                        <button id="redis-get-btn" class="px-3 py-1.5 bg-orange-500/20 text-orange-400 rounded-lg text-sm hover:bg-orange-500/30 transition-colors">GET</button>
                    </div>
                </div>
                <div id="redis-output" class="bg-black/30 rounded-lg p-4 font-mono text-xs min-h-[150px]"><span class="text-text-muted">等待操作...</span></div>
                <div class="flex gap-2">
                    <span class="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-xs">Memory: 128MB</span>
                    <span class="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-xs">Connections: 1,234</span>
                    <span class="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg text-xs">Uptime: 12h 35m</span>
                </div>
            </div>
        `;
        setTimeout(() => {
            let cacheData = {};
            const setBtn = document.getElementById('redis-set-btn');
            const getBtn = document.getElementById('redis-get-btn');
            const output = document.getElementById('redis-output');
            
            if (setBtn) {
                setBtn.addEventListener('click', () => {
                    const key = `session:${Math.floor(Math.random() * 1000)}`;
                    const value = JSON.stringify({ userId: Math.floor(Math.random() * 100), timestamp: Date.now() });
                    cacheData[key] = value;
                    output.innerHTML = `
                        <span class="text-green-400">127.0.0.1:6379&gt;</span> SET ${key} "${value}"<br>
                        <span class="text-green-400">OK</span><br><br>
                        <span class="text-text-muted">TTL: 3600 seconds</span>
                    `;
                });
            }
            
            if (getBtn) {
                getBtn.addEventListener('click', () => {
                    const keys = Object.keys(cacheData);
                    if (keys.length === 0) {
                        output.innerHTML = '<span class="text-yellow-400">缓存为空，请先设置数据</span>';
                    } else {
                        const randomKey = keys[Math.floor(Math.random() * keys.length)];
                        output.innerHTML = `
                            <span class="text-green-400">127.0.0.1:6379&gt;</span> GET ${randomKey}<br>
                            <span class="text-text-secondary">"${cacheData[randomKey]}"</span>
                        `;
                    }
                });
            }
        }, 100);
    } else if (skillName === 'HTML/CSS') {
        demoArea.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-medium">CSS 动画演示</span>
                    <button id="css-animate-btn" class="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/30 transition-colors">播放动画</button>
                </div>
                <div class="flex justify-center gap-6 py-8">
                    <div id="css-demo-card" class="w-32 h-32 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/30 flex items-center justify-center transition-all duration-500">
                        <i class="fab fa-css3-alt text-4xl text-cyan-400"></i>
                    </div>
                    <div id="css-demo-card-2" class="w-32 h-32 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-500/30 flex items-center justify-center transition-all duration-500">
                        <i class="fab fa-html5 text-4xl text-purple-400"></i>
                    </div>
                </div>
            </div>
        `;
        setTimeout(() => {
            const btn = document.getElementById('css-animate-btn');
            const card1 = document.getElementById('css-demo-card');
            const card2 = document.getElementById('css-demo-card-2');
            if (btn) {
                btn.addEventListener('click', () => {
                    card1.classList.add('scale-110', 'shadow-lg', 'shadow-cyan-500/30', 'rotate-3');
                    card2.classList.add('scale-110', 'shadow-lg', 'shadow-purple-500/30', '-rotate-3');
                    setTimeout(() => {
                        card1.classList.remove('scale-110', 'shadow-lg', 'shadow-cyan-500/30', 'rotate-3');
                        card2.classList.remove('scale-110', 'shadow-lg', 'shadow-purple-500/30', '-rotate-3');
                    }, 1000);
                });
            }
        }, 100);
    } else if (skillName === 'Vue.js') {
        demoArea.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-medium">响应式计数器</span>
                    <button id="vue-reset" class="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/30 transition-colors">重置</button>
                </div>
                <div class="flex items-center justify-center gap-6 py-8">
                    <button id="vue-minus" class="w-16 h-16 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold text-3xl hover:bg-cyan-500/30 transition-all hover:scale-110">-</button>
                    <div id="vue-count" class="w-24 h-16 rounded-xl bg-cyan-500/30 flex items-center justify-center font-bold text-4xl text-cyan-400">0</div>
                    <button id="vue-plus" class="w-16 h-16 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold text-3xl hover:bg-cyan-500/30 transition-all hover:scale-110">+</button>
                </div>
            </div>
        `;
        setTimeout(() => {
            let count = 0;
            const minusBtn = document.getElementById('vue-minus');
            const plusBtn = document.getElementById('vue-plus');
            const resetBtn = document.getElementById('vue-reset');
            const countDisplay = document.getElementById('vue-count');
            
            if (minusBtn) minusBtn.addEventListener('click', () => { count--; countDisplay.textContent = count; });
            if (plusBtn) plusBtn.addEventListener('click', () => { count++; countDisplay.textContent = count; });
            if (resetBtn) resetBtn.addEventListener('click', () => { count = 0; countDisplay.textContent = count; });
        }, 100);
    } else if (skillName === 'React') {
        demoArea.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-medium">任务管理系统</span>
                </div>
                <div class="flex gap-2 mb-4">
                    <input id="react-input" type="text" placeholder="添加新任务..." class="flex-1 px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-cyan-500/50">
                    <button id="react-add" class="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/30 transition-colors">添加</button>
                </div>
                <div id="react-list" class="space-y-2 max-h-[200px] overflow-y-auto"><div class="text-text-muted text-center py-8 text-sm">暂无任务，添加一个吧</div></div>
            </div>
        `;
        setTimeout(() => {
            const input = document.getElementById('react-input');
            const addBtn = document.getElementById('react-add');
            const list = document.getElementById('react-list');
            
            if (addBtn) {
                addBtn.addEventListener('click', () => {
                    const text = input.value.trim();
                    if (text) {
                        const item = document.createElement('div');
                        item.className = 'flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-black/40 transition-colors';
                        item.innerHTML = `
                            <span class="text-sm">${text}</span>
                            <button class="w-8 h-8 rounded bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30 transition-colors"><i class="fas fa-times"></i></button>
                        `;
                        item.querySelector('button').addEventListener('click', () => item.remove());
                        if (list.querySelector('.text-text-muted')) list.innerHTML = '';
                        list.appendChild(item);
                        input.value = '';
                    }
                });
            }
            
            if (input) {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && addBtn) addBtn.click();
                });
            }
        }, 100);
    } else if (skillName === 'Node.js') {
        demoArea.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-medium">Node.js 服务器测试</span>
                    <button id="node-test-btn" class="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/30 transition-colors">测试连接</button>
                </div>
                <div id="node-output" class="bg-black/30 rounded-lg p-4 font-mono text-xs min-h-[150px]"><span class="text-text-muted">等待连接...</span></div>
            </div>
        `;
        setTimeout(() => {
            const btn = document.getElementById('node-test-btn');
            const output = document.getElementById('node-output');
            if (btn && output) {
                btn.addEventListener('click', () => {
                    output.innerHTML = '<span class="text-yellow-400">正在连接服务器...</span>';
                    setTimeout(() => {
                        output.innerHTML = `
                            <span class="text-green-400">Server: Node.js v18.17.0</span><br>
                            <span class="text-blue-400">Framework: Express 4.18.2</span><br><br>
                            <span class="text-text-muted">GET /api/health</span><br>
                            <span class="text-green-400">Status: 200 OK</span><br>
                            <span class="text-text-muted">Response: {"status":"ok","uptime":"12h 35m"}</span>
                        `;
                    }, 700);
                });
            }
        }, 100);
    } else if (skillName === 'Linux') {
        demoArea.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-medium">Linux 终端模拟器</span>
                </div>
                <div class="bg-black/40 rounded-lg p-4 font-mono text-xs">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-green-400">admin@server</span>
                        <span class="text-text-muted">:</span>
                        <span class="text-blue-400">~</span>
                        <span class="text-text-muted">$</span>
                        <span class="text-text-secondary">ls -la</span>
                    </div>
                    <div class="text-text-muted mb-2">total 48</div>
                    <div class="text-text-secondary">-rw-r--r-- 1 admin admin   512 Jan 15 10:30 .bashrc</div>
                    <div class="text-text-secondary">-rw-r--r-- 1 admin admin   256 Jan 15 10:30 .profile</div>
                    <div class="text-text-secondary">drwxr-xr-x 2 admin admin  4096 Jan 15 14:00 Documents/</div>
                    <div class="text-text-secondary">drwxr-xr-x 2 admin admin  4096 Jan 15 11:00 Projects/</div>
                    <div class="text-text-secondary">drwxr-xr-x 2 admin admin  4096 Jan 14 09:00 Downloads/</div>
                    <div class="flex items-center gap-2 mt-3">
                        <span class="text-green-400">admin@server</span>
                        <span class="text-text-muted">:</span>
                        <span class="text-blue-400">~</span>
                        <span class="text-text-muted">$</span>
                        <input id="linux-input" type="text" placeholder="输入命令..." class="flex-1 bg-transparent outline-none text-text-secondary" autofocus>
                    </div>
                    <div id="linux-output" class="mt-2"></div>
                </div>
            </div>
        `;
        setTimeout(() => {
            const input = document.getElementById('linux-input');
            const output = document.getElementById('linux-output');
            
            const commands = {
                'ls': 'Documents  Downloads  Music  Pictures  Projects',
                'pwd': '/home/admin',
                'whoami': 'admin',
                'date': new Date().toString(),
                'uname -a': 'Linux server 5.15.0-78-generic #85-Ubuntu SMP x86_64',
                'free -h': '              total        used        free\nMem:           15Gi       2.3Gi        10Gi\nSwap:          2.0Gi          0B       2.0Gi',
                'echo "Hello World"': 'Hello World'
            };
            
            if (input) {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        const cmd = input.value.trim();
                        if (cmd) {
                            const result = commands[cmd] || `bash: ${cmd}: command not found`;
                            output.innerHTML += `
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="text-green-400">admin@server</span>
                                    <span class="text-text-muted">:</span>
                                    <span class="text-blue-400">~</span>
                                    <span class="text-text-muted">$</span>
                                    <span class="text-text-secondary">${cmd}</span>
                                </div>
                                <div class="ml-2 mb-2 text-text-muted whitespace-pre-wrap">${result}</div>
                            `;
                            input.value = '';
                        }
                    }
                });
            }
        }, 100);
    } else if (skillName === 'Docker') {
        demoArea.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-medium">容器管理控制台</span>
                    <button id="docker-refresh" class="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg text-sm hover:bg-purple-500/30 transition-colors">刷新状态</button>
                </div>
                <div id="docker-containers" class="space-y-3">
                    <div class="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                        <span class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                        <span class="flex-1 font-medium">nginx:latest</span>
                        <span class="text-xs text-green-400">Running</span>
                        <span class="text-xs text-text-muted">80/tcp</span>
                        <span class="text-xs text-text-muted">2.3GB</span>
                    </div>
                    <div class="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                        <span class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                        <span class="flex-1 font-medium">mysql:8.0</span>
                        <span class="text-xs text-green-400">Running</span>
                        <span class="text-xs text-text-muted">3306/tcp</span>
                        <span class="text-xs text-text-muted">5.6GB</span>
                    </div>
                    <div class="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                        <span class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                        <span class="flex-1 font-medium">redis:latest</span>
                        <span class="text-xs text-green-400">Running</span>
                        <span class="text-xs text-text-muted">6379/tcp</span>
                        <span class="text-xs text-text-muted">128MB</span>
                    </div>
                    <div class="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                        <span class="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span class="flex-1 font-medium">api-service:v2.1</span>
                        <span class="text-xs text-blue-400">Running</span>
                        <span class="text-xs text-text-muted">3000/tcp</span>
                        <span class="text-xs text-text-muted">1.2GB</span>
                    </div>
                </div>
            </div>
        `;
        setTimeout(() => {
            const btn = document.getElementById('docker-refresh');
            const containers = document.getElementById('docker-containers');
            if (btn && containers) {
                btn.addEventListener('click', () => {
                    containers.innerHTML = `
                        <div class="flex items-center justify-center py-8">
                            <div class="loading-spinner" style="width: 32px; height: 32px;"></div>
                        </div>
                    `;
                    setTimeout(() => {
                        containers.innerHTML = `
                            <div class="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                                <span class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                                <span class="flex-1 font-medium">nginx:latest</span>
                                <span class="text-xs text-green-400">Running</span>
                                <span class="text-xs text-text-muted">80/tcp</span>
                                <span class="text-xs text-text-muted">2.3GB</span>
                            </div>
                            <div class="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                                <span class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                                <span class="flex-1 font-medium">mysql:8.0</span>
                                <span class="text-xs text-green-400">Running</span>
                                <span class="text-xs text-text-muted">3306/tcp</span>
                                <span class="text-xs text-text-muted">5.6GB</span>
                            </div>
                            <div class="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                                <span class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                                <span class="flex-1 font-medium">redis:latest</span>
                                <span class="text-xs text-green-400">Running</span>
                                <span class="text-xs text-text-muted">6379/tcp</span>
                                <span class="text-xs text-text-muted">128MB</span>
                            </div>
                            <div class="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                                <span class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                                <span class="flex-1 font-medium">api-service:v2.2</span>
                                <span class="text-xs text-green-400">Running</span>
                                <span class="text-xs text-text-muted">3000/tcp</span>
                                <span class="text-xs text-text-muted">1.2GB</span>
                            </div>
                            <div class="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                                <span class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                                <span class="flex-1 font-medium">rabbitmq:latest</span>
                                <span class="text-xs text-green-400">Running</span>
                                <span class="text-xs text-text-muted">5672/tcp</span>
                                <span class="text-xs text-text-muted">890MB</span>
                            </div>
                        `;
                    }, 500);
                });
            }
        }, 100);
    } else if (skillName === 'Git') {
        demoArea.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-medium">Git 版本控制演示</span>
                    <div class="flex gap-2">
                        <button id="git-commit" class="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg text-sm hover:bg-purple-500/30 transition-colors">Commit</button>
                        <button id="git-push" class="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg text-sm hover:bg-purple-500/30 transition-colors">Push</button>
                    </div>
                </div>
                <div id="git-log" class="bg-black/30 rounded-lg p-4 font-mono text-xs min-h-[150px]">
                    <span class="text-text-muted">等待操作...</span>
                </div>
            </div>
        `;
        setTimeout(() => {
            const commitBtn = document.getElementById('git-commit');
            const pushBtn = document.getElementById('git-push');
            const log = document.getElementById('git-log');
            let commitCount = 0;
            
            if (commitBtn) {
                commitBtn.addEventListener('click', () => {
                    commitCount++;
                    log.innerHTML = `
                        <span class="text-green-400">[new commit]</span>
                        <span class="text-text-muted"> feat: 添加新功能 ${commitCount}</span><br>
                        <span class="text-text-muted">Author: WeiPing Lai</span><br>
                        <span class="text-text-muted">Date: ${new Date().toLocaleString()}</span>
                    `;
                });
            }
            
            if (pushBtn) {
                pushBtn.addEventListener('click', () => {
                    log.innerHTML = `
                        <span class="text-blue-400">Pushing to origin/main...</span><br>
                        <span class="text-green-400">Enumerating objects: 5, done.</span><br>
                        <span class="text-green-400">Counting objects: 100% (5/5), done.</span><br>
                        <span class="text-green-400">Total 5 (delta 2), reused 0 (delta 0)</span><br>
                        <span class="text-green-400">To github.com:lwp2005/resume.git</span>
                    `;
                });
            }
        }, 100);
    } else if (skillName === '网络') {
        demoArea.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-medium">TCP 三次握手演示</span>
                    <button id="network-simulate" class="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg text-sm hover:bg-purple-500/30 transition-colors">模拟连接</button>
                </div>
                <div class="flex justify-center gap-8 mb-6">
                    <div class="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
                        <div class="text-lg font-bold text-blue-400">Client</div>
                        <div class="text-xs text-text-muted mt-1">192.168.1.100</div>
                    </div>
                    <div class="flex flex-col justify-center gap-2">
                        <span class="w-16 h-0.5 bg-purple-500/30"></span>
                        <span class="w-16 h-0.5 bg-purple-500/30"></span>
                        <span class="w-16 h-0.5 bg-purple-500/30"></span>
                    </div>
                    <div class="text-center p-4 bg-green-500/10 rounded-xl border border-green-500/30">
                        <div class="text-lg font-bold text-green-400">Server</div>
                        <div class="text-xs text-text-muted mt-1">192.168.1.200</div>
                    </div>
                </div>
                <div id="network-steps" class="space-y-2 font-mono text-xs">
                    <div class="p-3 bg-black/30 rounded-lg"><span class="text-text-muted">点击"模拟连接"开始演示...</span></div>
                </div>
            </div>
        `;
        setTimeout(() => {
            const btn = document.getElementById('network-simulate');
            const steps = document.getElementById('network-steps');
            if (btn && steps) {
                btn.addEventListener('click', () => {
                    steps.innerHTML = '<div class="p-3 bg-black/30 rounded-lg"><span class="text-yellow-400">正在建立连接...</span></div>';
                    
                    setTimeout(() => {
                        steps.innerHTML = `
                            <div class="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                                <span class="text-blue-400">[SYN]</span> Client -> Server: 192.168.1.100:12345 -> 192.168.1.200:80<br>
                                <span class="text-text-muted">Sequence: 1000, Acknowledgment: 0</span>
                            </div>
                        `;
                    }, 500);
                    
                    setTimeout(() => {
                        steps.innerHTML += `
                            <div class="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                                <span class="text-green-400">[SYN+ACK]</span> Server -> Client: 192.168.1.200:80 -> 192.168.1.100:12345<br>
                                <span class="text-text-muted">Sequence: 2000, Acknowledgment: 1001</span>
                            </div>
                        `;
                    }, 1000);
                    
                    setTimeout(() => {
                        steps.innerHTML += `
                            <div class="p-3 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                                <span class="text-cyan-400">[ACK]</span> Client -> Server: 192.168.1.100:12345 -> 192.168.1.200:80<br>
                                <span class="text-text-muted">Sequence: 1001, Acknowledgment: 2001</span>
                            </div>
                        `;
                    }, 1500);
                    
                    setTimeout(() => {
                        steps.innerHTML += `
                            <div class="p-3 bg-green-500/30 rounded-lg border border-green-500/50">
                                <span class="text-green-400 font-bold">✓ 连接建立成功!</span> TCP三次握手完成<br>
                                <span class="text-text-muted">开始数据传输...</span>
                            </div>
                        `;
                    }, 2000);
                });
            }
        }, 100);
    } else {
        demoArea.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-text-muted">
                <i class="fas fa-code text-6xl mb-4 opacity-50"></i>
                <p class="text-lg">项目演示加载中...</p>
                <p class="text-sm mt-2">更多功能即将上线</p>
            </div>
        `;
    }
}