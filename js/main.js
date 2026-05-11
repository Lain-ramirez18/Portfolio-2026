/* ================================================================
   main.js v2 — Lain Sthid Ramirez Rueda Portfolio
   Nielsen 10 Heuristics | 2026 Gesture UX | MD3 Motion
================================================================ */

'use strict';

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ══════════════ 1. THEME (Nielsen #1: Visibility) ══════════════ */
const ThemeManager = (() => {
  const KEY = 'lain-theme-v2';
  const html = document.documentElement;
  const btn  = $('#theme-toggle');
  const icon = $('#theme-icon-inner');

  const ICONS = {
    dark:  'fa-sun',
    light: 'fa-moon',
  };

  function get() {
    return localStorage.getItem(KEY)
      || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  }

  function apply(t) {
    html.setAttribute('data-theme', t);
    if (icon) {
      icon.className = `fa-solid ${ICONS[t]}`;
    }
    localStorage.setItem(KEY, t);
  }

  function toggle() {
    apply(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  }

  return {
    init() {
      apply(get());
      btn?.addEventListener('click', toggle);
      // System preference change
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem(KEY)) apply(e.matches ? 'dark' : 'light');
      });
    }
  };
})();

/* ══════════════ 2. LANGUAGE ══════════════ */
const LangManager = (() => {
  const KEY = 'lain-lang-v2';
  const btn = $('#lang-toggle');

  function get() {
    return localStorage.getItem(KEY)
      || (navigator.language.startsWith('en') ? 'en' : 'es');
  }

  function apply(lang) {
    localStorage.setItem(KEY, lang);
    if (window.i18n && window.i18n.applyTranslations) {
      window.i18n.applyTranslations(lang);
    }
  }

  return {
    init() {
      apply(get());
      btn?.addEventListener('click', () => {
        apply((localStorage.getItem(KEY) || 'es') === 'es' ? 'en' : 'es');
      });
    }
  };
})();

/* ══════════════ 3. SCROLL PROGRESS (Nielsen #1) ══════════════ */
const ScrollProgress = (() => {
  const bar = $('#scroll-progress');

  return {
    init() {
      if (!bar) return;
      window.addEventListener('scroll', () => {
        const max = document.body.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
        bar.style.width = `${pct}%`;
        bar.setAttribute('aria-valuenow', Math.round(pct));
      }, { passive: true });
    }
  };
})();

/* ══════════════ 4. NAVBAR ══════════════ */
const NavManager = (() => {
  const navbar    = $('#navbar');
  const hamburger = $('#hamburger');
  const navLinks  = $('#nav-links');
  const links     = $$('.nav-link');
  const sections  = $$('section[id]');

  function highlight() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 130) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
  }

  function onScroll() {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
    highlight();
  }

  function closeMenu() {
    navLinks?.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  }

  return {
    init() {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      if (hamburger) {
        hamburger.addEventListener('click', () => {
          const open = navLinks.classList.toggle('open');
          hamburger.classList.toggle('open', open);
          hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
      }

      links.forEach(l => l.addEventListener('click', closeMenu));
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navbar?.contains(e.target) && navLinks?.classList.contains('open')) {
          closeMenu();
        }
      });
    }
  };
})();

/* ══════════════ 5. CUSTOM CURSOR (Lerp effect) ══════════════ */
const CursorManager = (() => {
  const cursor = $('#cursor');
  const follower = $('#cursor-follower');
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  return {
    init() {
      if (!cursor || !follower) return;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant position for the dot
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
      });

      // Smooth lerp for the follower ring
      const render = () => {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        
        requestAnimationFrame(render);
      };
      render();

      // Hover effects
      const interactives = $$('a, button, .project-card, .soft-card, .about-card');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('cursor--hover');
          follower.classList.add('cursor--hover');
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('cursor--hover');
          follower.classList.remove('cursor--hover');
        });
      });
    }
  };
})();

/* ══════════════ 6. REVEAL ANIMATIONS ══════════════ */
const RevealManager = (() => {
  const reveals = $$('.reveal');

  return {
    init() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.12 });

      reveals.forEach(el => observer.observe(el));
      
      // Skill bars animation
      const skillBars = $$('.skill-fill');
      const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      }, { threshold: 1 });
      
      skillBars.forEach(bar => skillObserver.observe(bar));
    }
  };
})();

/* ══════════════ 7. UTILS ══════════════ */
function updateYear() {
  const yearEl = $('#footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ══════════════ INIT ALL ══════════════ */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  LangManager.init();
  ScrollProgress.init();
  NavManager.init();
  CursorManager.init();
  RevealManager.init();
  updateYear();
});
