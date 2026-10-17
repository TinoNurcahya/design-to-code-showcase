/**
 * Sylvane Conservation — Interactive Vanilla JavaScript
 * Zero External Dependencies
 * Author: Tino Nurcahya
 */

let isInitialized = false;
function initApp() {
  if (isInitialized) return;
  isInitialized = true;

  const modules = [
    ["initHeaderScroll", initHeaderScroll],
    ["initMobileDrawer", initMobileDrawer],
    ["initScrollspy", initScrollspy],
    ["initStatsCounters", initStatsCounters],
    ["initHeroFloatingCards", initHeroFloatingCards],
    ["initInitiativesCarousel", initInitiativesCarousel],
    ["initVideoModal", initVideoModal],
    ["initBackToTop", initBackToTop],
    ["initFormsAndToasts", initFormsAndToasts],
    ["initResourceFilters", initResourceFilters],
    ["initResourceDownloads", initResourceDownloads],
    ["initHeroTitleReveal", initHeroTitleReveal],
    ["initMagneticButtons", initMagneticButtons],
    ["initTimelineScroll", initTimelineScroll],
    ["initHeroSpores", initHeroSpores]
  ];
  modules.forEach(([name, fn]) => {
    try {
      fn();
    } catch (err) {
      console.error(`[Sylvane Error] ${name}:`, err);
    }
  });
}

// Run immediately as script is loaded after DOM elements
initApp();
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
}

/**
 * 01. Sticky Header Elevation on Scroll
 */
function initHeaderScroll() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
        if (scrollY > 20) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/**
 * 02. Mobile Drawer Navigation
 */
function initMobileDrawer() {
  const openBtn = document.getElementById("mobileMenuBtn");
  const closeBtn = document.getElementById("closeDrawerBtn");
  const drawer = document.getElementById("mobileDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!openBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.classList.add("active");
    openBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.classList.remove("active");
    openBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  openBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeDrawer();
    }
  });
}

/**
 * 03. Scrollspy Active Link Tracking
 */
function initScrollspy() {
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinks = document.querySelectorAll(".desktop-nav .nav-link");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!sections.length || !navLinks.length) return;

  const updateActiveLink = () => {
    let currentId = "";
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute("id");
      }
    });

    // If scrolling through partners strip, associate with about us
    if (currentId === "partners") {
      currentId = "about";
    }

    // Special check for bottom of page -> footer
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
      currentId = "footer";
    }

    if (!currentId && window.scrollY < 200) {
      currentId = "hero";
    }

    if (currentId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${currentId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      mobileLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${currentId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  };

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();
}

/**
 * 04. Animated Stats Counters (Intersection Observer)
 */
function initStatsCounters() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  let hasAnimated = false;

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute("data-target"), 10) || 0;
    const duration = 1800; // ms
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = Math.floor(easeProgress * target);

      counter.textContent = currentVal.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(updateCount);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          counters.forEach((c) => animateCounter(c));
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.querySelector(".hero-stats-container");
  if (statsSection) {
    observer.observe(statsSection);
  } else {
    counters.forEach((c) => observer.observe(c));
  }
}

/**
 * 05. Hero Floating Cards Click Navigation
 */
