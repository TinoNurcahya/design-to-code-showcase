# Sylvane Conservation — Save Nature, Save Tomorrow

> A production-grade environmental conservation and sustainability landing page built as a design-to-code frontend portfolio project using **Semantic HTML5**, **Modern CSS3**, and **Vanilla JavaScript**.

[![Deployment](https://img.shields.io/badge/Deployment-GitHub%20Pages-2d6a4f?style=flat-square&logo=github)](https://tinonurcahya.github.io/design-to-code-showcase/projects/sustainability-v1/)
[![Tech Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-blue?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Design](https://img.shields.io/badge/Design-Sustainability%20Reference%202026-10b981?style=flat-square)](https://dribbble.com)
[![Dependencies](https://img.shields.io/badge/Dependencies-Zero%20External%20Libs-emerald?style=flat-square)](https://github.com/TinoNurcahya/design-to-code-showcase)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](../../LICENSE)

---

> **Portfolio Demonstration Notice:**  
> This is a fictional demonstration project (**"Sylvane Conservation"**) created to showcase advanced frontend engineering craftsmanship (converting complex UI references into clean, responsive, framework-free web code). All organization names, metrics, community statistics, and initiatives are created purely for demonstration and ethical portfolio display.

---

## Overview

**Sylvane Conservation** is a modern sustainability and ecological preservation landing page designed to inspire climate action, reforestation, and marine conservation. 

The implementation translates the visual reference into a fluid, self-contained web experience featuring:
- High-impact **Hero Composition** with an aerial forest split-view contrasting lush emerald rainforest with degraded ecosystem terrain.
- **Organic Floating Spores & Sunlight Dust**: Vanilla HTML5 Canvas particle system featuring Brownian motion, optical bokeh radial gradients, and interactive cursor breeze deflection with `IntersectionObserver` battery-saving auto-pause.
- **Staggered Text Reveal / Masked Headings**: Universal word-by-word reveal using overflow clipping masks and sequential stagger delays across the Hero and all major section headings (`#mission`, `#initiatives`, `#resources`, `#about`).
- **Magnetic Button Interactions**: Real-time physics pull towards the cursor with gentle spring recovery on all primary CTAs.
- **Floating Frosted-Glass Cards** with ambient CSS bobbing animations highlighting core focus areas (*Reforestation*, *Clean Oceans*, *Wildlife Protection*).
- Interactive **Video Modal** ("Watch Our Story") with accessible backdrop blur, keyboard traps, and focus management.
- **IntersectionObserver Stats Bar** with dynamic easing count-up animations (520K+ Trees, 120+ Communities, 350+ Projects, 100% For the Planet).
- **Our Mission 3-Card Bento Grid** with custom background photography and bottom glass badges.
- **Our Initiatives Carousel** featuring smooth scroll snapping, previous/next controls, and touch swipe gesture support.
- Vibrant lime **Newsletter Subscription Card** with avatar social proof and dynamic toast notification feedback.
- **Open Knowledge Hub / Resources Section**: 3-column Bento grid with live category filtering, document metadata badges, and interactive PDF download feedback.
- **Scroll-Driven Sinuous Botanical Vine Timeline**: A living SVG stem with $82\text{px}$ Bézier S-curves, upturned branch arcs, blooming leaf sprouts, and traveling seedling orb synchronizing milestone card reveals in the `#about` section.
- **Monochrome Partner Strip** ("Trusted By") with clean vector logos.
- Comprehensive 5-column accessible footer with semantic structure and social links.
- Zero runtime dependencies and fluid responsiveness down to 320px mobile screens with strict $\ge 12\text{px}$ typography.

---

## Page Architecture Flow

```
01. Header & Navigation (Brand Logo, Desktop Links, Magnetic Lime CTA, Mobile Drawer)
02. Hero Section (Split Aerial Forest, Spores Canvas, Masked Word Reveal, Video Trigger, 3 Floating Badges, Stats Grid)
03. Our Mission (3-Card Bento Grid: Land Use, Climate Action, Community)
04. Our Initiatives & Newsletter (3-Card Carousel + Vibrant Lime Callout Card)
05. Open Knowledge Hub / Resources (Bento Grid, Filter Tabs, PDF Download Feedback)
06. About Us / Founding Story (Scroll-Driven Sinuous Botanical Vine & Alternating Milestones)
07. Trusted By Partner Strip (6 Minimalist Monochromatic Vector Marks)
08. Comprehensive Footer (4-Column Links, Brand Manifesto, Social Icons, Sub-footer)
```

---

## Key Features & Engineering Highlights

### 1. Typography & Manrope Design System
- Styled using Google Font **Manrope** (400, 500, 600, 700, 800) for a modern, geometric, neo-grotesque eco-humanist aesthetic.
- Color palette based on deep forest greens (`#143d2b`, `#2d6a4f`), vibrant neon lime accent (`#c2e812`), and subtle off-white backdrops (`#f7f9f6`). Minimum font size strictly clamped to $\ge 12\text{px}$ (`0.75rem`).

### 2. Sinuous Botanical Vine & Milestone Synergy
- Dynamic SVG path calculations using native DOM coordinates (`getBoundingClientRect`).
- As the user scrolls through `#about`, an organic $82\text{px}$ S-curve vine stem draws downward with a glowing lime traveler orb, upturned branch boughs reach out to each milestone card, and botanical leaf sprouts bloom in sync with side card entrances.

### 3. Organic Floating Spores Canvas
- Lightweight Vanilla HTML5 Canvas particle system generating sunlight dust motes and bioluminescent bokeh spores.
- Responds to mouse movement with organic breeze deflection, and uses `IntersectionObserver` to automatically halt animation frames when out of view, preserving 100% of GPU/CPU resources.

### 4. Masked Headings & Staggered Reveal
- Pure Vanilla CSS overflow masks paired with automated JS transition-delay sequencing.
- Elevates typography from Hero through all content sections with accessible `aria-label` markup and `prefers-reduced-motion` compliance.

### 5. Touch-Enabled Initiatives Carousel & Resources Hub
- Pure vanilla carousel supporting mouse button clicks, programmatic scroll distance calculations, and mobile touch swipe events (`touchstart` and `touchend`).
- Dynamic category filter tabs and simulated PDF downloads with asynchronous state transitions and toast notifications.

---

## Folder Structure

```
projects/sustainability-v1/
├── index.html                     # Live project entry point
├── README.md                      # Project documentation & specifications
├── css/
│   └── style.css                  # Responsive design tokens & styles
├── js/
│   └── script.js                  # Vanilla JS interactions (counters, canvas, vine, carousel, modal, toast)
└── assets/
    ├── icons/
    │   ├── favicon.svg            # Custom SVG favicon
    │   └── logo-sylvane.svg       # Vector brand logo mark
    ├── images/                    # Local photography assets
    │   ├── hero-split-forest.jpg
    │   ├── thumb-reforestation.jpg
    │   ├── thumb-ocean.jpg
    │   ├── thumb-wildlife.jpg
    │   ├── mission-land.jpg
    │   ├── mission-climate.jpg
    │   ├── mission-community.jpg
    │   ├── initiative-ocean.jpg
    │   ├── initiative-forest.jpg
    │   ├── initiative-community.jpg
    │   ├── avatar-1.jpg
    │   ├── avatar-2.jpg
    │   └── avatar-3.jpg
    └── videos/
        └── nature-preview.mp4     # Demonstration environmental documentary reel
```

---

## Browser Support & Performance

- **Chrome / Edge**: Flawless hardware-accelerated animations and backdrop blur.
- **Firefox**: Full CSS Grid, Flexbox, and filter support.
- **Safari / iOS**: Webkit backdrop blur prefixes and fluid touch scrolling.
- **Zero Third-Party Bundles**: Pure standard web technologies for instant sub-second load times.

---

## Author

**Tino Nurcahya**  
Frontend Developer specializing in pixel-perfect Design-to-Code conversions.
- [GitHub Showcase Repository](https://github.com/TinoNurcahya/design-to-code-showcase)
- Available for freelance design-to-code contracts on Upwork.
