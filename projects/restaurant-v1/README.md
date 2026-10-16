# Restaurant Design to Code — The Daily Table

A responsive restaurant & cafe website created as a design-to-code frontend project using semantic HTML5, modern CSS3, and Vanilla JavaScript.

> **Portfolio Demonstration Notice:**  
> This is a fictional portfolio project created to showcase frontend development capabilities (Figma/PSD/XD to HTML conversion, responsive layouts, accessibility, and clean vanilla web development). All restaurant names, menu items, copy, and branding are created for demonstration purposes.

---

## Overview

**The Daily Table** ("Good food. Good coffee. Good moments.") is an editorial, warm-toned restaurant and cafe landing page designed to demonstrate production-grade frontend craftsmanship without reliance on heavy frameworks or external CSS libraries.

The project translates an extensive restaurant visual reference into a fully responsive, pixel-accurate, self-contained website featuring dynamic category filtering, an editorial photo gallery with lightbox, custom interactive reservation demo validation, and mobile drawer navigation.

---

## Features

- **Semantic HTML5 Architecture**: Proper document outline (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<aside>`, `<address>`) with accessible ARIA attributes.
- **Warm Editorial Visual Aesthetics**:
  - Curated color tokens: warm off-white background (`#FAF7F2`), deep charcoal (`#1C1917`), and muted terracotta accent (`#C85A32`).
  - Google Fonts pairing: *Great Vibes* (cursive script for authentic restaurant titles) and *Plus Jakarta Sans* (clean geometric body & UI).
  - Chalkboard-style Opening Hours card inspired by culinary reference designs.
- **Interactive Menu Category Filtering**: Pure Vanilla JavaScript tab filtering (All, Breakfast, Main Course, Dessert, Coffee) with smooth CSS transitions.
- **Editorial Food Gallery & Lightbox**: Asymmetric grid layout with hover overlays, zoom triggers, and a keyboard-accessible modal lightbox (`ESC` key support).
- **Client-Side Reservation Form Validation**: Demonstrates real-time input validation (name length, valid email pattern, international phone format, date/time/guest selection) with interactive demo feedback toast.
- **Mobile-First Responsive Navigation**: Accessible off-canvas sliding drawer with focus management, backdrop dismiss, and ARIA state sync.
- **Subtle Micro-Animations**: Smooth scroll reveal using `IntersectionObserver`, hover elevation, and full respect for `prefers-reduced-motion`.
- **Zero External Library Dependencies**: Built with native Web APIs; all icons are handcrafted inline SVGs.
- **GitHub Pages Ready**: 100% self-contained with relative paths and modern, lightweight `.webp` image assets (saving ~31% bandwidth).

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure, accessibility landmarks, form attributes |
| **CSS3** | CSS custom properties (`:root`), Flexbox, CSS Grid, `clamp()` fluid typography, transitions |
| **Vanilla JavaScript (ES6+)** | Category filtering, lightbox modal, form validation, drawer navigation, scroll spy |
| **Google Fonts** | *Great Vibes* (script headings) & *Plus Jakarta Sans* (body & UI text) |
| **Inline SVG** | Scalable, lightweight vector icons with zero external CDN dependency |

---

## Responsive Design

Tested and optimized across all major device viewports:

- **Desktop (1440px+)**: 1220px max-width container, 4-column cards, 3-column asymmetric gallery, sticky blurred navigation.
- **Laptop (1024px – 1439px)**: Proportional scaling, 2-column featured cards, balanced typography.
- **Tablet (768px – 1023px)**: 2-column menu layout, hamburger menu trigger, touch-friendly tap targets.
- **Mobile (320px – 767px)**: Fluid single-column layout, off-canvas navigation drawer, stacked reservation form, zero horizontal overflow.

---

## Project Structure

```
restaurant-design-to-code/
├── index.html                  # Main semantic HTML5 document
├── README.md                   # Project documentation & portfolio notes
├── css/
│   └── style.css               # Design tokens, layouts, components, responsive media queries
├── js/
│   └── script.js               # Mobile drawer, filtering, lightbox, form validation
└── assets/
    ├── images/                 # Local culinary WebP photography (hero, dishes, team, blog)
    ├── icons/                  # Favicons (32x32, 16x16, apple-touch, ico) & vector assets
    └── fonts/                  # Font resources & CDN references
```

---

## Running Locally

Because this project is built entirely with native web technologies, no build tools, bundlers, or package installations (`npm`/`yarn`) are required.

### Option 1: Direct File Preview
Simply double-click `index.html` or open it directly in any modern web browser (Chrome, Safari, Firefox, Edge).

### Option 2: Local HTTP Server (Recommended)
Using Python or Node.js to serve the directory:

```bash
# Using Python 3
python -m http.server 8080

# Using Node.js (npx serve)
npx serve .
```
Then navigate to `http://localhost:8080` in your browser.

---

## Live Demo

This project can be deployed directly to **GitHub Pages** by enabling Pages in repository settings:
- Source: `Deploy from a branch`
- Branch: `main` / folder: `root` or `/docs`

---

## Screenshots

*(Screenshots will display here upon capturing)*

- Desktop Homepage Showcase
- Menu Category Filter & Dish Details
- Responsive Mobile Drawer & Touch Layout
- Interactive Reservation Modal Demo

---

## What I Practiced

1. **Pixel & Hierarchy Accuracy**: Analyzing a complex visual layout, extracting spacing and grid systems, and translating them into robust native CSS.
2. **Design Tokens & Scalability**: Implementing a consistent CSS variable system across light and dark themed sections.
3. **Vanilla DOM Interaction**: Implementing clean, dependency-free interactive features (tabs, lightbox, drawer, validation).
4. **Accessible UX**: Ensuring proper semantic hierarchy (`h1`-`h4`), form labels with error announcements, visible `:focus-visible` rings, and `prefers-reduced-motion` fallbacks.
5. **Production Readiness**: Writing clean, readable, self-documenting code structured to freelance agency standards.
