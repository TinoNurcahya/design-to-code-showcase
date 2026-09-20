/**
 * CloudScale — SaaS Analytics Platform
 * Author: Tino Nurcahya
 * Pure Vanilla JavaScript — Zero External Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeManager();
  initStickyHeader();
  initMobileNav();
  initDashboardTabs();
  initPricingToggle();
  initStatCounters();
  initFaqAccordion();
  initCurrentYear();
  initSmoothScroll();
});

/* ==========================================================================
   01. THEME MANAGER (Dark / Light Mode with localStorage & OS Fallback)
   ========================================================================== */
function initThemeManager() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const htmlRoot = document.documentElement;
  const THEME_STORAGE_KEY = 'cloudscale-theme';

  // Determine starting theme
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    // Fallback: check system preference, default to dark for enterprise analytics
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark'; // Dark-first default for observability platform
  };

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      htmlRoot.classList.add('dark');
      updateThemeButtons(true);
    } else {
      htmlRoot.classList.remove('dark');
      updateThemeButtons(false);
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  };

  const updateThemeButtons = (isDark) => {
    const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    [themeToggleBtn, mobileThemeToggleBtn].forEach((btn) => {
      if (!btn) return;
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);

      // Sun icon (shown in dark mode to switch to light)
      const sunIcon = btn.querySelector('.icon-sun');
      // Moon icon (shown in light mode to switch to dark)
      const moonIcon = btn.querySelector('.icon-moon');

      if (sunIcon && moonIcon) {
        if (isDark) {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        }
      }
    });
  };

  // Toggle theme handler
  const toggleTheme = () => {
    const isCurrentDark = htmlRoot.classList.contains('dark');
    applyTheme(isCurrentDark ? 'light' : 'dark');
  };

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Listen to OS system changes if no explicit preference saved
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Apply immediately on load
  applyTheme(getInitialTheme());
}

/* ==========================================================================
   02. DYNAMIC STICKY HEADER
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled', 'shadow-sm', 'backdrop-blur-md');
      header.classList.remove('bg-transparent');
    } else {
      header.classList.remove('scrolled', 'shadow-sm');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   03. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNavDrawer');
  if (!toggleBtn || !mobileNav) return;

  const toggleMenu = (open) => {
    const isExpanded = open !== undefined ? open : toggleBtn.getAttribute('aria-expanded') !== 'true';
    toggleBtn.setAttribute('aria-expanded', String(isExpanded));
    mobileNav.setAttribute('aria-hidden', String(!isExpanded));

    if (isExpanded) {
      mobileNav.classList.remove('hidden');
      document.body.classList.add('overflow-hidden', 'lg:overflow-auto');
    } else {
      mobileNav.classList.add('hidden');
      document.body.classList.remove('overflow-hidden', 'lg:overflow-auto');
    }

    // Toggle hamburger icon lines
    const lines = toggleBtn.querySelectorAll('span');
    if (lines.length >= 3) {
      if (isExpanded) {
        lines[0].style.transform = 'translateY(6px) rotate(45deg)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'translateY(-6px) rotate(-45deg)';
      } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
      }
    }
  };

  toggleBtn.addEventListener('click', () => toggleMenu());

  // Close when clicking any nav link
  const navLinks = mobileNav.querySelectorAll('a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });
}

/* ==========================================================================
   04. INTERACTIVE DASHBOARD TABS (Executive, Product, Engineering, Revenue)
   ========================================================================== */
function initDashboardTabs() {
  const tabButtons = document.querySelectorAll('.dashboard-tab-btn');
  const tabPanels = document.querySelectorAll('.dashboard-tab-panel');
  if (tabButtons.length === 0 || tabPanels.length === 0) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button active state
      tabButtons.forEach((b) => {
        const isActive = b === btn;
        b.setAttribute('aria-selected', String(isActive));
        if (isActive) {
          b.classList.add('active-tab', 'text-brand-500', 'border-brand-500', 'dark:text-accent-sky', 'dark:border-accent-sky');
          b.classList.remove('text-slate-500', 'border-transparent', 'hover:text-slate-700', 'dark:text-slate-400');
        } else {
          b.classList.remove('active-tab', 'text-brand-500', 'border-brand-500', 'dark:text-accent-sky', 'dark:border-accent-sky');
          b.classList.add('text-slate-500', 'border-transparent', 'hover:text-slate-700', 'dark:text-slate-400');
        }
      });

      // Update panels with subtle cross-fade
      tabPanels.forEach((panel) => {
        const panelId = panel.getAttribute('data-tab-content');
        if (panelId === targetTab) {
          panel.classList.remove('hidden');
          setTimeout(() => {
            panel.classList.add('active');
          }, 10);
        } else {
          panel.classList.remove('active');
          panel.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   05. PRICING BILLING TOGGLE (Monthly vs Annual - Save 20%)
   ========================================================================== */
function initPricingToggle() {
  const billingToggle = document.getElementById('billingToggle');
  const priceElements = document.querySelectorAll('[data-monthly-price]');
  const periodElements = document.querySelectorAll('.pricing-period-text');
  const billingBadge = document.getElementById('billingAnnualBadge');
  if (!billingToggle || priceElements.length === 0) return;

  const updatePrices = (isAnnual) => {
    priceElements.forEach((el) => {
      const monthly = el.getAttribute('data-monthly-price');
      const annual = el.getAttribute('data-annual-price');

      // Subtle pulse on number change
      el.style.opacity = '0.4';
      el.style.transform = 'translateY(-4px)';

      setTimeout(() => {
        el.textContent = isAnnual ? annual : monthly;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 120);
    });

    periodElements.forEach((el) => {
      el.textContent = isAnnual ? '/month, billed annually' : '/month, billed monthly';
    });

    if (billingBadge) {
      if (isAnnual) {
        billingBadge.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/30');
      } else {
        billingBadge.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/30');
      }
    }
  };

  billingToggle.addEventListener('change', () => {
    updatePrices(billingToggle.checked);
  });
}

/* ==========================================================================
   06. ANIMATED STAT COUNTERS (IntersectionObserver)
   ========================================================================== */
function initStatCounters() {
  const counterElements = document.querySelectorAll('.stat-counter');
  if (counterElements.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const duration = prefersReducedMotion ? 10 : 1600; // ms
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo for smooth deceleration
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = target * easeOut;

      el.textContent = `${prefix}${currentVal.toFixed(decimals)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
      }
    };

    requestAnimationFrame(updateCount);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    counterElements.forEach((el) => observer.observe(el));
  } else {
    counterElements.forEach((el) => animateCounter(el));
  }
}

/* ==========================================================================
   07. ACCESSIBLE FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-trigger');
  if (faqButtons.length === 0) return;

  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const targetId = btn.getAttribute('aria-controls');
      const content = document.getElementById(targetId);
      const icon = btn.querySelector('.faq-icon');

      // Close all other accordion items for clean single-view experience
      faqButtons.forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherId = otherBtn.getAttribute('aria-controls');
          const otherContent = document.getElementById(otherId);
          const otherIcon = otherBtn.querySelector('.faq-icon');
          if (otherContent) otherContent.classList.add('hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      // Toggle current
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        if (content) content.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        if (content) content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ==========================================================================
   08. DYNAMIC COPYRIGHT YEAR
   ========================================================================== */
function initCurrentYear() {
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   09. SMOOTH SCROLL WITH HEADER OFFSET
   ========================================================================== */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const header = document.getElementById('siteHeader');
  const headerOffset = header ? header.offsetHeight + 16 : 80;

  anchorLinks.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#' || targetId === '#!') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Set accessibility focus
        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });
      }
    });
  });
}
