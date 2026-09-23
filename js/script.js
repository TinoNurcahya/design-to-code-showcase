/**
 * Design-to-Code Showcase Hub — Interactive Logic
 * Author: Tino Nurcahya
 * Pure Vanilla JavaScript — Zero Dependencies
 */

const projects = [
  {
    title: "The Daily Table",
    slug: "daily-table",
    category: "figma",
    categoryLabel: "Figma",
    type: "Restaurant",
    description:
      "A warm, editorial restaurant experience with responsive dining layouts, menu discovery, and polished reservation flows.",
    image: "./assets/screenshots/restaurant-preview.webp",
    alt: "The Daily Table restaurant homepage preview",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "./projects/restaurant-design-to-code/index.html",
    sourceUrl:
      "https://github.com/TinoNurcahya/design-to-code-showcase/tree/main/projects/restaurant-design-to-code",
  },
  {
    title: "CloudScale",
    slug: "cloudscale",
    category: "saas",
    categoryLabel: "SaaS",
    type: "Landing Page",
    description:
      "A crisp SaaS marketing interface with pricing interactions, metric storytelling, and flexible dark-mode presentation.",
    image: "./assets/screenshots/saas-preview.webp",
    alt: "CloudScale SaaS analytics dashboard preview",
    technologies: ["HTML", "Tailwind", "JavaScript"],
    liveUrl: "./projects/saas-design-to-code/index.html",
    sourceUrl:
      "https://github.com/TinoNurcahya/design-to-code-showcase/tree/main/projects/saas-design-to-code",
  },
  {
    title: "Atelier & Co.",
    slug: "atelier-co",
    category: "motion",
    categoryLabel: "Editorial",
    type: "Luxury Brand",
    description:
      "An art-forward editorial catalog with cinematic motion, elegant typography, and immersive long-form storytelling.",
    image: "./assets/screenshots/luxury-preview.webp",
    alt: "Atelier & Co luxury editorial catalog preview",
    technologies: ["HTML", "CSS", "GSAP"],
    liveUrl: "./projects/luxury-design-to-code/index.html",
    sourceUrl:
      "https://github.com/TinoNurcahya/design-to-code-showcase/tree/main/projects/luxury-design-to-code",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  renderProjects(projects);
  initProjectFilters();
  initStickyHeader();
  initMobileNav();
  initSmoothScroll();
  initCardAnimations();
  initCurrentYear();
});

function renderProjects(items) {
  const projectGrid = document.getElementById("project-grid");
  if (!projectGrid) return;

  projectGrid.innerHTML = items
    .map(
      (project) => `
    <article class="project-card" data-category="${project.category}" id="project-${project.slug}">
      <div class="card-preview">
        <div class="browser-header">
          <div class="browser-dots" aria-hidden="true">
            <span class="dot-red"></span>
            <span class="dot-yellow"></span>
            <span class="dot-green"></span>
          </div>
          <div class="browser-url">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>${project.title.toLowerCase().replace(/\s+/g, "-")}.demo</span>
          </div>
          <div class="browser-status-chip">
            <span class="status-dot"></span>
            <span>Live</span>
          </div>
        </div>

        <div class="preview-media-wrap">
          <span class="status-badge">
            <span class="status-dot" aria-hidden="true"></span>
            Complete
          </span>
          <img src="${project.image}" alt="${project.alt}" loading="lazy" width="800" height="500">
        </div>
      </div>

      <div class="card-body">
        <div class="card-top-meta">
          <span class="card-kicker">${project.categoryLabel}</span>
          <span class="card-type">${project.type}</span>
        </div>

        <h3 class="card-title">${project.title}</h3>
        <p class="card-desc">${project.description}</p>

        <ul class="card-tech">
          ${project.technologies.map((technology) => `<li>${technology}</li>`).join("")}
        </ul>

        <div class="card-links">
          <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live Demo</a>
          <a href="${project.sourceUrl}" target="_blank" rel="noopener noreferrer">Source Code</a>
        </div>
      </div>
    </article>
  `,
    )
    .join("");
}

function initProjectFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      cards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.style.display = match ? "" : "none";
      });
    });
  });
}

function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  window.addEventListener("scroll", handleScroll, {passive: true});
  handleScroll();
}

function initMobileNav() {
  const toggleBtn = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  if (!toggleBtn || !mobileNav) return;

  const toggleMenu = (open) => {
    const isExpanded = open !== undefined ? open : toggleBtn.getAttribute("aria-expanded") !== "true";
    toggleBtn.setAttribute("aria-expanded", String(isExpanded));
    mobileNav.classList.toggle("is-open", isExpanded);
    mobileNav.setAttribute("aria-hidden", String(!isExpanded));
  };

  toggleBtn.addEventListener("click", () => toggleMenu());

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggleBtn.getAttribute("aria-expanded") === "true") {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });
}

function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const header = document.querySelector(".site-header");
  const headerHeight = header ? header.offsetHeight : 72;

  anchorLinks.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();
      const offsetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 20);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      targetElement.setAttribute("tabindex", "-1");
      targetElement.focus({preventScroll: true});
    });
  });
}

function initCardAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const cards = document.querySelectorAll(".project-card");
  if (!("IntersectionObserver" in window) || cards.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    {threshold: 0.12, rootMargin: "0px 0px -30px 0px"},
  );

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(12px)";
    card.style.transition = `opacity 0.35s ease ${index * 0.08}s, transform 0.35s ease ${index * 0.08}s`;
    observer.observe(card);
  });
}

function initCurrentYear() {
  const currentYearEl = document.getElementById("currentYear");
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
}
