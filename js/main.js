// Toggle de Tema (Dark/Light)
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
});

// Toggle de Idioma
const langToggle = document.getElementById('lang-toggle');
let locale = 'es';

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