/**
 * Careon Medical — Specialist Healthcare & Diagnostic Telemetry Portal
 * Interactive Logic, Biometric Telemetry & Micro-Interactions
 * Author: Tino Nurcahya
 * Pure Vanilla JavaScript — Zero Dependencies
 */

// Comprehensive Specialists Roster with authentic assets
const doctors = [
  {
    id: "doc-1",
    name: "Dr. Sarah Jensen, MD",
    department: "cardiology",
    departmentLabel: "General & Preventive Care",
    title: "Chief Medical Officer",
    subspecialty: "Internal Medicine & Preventive Cardiology",
    experience: "16+ Years Experience",
    rating: "4.9",
    reviewsCount: 248,
    image: "./assets/images/doctor-hero.jpg",
    availableToday: true,
    nextSlot: "Today, 02:30 PM",
  },
  {
    id: "doc-2",
    name: "Dr. David Chen, MD, FAAP",
    department: "pediatrics",
    departmentLabel: "Pediatrics & Family Care",
    title: "Chief of Pediatrics",
    subspecialty: "Infant Development & Adolescent Health",
    experience: "14+ Years Experience",
    rating: "5.0",
    reviewsCount: 310,
    image: "./assets/images/doctor-pediatrician.jpg",
    availableToday: true,
    nextSlot: "Today, 03:15 PM",
  },
  {
    id: "doc-3",
    name: "Dr. Michael Thorne, MD, FACC",
    department: "cardiology",
    departmentLabel: "Cardiovascular Center",
    title: "Senior Interventional Cardiologist",
    subspecialty: "Heart Rhythm Diagnostics & Angioplasty",
    experience: "18+ Years Experience",
    rating: "4.9",
    reviewsCount: 195,
    image: "./assets/images/doctor-specialist-male.jpg",
    availableToday: true,
    nextSlot: "Tomorrow, 09:30 AM",
  },
  {
    id: "doc-4",
    name: "Dr. Evelyn Chen, MD, FAAD",
    department: "dermatology",
    departmentLabel: "Dermatology & Skin Center",
    title: "Consultant Dermatologist",
    subspecialty: "Aesthetic Laser Therapy & Skin Health",
    experience: "12+ Years Experience",
    rating: "4.9",
    reviewsCount: 167,
    image: "./assets/images/doctor-specialist-female.jpg",
    availableToday: true,
    nextSlot: "Today, 04:00 PM",
  },
  {
    id: "doc-5",
    name: "Dr. Amara Okafor, MD, PhD",
    department: "neurology",
    departmentLabel: "Neurology Institute",
    title: "Consultant Neurologist",
    subspecialty: "Cognitive Neurophysiology & Headache Clinic",
    experience: "15+ Years Experience",
    rating: "4.8",
    reviewsCount: 122,
    image: "./assets/images/doctor-specialist-female.jpg",
    availableToday: false,
    nextSlot: "Thursday, 11:00 AM",
  },
  {
    id: "doc-6",
    name: "Dr. Marcus Vance, DDS, MS",
    department: "dental",
    departmentLabel: "Oral & Maxillofacial",
    title: "Lead Oral Surgeon",
    subspecialty: "Dental Restorations & Titanium Implants",
    experience: "13+ Years Experience",
    rating: "4.9",
    reviewsCount: 184,
    image: "./assets/images/doctor-specialist-male.jpg",
    availableToday: true,
    nextSlot: "Today, 05:30 PM",
  },
  {
    id: "service-kit",
    name: "MediLab Home Diagnostic Kit",
    department: "diagnostics",
    departmentLabel: "Laboratory Diagnostics",
    title: "At-Home Specimen Collection & Digital Telemetry",
    subspecialty: "Rapid 15-Minute Panel & Courier Delivery",
    experience: "CLIA-Waived System",
    rating: "4.9",
    reviewsCount: 420,
    image: "./assets/images/diagnostic-kit.jpg",
    availableToday: true,
    nextSlot: "Dispatched in 2 Hours",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      disable: "mobile",
    });
  }

  renderDoctors(doctors.filter((d) => d.id !== "service-kit"));
  populateDoctorSelect(doctors);
  initFilterTabs();
  initHeroChips();
  initBookingModal();
  initModeToggle();
  initTelemetryLiveHUD();
  initSpeedometerSimulation();
  initMobileNav();
  initDockActions();
  initFooterDeptFilter();
  initFaqAccordion();
  initNavScrollSpy();
  initDockFooterObserver();
  setMinDatePicker();
  initThemeToggle();
  initThreeHeartTelemetry();
  init3DTiltEffects();
  initKineticTypography();
});