function initHeroFloatingCards() {
  const cardReforest = document.getElementById("heroCardReforest");
  const cardOceans = document.getElementById("heroCardOceans");
  const cardWildlife = document.getElementById("heroCardWildlife");

  const targetOcean = document.getElementById("initiativeOceanCard");
  const targetForest = document.getElementById("initiativeForestCard");
  const targetCommunity = document.getElementById("initiativeCommunityCard");
  const track = document.getElementById("initiativesTrack");

  const navigateToCard = (targetCard, carouselIndex) => {
    if (!targetCard) return;

    // If carousel track exists, scroll track to that card
    if (track && typeof carouselIndex === "number") {
      const cardWidth = targetCard.offsetWidth + 16;
      track.scrollTo({ left: carouselIndex * cardWidth, behavior: "smooth" });
    }

    // Scroll window smoothly to the initiatives section
    const targetY = targetCard.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: targetY, behavior: "smooth" });

    // Apply pulse highlight animation
    targetCard.classList.remove("highlight-pulse");
    void targetCard.offsetWidth; // trigger reflow
    targetCard.classList.add("highlight-pulse");

    setTimeout(() => {
      targetCard.classList.remove("highlight-pulse");
    }, 1800);
  };

  // Wire hover expansion & click navigation on slots & cards
  const cardsConfig = [
    { card: cardReforest, target: targetForest, index: 1 },
    { card: cardOceans, target: targetOcean, index: 0 },
    { card: cardWildlife, target: targetCommunity, index: 2 }
  ];

  cardsConfig.forEach(({ card, target, index }) => {
    if (!card) return;
    const slot = card.closest(".floating-card-slot") || card;

    const setExpanded = (expanded) => {
      if (expanded) {
        card.classList.add("hover-expanded");
        if (slot) slot.classList.add("hover-expanded");
      } else {
        card.classList.remove("hover-expanded");
        if (slot) slot.classList.remove("hover-expanded");
      }
    };

    const handleMouseEnter = () => {
      setExpanded(true);
    };

    const handleMouseLeave = (e) => {
      if (slot && slot.contains(e.relatedTarget)) return;
      if (card && card.contains(e.relatedTarget)) return;
      setExpanded(false);
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    if (slot && slot !== card) {
      slot.addEventListener("mouseenter", handleMouseEnter);
      slot.addEventListener("mouseleave", handleMouseLeave);
    }

    card.addEventListener("focus", () => setExpanded(true));
    card.addEventListener("blur", () => setExpanded(false));

    card.addEventListener("click", () => navigateToCard(target, index));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        navigateToCard(target, index);
      }
    });
  });

  // Clean any lingering preview query parameter from address bar
  if (window.location.search.includes("preview=")) {
    try {
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (_) {}
  }
}

/**
 * 06. Initiatives Carousel Slider & Interactive Pagination
 */
function initInitiativesCarousel() {
  const track = document.getElementById("initiativesTrack");
  const prevBtn = document.getElementById("prevInitiativeBtn");
  const nextBtn = document.getElementById("nextInitiativeBtn");
  const dots = document.querySelectorAll(".carousel-dot");
  const cards = document.querySelectorAll(".initiative-card");

  if (!track || !prevBtn || !nextBtn) return;

  const getScrollDistance = () => {
    if (cards.length > 0) {
      return cards[0].offsetWidth + 16;
    }
    return 330;
  };

  const updateCarouselUI = () => {
    const scrollLeft = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;

    // Boundary check for arrows
    prevBtn.disabled = scrollLeft <= 8;
    nextBtn.disabled = scrollLeft >= maxScroll - 8;

    // Update active pagination dot
    const cardWidth = getScrollDistance();
    const activeIndex = Math.min(
      Math.max(Math.round(scrollLeft / cardWidth), 0),
      dots.length - 1
    );

    dots.forEach((dot, idx) => {
      if (idx === activeIndex) {
        dot.classList.add("active");
        dot.setAttribute("aria-current", "true");
      } else {
        dot.classList.remove("active");
        dot.removeAttribute("aria-current");
      }
    });
  };

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -getScrollDistance(), behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: getScrollDistance(), behavior: "smooth" });
  });

  // Click on pagination dots
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-index"), 10) || 0;
      track.scrollTo({ left: index * getScrollDistance(), behavior: "smooth" });
    });
  });

  track.addEventListener("scroll", updateCarouselUI, { passive: true });
  window.addEventListener("resize", updateCarouselUI);

  // Initial check
  updateCarouselUI();

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleGesture();
    },
    { passive: true }
  );

  function handleGesture() {
    const threshold = 40;
    const dist = getScrollDistance();
    if (touchEndX < touchStartX - threshold) {
      track.scrollBy({ left: dist, behavior: "smooth" });
    }
    if (touchEndX > touchStartX + threshold) {
      track.scrollBy({ left: -dist, behavior: "smooth" });
    }
  }
}

/**
 * 07. HTML5 Video Modal ("Watch Our Story")
 */
