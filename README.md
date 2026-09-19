# Design-to-Code Showcase Hub 🚀

> A curated collection of pixel-perfect, responsive frontend implementations converting design files (Figma, PSD, XD, and visual references) into clean, modern, production-ready code.

[![GitHub Pages Deployment](https://img.shields.io/badge/Deployment-GitHub%20Pages-2d6a5a?style=flat-square&logo=github)](https://tinonurcahya.github.io/design-to-code-showcase/)
[![Tech Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-blue?style=flat-square)](https://github.com/TinoNurcahya/design-to-code-showcase)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 📌 Repository Purpose

This repository serves as a **specialized frontend engineering showcase** for prospective freelance clients (Upwork, direct contracts, agencies) looking for high-fidelity **design-to-code implementation services**, including:

- **Figma to HTML / CSS / JS**
- **PSD to Responsive HTML**
- **Adobe XD to Clean Code**
- **Visual Reference / Screenshot to Code**
- **Pixel-Perfect Frontend Slicing**
- **Responsive Web Design (320px to 4K)**

Each project inside this repository is a standalone implementation built strictly with **semantic HTML5**, **modern CSS3**, and **Vanilla JavaScript** — zero unnecessary framework bloat or library dependencies.

---

## 📂 Showcase Projects

| # | Project | Source Type | Tech Stack | Status | Live Demo | Source Code |
|---|---|---|---|---|---|---|
| **01** | **[The Daily Table](projects/restaurant-design-to-code/)**<br>Restaurant &amp; Café Landing Page | Visual Reference / JPG | HTML5, CSS3 Grid/Flex, Vanilla JS, WebP | `Completed` | [Live Demo ↗](./projects/restaurant-design-to-code/index.html) | [View Code ↗](./projects/restaurant-design-to-code/) |
| **02** | **[CloudScale](projects/saas-design-to-code/)**<br>SaaS Analytics Dashboard | Figma File | HTML5, Modern CSS, Theme Engine | `In Progress` | *Coming Soon* | [View Code ↗](./projects/saas-design-to-code/) |
| **03** | **[Atelier &amp; Co.](projects/luxury-design-to-code/)**<br>Luxury Fashion Editorial Catalog | PSD / XD | HTML5, CSS Grid, Micro-Interactions | `In Progress` | *Coming Soon* | [View Code ↗](./projects/luxury-design-to-code/) |

---

## 🛠️ Architecture & Engineering Principles

1. **Pixel-Perfect Fidelity**: Meticulous attention to typography hierarchies, spacing scales, color fidelity, borders, and visual rhythm as defined in design files.
2. **Clean Semantic HTML5**: Accessible, search-engine friendly markup (`<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`) with proper ARIA attributes.
3. **Fluid Responsive Design**: Mobile-first architecture using CSS Grid, Flexbox, and `clamp()` fluid scales ensuring smooth transitions across 320px, 768px, 1024px, and 1440px+ viewports.
4. **Zero Dependency Bloat**: Lightweight vanilla code. Fast loading speeds, minimal HTTP requests, and optimized assets (SVG & WebP).
5. **Standardized Architecture**: Every sub-project follows an isolated, predictable folder hierarchy for easy maintenance and portability.

---

## 📁 Repository Structure

```
design-to-code-showcase/
├── index.html                     # Central showcase hub homepage
├── README.md                      # Repository documentation & project catalog
├── css/
│   └── style.css                  # Showcase hub design system & styling
├── js/
│   └── script.js                  # Showcase hub interactions & mobile menu
├── assets/
│   └── screenshots/               # Card previews & mockup graphics
│       ├── restaurant-preview.webp
│       ├── saas-preview.svg
│       └── luxury-preview.svg
└── projects/                      # Standalone design-to-code projects
    ├── restaurant-design-to-code/ # Project 01: Restaurant & Café
    │   ├── index.html
    │   ├── README.md
    │   ├── css/
    │   │   └── style.css
    │   ├── js/
    │   │   └── script.js
    │   └── assets/
    ├── saas-design-to-code/       # Project 02: SaaS Analytics Platform
    │   ├── index.html
    │   ├── css/
    │   └── js/
    └── luxury-design-to-code/     # Project 03: Luxury Editorial Catalog
        ├── index.html
        ├── css/
        └── js/
```

---

## 🚀 Adding a New Project

To add a new design-to-code project to this showcase:

1. Create a dedicated directory under `projects/`:
   ```bash
   mkdir -p projects/my-new-project/{css,js,assets}
   ```
2. Build the project using semantic HTML5, Vanilla CSS, and Vanilla JS.
3. Take a desktop preview screenshot (e.g. 800x500px) and save it to `assets/screenshots/my-new-project-preview.webp`.
4. Add a new `<article class="project-card">` in the root `index.html` referencing `./projects/my-new-project/index.html`.
5. Update the project table in this `README.md`.

---

## 🌐 GitHub Pages Deployment

This repository is optimized for deployment via **GitHub Pages**:

1. Go to repository **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
3. Select branch `main` and folder `/ (root)`.
4. Click **Save**. The showcase hub will be live at:
   `https://<username>.github.io/design-to-code-showcase/`

All asset references and sub-project links use relative paths (`./css/...`, `./projects/...`) to guarantee flawless navigation under GitHub Pages subdirectory routing.

---

## 👨‍💻 Author & Contact

**Tino Nurcahya**  
Frontend Developer specializing in Design-to-Code conversions.

- **GitHub**: [@TinoNurcahya](https://github.com/TinoNurcahya)
- **Upwork**: Available for freelance hire on Upwork

---

## 📄 License

This repository is licensed under the [MIT License](LICENSE).