/**
 * 01. Render Doctor Cards dynamically
 */
function renderDoctors(doctorList) {
  const grid = document.getElementById("doctors-grid");
  if (!grid) return;

  if (doctorList.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--slate-500);">
        <p style="font-size: 1.1rem; font-weight: 600;">No specialists found for this department.</p>
        <button class="chip active" style="margin-top: 1rem;" onclick="resetFilter()">View All Specialists</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = doctorList
    .map(
      (doc) => `
    <article class="doctor-card" data-department="${doc.department}">
      <div class="card-header-row">
        <div class="doctor-avatar-wrap">
          <img src="${doc.image}" alt="${doc.name}" class="doctor-avatar-img" loading="lazy" />
        </div>
        <div class="doctor-title-col">
          <h3 class="doctor-name">${doc.name}</h3>
          <span class="doctor-dept-pill">${doc.departmentLabel}</span>
        </div>
      </div>

      <ul class="doctor-details-list">
        <li class="detail-item">
          <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor" aria-hidden="true" style="color: var(--emerald-600); flex-shrink: 0;"><circle cx="3" cy="3" r="3"/></svg>
          <span>${doc.title}</span>
        </li>
        <li class="detail-item">
          <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor" aria-hidden="true" style="color: var(--slate-400); flex-shrink: 0;"><circle cx="3" cy="3" r="3"/></svg>
          <span>${doc.subspecialty}</span>
        </li>
        <li class="detail-item" style="color: var(--emerald-700); font-weight: 600;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="margin-right: 4px; flex-shrink: 0;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span>Next Slot: ${doc.nextSlot}</span>
        </li>
      </ul>

      <div class="doctor-card-footer">
        <div class="rating-badge">
          <svg class="star-icon" width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="none" aria-hidden="true" style="color: var(--amber-500);"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>${doc.rating}</span>
          <span style="color: var(--slate-400); font-size: 0.75rem;">(${doc.reviewsCount})</span>
        </div>

        <button 
          type="button" 
          class="btn-card-book" 
          data-doctor-id="${doc.id}"
          onclick="openBookingModalWithDoctor('${doc.id}')">
          Book Visit
        </button>
      </div>
    </article>
  `
    )
    .join("");
}

/**
 * 02. Populate Doctor dropdown in booking modal
 */
function populateDoctorSelect(doctorList) {
  const select = document.getElementById("modal-doctor-select");
  if (!select) return;

  select.innerHTML = doctorList
    .map(
      (doc) => `
    <option value="${doc.id}">${doc.name} — ${doc.title} (${doc.departmentLabel})</option>
  `
    )
    .join("");
}

/**
 * 03. Specialist Filter Tabs
 */
function initFilterTabs() {
  const tabs = document.querySelectorAll(".specialist-filter-tabs .filter-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const filter = tab.getAttribute("data-filter");
      filterDoctors(filter);
    });
  });
}

/**
 * 04. Hero Careon Specialty Chips
 */