function initVideoModal() {
  const openBtn = document.getElementById("watchStoryBtn");
  const backdrop = document.getElementById("videoModalBackdrop");
  const closeBtn = document.getElementById("closeVideoModalBtn");
  const video = document.getElementById("storyVideo");
  const playerContainer = document.getElementById("videoPlayerContainer");
  const bigPlayBtn = document.getElementById("videoBigPlayBtn");
  const vPlayPauseBtn = document.getElementById("vPlayPauseBtn");
  const vProgressContainer = document.getElementById("vProgressContainer");
  const vProgressBar = document.getElementById("vProgressBar");
  const vTimeDisplay = document.getElementById("vTimeDisplay");
  const vMuteBtn = document.getElementById("vMuteBtn");
  const vFullscreenBtn = document.getElementById("vFullscreenBtn");

  if (!openBtn || !backdrop) return;

  const iconPlay = vPlayPauseBtn ? vPlayPauseBtn.querySelector(".v-icon-play") : null;
  const iconPause = vPlayPauseBtn ? vPlayPauseBtn.querySelector(".v-icon-pause") : null;
  const iconVolume = vMuteBtn ? vMuteBtn.querySelector(".v-icon-volume") : null;
  const iconMute = vMuteBtn ? vMuteBtn.querySelector(".v-icon-mute") : null;

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const updatePlayState = (isPlaying) => {
    if (playerContainer) {
      playerContainer.classList.toggle("playing", isPlaying);
      if (isPlaying) {
        playerContainer.classList.remove("ended");
      }
    }
    if (iconPlay && iconPause) {
      iconPlay.style.display = isPlaying ? "none" : "block";
      iconPause.style.display = isPlaying ? "block" : "none";
    }
    if (bigPlayBtn) {
      if (isPlaying) {
        bigPlayBtn.setAttribute("aria-label", "Pause documentary video");
      } else if (playerContainer && playerContainer.classList.contains("ended")) {
        bigPlayBtn.setAttribute("aria-label", "Replay documentary video");
      } else {
        bigPlayBtn.setAttribute("aria-label", "Play documentary video");
      }
    }
  };

  const togglePlay = () => {
    if (!video) return;
    if (video.paused || video.ended) {
      if (video.ended) {
        try {
          video.currentTime = 0;
        } catch (e) {}
      }
      video.play().catch(() => {
        video.muted = true;
        updateMuteState(true);
        video.play();
      });
    } else {
      video.pause();
    }
  };

  const updateMuteState = (isMuted) => {
    if (!video) return;
    video.muted = isMuted;
    if (iconVolume && iconMute) {
      iconVolume.style.display = isMuted ? "none" : "block";
      iconMute.style.display = isMuted ? "block" : "none";
    }
  };

  const openModal = () => {
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";

    if (playerContainer) {
      playerContainer.classList.remove("ended");
    }

    if (video) {
      try {
        video.currentTime = 0;
      } catch (e) {}

      video.play().then(() => {
        updatePlayState(true);
      }).catch(() => {
        // Autoplay restricted: try muted
        video.muted = true;
        updateMuteState(true);
        video.play().then(() => updatePlayState(true)).catch(() => updatePlayState(false));
      });
    }

    if (closeBtn) closeBtn.focus();
  };

  const closeModal = () => {
    backdrop.classList.remove("active");
    document.body.style.overflow = "";

    if (playerContainer) {
      playerContainer.classList.remove("ended");
    }

    if (video) {
      video.pause();
      try {
        video.currentTime = 0;
      } catch (e) {}
      updatePlayState(false);
    }

    setTimeout(() => {
      openBtn.focus();
    }, 300);
  };

  openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("active")) {
      closeModal();
    }
  });

  // Video Events & Controls
  if (video) {
    video.addEventListener("play", () => {
      if (playerContainer) playerContainer.classList.remove("ended");
      updatePlayState(true);
    });
    video.addEventListener("pause", () => updatePlayState(false));
    video.addEventListener("ended", () => {
      if (playerContainer) playerContainer.classList.add("ended");
      updatePlayState(false);
    });

    video.addEventListener("timeupdate", () => {
      if (!video.duration) return;
      const progress = (video.currentTime / video.duration) * 100;
      if (vProgressBar) vProgressBar.style.width = `${progress}%`;
      if (vTimeDisplay) {
        vTimeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
      }
      if (vProgressContainer) {
        vProgressContainer.setAttribute("aria-valuenow", Math.round(progress));
      }
      if (playerContainer && !video.ended && playerContainer.classList.contains("ended")) {
        playerContainer.classList.remove("ended");
      }
    });

    video.addEventListener("loadedmetadata", () => {
      if (vTimeDisplay) {
        vTimeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
      }
    });
  }

  if (bigPlayBtn) bigPlayBtn.addEventListener("click", togglePlay);
  if (vPlayPauseBtn) vPlayPauseBtn.addEventListener("click", togglePlay);

  // Click on progress container to seek
  if (vProgressContainer && video) {
    vProgressContainer.addEventListener("click", (e) => {
      const rect = vProgressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = Math.max(0, Math.min(1, clickX / width));
      if (video.duration) {
        video.currentTime = percentage * video.duration;
      }
    });
  }

  // Mute toggle
  if (vMuteBtn && video) {
    vMuteBtn.addEventListener("click", () => {
      updateMuteState(!video.muted);
    });
  }

  // Fullscreen toggle
  if (vFullscreenBtn && playerContainer) {
    vFullscreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        playerContainer.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }
}

