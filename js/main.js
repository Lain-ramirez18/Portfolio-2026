// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const updateThemeIcon = (theme) => {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
};

// Check for system preference or saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Language Toggle Logic
const langToggle = document.getElementById('lang-toggle');
let locale = localStorage.getItem('locale') || 'es';

const updateTranslations = () => {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[locale] && translations[locale][key]) {
            element.innerHTML = translations[locale][key];
        }
    });
};

langToggle.addEventListener('click', () => {
    locale = locale === 'es' ? 'en' : 'es';
    localStorage.setItem('locale', locale);
    updateTranslations();
});

// Initial translation call
updateTranslations();

// Optimized Antigravity (Mouse Follow Parallax) using requestAnimationFrame
const antigravityElements = document.querySelectorAll('.antigravity');
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const animateParallax = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Smooth interpolation
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    antigravityElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 2;
        const x = (centerX - targetX) / (100 / speed);
        const y = (centerY - targetY) / (100 / speed);
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    
    requestAnimationFrame(animateParallax);
};
animateParallax();

// Intersection Observer for Reveal on Scroll (Modern Standard)
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

// Set initial styles and observe elements
const elementsToReveal = document.querySelectorAll('.experience-item, .skill-category, .project-card');

// Add CSS for visible state to avoid excessive style manipulation in JS
const style = document.createElement('style');
style.textContent = `
    .experience-item, .skill-category, .project-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1);
    }
    .experience-item.is-visible, .skill-category.is-visible, .project-card.is-visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

elementsToReveal.forEach(el => revealOnScroll.observe(el));