function initHeroChips() {
  const chips = document.querySelectorAll("#hero-chips-wrap .chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      const filter = chip.getAttribute("data-filter");

      // Also sync with specialist filter tabs
      const targetTab = document.querySelector(`.specialist-filter-tabs [data-filter="${filter}"]`);
      if (targetTab) {
        document.querySelectorAll(".specialist-filter-tabs .filter-tab").forEach((t) => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        targetTab.classList.add("active");
        targetTab.setAttribute("aria-selected", "true");
      }

      filterDoctors(filter);

      // Smooth scroll to specialists section
      const specSection = document.getElementById("specialists");
      if (specSection) {
        specSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function filterDoctors(category) {
  const facultyList = doctors.filter((d) => d.id !== "service-kit");
  if (category === "all") {
    renderDoctors(facultyList);
  } else {
    const filtered = facultyList.filter((doc) => doc.department === category);
    renderDoctors(filtered);
  }
}

function resetFilter() {
  const allTab = document.querySelector('.specialist-filter-tabs [data-filter="all"]');
  if (allTab) allTab.click();
}

/**
 * 05. Live EKG & Heart Rate Telemetry Simulation
 */
function initTelemetryLiveHUD() {
  const hrElement = document.getElementById("live-hr");
  const pinBpm = document.getElementById("pin-bpm-val");

  // Gently fluctuate live heart rate between 72 and 75 bpm
  setInterval(() => {
    const base = 74;
    const variation = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, +1, +2
    const currentVal = base + variation;
    if (hrElement) hrElement.textContent = currentVal;
    if (pinBpm) pinBpm.textContent = `${currentVal} bpm`;
  }, 3500);
}

/**
 * 06. Radial Speedometer Simulation (Interactive Presets)
 */
function initSpeedometerSimulation() {
  const presetButtons = document.querySelectorAll(".btn-gauge-preset");
  const needle = document.getElementById("gauge-needle");
  const displayVal = document.getElementById("gauge-display-val");
  const badge = document.getElementById("gauge-state-badge");
  const pinBpm = document.getElementById("pin-bpm-val");
  const liveHr = document.getElementById("live-hr");
  const ekgLine = document.querySelector(".pulse-ekg-line");

  // Ensure initial needle angle is at 0deg (Normal)
  if (needle) {
    needle.style.transform = "rotate(0deg)";
  }

  presetButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      presetButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const bpm = parseInt(btn.getAttribute("data-bpm"), 10) || 74;
      const state = btn.getAttribute("data-state");
      const angle = btn.getAttribute("data-angle");

      if (needle) {
        needle.style.transform = `rotate(${angle}deg)`;
      }
      if (displayVal) {
        displayVal.textContent = bpm;
      }
      if (liveHr) {
        liveHr.textContent = bpm;
      }
      if (badge) {
        badge.textContent = state;
        if (state === "Resting") {
          badge.style.background = "#eff6ff";
          badge.style.color = "#2563eb";
        } else if (state === "Cardio Peak") {
          badge.style.background = "#fff1f2";
          badge.style.color = "#e11d48";
        } else {
          badge.style.background = "#ecfdf5";
          badge.style.color = "#15803d";
        }
      }
      if (pinBpm) {
        pinBpm.textContent = `${bpm} bpm`;
      }

      // Sync 3D heart pulse speed & EKG SVG animation rate
      if (typeof setHeartTelemetryBpm === "function") {
        setHeartTelemetryBpm(bpm);
      }
      if (ekgLine) {
        // Normal 74 bpm => ~3.2s; 62 bpm => ~3.8s; 118 bpm => ~2.0s
        const duration = ((60 / bpm) * 3.9).toFixed(2);
        ekgLine.style.animationDuration = `${duration}s`;
      }
    });
  });
}

/**
 * 07. Interactive Booking Modal Logic
 */
