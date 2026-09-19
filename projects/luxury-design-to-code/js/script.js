/**
 * ATELIER & CO. — LUXURY EDITORIAL CATALOG
 * Core Interactions, Motion Architecture & Lenis Smooth Scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Reduced Motion Check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 3. Lenis Smooth Scroll Initialization
  let lenis = null;
  if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
    lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // 4. Header Elevation On Scroll
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 5. Mobile Drawer Navigation
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('is-open');
      mobileToggle.classList.toggle('is-open', isOpen);
      mobileDrawer.classList.toggle('is-open', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      mobileDrawer.setAttribute('aria-hidden', String(!isOpen));

      if (isOpen) {
        if (lenis) lenis.stop();
        document.body.style.overflow = 'hidden';
      } else {
        if (lenis) lenis.start();
        document.body.style.overflow = '';
      }
    };

    mobileToggle.addEventListener('click', () => toggleMenu());

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        toggleMenu(false);
      }
    });
  }

  // 6. Custom Desktop Cursor Follower
  const cursorFollower = document.getElementById('cursor-follower');
  const cursorText = cursorFollower ? cursorFollower.querySelector('.cursor-text') : null;

  if (cursorFollower && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!cursorFollower.classList.contains('is-active')) {
        cursorFollower.classList.add('is-active');
      }
      if (typeof gsap !== 'undefined') {
        gsap.to(cursorFollower, {
          x: mouseX,
          y: mouseY,
          duration: 0.18,
          ease: 'power2.out'
        });
      } else {
        cursorFollower.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    });

    window.addEventListener('mouseleave', () => {
      cursorFollower.classList.remove('is-active');
    });

    // Contextual Hover Attributes
    const hoverTargets = document.querySelectorAll('[data-cursor]');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        const label = el.getAttribute('data-cursor') || '';
        if (cursorText) cursorText.textContent = label;
        cursorFollower.classList.add('is-hovering');

        // Check if inside dark section
        if (el.closest('.studies-section') || el.closest('.site-footer')) {
          cursorFollower.classList.add('is-dark-context');
        } else {
          cursorFollower.classList.remove('is-dark-context');
        }
      });

      el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('is-hovering');
        cursorFollower.classList.remove('is-dark-context');
        if (cursorText) cursorText.textContent = '';
      });
    });
  }

  // 7. GSAP ScrollTrigger Animations & Pinned Horizontal Track
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop Pinned Studies Track (>= 1024px)
    mm.add('(min-width: 1024px)', () => {
      const studiesSection = document.querySelector('.studies-section');
      const track = document.querySelector('.studies-track');
      const progressFill = document.querySelector('.studies-progress-fill');

      if (studiesSection && track) {
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

        const studiesTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: studiesSection,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, 1200)}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressFill) {
                progressFill.style.width = `${(self.progress * 100).toFixed(1)}%`;
              }
            }
          }
        });

        studiesTimeline.to(track, {
          x: getScrollAmount,
          ease: 'none'
        });
      }
    });

    // Editorial Line Reveal & Subtle Parallax Elements
    const revealHeadings = document.querySelectorAll('.editorial-h1, .editorial-h2');
    revealHeadings.forEach((heading) => {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        y: 35,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out'
      });
    });

    // Subtle image parallax effect
    const parallaxImages = document.querySelectorAll('.hero-image-frame img, .object-hero-visual img');
    parallaxImages.forEach((img) => {
      gsap.to(img, {
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        },
        yPercent: -6,
        ease: 'none'
      });
    });
  }

  // 8. Editorial Interactive Feature Slider (#editorial)
  const editorialSlides = [
    {
      counter: '01 / 03',
      title: 'Between Form and Function',
      prose: 'An exploration of quiet spaces, tactile materials, and objects designed for everyday ritual. Each piece balances architectural discipline with soft, human comfort.',
      img: 'assets/images/editorial-study-1.webp',
      alt: 'Tactile wool weave and architectural shadow'
    },
    {
      counter: '02 / 03',
      title: 'The Poetry of Restraint',
      prose: 'By stripping away ornamental excess, the garment invites attention to texture, silhouette, and the way light drapes across heavy double-faced wool.',
      img: 'assets/images/editorial-study-2.webp',
      alt: 'Sculptural silhouette and tailored form'
    },
    {
      counter: '03 / 03',
      title: 'A Rhythm of Silence',
      prose: 'Wardrobes curated not for a single fleeting season, but for years of deliberate living. Tailoring that moves effortlessly between private sanctum and metropolitan space.',
      img: 'assets/images/editorial-study-3.webp',
      alt: 'Draped fluid fabric moving in air'
    }
  ];

  let currentSlide = 0;
  const counterEl = document.querySelector('.slider-counter');
  const titleEl = document.querySelector('.editorial-feature-title');
  const proseEl = document.querySelector('.editorial-feature-prose');
  const imgEl = document.querySelector('.editorial-feature-right img');
  const prevBtn = document.getElementById('slidePrev');
  const nextBtn = document.getElementById('slideNext');

  function renderSlide(index) {
    if (!counterEl || !titleEl || !proseEl || !imgEl) return;
    const slide = editorialSlides[index];

    if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
      gsap.to([titleEl, proseEl, imgEl], {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          counterEl.textContent = slide.counter;
          titleEl.textContent = slide.title;
          proseEl.textContent = slide.prose;
          imgEl.src = slide.img;
          imgEl.alt = slide.alt;

          gsap.to([titleEl, proseEl, imgEl], {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    } else {
      counterEl.textContent = slide.counter;
      titleEl.textContent = slide.title;
      proseEl.textContent = slide.prose;
      imgEl.src = slide.img;
      imgEl.alt = slide.alt;
    }
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + editorialSlides.length) % editorialSlides.length;
      renderSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % editorialSlides.length;
      renderSlide(currentSlide);
    });
  }

  // 9. Newsletter Form Interaction
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterInput = document.getElementById('newsletterEmail');
  const formFeedback = document.querySelector('.form-feedback');

  if (newsletterForm && newsletterInput && formFeedback) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterInput.value.trim();

      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formFeedback.textContent = 'Your address has been inscribed to the Atelier dispatch.';
        formFeedback.style.color = '#386641';
        formFeedback.classList.add('is-visible');
        newsletterInput.value = '';

        setTimeout(() => {
          formFeedback.classList.remove('is-visible');
        }, 5000);
      } else {
        formFeedback.textContent = 'Please provide a valid correspondence address.';
        formFeedback.style.color = '#9a3412';
        formFeedback.classList.add('is-visible');
      }
    });
  }

  // 10. Smooth Scroll for Internal Anchor Links
  const internalAnchors = document.querySelectorAll('a[href^="#"]');
  internalAnchors.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -60, duration: 1.4 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
