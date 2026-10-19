---
name: slicing
description: >-
  Expert frontend slicing and design-to-code conversion workflow. Use this skill
  whenever the user asks to slice a design, convert Figma, PSD, XD, wireframe,
  image, or screenshot into clean code, build a new frontend showcase project, or
  implement pixel-perfect, responsive web interfaces using semantic HTML5, modern
  CSS3, and Vanilla JavaScript.
---

# Design-to-Code Frontend Slicing Skill

This skill guides the agent through an end-to-end, high-fidelity frontend slicing workflow. It ensures that any design reference (Figma, screenshot, visual asset, wireframe, or concept prompt) is transformed into production-ready, accessible, and responsive code strictly matching the engineering standards of this repository.

---

## 📚 Bundled Resources & References

Skills dalam Antigravity beroperasi dengan prinsip **Progressive Disclosure**: direktori `resources/` dan `references/` **TIDAK di-inject otomatis sekaligus ke context awal**. Agent hanya mengetahui keberadaan file-file tersebut melalui daftar tautan di bawah ini.

> [!IMPORTANT]
> **MANDATORY PRE-READ PROTOCOL (WAJIB BACA SEBELUM CODING)**:
> Sebelum menulis satu baris kode pun (di Step 0), agent **WAJIB secara nyata memanggil tool `view_file`** ke berkas-berkas referensi di bawah ini. Dilarang keras berasumsi atau mengabaikan berkas internal skill ini:

1. **Domain & Pacing Blueprint**: [references/domain_archetypes.md](./references/domain_archetypes.md) — **WAJIB DIBACA di Step 0**. Berisi 9 cetak biru arketipe industri (Fintech, Luxury, HealthTech 3A–3D, DevTools, Dining, Real Estate, Creative Studio, EV, EdTech), aturan *Consecutive Layout Ban*, ritme densitas visual, dan panduan *Signature Domain Interactive Anchor*.
2. **Design Tokens & Reset Template**: [resources/boilerplate_tokens.css](./resources/boilerplate_tokens.css) — **WAJIB DIBACA di Step 0 / Step 2**. Berisi baseline `:root` variables (colors, fluid `clamp()` typography, spacing scale, glassmorphism, transitions) dan modern CSS reset.
3. **Creative Interactions & Motion Playbook**: [references/creative_interactions.md](./references/creative_interactions.md) — **WAJIB DIBACA di Step 0**. Katalog teknik animasi dan interaksi kreatif tingkat lanjut (GSAP, Lenis, Canvas image sequences, Spline 3D, Rive, WebGL shaders, circular reveals, magnetic buttons) tanpa build overhead.
4. **QA & Testing Checklist**: [references/qa_checklist.md](./references/qa_checklist.md) — **WAJIB DIBACA di Step 5**. Checklist komprehensif pengujian multi-breakpoint (320px–1440px+), verifikasi zero horizontal overflow (`scrollWidth <= clientWidth`), aksesibilitas ARIA & keyboard, dan audit console log.

---

## 🎯 Slicing Principles & Repository Rules

1. **Pixel-Perfect Fidelity & Zero Uninvited Elements**: Honor typography hierarchies, spacing scales, colors, border radiuses, and shadow elevations from the visual reference.
   - **DILARANG MENGADA-ADA ELEMEN YANG TIDAK ADA DI DESAIN**: **Jangan pernah menambahkan komponen dekoratif seperti "Pill Badge", "Eyebrow Tag / Chip", floating badges, atau subtitle tambahan jika di desain referensi aslinya TIDAK ADA**. Slicing harus setia pada tata letak asli gambar referensi.
