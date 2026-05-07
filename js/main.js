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
let locale = 'es';

const updateTranslations = () => {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[locale][key]) {
            element.textContent = translations[locale][key];
        }
    });
};

langToggle.addEventListener('click', () => {
    locale = locale === 'es' ? 'en' : 'es';
    // Update button or UI indicator if needed
    updateTranslations();
});

// Initial translation call
updateTranslations();

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
    const revealElements = document.querySelectorAll('.timeline-item, .skill-card, .project-card, .testimonial-card');
    const triggerBottom = window.innerHeight * 0.9;
    
    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        } else {
            // Initial state for reveal
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        }
    });
};

// Set initial styles for reveal
document.querySelectorAll('.timeline-item, .skill-card, .project-card, .testimonial-card').forEach(el => {
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); // Check on load
revealOnScroll();
