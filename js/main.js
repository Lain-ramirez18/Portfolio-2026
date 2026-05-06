// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
});

// Language Toggle Logic
const langToggle = document.getElementById('lang-toggle');
let locale = 'en'; // Default to English after the overhaul

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

// Reveal on Scroll Effect
const revealElements = document.querySelectorAll('.project-card, .hero-content');
const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.8;
    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Initial setup for reveal
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Run once on load
