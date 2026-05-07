// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
// Initialize icon based on default 'light' theme
themeToggle.textContent = '🌙';

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
});

// Language Toggle Logic
const langToggle = document.getElementById('lang-toggle');
let locale = 'en';

langToggle.addEventListener('click', () => {
    locale = locale === 'es' ? 'en' : 'es';
    langToggle.textContent = locale === 'es' ? 'EN' : 'ES';
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[locale][key]) {
            element.textContent = translations[locale][key];
        }
    });
});

// Active Antigravity (Mouse Follow Parallax)
const antigravityElements = document.querySelectorAll('.antigravity');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    antigravityElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 2;
        const x = (centerX - clientX) / (100 / speed);
        const y = (centerY - clientY) / (100 / speed);

        el.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// Reveal on Scroll Effect
const revealOnScroll = () => {
    const revealElements = document.querySelectorAll('.project-card, .hero-content');
    const triggerBottom = window.innerHeight * 0.85;
    
    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