function initBookingModal() {
  const modal = document.getElementById("booking-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const cancelBtn = document.getElementById("modal-cancel-btn");
  const form = document.getElementById("appointment-form");

  const triggers = [
    document.getElementById("header-book-btn"),
    document.getElementById("hero-book-btn"),
    document.getElementById("mobile-book-btn"),
    document.getElementById("card-quick-book-btn"),
    document.getElementById("banner-book-btn"),
    document.getElementById("btn-demo-telehealth"),
    document.getElementById("btn-order-kit"),
  ];

  triggers.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", () => {
        const docId = btn.getAttribute("data-doctor-id");
        if (btn.id === "btn-demo-telehealth") {
          openBookingModalWithDoctor("doc-3", "telehealth");
        } else if (btn.id === "btn-order-kit") {
          openBookingModalWithDoctor("service-kit", "in-clinic");
        } else if (docId) {
          openBookingModalWithDoctor(docId);
        } else {
          openBookingModal();
        }
      });
    }
  });

  if (closeBtn) closeBtn.addEventListener("click", closeBookingModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeBookingModal);

  // Close on backdrop click
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeBookingModal();
      }
    });
  }

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
      closeBookingModal();
    }
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const doctorSelect = document.getElementById("modal-doctor-select");
      const selectedDocId = doctorSelect ? doctorSelect.value : "";
      const selectedDoc = doctors.find((d) => d.id === selectedDocId) || doctors[0];
      const patientName = document.getElementById("modal-patient-name")?.value || "Patient";
      const dateVal = document.getElementById("modal-date")?.value || "Scheduled Date";
      const timeVal = document.getElementById("modal-time")?.value || "09:00 AM";

      const submitBtn = form.querySelector(".btn-submit-booking");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Processing Order...</span>`;
      }

      setTimeout(() => {
        closeBookingModal();
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span class="btn-text">Confirm Appointment</span><span class="btn-arrow-circle">→</span>`;
        }

        const isKit = selectedDoc.id === "service-kit";
        showToast(
          isKit ? "Diagnostic Kit Dispatched!" : "Appointment Confirmed!",
          isKit
            ? `MediLab Diagnostic Kit registered for ${patientName}. Courier dispatch scheduled.`
            : `Reserved with ${selectedDoc.name} on ${dateVal} at ${timeVal}. Confirmation sent.`
        );
      }, 750);
    });
  }
}

function openBookingModal() {
  const modal = document.getElementById("booking-modal");
  if (modal) {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
}

function openBookingModalWithDoctor(doctorId, defaultMode = "in-clinic") {
  const select = document.getElementById("modal-doctor-select");
  if (select && doctorId) {
    select.value = doctorId;
  }

  // Switch consultation mode toggle if specified
  const modeInputs = document.querySelectorAll('input[name="consultation-mode"]');
  modeInputs.forEach((input) => {
    if (input.value === defaultMode) {
      input.checked = true;
      input.closest(".mode-option")?.classList.add("active");
    } else {
      input.closest(".mode-option")?.classList.remove("active");
    }
  });

  openBookingModal();
}

function closeBookingModal() {
  const modal = document.getElementById("booking-modal");
  if (modal) {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

/**
 * 08. Consultation Mode segmented radio toggle
 */
function initModeToggle() {
  const options = document.querySelectorAll(".mode-option");
  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      options.forEach((o) => o.classList.remove("active"));
      opt.classList.add("active");
      const input = opt.querySelector("input");
      if (input) input.checked = true;
    });
  });
}

/**
 * 09. Min Date Picker
 */
function setMinDatePicker() {
  const dateInput = document.getElementById("modal-date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    dateInput.value = today;
  }
}

/**
 * 10. Floating Right Dock Actions
 */
function initDockActions() {
  const phoneBtn = document.getElementById("dock-call-btn");
  if (phoneBtn) {
    phoneBtn.addEventListener("click", () => {
      showToast(
        "Emergency Hotline Connected",
        "Direct Line: +1 (800) 450-CARE • 24/7 Clinical Emergency Response"
      );
    });
  }

  const contactBtn = document.getElementById("banner-contact-btn");
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      const footer = document.getElementById("contact");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

/**
 * 11. Toast Notification
 */
let toastTimeout;
function showToast(title, message) {
  const toast = document.getElementById("toast-notify");
  const titleEl = document.getElementById("toast-title");
  const msgEl = document.getElementById("toast-message");

  if (!toast) return;

  if (titleEl) titleEl.textContent = title;
  if (msgEl) msgEl.textContent = message;

  toast.classList.add("is-visible");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 4500);
}

