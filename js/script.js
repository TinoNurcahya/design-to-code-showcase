/**
 * Design-to-Code Showcase — Interactive Logic
 * Author: Tino Nurcahya
 * Pure Vanilla JavaScript — Zero Dependencies
 */

const projects = [
  {
    title: "The Daily Table",
    slug: "daily-table",
    categoryLabel: "Figma",
    type: "Restaurant",
    badge: "Figma → HTML",
    image: "./assets/screenshots/restaurant-preview.webp",
    alt: "The Daily Table restaurant homepage preview",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "./projects/restaurant-v1/index.html",
    sourceUrl:
      "https://github.com/TinoNurcahya/design-to-code-showcase/tree/main/projects/restaurant-v1",
  },
  {
    title: "CloudScale",
    slug: "cloudscale",
    categoryLabel: "SaaS",
    type: "Landing Page",
    badge: "Design → Tailwind",
    image: "./assets/screenshots/saas-preview.webp",
    alt: "CloudScale SaaS analytics dashboard preview",
    technologies: ["HTML5", "Tailwind", "JavaScript"],
    liveUrl: "./projects/saas-v1/index.html",
    sourceUrl:
      "https://github.com/TinoNurcahya/design-to-code-showcase/tree/main/projects/saas-v1",
  },
  {
    title: "Atelier & Co.",
    slug: "atelier-co",
    categoryLabel: "E-Commerce",
    type: "Luxury Marketplace",
    badge: "Figma → E-Commerce",
    image: "./assets/screenshots/luxury-preview.webp",
    alt: "Atelier & Co luxury editorial catalog preview",
    technologies: ["HTML5", "CSS3", "GSAP"],
    liveUrl: "./projects/ecommerce-v1/index.html",
    sourceUrl:
      "https://github.com/TinoNurcahya/design-to-code-showcase/tree/main/projects/ecommerce-v1",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderProjects(projects);
  initCurrentYear();
});

/**
 * Render Bento Project Cards with Symmetrical 16:10 Ratio & Permanent Meta Bar
 */
function renderProjects(items) {
  const projectGrid = document.getElementById("project-grid");
  const countEl = document.querySelector("#project-count .dock-count-text");

  if (countEl) {
    countEl.textContent = `${items.length} ${items.length === 1 ? "Project" : "Projects"}`;
  }

  if (!projectGrid) return;

  projectGrid.innerHTML = items
    .map(
      (project) => `
    <article 
      class="project-card" 
      id="project-${project.slug}"
      tabindex="0"
      role="link"
      aria-label="Open ${project.title} live demo"
      data-live-url="${project.liveUrl}">
      
      <div class="card-media">
        <img 
          src="${project.image}" 
          alt="${project.alt}" 
          loading="lazy" 
          width="800" 
          height="500" />
        
        <div class="card-media-overlay">
          <a 
            href="${project.liveUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn-pill btn-pill-primary"
            onclick="event.stopPropagation();">
            <span>Live Demo</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>

          <a 
            href="${project.sourceUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn-pill btn-pill-secondary"
            onclick="event.stopPropagation();">
            <span>Code</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>
      </div>

      <div class="card-footer-meta">
        <div class="meta-left">
          <h2 class="card-title-text">${project.title}</h2>
        </div>
        <div class="meta-right">
          <span class="card-type-badge">${project.badge || project.categoryLabel}</span>
          <span class="card-arrow-icon" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </span>
        </div>
      </div>
    </article>
  `,
    )
    .join("");

  // Card click & keyboard navigation listeners
  const cards = projectGrid.querySelectorAll(".project-card");
  cards.forEach((card) => {
    const liveUrl = card.dataset.liveUrl;
    if (!liveUrl) return;

    card.addEventListener("click", () => {
      window.open(liveUrl, "_blank", "noopener,noreferrer");
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        window.open(liveUrl, "_blank", "noopener,noreferrer");
      }
    });
  });
}

/**
 * Color Theme Toggle (Dark & Light) with localStorage persistence
 */
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "dark"); // Default sleek dark

  document.documentElement.setAttribute("data-theme", initialTheme);

  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  updateThemeButtonAria(toggleBtn, initialTheme);

  toggleBtn.addEventListener("click", (event) => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    const updateThemeState = () => {
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);
      updateThemeButtonAria(toggleBtn, nextTheme);
    };

    // Check if View Transition is supported and reduced motion is NOT active
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || isReducedMotion) {
      updateThemeState();
      return;
    }

    // Determine circular ripple origin from toggle button coordinates
    const rect = toggleBtn.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;

    // Calculate maximum radius to the furthest corner of viewport
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      updateThemeState();
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
          duration: 520,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  });
}

function updateThemeButtonAria(btn, theme) {
  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  btn.setAttribute("aria-label", label);
  btn.setAttribute("title", label);
}

/**
 * Dynamic Year in Footer
 */
function initCurrentYear() {
  const currentYearEl = document.getElementById("currentYear");
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
}