2. **Vanilla-First Architecture with Creative Motion Allowance**: Default to pure Semantic HTML5, Modern CSS3 (CSS Variables & `clamp()`), and Vanilla JavaScript (ES6+). When the visual reference or project genre calls for award-winning/experiential motion, load creative libraries (such as GSAP, ScrollTrigger, Lenis, Spline, Three.js, Canvas image sequences) via trusted CDNs without build steps, adhering to [references/creative_interactions.md](./references/creative_interactions.md).
3. **Fluid & Mobile-First**: Build with responsive fluid typography (`clamp()`), CSS Flexbox, and CSS Grid. The layout must adapt gracefully from 320px mobile up to 1440px+ desktop with **zero horizontal scrollbar**.
4. **React & Component-Migration Readiness**: Markup and styling must be structured so that any developer can easily port the sliced project into **React**, **Next.js**, or **Vue** within minutes. Every UI section or card must map 1-to-1 to a self-contained component.
5. **Isolated Project Scope with Automatic Root Showcase Hub Registration**: Each slicing project lives in its own self-contained directory under `projects/<category>-v<version>/`. Upon successful completion and QA in Step 6, the agent **always automatically registers the project into the Root Showcase Hub** by:
   - Copying the original reference hero screenshot to `assets/screenshots/<slug>-preview.<ext>`.
   - Appending the project metadata object to the `projects` array in root `js/script.js` (`title`, `slug`, `categoryLabel`, `type`, `badge`, `image`, `alt`, `technologies`, `liveUrl`, `sourceUrl`).
   - (The project counter in `index.html` updates automatically on page load via `js/script.js`).
6. **Asset Integrity (STRICT)**:
   - **Icons**: Source from established icon libraries such as Lucide Icons, Font Awesome, or similar (use clean inline SVG markup).
   - **Images**: Generate custom visual assets using the `generate_image` tool directly.
   - **CRITICAL RESTRICTION**: **NEVER** use external image placeholders (such as Unsplash, Placehold.co, etc.).
   - **Asset Fallback**: If image generation is unavailable or hits a limit, copy relevant images from existing showcase projects (e.g., from `projects/healthcare-v1/assets/images/` or `projects/sustainability-v1/assets/images/`) into the new project's `assets/images/` and rename them semantically (e.g., `hero-banner.jpg`, `feature-preview.jpg`, `example.png`).
   - **Video vs. Static Image Policy (Proactive & Honest)**: If a section (such as a cinematic hero, luxury editorial reel, ambient nature backdrop, or tech background) would look significantly more alive and impressive with video rather than forcing a flat static image, **the agent MUST proactively say so in Step 0 and ask the user for a video file (MP4/WebM)**.
   - **Dual-Layer Video Implementation**: When video is agreed, implement `<video autoplay muted loop playsinline poster="assets/images/<slug>-poster.webp">` with source in `assets/videos/`. The agent MUST generate a matching high-resolution poster image locally via `generate_image` so if the user hasn't added the video file yet or if a mobile device has battery saver enabled, the UI renders the poster seamlessly with zero broken media boxes.
   - **Logo & Favicon Standards**:
     - **Logo**: Extracted or created as a transparent PNG file saved to `assets/images/logo.png`. Used in `<header>` and `<footer>` with descriptive `alt` text, accessible `aria-label`, and explicit height to prevent layout shift.
     - **Favicon**: Created as a matching brand icon saved to `assets/icons/favicon.ico` and linked in `<head>` via `<link rel="icon" type="image/x-icon" href="./assets/icons/favicon.ico">`.
7. **Zero-Assumption & Mandatory Grill-Me (WAJIB)**: If any requirement, design reference, visual spec, or user instruction is ambiguous, incomplete, or not fully understood, **NEVER GUESS OR START CODING IMMEDIATELY**. The agent is strictly required to pause and interview the user using the `ask_question` tool (one question at a time with a recommended answer) until full clarity is achieved.
8. **Typography Weight & Minimum Size Restriction (STRICT)**:
   - **Default Restriksi Bobot Tebal (Tanpa 700, 800, 900)**: Secara default gunakan `400` (Regular) untuk body, `500` (Medium) untuk headings/subtitles, dan maksimal `600` (SemiBold) untuk aksen.
   - **Pengecualian Desain Asli & Wajib Konfirmasi**: Aturan larangan ini **TIDAK BERLAKU jika desain sumber (Figma / gambar referensi) secara nyata menggunakan bobot 700, 800, atau 900**. Namun, agent **WAJIB mengonfirmasi terlebih dahulu kepada user di Step 0** (menanyakan apakah ingin mempertahankan ketebalan asli desain tersebut atau disesuaikan ke standar ramping 500/600) sebelum menggunakannya.
   - **Batas Minimum Ukuran Font (`12px` / `0.75rem`)**: **Dilarang keras memakai font-size di bawah 12px** untuk teks apapun (termasuk badge kecil, copyright, atau footnote) demi menjamin keterbacaan (legibility) dan aksesibilitas mobile WCAG.