/**
 * 08. Back to Top Button
 */
function initBackToTop() {
  const btn = document.getElementById("backToTopBtn");
  if (!btn) return;

  const handleScroll = () => {
    if (window.scrollY > 350) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * 09. Interactive Forms & Dynamic Toast Notifications
 */
function initFormsAndToasts() {
  const heroForm = document.getElementById("heroSignupForm");
  const heroEmailInput = document.getElementById("heroEmailInput");
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterEmailInput = document.getElementById("newsletterEmailInput");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  if (heroForm && heroEmailInput) {
    heroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = heroEmailInput.value.trim();
      if (validateEmail(val)) {
        showToast(`Welcome to Sylvane! Thank you for uniting with us, ${val}.`, "success");
        heroEmailInput.value = "";
      } else {
        showToast("Please enter a valid email address.", "error");
        heroEmailInput.focus();
      }
    });
  }

  if (newsletterForm && newsletterEmailInput) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = newsletterEmailInput.value.trim();
      if (validateEmail(val)) {
        showToast(`Subscribed! You'll receive our monthly conservation journal.`, "success");
        newsletterEmailInput.value = "";
      } else {
        showToast("Please enter a valid email address.", "error");
        newsletterEmailInput.focus();
      }
    });
  }
}

/**
 * Show Toast Notification
 */
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.setAttribute("role", "status");

  const icon = type === "success" 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger entrance transition
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Auto remove after 4.5s
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 400);
  }, 4500);
}

/**
 * 10. Resource Hub Category Filtering
 */
function initResourceFilters() {
  const filterPills = document.querySelectorAll(".resource-filter-pill");
  const resourceCards = document.querySelectorAll(".resource-card");

  if (!filterPills.length || !resourceCards.length) return;

  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      // Toggle active states
      filterPills.forEach((p) => {
        p.classList.remove("active");
        p.setAttribute("aria-selected", "false");
      });
      pill.classList.add("active");
      pill.setAttribute("aria-selected", "true");

      const filterValue = pill.getAttribute("data-filter");

      resourceCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (filterValue === "all" || cardCategory === filterValue) {
          card.classList.remove("hidden");
          card.style.opacity = "0";
          card.style.transform = "translateY(12px)";
          setTimeout(() => {
            card.style.transition = "opacity 0.35s ease, transform 0.35s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 30);
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

/**
 * 11. Resource Download Triggers
 */
function initResourceDownloads() {
  const downloadBtns = document.querySelectorAll(".btn-resource-download");
  if (!downloadBtns.length) return;

  downloadBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const reportTitle = btn.getAttribute("data-report") || "Conservation Document";
      
      // Temporary button feedback
      const originalText = btn.innerHTML;
      btn.style.pointerEvents = "none";
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 0.8s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10"/>
        </svg>
        <span>Preparing PDF...</span>
      `;

      setTimeout(() => {
        btn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Downloaded!</span>
        `;
        showToast(`Downloaded: "${reportTitle}" (PDF)`, "success");

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.pointerEvents = "";
        }, 2500);
      }, 700);
    });
  });
}

/**
 * 12. Staggered Word Reveal on Hero Title & All Section Headings (Masked Headings)
 */