/**
 * 12. Mobile Menu Navigation
 */
function initMobileNav() {
  const toggleBtn = document.getElementById("mobile-toggle-btn");
  const drawer = document.getElementById("mobile-nav-drawer");

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("is-open");
    drawer.classList.toggle("is-open", !isOpen);
    drawer.setAttribute("aria-hidden", isOpen ? "true" : "false");
    toggleBtn.setAttribute("aria-expanded", isOpen ? "false" : "true");
  });

  const links = drawer.querySelectorAll(".mobile-link");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * 13. Footer Department Direct Filtering
 */
function initFooterDeptFilter() {
  const deptButtons = document.querySelectorAll(".footer-dept-btn");
  deptButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      if (!filter) return;

      // Sync active tab in specialist filter tabs
      const targetTab = document.querySelector(`.specialist-filter-tabs .filter-tab[data-filter="${filter}"]`);
      if (targetTab) {
        document.querySelectorAll(".specialist-filter-tabs .filter-tab").forEach((t) => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        targetTab.classList.add("active");
        targetTab.setAttribute("aria-selected", "true");
      }

      // Filter doctors grid
      filterDoctors(filter);

      // Smooth scroll to specialists section
      const specSection = document.getElementById("specialists");
      if (specSection) {
        specSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/**
 * 14. Accessible FAQ Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-trigger");
    const content = item.querySelector(".faq-content");
    if (!trigger || !content) return;

    trigger.addEventListener("click", () => {
      const isAlreadyOpen = item.classList.contains("is-open");

      // Close other open items for exclusive accordion flow
      faqItems.forEach((other) => {
        if (other !== item && other.classList.contains("is-open")) {
          other.classList.remove("is-open");
          const otherTrigger = other.querySelector(".faq-trigger");
          if (otherTrigger) {
            otherTrigger.setAttribute("aria-expanded", "false");
          }
        }
      });

      // Toggle current item
      if (isAlreadyOpen) {
        item.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/**
 * 15. Active Navigation Scroll Spy
 */
function initNavScrollSpy() {
  const navLinks = document.querySelectorAll(".desktop-nav .nav-link");
  if (!navLinks.length) return;

  const sections = [];
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        sections.push({ id: href, section: target, link: link });
      }
    }
  });

  if (!sections.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => {
            l.classList.remove("active");
            const dot = l.querySelector(".active-dot");
            if (dot) dot.remove();
          });
          const match = sections.find((s) => s.section === entry.target);
          if (match && match.link) {
            match.link.classList.add("active");
            if (!match.link.querySelector(".active-dot")) {
              const dot = document.createElement("span");
              dot.className = "active-dot";
              match.link.appendChild(dot);
            }
          }
        }
      });
    },
    { rootMargin: "-25% 0px -65% 0px" }
  );

  sections.forEach((s) => observer.observe(s.section));
}

/**
 * 16. Auto-hide Floating Dock on Footer View
 */
function initDockFooterObserver() {
  const dock = document.querySelector(".floating-vertical-dock");
  const footer = document.querySelector(".site-footer");
  if (!dock || !footer || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          dock.classList.add("is-hidden");
        } else {
          dock.classList.remove("is-hidden");
        }
      });
    },
    { rootMargin: "0px 0px -5% 0px", threshold: 0.05 }
  );

  observer.observe(footer);
}

/**
 * 17. Nocturnal ICU Telemetry Theme Toggle with Circular Reveal View Transition API
 */
