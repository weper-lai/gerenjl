const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-moon text-text-secondary';
    } else {
        themeIcon.className = 'fas fa-sun text-text-secondary';
    }
}

const photoBtn = document.getElementById('photo-reveal-btn');
const photoContainer = document.getElementById('photo-container');
const photoHint = document.getElementById('photo-hint');
const sadContainer = document.getElementById('sad-container');
let photoState = 0;

photoBtn.addEventListener('click', () => {
    if (photoState === 0) {
        photoContainer.classList.add('reveal-active');
        photoHint.style.opacity = '0';
        sadContainer.style.opacity = '0';
        photoBtn.innerHTML = '<i class="fas fa-frown"></i><span>感觉有点丑</span>';
        photoBtn.classList.add('bg-red-500');
        photoBtn.classList.remove('from-blue-500', 'to-cyan-500', 'bg-green-500');
        photoState = 1;
    } else if (photoState === 1) {
        photoContainer.classList.remove('reveal-active');
        sadContainer.style.opacity = '1';
        photoBtn.innerHTML = '<i class="fas fa-smile"></i><span>好像还可以</span>';
        photoBtn.classList.add('bg-green-500');
        photoBtn.classList.remove('bg-red-500');
        photoState = 2;
    } else {
        photoContainer.classList.add('reveal-active');
        sadContainer.style.opacity = '0';
        photoBtn.innerHTML = '<i class="fas fa-frown"></i><span>感觉有点丑</span>';
        photoBtn.classList.add('bg-red-500');
        photoBtn.classList.remove('bg-green-500');
        photoState = 1;
    }
});

const fadeElements = document.querySelectorAll('.fade-in');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    animationId = requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

const skillCards = document.querySelectorAll('.skill-card');
const overlay = document.getElementById('transition-overlay');

skillCards.forEach(card => {
    card.addEventListener('click', () => {
        const skillName = card.dataset.skill;
        
        overlay.classList.add('active');
        
        setTimeout(() => {
            overlay.classList.remove('active');
            showSkillDetail(skillName);
        }, 400);
    });
});