function initHeroTitleReveal() {
  // 1. Hero Title immediate reveal
  const heroTitle = document.getElementById("heroTitle") || document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroTitle) {
    requestAnimationFrame(() => {
      setTimeout(() => {
        heroTitle.classList.add("revealed");
        if (heroSubtitle) {
          heroSubtitle.classList.add("revealed");
        }
      }, 120);
    });
  }

  // 2. Scroll-driven reveal for all other section headings (.masked-heading)
  const maskedHeadings = Array.from(document.querySelectorAll(".masked-heading"));
  if (!maskedHeadings.length) return;

  // Stagger delays per word for each heading
  maskedHeadings.forEach((heading) => {
    const words = heading.querySelectorAll(".reveal-word");
    words.forEach((word, idx) => {
      word.style.transitionDelay = `${(idx * 0.065).toFixed(2)}s`;
    });
  });

  // Observe scroll entry with IntersectionObserver
  if ("IntersectionObserver" in window) {
    const headingObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const heading = entry.target;
          heading.classList.add("revealed");

          // Reveal accompanying description within the same section block
          const container = heading.closest(".mission-intro, .initiatives-header-block, .resources-header, .about-header");
          if (container) {
            const desc = container.querySelector(".reveal-desc, .mission-description, .initiatives-lead-text, .resources-desc, .about-desc");
            if (desc) desc.classList.add("revealed");
          }

          headingObserver.unobserve(heading);
        }
      });
    }, {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.15
    });

    maskedHeadings.forEach((h) => headingObserver.observe(h));
  } else {
    // Fallback if IntersectionObserver is not available
    maskedHeadings.forEach((h) => h.classList.add("revealed"));
  }
}

/**
 * 13. Magnetic Button Interaction (Hero & Header CTAs)
 */
function initMagneticButtons() {
  // Only enable on desktop pointer devices
  if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 992) {
    return;
  }

  const magneticBtns = document.querySelectorAll(".magnetic-btn");
  if (!magneticBtns.length) return;

  magneticBtns.forEach((btn) => {
    let rafId = null;

    const onMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from center
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      // Magnetic pull intensity clamped to +-14px
      const maxPull = 14;
      const pullX = Math.max(-maxPull, Math.min(maxPull, distX * 0.35));
      const pullY = Math.max(-maxPull, Math.min(maxPull, distY * 0.35));

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        btn.classList.add("is-moving");
        btn.style.transform = `translate3d(${pullX.toFixed(1)}px, ${pullY.toFixed(1)}px, 0)`;
      });
    };

    const onMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      btn.classList.remove("is-moving");
      btn.style.transform = "translate3d(0, 0, 0)";
    };

    btn.addEventListener("mousemove", onMouseMove);
    btn.addEventListener("mouseleave", onMouseLeave);
  });
}

/**
 * 14. Scroll-Driven Sinuous Botanical Vine & Milestone Synergy
 */