function initThemeToggle() {
  const headerBtn = document.getElementById("header-theme-btn");
  const dockBtn = document.getElementById("dock-theme-btn");
  const mobileBtn = document.getElementById("mobile-theme-btn");
  const mobileModeLabel = document.querySelector(".mobile-theme-toggle .theme-mode-name");

  // Determine initial theme: localStorage -> system preference -> default 'light'
  const savedTheme = localStorage.getItem("careon_theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  function applyThemeDom(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("careon_theme", theme);

    if (mobileModeLabel) {
      mobileModeLabel.textContent = theme === "dark" ? "Telemetry ICU" : "Day Clinic";
    }

    // Notify 3D Hologram heart of theme change if active
    if (typeof window.__updateThreeTheme === "function") {
      window.__updateThreeTheme(theme);
    }
  }

  // Set initial theme without animation
  applyThemeDom(initialTheme);

  function toggleThemeWithTransition(e) {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const targetTheme = currentTheme === "dark" ? "light" : "dark";

    // Check if View Transition API is supported and not reduced-motion
    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || prefersReducedMotion) {
      applyThemeDom(targetTheme);
      return;
    }

    // Get click origin coordinates
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    if (e && typeof e.clientX === "number" && typeof e.clientY === "number" && (e.clientX !== 0 || e.clientY !== 0)) {
      x = e.clientX;
      y = e.clientY;
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      applyThemeDom(targetTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }

  [headerBtn, dockBtn, mobileBtn].forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", (e) => {
        toggleThemeWithTransition(e);
      });
    }
  });

  // Listen to system OS theme changes if user hasn't explicitly set a preference
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("careon_theme")) {
        applyThemeDom(e.matches ? "dark" : "light");
      }
    });
  }
}

/**
 * 18. Interactive Three.js Holographic Beating Heart with Dual-Pulse Telemetry
 */
let setHeartTelemetryBpm = null;

