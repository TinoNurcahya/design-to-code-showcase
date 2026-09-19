# Atelier & Co. — Luxury Editorial Catalog 🏛️

> A refined, high-fashion luxury editorial catalog website built as a design-to-code frontend portfolio project using **Semantic HTML5**, **Vanilla CSS3**, **Vanilla JavaScript**, **GSAP 3**, **GSAP ScrollTrigger**, and **Lenis Smooth Scroll**.

[![Deployment](https://img.shields.io/badge/Deployment-GitHub%20Pages-c4a97d?style=flat-square&logo=github)](https://tinonurcahya.github.io/design-to-code-showcase/projects/luxury-design-to-code/)
[![Tech Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20Vanilla%20CSS3%20%7C%20GSAP%203%20%7C%20Lenis-141312?style=flat-square)](https://greensock.com/gsap/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](../../LICENSE)

---

## 📌 Overview

**Atelier & Co.** is a fictional high-end fashion and lifestyle editorial catalog created to demonstrate frontend translation of Awwwards-style editorial web design. The project prioritizes quiet luxury aesthetics: warm ivory bone tones (`#fbf9f5`), deep ink typography (`#121212`), muted stone secondary accents (`#706e6b`), asymmetric grid structures, and subtle cinematic motion.

### Core Objectives:
- **Editorial Art Direction**: Demonstrates restraint and typography discipline—no tacky gold glitter, neon glow, or excessive glassmorphism.
- **Pure Vanilla CSS Architecture**: 100% bespoke CSS3 with custom properties, fluid `clamp()` scales, and asymmetric CSS Grid.
- **100% Self-Contained Motion Stack**: Production vendor libraries (`gsap.min.js`, `ScrollTrigger.min.js`, `lenis.min.js`) are bundled locally inside `js/vendor/` for reliable offline execution and guaranteed GitHub Pages uptime.
- **Adaptive Layout Engineering**: Pinned horizontal scroll container dynamically unpins into a natural vertical stack on tablet and mobile viewports.

---

## ✨ Key Features

1. **Minimal Luxury Navigation**:
   - Fixed header with subtle frosted paper elevation (`backdrop-filter: blur(14px)`) upon scrolling past 60px.
   - Slender tracked brand mark, primary editorial links, search and bag demonstrations.
   - Smooth full-screen mobile drawer overlay with keyboard accessibility (`Esc` to close).

2. **Campaign Hero Section**:
   - Asymmetric 1.15:0.85 grid composition pairing large editorial typography with campaign photography.
   - Line reveal typography (`clamp(2.75rem, 6.5vw, 5.75rem)`).
   - Parallax image zoom frame and subtle scroll indicator.

3. **Intro Editorial Statement**:
   - Generous breathing room and typographic hierarchy featuring pullquote from Creative Director Helena Vance.

4. **Curated Collection Grid (`#collection`)**:
   - 12-column asymmetric editorial layout showcasing 6 bespoke objects across varying aspect ratios (16:11, 4:5, 3:4, 16:9).
   - Micro-interaction hover states with directional arrow shifts and contextual cursor states (`VIEW`).

5. **Interactive Editorial Feature (`#editorial`)**:
   - Slide-based visual essay (*"Between Form and Function"*) with interactive counter (`01 / 03`), cross-fading typography, and smooth image transitions.

6. **Pinned Horizontal Editorial Studies (`#studies`)**:
   - Immersive contrast section rendered in deep espresso black (`#141312`).
   - Powered by GSAP ScrollTrigger desktop pinning (`min-width: 1024px`) with dynamic horizontal translation and progress tracker bar.
   - Automatic fallback into a vertical stack on mobile screens (< 1024px) preventing horizontal scroll lockouts.

7. **A Study in Material (`#materials`)**:
   - 4-column macro photography archive exploring Italian Virgin Wool, Full-Grain Calfskin, Mongolian Cashmere, and Organic Milled Cotton.

8. **Featured Object Deep-Dive**:
   - Comprehensive focus on *The Copenhagen Carryall* featuring technical dimensions, hardware specifications, provenance, and edition limits.

9. **Lookbook Sequence (`#lookbook`)**:
   - 5-plate asymmetric publication mosaic with staggered vertical offsets and varying focal weights.

10. **The Journal Index (`#journal`)**:
    - Magazine-inspired editorial table featuring essay numbers, titles, excerpts, and publication dates.

11. **Minimalist Newsletter Section**:
    - Inline single-rule subscription form with client-side regex email validation and feedback banner.

12. **Custom Desktop Cursor Follower**:
    - Spring-physics circular cursor follower with contextual state labels (`VIEW`, `DISCOVER`, `DRAG`).
    - Context-aware dark/light theme inversion.
    - Completely disabled on touch devices (`@media (hover: none) and (pointer: coarse)`).

---

## 🛠️ Tech Stack

- **Markup**: Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<blockquote>`, `<table>`, `<footer>`)
- **Styling**: Vanilla CSS3 (Custom Properties, Fluid Typography, Asymmetric Grid, Flexbox)
- **Scripting**: Pure Vanilla JavaScript (ES6+, DOM APIs, Event Listeners)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis) (Local v1.1.18 in `js/vendor/`)
- **Motion & Scroll Triggers**: [GSAP 3](https://greensock.com/gsap/) & [ScrollTrigger](https://greensock.com/scrolltrigger/) (Local v3.12.5 in `js/vendor/`)
- **Typography**: Cormorant Garamond (editorial serif) & Inter (clean UI sans) via Google Fonts
- **Imagery**: Curated high-aesthetic fashion and architectural photography converted to modern WebP

---

## 📁 Directory Structure

```
projects/luxury-design-to-code/
│
├── index.html                     # Luxury editorial catalog page
├── README.md                      # Project documentation
├── favicon.ico                    # Multi-resolution favicon
├── favicon-32x32.png              # Standard favicon
├── favicon-16x16.png              # Small favicon
├── apple-touch-icon.png           # iOS web clip icon
│
├── css/
│   └── style.css                  # Bespoke Vanilla CSS3 design system
│
├── js/
│   ├── script.js                  # Lenis setup, GSAP timelines, cursor follower
│   └── vendor/                    # Local self-contained vendor libraries
│       ├── gsap.min.js            # GreenSock Animation Platform v3.12.5
│       ├── ScrollTrigger.min.js   # GSAP ScrollTrigger Plugin v3.12.5
│       └── lenis.min.js           # Lenis Smooth Scroll v1.1.18
│
└── assets/
    ├── icons/                     # Logo mark and SVG icons
    └── images/                    # Optimized WebP editorial photography
        ├── hero-campaign.webp
        ├── editorial-study-1.webp
        ├── editorial-study-2.webp
        ├── editorial-study-3.webp
        ├── product-01.webp (Structured Wool Coat)
        ├── product-02.webp (Copenhagen Carryall)
        ├── product-03.webp (Fine Knit Polo)
        ├── product-04.webp (Soft Tailored Trouser)
        ├── product-05.webp (Sculpted Loafer)
        ├── product-06.webp (Cashmere Over-Layer)
        ├── material-wool.webp
        ├── material-leather.webp
        ├── material-cashmere.webp
        ├── material-cotton.webp
        ├── lookbook-01.webp
        ├── lookbook-02.webp
        ├── lookbook-03.webp
        ├── lookbook-04.webp
        └── lookbook-05.webp
```

---

## ♿ Accessibility & Performance

- **Reduced Motion Support**: Bypasses Lenis smooth scroll and disables transform animations when `prefers-reduced-motion: reduce` is detected.
- **Semantic Hierarchy**: Single `<h1>` on the page with logical `<h2>` and `<h3>` heading descent.
- **Image Optimization**: Images below the fold utilize `loading="lazy"` with explicit `width` and `height` dimensions to eliminate Layout Shift (CLS). The campaign hero image utilizes `fetchpriority="high"`.
- **Keyboard Navigation**: Drawer menu and buttons maintain focus rings and respond to keyboard interactions (`Escape` to dismiss mobile navigation).

---

## 🌐 Live Demo & Repository Hub

- **Live Demo**: [https://tinonurcahya.github.io/design-to-code-showcase/projects/luxury-design-to-code/](https://tinonurcahya.github.io/design-to-code-showcase/projects/luxury-design-to-code/)
- **Showcase Hub**: [Back to Main Repository Hub](../../index.html)

---

## 📄 License

This project is open source and available under the [MIT License](../../LICENSE).
