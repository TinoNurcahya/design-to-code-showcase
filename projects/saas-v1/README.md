# CloudScale — SaaS Analytics Platform 📊

> A responsive enterprise SaaS analytics landing page built as a design-to-code frontend portfolio project using **HTML5**, **Tailwind CSS v4**, and **Vanilla JavaScript**.

[![Deployment](https://img.shields.io/badge/Deployment-GitHub%20Pages-2563eb?style=flat-square&logo=github)](https://tinonurcahya.github.io/design-to-code-showcase/projects/saas-design-to-code/)
[![Tech Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20Tailwind%20CSS%20v4%20%7C%20Vanilla%20JS-blue?style=flat-square)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](../../LICENSE)

---

## 📌 Overview

**CloudScale** is a fictional enterprise SaaS observability and analytics platform designed to demonstrate modern, high-fidelity frontend development capabilities. The landing page showcases how multi-team telemetry (Infrastructure, Product, Engineering, and Revenue) can be unified into an ultra-fast, data-oriented web application with zero framework overhead.

### Key Highlights:
- **Design-to-Code Implementation**: High fidelity, typography scales, tight data density, and clean visual hierarchy.
- **Tailwind CSS v4 Workflow**: Built using Tailwind v4's CSS-first `@theme` configuration and `@custom-variant dark` variant.
- **Zero Framework Bloat**: Pure Vanilla JavaScript for all interactions (tabs, pricing toggle, counters, theme, accordion).
- **GitHub Pages Ready**: Pre-compiled `dist/output.css` ensures zero-build instant static hosting.

---

## ✨ Features

- **Enterprise Hero Section**: Realistic HTML/CSS/SVG dashboard mockup featuring live revenue, DAU, API throughput, P95 latency indicators, real-time area chart, and simulated event ingestion stream.
- **Interactive Multi-Team Workspace**: 4 interactive tabs (`Executive`, `Product`, `Engineering`, `Revenue`) with dedicated charts, SLI/SLO metrics, and unit economics.
- **Animated Statistics**: IntersectionObserver-powered numeric counters (`12.4B+` events, `99.99%` uptime, `180+` PoPs).
- **Alternating Deep Capabilities**: 4 detailed architectural pillars with custom interface vignettes.
- **Feature Comparison Matrix**: Responsive table with a **sticky feature column** for effortless horizontal scrolling on mobile screens.
- **Dynamic Pricing Calculator**: Instant Monthly ↔ Annual billing toggle reflecting a 20% discount with smooth transitions.
- **Accessible FAQ Accordion**: Keyboard-accessible (`Enter`/`Space`), screen-reader friendly (`aria-expanded`).
- **Full Dark / Light Mode**: Seamless theme switching with `localStorage` persistence and system OS fallback.

---

## 🛠️ Tech Stack

- **Markup**: Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<aside>`, `<table>`, `<footer>`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/cli` v4.3.3)
- **Scripting**: Pure Vanilla JavaScript (ES6+, DOM APIs, IntersectionObserver)
- **Typography**: Inter (UI font) & JetBrains Mono (data/code font) from Google Fonts
- **Icons & Graphics**: Pure inline SVG graphics

---

## 🌓 Dark / Light Theme Engine

The theme engine supports both Dark Mode (default enterprise observability look) and Light Mode:
- **Persistence**: Remembers user preference in `localStorage` under `cloudscale-theme`.
- **System Fallback**: Defaults to `prefers-color-scheme` if no explicit choice was saved.
- **CSS Architecture**: Configured via `@custom-variant dark (&:where(.dark, .dark *));` in `src/input.css` ensuring contrast across cards, charts, and tables.

---

## 📁 Project Structure

```
projects/saas-design-to-code/
│
├── index.html                 # Production landing page
├── package.json               # NPM scripts & Tailwind v4 CLI devDependencies
├── src/
│   ├── input.css              # Tailwind v4 source with @theme tokens & dark variant
│   └── script.js              # Vanilla JS interactions (theme, tabs, counters, FAQ)
│
├── dist/
│   └── output.css             # Compiled, minified Tailwind stylesheet (~56KB)
│
├── assets/
│   ├── icons/                 # SVG icons
│   └── images/                # Visual mockups
└── README.md                  # Project documentation
```

---

## 💻 Running Locally

No web server is strictly required; you can open `index.html` directly in any modern browser:

```bash
# Clone the repository
git clone https://github.com/TinoNurcahya/design-to-code-showcase.git
cd design-to-code-showcase/projects/saas-design-to-code

# Open directly in browser
start index.html
```

Or run a local HTTP server:
```bash
npx serve .
```

---

## 🎨 Building Tailwind CSS v4

To customize styles or rebuild the CSS bundle:

```bash
# 1. Install dependencies
npm install

# 2. Build minified CSS for production
npm run build:css

# 3. Watch for changes during development
npm run watch:css
```

---

## 📱 Responsive Breakpoints Tested

- **Mobile (320px – 640px)**: Compact header, mobile drawer navigation, stacked metrics, horizontally scrollable comparison matrix with sticky first column.
- **Tablet (768px – 1024px)**: 2-column grid layouts, expanded dashboard tabs, responsive chart dimensions.
- **Desktop (1024px – 1440px+)**: Full 4-column overview cards, 3-column pricing grid, multi-column dashboard views.

---

## 🚀 What I Practiced

1. Building enterprise-grade dashboard mockups using only HTML, Tailwind CSS, and SVG.
2. Setting up and compiling the latest Tailwind CSS v4 with custom CSS-first design tokens.
3. Writing clean, accessible Vanilla JavaScript without reliance on heavy UI frameworks or jQuery.
4. Implementing resilient responsive tables that preserve row-by-row comparisons on narrow viewports.
5. Managing multi-theme state (dark/light) with system preference detection and storage persistence.

---

## ⚠️ Disclaimer

**CloudScale is a fictional SaaS product created solely for frontend design-to-code portfolio demonstration purposes.**  
All metrics, customer testimonials, client logos, and pricing tiers are non-functional demonstrations.

---

## 👨‍💻 Author

**Tino Nurcahya**  
Frontend Developer specializing in Design-to-Code & Responsive Web Engineering.
- GitHub: [@TinoNurcahya](https://github.com/TinoNurcahya)
- Repository Hub: [Design-to-Code Showcase](../../index.html)