function initThreeHeartTelemetry() {
  const canvas = document.getElementById("three-heart-canvas");
  const container = document.getElementById("heart-pins-container");
  if (!canvas || !container || typeof THREE === "undefined") return;

  // Scene setup
  const scene = new THREE.Scene();

  const width = container.clientWidth || 360;
  const height = container.clientHeight || 420;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 7.5);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 1.2);
  dirLight1.position.set(5, 5, 5);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x10b981, 1.0);
  dirLight2.position.set(-5, -5, 3);
  scene.add(dirLight2);

  // Group to contain all heart components
  const heartGroup = new THREE.Group();
  scene.add(heartGroup);

  // Build Parametric 3D Heart Geometry
  function create3DHeartGeometry() {
    const geom = new THREE.BufferGeometry();
    const positions = [];
    const indices = [];
    const uSteps = 42;
    const vSteps = 42;

    for (let i = 0; i <= uSteps; i++) {
      const u = -Math.PI + (2 * Math.PI * i) / uSteps;
      for (let j = 0; j <= vSteps; j++) {
        const v = (Math.PI * j) / vSteps;

        // Realistic cardioid heart parametric formulation
        const sinU = Math.sin(u);
        const cosU = Math.cos(u);
        const sinV = Math.sin(v);
        const cosV = Math.cos(v);

        // x: lateral width, y: apex (bottom) to lobes (top), z: anterior/posterior depth
        const x = 1.6 * (sinU * sinU * sinU) * Math.sin(v);
        const y = (1.3 * cosU - 0.5 * Math.cos(2 * u) - 0.2 * Math.cos(3 * u) - 0.1 * Math.cos(4 * u)) * Math.sin(v);
        const z = 1.0 * cosV * Math.sin(u * 0.5);

        positions.push(x, y, z);
      }
    }

    for (let i = 0; i < uSteps; i++) {
      for (let j = 0; j < vSteps; j++) {
        const a = i * (vSteps + 1) + j;
        const b = (i + 1) * (vSteps + 1) + j;
        const c = (i + 1) * (vSteps + 1) + (j + 1);
        const d = i * (vSteps + 1) + (j + 1);
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    geom.center();
    return geom;
  }

  const heartGeometry = create3DHeartGeometry();

  // 1. Holographic Wireframe Layer
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.65,
  });
  const wireframeMesh = new THREE.Mesh(heartGeometry, wireframeMaterial);
  heartGroup.add(wireframeMesh);

  // 2. Translucent Inner Core Mesh
  const coreMaterial = new THREE.MeshLambertMaterial({
    color: 0x059669,
    emissive: 0x044e39,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide,
  });
  const coreMesh = new THREE.Mesh(heartGeometry, coreMaterial);
  coreMesh.scale.set(0.96, 0.96, 0.96);
  heartGroup.add(coreMesh);

  // 3. Floating Arterial Particle Swarm
  const particleCount = 650;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleAngles = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 1.3 + Math.random() * 1.5;
    const yOffset = (Math.random() - 0.45) * 2.8;
    const zOffset = (Math.random() - 0.5) * 1.8;

    particlePositions[i * 3] = Math.cos(angle) * radius;
    particlePositions[i * 3 + 1] = yOffset;
    particlePositions[i * 3 + 2] = Math.sin(angle) * radius * 0.6 + zOffset;

    particleAngles.push({ angle, radius, speed: 0.005 + Math.random() * 0.01, y: yOffset, z: zOffset });
  }

  particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.055,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
  });
  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  heartGroup.add(particleSystem);

  // 4. Ventricle & Aorta Telemetry Pulse Nodes
  const nodeGeom = new THREE.SphereGeometry(0.12, 16, 16);
  const nodeMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
  const ventricleNode = new THREE.Mesh(nodeGeom, nodeMat);
  ventricleNode.position.set(-0.4, -0.2, 0.5);
  heartGroup.add(ventricleNode);

  const aortaNode = new THREE.Mesh(nodeGeom, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
  aortaNode.position.set(0.3, 0.9, 0.3);
  heartGroup.add(aortaNode);

  // Initial Heart Orientation and Position
  heartGroup.rotation.x = 0.2;
  heartGroup.rotation.y = -0.3;
  heartGroup.position.set(0, 0.1, 0);

  // Theme synchronization callback
  window.__updateThreeTheme = function (theme) {
    if (theme === "dark") {
      wireframeMaterial.color.setHex(0x00f0ff);
      wireframeMaterial.opacity = 0.8;
      coreMaterial.color.setHex(0x065f46);
      coreMaterial.emissive.setHex(0x064e3b);
      coreMaterial.opacity = 0.35;
      particleMaterial.color.setHex(0x38bdf8);
      dirLight1.color.setHex(0x00f0ff);
      dirLight2.color.setHex(0x10b981);
    } else {
      wireframeMaterial.color.setHex(0x0d9488);
      wireframeMaterial.opacity = 0.55;
      coreMaterial.color.setHex(0x10b981);
      coreMaterial.emissive.setHex(0x065f46);
      coreMaterial.opacity = 0.2;
      particleMaterial.color.setHex(0x0284c7);
      dirLight1.color.setHex(0x0d9488);
      dirLight2.color.setHex(0x059669);
    }
  };

  // Set theme colors on launch
  const initialTheme = document.documentElement.getAttribute("data-theme") || "light";
  window.__updateThreeTheme(initialTheme);

  // Telemetry Heartbeat Dynamics
  let currentBpm = 74;
  setHeartTelemetryBpm = function (bpm) {
    currentBpm = bpm;
  };

  // Mouse / Touch Drag Orbit Interaction
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let targetRotationX = 0.2;
  let targetRotationY = -0.3;

  function onPointerDown(e) {
    isDragging = true;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    previousMousePosition = { x: clientX, y: clientY };
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaX = clientX - previousMousePosition.x;
    const deltaY = clientY - previousMousePosition.y;

    targetRotationY += deltaX * 0.008;
    targetRotationX += deltaY * 0.008;

    // Clamp X rotation to avoid flipping upside down
    targetRotationX = Math.max(-1.1, Math.min(1.1, targetRotationX));

    previousMousePosition = { x: clientX, y: clientY };
  }

  function onPointerUp() {
    isDragging = false;
  }

  canvas.addEventListener("mousedown", onPointerDown);
  window.addEventListener("mousemove", onPointerMove);
  window.addEventListener("mouseup", onPointerUp);

  canvas.addEventListener("touchstart", onPointerDown, { passive: true });
  window.addEventListener("touchmove", onPointerMove, { passive: true });
  window.addEventListener("touchend", onPointerUp);

  // Resize handling
  function onResize() {
    if (!container || !renderer || !camera) return;
    const w = container.clientWidth || 360;
    const h = container.clientHeight || 420;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener("resize", onResize);
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(onResize).observe(container);
  }

  // Animation Loop with Physiological "Lub-Dub" Dual Pulse
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Human heartbeat dual pulse formula (Systole + Diastole)
    const frequency = currentBpm / 60; // beats per second
    const cycle = (elapsedTime * frequency) % 1;

    // Pulse 1: Ventricular contraction (Lub)
    const p1 = Math.exp(-32 * Math.pow(cycle - 0.16, 2));
    // Pulse 2: Atrial/ventricular rebound (Dub)
    const p2 = 0.58 * Math.exp(-38 * Math.pow(cycle - 0.38, 2));
    const pulseStrength = (p1 + p2) * 0.16;

    // Apply pulse scale to heart geometry
    const scale = 1.0 + pulseStrength;
    wireframeMesh.scale.set(scale, scale, scale);
    coreMesh.scale.set(scale * 0.96, scale * 0.96, scale * 0.96);

    // Pulse glow nodes
    const nodeScale = 1.0 + pulseStrength * 1.8;
    ventricleNode.scale.set(nodeScale, nodeScale, nodeScale);
    aortaNode.scale.set(nodeScale, nodeScale, nodeScale);

    // Orbit drift and inertia damping
    if (!isDragging) {
      targetRotationY += 0.003; // Gentle idle rotation
    }
    heartGroup.rotation.y += (targetRotationY - heartGroup.rotation.y) * 0.08;
    heartGroup.rotation.x += (targetRotationX - heartGroup.rotation.x) * 0.08;

    // Animate arterial particle swarm
    const positions = particleGeometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const p = particleAngles[i];
      p.angle += p.speed * (currentBpm / 74);
      positions[i * 3] = Math.cos(p.angle) * p.radius * (1 + pulseStrength * 0.3);
      positions[i * 3 + 2] = Math.sin(p.angle) * p.radius * 0.65 + p.z;
    }
    particleGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
}