function getSkillInfo(skillName) {
    const skillData = {
        'Java': {
            icon: 'fab fa-java text-blue-400',
            tags: ['后端开发', '微服务', 'Spring Boot', '高并发'],
            highlights: ['分布式架构', '消息队列', '缓存优化'],
            stack: ['Java 21', 'Spring Boot', 'Redis', 'MySQL'],
            projectName: '企业级后台管理系统',
            projectDesc: '基于Spring Boot构建的完整后端服务，支持用户认证、权限管理、数据统计等核心功能'
        },
        'Python': {
            icon: 'fab fa-python text-blue-400',
            tags: ['数据分析', '机器学习', '爬虫开发', '可视化'],
            highlights: ['大数据处理', 'AI模型部署', '自动化脚本'],
            stack: ['Python 3', 'Pandas', 'Scikit-learn', 'Django'],
            projectName: '智能数据分析平台',
            projectDesc: '数据清洗、统计分析、可视化展示一体化解决方案，支持多格式数据源'
        },
        'JavaScript': {
            icon: 'fab fa-js text-blue-400',
            tags: ['前端框架', '动画引擎', '实时通信', '模块化'],
            highlights: ['高性能渲染', '响应式设计', '组件化开发'],
            stack: ['ES6+', 'Vue.js', 'React', 'Node.js'],
            projectName: '交互式数据可视化引擎',
            projectDesc: '基于Canvas的高性能图形渲染引擎，支持多种图表类型和动画效果'
        },
        'C++': {
            icon: 'fas fa-code text-blue-400',
            tags: ['图形编程', '性能优化', '系统开发', '算法实现'],
            highlights: ['3D渲染引擎', '内存管理', '并行计算'],
            stack: ['C++17', 'Qt', 'OpenGL', 'STL'],
            projectName: '3D图形渲染引擎',
            projectDesc: '基于OpenGL的轻量级3D渲染引擎，支持模型加载、光照渲染、纹理映射'
        },
        'MySQL': {
            icon: 'fas fa-database text-orange-400',
            tags: ['数据库设计', '性能调优', '事务处理', '索引优化'],
            highlights: ['高并发架构', '数据分片', '备份恢复'],
            stack: ['MySQL 8', 'InnoDB', 'MyISAM', 'SQL优化'],
            projectName: '分布式数据库集群',
            projectDesc: '主从复制架构，读写分离，支持百万级数据量的高性能数据库解决方案'
        },
        'PostgreSQL': {
            icon: 'fab fa-postgresql text-orange-400',
            tags: ['高级查询', 'JSON支持', '全文检索', 'GIS'],
            highlights: ['复杂查询优化', '数据仓库', '空间数据'],
            stack: ['PostgreSQL', 'PostGIS', 'pg_stat_statements'],
            projectName: '企业级数据仓库',
            projectDesc: '支持复杂分析查询、JSON数据处理、全文检索的综合数据存储解决方案'
        },
        'MongoDB': {
            icon: 'fas fa-leaf text-orange-400',
            tags: ['NoSQL', '文档存储', '聚合管道', '分片集群'],
            highlights: ['大数据存储', '水平扩展', '实时数据分析'],
            stack: ['MongoDB', 'Mongoose', 'Atlas'],
            projectName: '实时数据处理平台',
            projectDesc: '面向大数据场景的文档数据库解决方案，支持实时数据写入和复杂聚合分析'
        },
        'Redis': {
            icon: 'fas fa-redo text-orange-400',
            tags: ['缓存策略', '分布式锁', '消息队列', 'Session管理'],
            highlights: ['高性能缓存', '实时通信', '任务队列'],
            stack: ['Redis', 'Redis Cluster', 'Lua脚本'],
            projectName: '分布式缓存系统',
            projectDesc: '支持分布式锁、发布订阅、限流熔断的高性能缓存中间件解决方案'
        },
        'HTML/CSS': {
            icon: 'fab fa-html5 text-cyan-400',
            tags: ['响应式设计', '动画效果', '布局系统', '组件化'],
            highlights: ['像素级还原', '性能优化', '无障碍访问'],
            stack: ['HTML5', 'CSS3', 'Tailwind', 'SCSS'],
            projectName: '企业级设计系统',
            projectDesc: '包含完整组件库、设计规范、主题系统的现代化前端设计解决方案'
        },
        'Vue.js': {
            icon: 'fab fa-vuejs text-cyan-400',
            tags: ['响应式框架', '组件化', '状态管理', '路由'],
            highlights: ['SPA开发', 'SSR支持', '微前端'],
            stack: ['Vue 3', 'Pinia', 'Vue Router', 'Vite'],
            projectName: '企业级后台管理系统',
            projectDesc: '功能完善的Admin管理平台，支持权限管理、数据表格、表单验证等核心功能'
        },
        'React': {
            icon: 'fab fa-react text-cyan-400',
            tags: ['组件化开发', '状态管理', 'Hooks', '性能优化'],
            highlights: ['大型应用', '实时协作', '服务端渲染'],
            stack: ['React 18', 'Redux', 'Next.js', 'TypeScript'],
            projectName: '实时协作编辑平台',
            projectDesc: '支持多人实时协作、版本控制、富文本编辑的现代化Web应用'
        },
        'Node.js': {
            icon: 'fab fa-node-js text-cyan-400',
            tags: ['高性能服务', '实时通信', '微服务', 'API网关'],
            highlights: ['高并发处理', 'WebSocket', 'Docker部署'],
            stack: ['Node.js', 'Express', 'Socket.io', 'Docker'],
            projectName: '实时消息推送系统',
            projectDesc: '支持百万级并发连接的实时消息推送服务，低延迟、高可用'
        },
        'Linux': {
            icon: 'fab fa-linux text-purple-400',
            tags: ['系统运维', 'Shell脚本', '服务器管理', '自动化部署'],
            highlights: ['性能监控', '日志分析', '安全加固'],
            stack: ['Ubuntu', 'CentOS', 'Nginx', 'Systemd'],
            projectName: '自动化运维平台',
            projectDesc: '集监控告警、日志分析、自动化部署于一体的企业级运维解决方案'
        },
        'Docker': {
            icon: 'fab fa-docker text-purple-400',
            tags: ['容器化', '微服务部署', 'CI/CD', 'Kubernetes'],
            highlights: ['镜像管理', '编排部署', '持续集成'],
            stack: ['Docker', 'Docker Compose', 'K8s', 'Jenkins'],
            projectName: '容器化部署平台',
            projectDesc: '支持多环境部署、自动扩缩容、健康检查的容器化微服务解决方案'
        },
        'Git': {
            icon: 'fab fa-git-alt text-purple-400',
            tags: ['版本控制', '代码协作', '分支管理', '代码审查'],
            highlights: ['团队协作', '代码规范', '持续集成'],
            stack: ['Git', 'GitHub', 'GitLab', 'Gerrit'],
            projectName: '代码管理平台',
            projectDesc: '支持代码托管、代码审查、持续集成的企业级代码管理解决方案'
        },
        '网络': {
            icon: 'fas fa-network-wired text-purple-400',
            tags: ['TCP/IP', 'HTTP', 'WebSocket', '负载均衡'],
            highlights: ['网络协议', '安全防护', '性能优化'],
            stack: ['TCP/IP', 'HTTP/2', 'WebSocket', 'Nginx'],
            projectName: '高可用网络架构',
            projectDesc: '支持负载均衡、故障转移、流量控制的企业级网络架构解决方案'
        }
    };
    return skillData[skillName] || {
        icon: 'fas fa-code text-gray-400',
        tags: ['开发'],
        highlights: ['项目经验'],
        stack: ['技术栈'],
        projectName: '项目演示',
        projectDesc: '功能演示窗口'
    };
}