9. **Dark Mode & Theme Policy (Strict Fidelity)**: **DILARANG MEMBUAT DARK MODE / THEME SWITCHER SECARA SEPIHAK** jika desain sumber hanya berupa Light Mode (atau sebaliknya). Fitur Dark Mode HANYA diimplementasikan jika desain referensi secara eksplisit menyertakan varian Dark Mode atau jika kamu secara eksplisit memintanya di prompt. Slicing harus setia pada tema asli desain sumber.
10. **Content Language Fidelity**: All copy, typography, and text throughout the page and extrapolated sections must **strictly mirror the language of the source Hero design**. If the Hero headline/copy is in English, all generated sections, cards, and buttons must be in natural, professional English. If the Hero is in Bahasa Indonesia, all sections must be in natural, professional Bahasa Indonesia. Never mix languages without explicit instruction.
11. **Ethical Brand Anonymization & Dummy Names (STRICT ETHICAL RULE)**:
    - **Dilarang keras menggunakan nama merk, logo, atau merek dagang asli dari perusahaan nyata di dunia nyata** (misalnya: Nike, Apple, Spotify, Tesla, Starbucks, Rolex, Stripe, Airbnb, dsb.).
    - **Gunakan Nama Dummy / Fiktif**: Jika desain sumber menggunakan merk asli, agent **wajib menggantinya dengan nama brand fiktif/dummy yang kreatif** yang mempertahankan fonetik, nuansa rasa (vibe), dan silabel serupa (contoh: Nike -> *Veloce / Aethel Athletics*; Spotify -> *Sonora*; Stripe -> *PayFlow*; Starbucks -> *Artisan Roast*; Rolex -> *Kronos*).
    - **Etika & Legalitas Portofolio**: Ini adalah standar etika mutlak agar portofolio showcase bebas dari potensi pelanggaran hak cipta, merek dagang (*trademark infringement*), atau klaim afiliasi palsu. Jika desain sumber sudah merupakan konsep fiktif (seperti *Ze'Nin*, *Careon*, *Sylvane*), maka nama tersebut aman digunakan.

---

## ⚛️ React-Ready & BEM Class Naming Architecture

To ensure seamless migration to React / Next.js / Vue (e.g., extracting into JSX components and `Component.module.css`), all markup and CSS must adhere to these standards:

### 1. Strict Component-Driven BEM (`.block__element--modifier`)
- **Block (`.block`)**: The root of an independent, reusable UI component (e.g., `.site-header`, `.hero-section`, `.service-card`, `.booking-modal`, `.faq-accordion`).
- **Element (`.block__element`)**: A dependent child element tied to that block (e.g., `.service-card__icon`, `.service-card__title`, `.hero-section__cta`).
- **Modifier (`.block--modifier` / `.block__element--modifier`)**: Variant styling for appearance or mode (e.g., `.service-card--featured`, `.btn--primary`, `.btn--outline`).

### 2. Nesting & Specificity Rules (Max 2 Levels)
- **Avoid deep tag selectors**: Never write `.nav-menu ul li a` or `#main .content div p`. Instead, target the element directly with a single BEM class: `.nav__link` or `.article__paragraph`.
- **2-Level Tolerance**: Nesting is permitted up to a maximum of **2 levels** strictly for status modifiers, active states, or parent-context variants:
  ```css
  /* GOOD: Flat & 2-level modifier tolerance */
  .service-card { ... }
  .service-card__title { ... }
  .service-card--featured .service-card__badge { ... }
  .btn.is-active { ... }

  /* BAD: Fragile deep tag cascade (hard to port to React) */
  .services > div > ul > li a span { ... }
  ```

### 3. Dynamic State Conventions (BEM + `is-` prefix)
For interactive UI states (toggleable menus, active tabs, open accordions/modals), use standard state prefixes that directly map to React `useState` hooks:
- `.is-active` / `.is-open` / `.is-visible` / `.is-loading`
- Example mapping:
  ```html
  <!-- Vanilla HTML -->
  <button class="tab-btn is-active">Overview</button>
  <div class="drawer is-open">...</div>
  ```
  ```jsx
  // React Equivalent
  <button className={`tab-btn ${isActive ? 'is-active' : ''}`}>Overview</button>
  <div className={`drawer ${isOpen ? 'is-open' : ''}`}>...</div>
  ```

### 4. Component Header Blocks in `css/style.css`
Organize `css/style.css` using explicit component comment headers so any section can be cut-and-pasted 1-to-1 into a dedicated React component or CSS Module:
```css
/* ==========================================================================
   COMPONENT: HeroSection (<HeroSection />)
   Block: .hero-section
   ========================================================================== */
.hero-section { ... }
.hero-section__container { ... }
.hero-section__title { ... }
.hero-section__cta { ... }
.hero-section__cta--primary { ... }

/* ==========================================================================
   COMPONENT: ServiceCard (<ServiceCard />)
   Block: .service-card
   ========================================================================== */
.service-card { ... }
.service-card__badge { ... }
.service-card__title { ... }
.service-card--featured { ... }
```

---

## 🛠️ Step-by-Step Slicing Workflow

### 🛑 Pre-Flight Gate: Mandatory Grill-Me Clarification (WAJIB)

Whenever starting a slicing task:
1. **Detect Ambiguities & Scope (Hero-Only Input Protocol)**:
   - Check if any requirement is ambiguous, incomplete, or underspecified (missing colors, uncertain layout, unmentioned states).
   - **Hero-to-Footer Full Expansion (STANDARD & RECOMMENDED)**:
     Most inputs in this repository are **Hero Section screenshots**. When a Hero-only screenshot is provided, the agent's primary mission is to:
     *(1)* Slice the Hero Section with **100% pixel-perfect fidelity** to the reference.
     *(2)* Extract the design system (color palette, typography pairings, border-radiuses, shadows, button aesthetics).
     *(3)* **Extrapolate and build out a cohesive, award-winning landing page all the way down to the footer using Domain-Specific Archetypes (STRICT ANTI-COOKIE-CUTTER MANDATE)**:
       - **NEVER** force a repetitive, generic template (e.g., Hero -> Bento -> How It Works -> FAQ -> Footer on every design). That destroys portfolio variety and makes showcase projects look identical.
        - **Identify Domain & Sub-Niche**: Never treat any industry as a monolith. Determine the exact sub-niche from the hero's headline, imagery, and UI cards (e.g., within HealthTech: Telemedicine App vs. AI Radiology SaaS vs. Bio-Wearable Ring vs. Mental Health Therapy). Two projects in the same industry must NEVER have the same layout.
        - **Inherit Visual DNA from Hero Geometry**: Mirror the hero's compositional structure (Asymmetric Split -> alternating zig-zag grids; Centered Monolith -> full-bleed stages & horizontal carousels; Dark HUD -> glowing Canvas wave charts & radial dials; Warm Lifestyle -> soft masonry & organic cards).
       - **Apply Domain Archetype Blueprint**: Consult [references/domain_archetypes.md](./references/domain_archetypes.md) for tailored narrative arcs, layout pacing, and industry-authentic sections.
       - **Layout Pacing & Rhythm**: Enforce the *Consecutive Layout Ban* (never stack identical 3-card grids adjacent to each other). Alternate between high data density and expansive visual breathing room.
       - **Signature Domain Interactive Anchor**: Integrate at least one signature domain-authentic interactive widget (e.g., dynamic fee/yield calculator, 3D card tilt, interactive tasting menu filter, live vitals telemetry graph, unit floorplan switcher, or code tab switcher).
     *(4)* Present this domain-tailored section journey in Step 0 for quick user alignment.
   - If the user explicitly states they *only* want a standalone 100vh hero, honor that request. Otherwise, **always expand down to the footer**.

2. **STOP & DO NOT CODE**: Never make assumptions or write speculative code.
3. **Trigger Grill-Me Interview**:
   - Use the `ask_question` tool immediately.
   - Ask questions **one at a time**.
   - Walk down the decision tree systematically.
   - Always prefix your recommended choice with `(Recommended)`.
4. Only when all questions are answered and full mutual understanding is reached, proceed to Step 0.

---

### Step 0: Design Decomposition & Alignment (Mandatory First Step)

Before writing any project files, analyze the design input and present a **Design Decomposition Plan** to the user for quick alignment:

1. **Visual Breakdown**:
   - Primary color palette & accent tokens.
   - Typography pairings (e.g., Plus Jakarta Sans + JetBrains Mono) and **Font Weight Check**: if the source design explicitly uses heavy weights (700, 800, 900), explicitly confirm with the user whether to preserve the original heavy weight or adjust to sleek 500/600.
   - **Brand Ethics & Trademark Check**: Verify that the brand is not a real-world registered company (e.g., Nike, Apple, Spotify, Tesla). If a real brand is detected, propose an ethical dummy/fictional brand name with similar phonetics and vibe for user approval in Step 0.
   - Core layout structure and ordered section list based on the chosen Domain Archetype (consult [references/domain_archetypes.md](./references/domain_archetypes.md)).
   - Interactive components identified (e.g., Mobile drawer, Modal dialog, Filter chips, Accordion).
2. **Component Mapping**: Outline the corresponding BEM block names (e.g., `.site-header`, `.hero-section`, `.feature-bento`, `.doctor-modal`).
3. **Creative Motion & Video Assessment**:
   - Consult [references/creative_interactions.md](./references/creative_interactions.md). Evaluate if the design calls for advanced interactive experiences (e.g. Canvas image sequence, Lenis smooth scroll, magnetic button, GSAP SplitText kinetic reveal, Spline 3D, or circular reveal dark mode) and propose them in the plan with their zero-build CDN imports for user approval.
   - **Video vs. Image Evaluation**: If a hero or backdrop section would look dramatically more engaging and modern with an ambient looping video instead of forcing a flat static image, **proactively tell the user and ask for an MP4/WebM video file**.
4. **Proposed Project Slug**: Propose the directory name under `projects/<category>-v<version>` (e.g., `projects/fintech-v1`).
5. **Create Blueprint `projects/<project-slug>/PLAN.md` with Mandatory Reference Audit Proof**:
   Upon initial alignment, generate `projects/<project-slug>/PLAN.md` as the operational benchmark for the project:
   - **Reference Audit Proof (BUKTI PEMBACAAN REFERENSI)**: Agent wajib mencantumkan secara eksplisit:
     *(a)* ID & Nama Domain Archetype yang dikutip langsung dari `references/domain_archetypes.md`.
     *(b)* Daftar token CSS & fluid clamp scale yang diadopsi dari `resources/boilerplate_tokens.css`.
     *(c)* Teknik animasi/motion yang dievaluasi dari `references/creative_interactions.md`.
   - **Project Concept & Target Audience**: Who the project is for and user expectations.
   - **Visual System**: Color palette tokens, Google Fonts pairings, spacing scale.
   - **Ordered Layout Architecture**: Section list and user goals for each section.
   - **BEM Component Map**: Detailed block and element names.
   - **Creative Motion & Media Plan**: Chosen interaction techniques, video/poster strategy, and CDN dependencies.
   - **Task Checklist**: Step-by-step implementation milestones.
6. Provide a brief summary of the proposed plan to the user before proceeding to file scaffolding.

---

### Step 1: Project Scaffolding

Set up the standard self-contained directory structure:

```bash
projects/<project-slug>/
├── index.html                  # Semantic HTML5 entry document
├── README.md                   # Comprehensive project documentation
├── css/
│   └── style.css               # Design tokens, components, responsive media queries
├── js/
│   └── script.js               # Interactive vanilla JavaScript
└── assets/
    ├── icons/
    │   └── favicon.ico         # Brand icon favicon (linked in head)
    ├── images/
    │   ├── logo.png            # Transparent brand logo PNG
    │   └── ...                 # Local images (WebP/JPG) and video posters
    └── videos/                 # Ambient loop videos (MP4/WebM, if used)
```

---

### Step 2: Design Tokens & CSS Architecture

Initialize `css/style.css` using the token baseline from [resources/boilerplate_tokens.css](./resources/boilerplate_tokens.css):

1. **CSS Custom Properties (`:root`)**:
   - Surface & background colors (`--bg-primary`, `--bg-surface`, `--bg-card`).
   - Text color scale (`--text-primary`, `--text-secondary`, `--text-muted`).
   - Accent & brand palette (`--brand-primary`, `--brand-primary-hover`, `--brand-light`).
   - Fluid typography scales with `clamp()` for headings and body copy.
   - **Font Weight Constraints (Strict)**: Only load and assign `--font-weight-regular: 400`, `--font-weight-medium: 500`, and max `--font-weight-semibold: 600`. **Never use 700, 800, or 900 UNLESS explicitly present in the source design AND confirmed/approved by the user in Step 0**.
   - Spacing scales (`--space-xs` through `--space-3xl`) and border radiuses.
   - Glassmorphism values (`backdrop-filter: blur(...)` with subtle borders).
2. **Modern CSS Reset**:
   - Universal `box-sizing: border-box`.
   - Smooth scrolling (`scroll-behavior: smooth`).
   - Responsive media rules (`max-width: 100%; height: auto; display: block`).
   - `body { overflow-x: hidden; }` to eliminate stray horizontal margins.

---

### Step 3: Semantic HTML5 Structure & Component Classes

Construct clean, accessible, and structured markup in `index.html`:

- **Semantic landmarks**: Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<dialog>`, and `<footer>`.
- **Single `<h1>`**: Exactly one `<h1>` per document with sequential `<h2>` and `<h3>` tags.
- **Component-Driven Classes**: Follow BEM conventions established in the *React-Ready Architecture* section.
- **Accessibility & ARIA**:
  - Valid `aria-expanded`, `aria-controls`, and `aria-label` for mobile toggles and accordions.
  - Form controls with associated `<label>` elements or accessible names.
  - Minimum touch target size of 44x44px for buttons and interactive links.
- **Icon Integration**: Use clean inline SVGs sourced from Lucide Icons or Font Awesome for maximum clarity and zero external font file dependencies.
- **Ambient Video Integration (Dual-Layer)**: When ambient looping video is agreed, implement `<video class="hero__video" autoplay muted loop playsinline poster="assets/images/<slug>-poster.webp"><source src="assets/videos/<slug>-ambient.mp4" type="video/mp4" /></video>` with CSS `object-fit: cover; width: 100%; height: 100%;` to ensure seamless loading and zero broken boxes if video is delayed or battery-saver is active.

---

### Step 4: Interactive Vanilla JavaScript & Creative Motion

Write clean, modular, and dependency-free ES6+ JavaScript in `js/script.js`:

1. **Core Behaviors**:
   - **Sticky Navigation & Active Scroll Spy**: Update active navigation links as sections enter viewport via `IntersectionObserver`.
   - **Mobile Drawer / Hamburger Toggle**: Smooth transition with `Esc` key dismissal and body scroll locking.
   - **Modals / Dialogs**: Native `<dialog>` or accessible overlay with focus management, backdrop click to dismiss, and `Esc` handling.
   - **Tab Filtering / Filter Chips**: Dynamically filter cards or items without page reloads.
   - **Accordions / FAQs**: Smooth expand/collapse, ensuring one or multi-panel logic with ARIA state updates.
2. **State Syncing**: Toggle state classes (`.is-active`, `.is-open`) in tandem with ARIA attributes (`aria-expanded="true"`), mirroring how React handles state updates.
3. **Advanced Creative Motion Recipes**:
   - Implement agreed motion techniques from [references/creative_interactions.md](./references/creative_interactions.md) (e.g. Lenis smooth scroll, Canvas image sequence, circular reveal theme toggle, magnetic buttons).
   - Load libraries strictly via trustworthy CDNs (unpkg / jsdelivr / cdnjs) with zero build overhead.
4. **Motion Performance & Accessibility Guardrails**:
   - Enforce 60 FPS by animating only `transform` and `opacity`.
   - Provide graceful fallback / disable heavy canvas sequences or WebGL shaders on mobile viewports (< 768px).
   - Always support `@media (prefers-reduced-motion: reduce)`.

---

### Step 5: Quality Assurance (QA) & Automated Visual Verification

1. **Automated Visual QA Verification with Browser Subagent**:
   - Start a local server (or access file directly) and launch the `browser_subagent` tool to inspect the rendered page.
   - Test responsive layout across viewports: **375px (mobile)**, **768px (tablet)**, and **1440px (desktop)**.
   - Verify that there is **zero horizontal scrollbar** at all breakpoints (`scrollWidth <= clientWidth`).
   - Audit browser console logs to ensure **zero uncaught JavaScript errors**.
   - Test interactive elements (e.g., mobile drawer toggle, modal popups, filter chips, signature interactive widget).
   - Take a final screenshot of the rendered page for QA confirmation.

2. **Verify Against QA Checklist**:
   Cross-reference all requirements in [references/qa_checklist.md](./references/qa_checklist.md).

---

### Step 6: Documentation & Automatic Root Showcase Hub Registration

1. **Upgrade `PLAN.md` into Final Sub-Project `README.md`**:
   Transform and upgrade `projects/<project-slug>/PLAN.md` into the permanent showcase `projects/<project-slug>/README.md` modeled after [projects/healthcare-v1/README.md](../../../projects/healthcare-v1/README.md):
   - Project title & overview (incorporating target audience & user persona defined in `PLAN.md`).
   - Badges (Tech Stack, Dependencies, License: MIT).
   - Page architecture and section breakdown.
   - Key interactive features & implemented creative motion recipes.
   - Design system tokens table (colors, typography, glassmorphism).
   - Responsive design matrix (Desktop, Laptop, Tablet, Mobile).
   - Local running instructions.
   - **Clean Up**: Remove the temporary `PLAN.md` file once converted into `README.md` to ensure zero leftover scratch files in the repository.

2. **Automatic Root Showcase Hub Registration**:
   - **Thumbnail Asset**: Copy the original reference hero screenshot provided by the user to `assets/screenshots/<project-slug>-preview.<ext>`.
   - **Register in `js/script.js`**: Append the new project metadata object to the `projects` array in root `js/script.js`:
     ```javascript
     {
       title: "<Project Title>",
       slug: "<project-slug>",
       categoryLabel: "<Category, e.g. Healthcare, Fintech, SaaS>",
       type: "<Specific Sub-Niche, e.g. Bio-Wearable IoT, Telehealth>",
       badge: "Figma → <Niche>",
       image: "./assets/screenshots/<project-slug>-preview.<ext>",
       alt: "<Accessible descriptive alt text>",
       technologies: ["HTML5", "CSS3", "JavaScript"],
       liveUrl: "./projects/<project-slug>/index.html",
       sourceUrl: "https://github.com/TinoNurcahya/design-to-code-showcase/tree/main/projects/<project-slug>",
     },
     ```
   - The project count badge in `index.html` will automatically update dynamically on page load.

3. **Present Local Server & Live Links to User**:
   Provide the user with clear commands and direct links to test both the standalone project and the updated root showcase hub:
   ```bash
   # Using Node.js npx serve
   npx serve .

   # Or using Python
   python -m http.server 8080
   ```
   - **Standalone Project**: `http://localhost:8080/projects/<project-slug>/index.html`
   - **Showcase Hub**: `http://localhost:8080/index.html`
