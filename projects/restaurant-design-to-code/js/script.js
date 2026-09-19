/**
 * THE DAILY TABLE — Vanilla JavaScript Interactions
 * Features:
 * - Accessible Mobile Navigation Drawer (ARIA, Escape key, backdrop dismiss)
 * - Interactive Menu Category Filter with smooth transitions
 * - Responsive Food Gallery Lightbox Modal
 * - Accessible Reservation Form Validation with demo success state
 * - Footer Newsletter interaction
 * - Scroll-to-top button & Active navigation on scroll
 * - IntersectionObserver Scroll Reveal animations
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 01. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openDrawer = () => {
    if (!mobileDrawer || !hamburgerBtn) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (!mobileDrawer || !hamburgerBtn) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // --------------------------------------------------------------------------
  // 02. MENU CATEGORY FILTERING
  // --------------------------------------------------------------------------
  const tabButtons = document.querySelectorAll('.tab-btn');
  const menuItems = document.querySelectorAll('.menu-dish-item');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');

      // Update active state on tab buttons
      tabButtons.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Filter dishes with subtle transition
      menuItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          item.classList.remove('hidden');
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          requestAnimationFrame(() => {
            item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 03. GALLERY LIGHTBOX MODAL
  // --------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const galleryItems = document.querySelectorAll('[data-lightbox]');

  const openLightbox = (src, caption) => {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption || 'Food gallery preview';
    if (lightboxCaption) {
      lightboxCaption.textContent = caption || '';
    }
    lightboxModal.classList.add('open');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('open');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lightboxImg) {
      lightboxImg.src = '';
    }
  };

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-lightbox');
      const caption = item.getAttribute('data-caption');
      openLightbox(src, caption);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('open')) {
      closeLightbox();
    }
  });

  // --------------------------------------------------------------------------
  // 04. RESERVATION FORM CLIENT-SIDE VALIDATION & DEMO SUBMISSION
  // --------------------------------------------------------------------------
  const resForm = document.getElementById('reservationForm');
  const resSuccess = document.getElementById('reservationSuccess');
  const successDetails = document.getElementById('successDetails');
  const successResetBtn = document.getElementById('successResetBtn');
  const resDateInput = document.getElementById('resDate');

  // Automatically restrict date picker to today onwards
  if (resDateInput) {
    const today = new Date().toISOString().split('T')[0];
    resDateInput.setAttribute('min', today);
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 7;
  };

  const setFieldError = (inputEl, errorEl, isValid) => {
    if (isValid) {
      inputEl.classList.remove('is-invalid');
      if (errorEl) errorEl.classList.remove('visible');
    } else {
      inputEl.classList.add('is-invalid');
      if (errorEl) errorEl.classList.add('visible');
    }
    return isValid;
  };

  // Real-time error clearing on input
  const fieldsWithErrors = [
    { input: 'resName', error: 'nameError', validate: (v) => v.trim().length >= 3 },
    { input: 'resEmail', error: 'emailError', validate: (v) => validateEmail(v.trim()) },
    { input: 'resPhone', error: 'phoneError', validate: (v) => validatePhone(v.trim()) },
    { input: 'resDate', error: 'dateError', validate: (v) => Boolean(v) },
    { input: 'resTime', error: 'timeError', validate: (v) => Boolean(v) },
    { input: 'resGuests', error: 'guestsError', validate: (v) => Boolean(v) }
  ];

  fieldsWithErrors.forEach(({ input, error, validate }) => {
    const inputEl = document.getElementById(input);
    const errorEl = document.getElementById(error);
    if (inputEl) {
      inputEl.addEventListener('input', () => {
        if (inputEl.classList.contains('is-invalid')) {
          setFieldError(inputEl, errorEl, validate(inputEl.value));
        }
      });
      inputEl.addEventListener('change', () => {
        if (inputEl.classList.contains('is-invalid')) {
          setFieldError(inputEl, errorEl, validate(inputEl.value));
        }
      });
    }
  });

  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;

      fieldsWithErrors.forEach(({ input, error, validate }) => {
        const inputEl = document.getElementById(input);
        const errorEl = document.getElementById(error);
        if (inputEl) {
          const isValid = validate(inputEl.value);
          if (!isValid) {
            setFieldError(inputEl, errorEl, false);
            if (isFormValid) {
              inputEl.focus(); // Focus first invalid field
            }
            isFormValid = false;
          } else {
            setFieldError(inputEl, errorEl, true);
          }
        }
      });

      if (!isFormValid) return;

      // Extract values for demonstration feedback
      const name = document.getElementById('resName').value.trim();
      const date = document.getElementById('resDate').value;
      const time = document.getElementById('resTime').value;
      const guests = document.getElementById('resGuests').value;

      // Format date for readable display
      let formattedDate = date;
      try {
        const parts = date.split('-');
        if (parts.length === 3) {
          const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
          formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
        }
      } catch (err) {
        formattedDate = date;
      }

      if (successDetails) {
        successDetails.textContent = `Thank you, ${name}! Your demonstration reservation for ${guests} on ${formattedDate} at ${time} has been recorded. (No actual booking was made - Portfolio Demo).`;
      }

      resForm.style.display = 'none';
      if (resSuccess) {
        resSuccess.classList.add('visible');
        resSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  if (successResetBtn && resForm && resSuccess) {
    successResetBtn.addEventListener('click', () => {
      resForm.reset();
      fieldsWithErrors.forEach(({ input, error }) => {
        const inputEl = document.getElementById(input);
        const errorEl = document.getElementById(error);
        if (inputEl) inputEl.classList.remove('is-invalid');
        if (errorEl) errorEl.classList.remove('visible');
      });
      resSuccess.classList.remove('visible');
      resForm.style.display = 'block';
      resForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // --------------------------------------------------------------------------
  // 05. FOOTER NEWSLETTER SUBSCRIPTION DEMO
  // --------------------------------------------------------------------------
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterFeedback = document.getElementById('newsletterFeedback');

  if (newsletterForm && newsletterEmail && newsletterFeedback) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      if (validateEmail(email)) {
        newsletterFeedback.style.color = '#8FD14F';
        newsletterFeedback.textContent = 'Thank you for subscribing to our seasonal journal!';
        newsletterEmail.value = '';
        setTimeout(() => {
          newsletterFeedback.textContent = '';
        }, 5000);
      } else {
        newsletterFeedback.style.color = '#FF858D';
        newsletterFeedback.textContent = 'Please enter a valid email address.';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 06. SCROLL TO TOP FLOATING BUTTON
  // --------------------------------------------------------------------------
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  const handleScroll = () => {
    if (!scrollTopBtn) return;
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 07. ACTIVE NAVIGATION ON SCROLL (Desktop)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 08. SCROLL REVEAL (IntersectionObserver)
  // --------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll(
      '.featured-card, .about-content, .opening-card, .feature-card, .gallery-item, .signature-card, .team-card, .journal-card'
    );

    revealElements.forEach((el) => {
      el.classList.add('reveal-item');
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  // --------------------------------------------------------------------------
  // 09. DYNAMIC COPYRIGHT YEAR
  // --------------------------------------------------------------------------
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
});
