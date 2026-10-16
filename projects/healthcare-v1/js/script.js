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

  // Ensure initial needle angle is at 0deg (Normal)
  if (needle) {
    needle.style.transform = "rotate(0deg)";
  }

  presetButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      presetButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const bpm = btn.getAttribute("data-bpm");
      const state = btn.getAttribute("data-state");
      const angle = btn.getAttribute("data-angle");

      if (needle) {
        needle.style.transform = `rotate(${angle}deg)`;
      }
      if (displayVal) {
        displayVal.textContent = bpm;
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