function initTimelineScroll() {
  const wrapper = document.getElementById("timelineWrapper");
  const svg = document.getElementById("timelineVineSvg");
  const trackStem = document.getElementById("vineTrackStem");
  const fillStem = document.getElementById("vineFillStem");
  const branchTracksGroup = document.getElementById("vineBranchTracks");
  const branchFillsGroup = document.getElementById("vineBranchFills");
  const travelerGroup = document.getElementById("vineTravelerGroup");
  const sproutsGroup = document.getElementById("vineSprouts");

  if (!wrapper || !svg || !trackStem || !fillStem) return;

  // Add interactive class to enable smooth scroll-driven entries
  wrapper.classList.add("timeline-interactive");

  const rows = Array.from(wrapper.querySelectorAll(".timeline-row"));
  if (!rows.length) return;

  let stemLength = 0;
  let ticking = false;

  // 1. Build dynamic organic vine geometry based on live node and card positions
  function buildVineGeometry() {
    const wrapperRect = wrapper.getBoundingClientRect();
    const totalW = wrapper.offsetWidth || wrapperRect.width || 1040;
    const totalH = wrapper.offsetHeight || wrapperRect.height || 1200;

    svg.setAttribute("viewBox", `0 0 ${totalW} ${totalH}`);
    svg.setAttribute("width", `${totalW}`);
    svg.setAttribute("height", `${totalH}`);

    const nodesData = rows.map((row) => {
      const node = row.querySelector(".timeline-node");
      const card = row.querySelector(".timeline-card");
      if (!node || !card) return null;

      const nodeRect = node.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const nx = nodeRect.left + nodeRect.width / 2 - wrapperRect.left;
      const ny = nodeRect.top + nodeRect.height / 2 - wrapperRect.top;

      const isLeft = row.classList.contains("timeline-left");
      let cardX, cardY;
      if (isLeft && window.innerWidth > 992) {
        cardX = cardRect.right - wrapperRect.left;
        cardY = cardRect.top + 36 - wrapperRect.top;
      } else {
        cardX = cardRect.left - wrapperRect.left;
        cardY = cardRect.top + 36 - wrapperRect.top;
      }

      return { nx, ny, cardX, cardY, isLeft };
    }).filter(Boolean);

    if (nodesData.length === 0) return;

    // Build Sinuous Main Stem Path with wide, graceful S-curves (75–85px amplitude)
    const isMobile = window.innerWidth <= 992;
    let mainD = "";

    if (!isMobile) {
      // Desktop: vine flows down the center, undulating in a wide, graceful S-curve
      const midX = totalW / 2;
      const amp = 82; // 82px amplitude for pronounced, elegant curvature
      mainD = `M ${midX},0 `;
      
      // Top entrance: graceful initial swing to right (+60px), then sweeps into Node 0
      mainD += `C ${midX + 60},${nodesData[0].ny * 0.32} ${midX + 50},${nodesData[0].ny * 0.68} ${nodesData[0].nx},${nodesData[0].ny} `;

      // Waves between nodes: deep, elegant alternating bellies
      for (let i = 0; i < nodesData.length - 1; i++) {
        const curr = nodesData[i];
        const next = nodesData[i + 1];
        const dy = next.ny - curr.ny;
        // Alternate belly direction: left (-82px) then right (+82px)
        const bellyDir = i % 2 === 0 ? -1 : 1;
        const cp1X = curr.nx + amp * bellyDir;
        const cp2X = next.nx + amp * bellyDir;
        mainD += `C ${cp1X},${curr.ny + dy * 0.35} ${cp2X},${curr.ny + dy * 0.65} ${next.nx},${next.ny} `;
      }

      // Exit below last node: graceful swing to the right (+55px) down to bottom
      const last = nodesData[nodesData.length - 1];
      const dyEnd = totalH - last.ny;
      mainD += `C ${last.nx + 55},${last.ny + dyEnd * 0.35} ${last.nx + 40},${totalH - 15} ${last.nx},${totalH}`;
    } else {
      // Mobile: vine gracefully meanders along left margin where nodes sit
      const startX = nodesData[0].nx;
      const mWave = 14;
      mainD = `M ${startX},0 `;
      mainD += `C ${startX + mWave},${nodesData[0].ny * 0.35} ${startX + mWave * 0.8},${nodesData[0].ny * 0.7} ${nodesData[0].nx},${nodesData[0].ny} `;

      for (let i = 0; i < nodesData.length - 1; i++) {
        const curr = nodesData[i];
        const next = nodesData[i + 1];
        const dy = next.ny - curr.ny;
        const wave = i % 2 === 0 ? mWave : -mWave;
        mainD += `C ${curr.nx + wave},${curr.ny + dy * 0.35} ${next.nx + wave},${curr.ny + dy * 0.65} ${next.nx},${next.ny} `;
      }

      const last = nodesData[nodesData.length - 1];
      const dyEnd = totalH - last.ny;
      mainD += `C ${last.nx + mWave},${last.ny + dyEnd * 0.35} ${last.nx + 4},${totalH - 10} ${last.nx},${totalH}`;
    }

    trackStem.setAttribute("d", mainD);
    fillStem.setAttribute("d", mainD);
    stemLength = fillStem.getTotalLength();
    fillStem.style.strokeDasharray = `${stemLength} ${stemLength}`;
    fillStem.style.strokeDashoffset = `${stemLength}`;

    // Build Upturned Branch Connections and Leaf Sprouts
    let branchTracksHTML = "";
    let branchFillsHTML = "";
    let sproutsHTML = "";

    nodesData.forEach((d, i) => {
      // Upturned branch arc: branch dips slightly then swoops gracefully upward into the card header
      const deltaX = d.cardX - d.nx;
      const cp1X = d.nx + deltaX * 0.35;
      const cp1Y = d.ny + 14; // gentle natural dip
      const cp2X = d.nx + deltaX * 0.72;
      const cp2Y = d.cardY + 18; // arcs gracefully upward into the card header
      const branchD = `M ${d.nx},${d.ny} C ${cp1X},${cp1Y} ${cp2X},${cp2Y} ${d.cardX},${d.cardY}`;

      branchTracksHTML += `<path class="vine-branch-track" d="${branchD}" />`;
      branchFillsHTML += `<path class="vine-branch-fill" id="vineBranch-${i}" data-index="${i}" d="${branchD}" />`;

      // Botanical Leaf Sprout pair at node
      sproutsHTML += `
        <g class="vine-sprout" id="vineSprout-${i}" style="transform: translate(${d.nx.toFixed(1)}px, ${d.ny.toFixed(1)}px);">
          <path class="sprout-leaf leaf-left" d="M 0,-11 C -8,-22 -22,-22 -18,-10 C -15,-2 -4,-4 0,-11 Z" />
          <path class="sprout-leaf leaf-right" d="M 0,-11 C 8,-22 22,-22 18,-10 C 15,-2 4,-4 0,-11 Z" />
          <circle class="sprout-seed" cx="0" cy="-11" r="3.5" />
        </g>
      `;
    });

    if (branchTracksGroup) branchTracksGroup.innerHTML = branchTracksHTML;
    if (branchFillsGroup) branchFillsGroup.innerHTML = branchFillsHTML;
    if (sproutsGroup) sproutsGroup.innerHTML = sproutsHTML;

    // Set initial dasharray & dashoffset on each branch
    nodesData.forEach((_, i) => {
      const bFill = document.getElementById(`vineBranch-${i}`);
      if (bFill) {
        const bLen = Math.ceil(bFill.getTotalLength()) + 2;
        bFill.setAttribute("data-length", bLen);
        bFill.style.strokeDasharray = `${bLen} ${bLen}`;
        bFill.style.strokeDashoffset = `${bLen}`;
      }
    });

    // Re-evaluate in-view state
    updateTimeline();
  }

  // 2. Scroll-Driven Progress Calculation & Synergistic Activation
  function updateTimeline() {
    const rect = wrapper.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    const triggerStart = viewportHeight * 0.72;
    const totalHeight = rect.height;
    const scrolledPastTop = triggerStart - rect.top;

    let progress = 0;
    if (scrolledPastTop > 0 && totalHeight > 0) {
      progress = Math.min(Math.max(scrolledPastTop / totalHeight, 0), 1);
    }

    if (stemLength > 0) {
      fillStem.style.strokeDashoffset = `${(stemLength * (1 - progress)).toFixed(1)}`;

      // Traveling seedling orb tracking
      if (progress > 0.015 && progress < 0.995 && travelerGroup) {
        travelerGroup.classList.add("is-visible");
        const currentLength = stemLength * progress;
        const pt = fillStem.getPointAtLength(currentLength);
        travelerGroup.style.transform = `translate(${pt.x.toFixed(1)}px, ${pt.y.toFixed(1)}px)`;
      } else if (travelerGroup) {
        travelerGroup.classList.remove("is-visible");
      }
    }

    // Activate each milestone row, its connector branch, and leaf sprout
    rows.forEach((row, i) => {
      const rowRect = row.getBoundingClientRect();
      const branchFill = document.getElementById(`vineBranch-${i}`);
      const sprout = document.getElementById(`vineSprout-${i}`);

      if (rowRect.top < viewportHeight * 0.78) {
        row.classList.add("is-active");
        if (branchFill) {
          branchFill.classList.add("is-active");
          branchFill.style.strokeDashoffset = "0";
        }
        if (sprout) {
          sprout.classList.add("is-active");
        }
      } else {
        row.classList.remove("is-active");
        if (branchFill) {
          branchFill.classList.remove("is-active");
          const bLen = branchFill.getAttribute("data-length") || "100";
          branchFill.style.strokeDashoffset = `${bLen}`;
        }
        if (sprout) {
          sprout.classList.remove("is-active");
        }
      }
    });

    ticking = false;
  }

  // Initialize geometry after DOM paint
  requestAnimationFrame(() => {
    setTimeout(buildVineGeometry, 60);
  });

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateTimeline);
      ticking = true;
    }
  }, { passive: true });

    let resizeTimeout = null;
    window.addEventListener("resize", () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        buildVineGeometry();
      }, 120);
    }, { passive: true });
  }