/**
 * 19. 3D Perspective Tilt Micro-Interactions on Interactive Badges & Cards
 */
function init3DTiltEffects() {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // Floating badges, companion note, and telemetry bento cards
  const tiltElements = document.querySelectorAll(
    ".floating-badge, .companion-note-card, .bento-card, .service-card"
  );

  tiltElements.forEach((el) => {
    el.classList.add("tilt-card-active");

    let isHovering = false;

    el.addEventListener("mouseenter", () => {
      isHovering = true;
    });

    el.addEventListener("mousemove", (e) => {
      if (!isHovering) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation (max ±6.5 deg)
      const rotateX = ((y - centerY) / centerY) * -6.5;
      const rotateY = ((x - centerX) / centerX) * 6.5;

      el.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    el.addEventListener("mouseleave", () => {
      isHovering = false;
      el.style.transform = "";
    });
  });
}

/**
 * 20. GSAP Kinetic Typography Entrance for Hero Headline
 */
function initKineticTypography() {
  if (typeof gsap === "undefined") return;

  const words = document.querySelectorAll(".hero-title .kinetic-word");
  if (!words.length) return;

  // Staggered slide up & fade in
  gsap.from(words, {
    yPercent: 120,
    opacity: 0,
    stagger: 0.07,
    duration: 0.85,
    ease: "power3.out",
    delay: 0.15,
    clearProps: "all",
  });
}