/**
 * 15. Organic Floating Spores & Sunlight Dust (Vanilla Canvas)
 */
function initHeroSpores() {
  const canvas = document.getElementById("heroSporesCanvas");
  const heroSection = document.getElementById("hero");
  if (!canvas || !heroSection) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let rafId = null;
  let isVisible = true;
  const mouse = { x: -1000, y: -1000, active: false };

  // Harmonious botanical palette: Sunlight Gold, Bioluminescent Lime, Emerald Mist, Soft Pollen
  const sporeColors = [
    { r: 255, g: 235, b: 165 }, // Sunlight Dust (Warm Gold)
    { r: 194, g: 232, b: 18 },  // Bioluminescent Lime Accent
    { r: 130, g: 215, b: 165 }, // Emerald Canopy Mist
    { r: 255, g: 250, b: 230 }  // Soft Pollen White
  ];

  function createParticle(initial = false) {
    const color = sporeColors[Math.floor(Math.random() * sporeColors.length)];
    const isLarge = Math.random() < 0.18; // 18% larger bokeh spores with radial aura
    const radius = isLarge ? 1.8 + Math.random() * 1.5 : 0.7 + Math.random() * 1.1;
    const baseAlpha = isLarge ? 0.22 + Math.random() * 0.32 : 0.3 + Math.random() * 0.45;

    return {
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 10 + Math.random() * 20,
      radius,
      isLarge,
      r: color.r,
      g: color.g,
      b: color.b,
      baseAlpha,
      alpha: baseAlpha,
      speedX: 0.12 + Math.random() * 0.28,
      speedY: 0.22 + Math.random() * 0.5,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: 0.008 + Math.random() * 0.015,
      amplitude: 0.5 + Math.random() * 1.2,
      flickerAngle: Math.random() * Math.PI * 2,
      flickerSpeed: 0.015 + Math.random() * 0.03,
      vx: 0,
      vy: 0
    };
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);

    // Particle density adapted for screen size
    const count = width < 768 ? 22 : 45;
    if (particles.length === 0) {
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(true));
      }
    } else {
      particles = particles.slice(0, count);
      while (particles.length < count) {
        particles.push(createParticle(true));
      }
    }
  }

  function updateAndDraw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Sinusoidal natural floating motion & soft shimmer
      p.angle += p.angularSpeed;
      p.flickerAngle += p.flickerSpeed;
      p.alpha = Math.max(0.08, p.baseAlpha + Math.sin(p.flickerAngle) * 0.16);

      // Interactive gentle breeze deflection from cursor
      if (mouse.active) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 110;
        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 0.65;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      p.vx *= 0.94;
      p.vy *= 0.94;

      // Update positions
      p.x += Math.sin(p.angle) * p.speedX * p.amplitude + p.vx;
      p.y -= p.speedY - p.vy;

      // Wrap around bounds
      if (p.y < -15) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -15) p.x = width + 10;
      if (p.x > width + 15) p.x = -10;

      // Render particle
      if (p.isLarge) {
        // Soft glowing bokeh spore with radial aura
        const glowRadius = p.radius * 3.2;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        grad.addColorStop(0, `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * 0.95})`);
        grad.addColorStop(0.4, `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${p.r}, ${p.g}, ${p.b}, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      } else {
        // Crisp sun dust mote
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`;
        ctx.shadowColor = `rgba(${p.r}, ${p.g}, ${p.b}, 0.55)`;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    if (isVisible) {
      rafId = requestAnimationFrame(updateAndDraw);
    }
  }

  // Mouse interactivity on Hero
  heroSection.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  heroSection.addEventListener("mouseleave", () => {
    mouse.active = false;
  });

  // Battery & GPU Optimization: Pause when Hero is out of viewport
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!rafId) rafId = requestAnimationFrame(updateAndDraw);
        } else {
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        }
      });
    }, { threshold: 0.05 });
    observer.observe(heroSection);
  }

  // Reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    resizeCanvas();
    updateAndDraw();
    isVisible = false;
    if (rafId) cancelAnimationFrame(rafId);
    return;
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
  });

  resizeCanvas();
  rafId = requestAnimationFrame(updateAndDraw);
}



