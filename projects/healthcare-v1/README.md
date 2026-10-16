# Careon Medical — Specialist Healthcare & Diagnostic Telemetry Portal

> A production-grade, patient-first healthcare and diagnostic telemetry portal built as a design-to-code frontend portfolio project using **Semantic HTML5**, **Modern CSS3**, and **Vanilla JavaScript**.

[![Deployment](https://img.shields.io/badge/Deployment-GitHub%20Pages-0284c7?style=flat-square&logo=github)](https://tinonurcahya.github.io/design-to-code-showcase/projects/healthcare-v1/)
[![Tech Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-blue?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Design](https://img.shields.io/badge/Design-Figma%20%26%20Dribbble%202026-10b981?style=flat-square)](https://dribbble.com)
[![Dependencies](https://img.shields.io/badge/Dependencies-Zero%20External%20Libs-emerald?style=flat-square)](https://github.com/TinoNurcahya/design-to-code-showcase)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](../../LICENSE)

---

> **Portfolio Demonstration Notice:**  
> This is a fictional portfolio project created to showcase advanced frontend engineering craftsmanship (converting complex Figma/Dribbble UI designs into clean, responsive, framework-free web code). All clinic names, telemetry simulations, doctor profiles, and medical copy are created for demonstration purposes.

---

## Overview

**Careon Medical** is a state-of-the-art specialist healthcare and outpatient diagnostic portal inspired by leading 2026 healthtech design standards (*FyniteCare, Careon, Meditalk, CareIQ, and Nauto*).

The portal translates an intricate healthtech design into a fluid, self-contained web experience featuring:
- A high-impact hero composition with floating glassmorphic badges.
- An ethical demonstration **Partner & Accreditation Marquee**.
- A dedicated **Medical Services** department catalog.
- An interactive **Clinical Intelligence & 3D Diagnostic Telemetry Bento Suite** (ECG rhythm monitor simulation, interactive radial pulse speedometer, and genomic profile).
- A **How It Works** 3-step streamlined patient care pathway.
- An **At-Home Diagnostic Kits** order showcase.
- A dynamic **Doctor Directory** with multi-department filtering and interactive scheduling modal.
- Verified **Patient Reviews** and social proof testimonials.
- An accessible, keyboard-navigable **FAQ Accordion**.
- Pre-footer appointment CTA and comprehensive 4-column footer.
- Comprehensive accessibility, zero external library overhead, and responsive optimization down to 320px screens.

---

## Page Architecture (10-Section Flow)

```
01. Hero & Doctor Showcase (Floating Glass Badges & Specialty Chips)
02. Partner & Accreditation Marquee Strip (Ethical Demonstration Network)
03. Specialized Medical Services (6 Core Clinical Department Cards)
04. Mega Diagnostic & Biometric Telemetry Bento (Visual Telemetry & Pulse Simulator)
05. How It Works: 3 Simple Steps (Care Pathway & Patient Journey)
06. Diagnostic At-Home Test Kits (CLIA Lab Turnaround & Specimen Collection)
07. Board-Certified Medical Specialists (Interactive Directory & Filtering)
08. Patient Trust & Clinical Testimonials (Verified Outcome Reviews)
09. Frequently Asked Questions Accordion (Keyboard & ARIA Accessible)
10. Pre-Footer Appointment CTA & Comprehensive 4-Column Footer
```

---

## Key Features & Interactive Capabilities

### 1. Hero Doctor Showcase & Floating Glass Badges
- **Full Portrait Composition**: High-resolution specialist portrait (*Dr. Sarah Jensen, MD*) styled with clean rounded geometry and soft ambient elevation.
- **Floating Glassmorphic Cards**: Three dynamic badges bobbing on subtle keyframe animations:
  - *Key Clinic Features* (Expert Doctors, Advanced Technology, 24/7 Support).
  - *Companion Note* ("Your Health Companion" with favorite heart icon).
  - *Mini Doctor Profile* with star rating and 1-click booking trigger.
- **Quick Specialty Chips**: Instant department filters (*Cardiology, Pediatrics, Dermatology, Neurology*) directly under the hero headline, synchronized with the specialists directory below.

### 2. Specialized Medical Services Catalog (`#services`)
- **6 Dedicated Clinical Departments**:
  1. *Cardiovascular & Heart Health* (3D ECG, arterial velocity, preventive hypertension).
  2. *Pediatrics & Adolescent Health* (Milestone tracking, same-day urgencies, sensory rooms).
  3. *Dermatology & Cutaneous Health* (Digital dermoscopy, barrier repair, acne therapies).
  4. *Cognitive Neurology & Sleep* (Digital EEG, specialized migraine care, cognitive telemetry).
  5. *Longevity & Executive Wellness* (80+ biological biomarker panels, biological age metrics).
  6. *Encrypted Telehealth & E-Script* (Zero-wait queue, direct e-prescriptions, HD video).
- **Interactive Action Buttons**: Each service card includes a direct *"Consult Specialist"* button that opens the booking modal with the appropriate doctor pre-selected.

### 3. Clinical Intelligence & 3D Telemetry Bento Suite (`#telemetry-suite`)
- **3D Cardiopulmonary Holter Telemetry**: High-fidelity visual telemetry showcase featuring interactive pulsing callout pins (*Aortic Arch, Sinus Rhythm, SpO₂ Saturation*) and live EKG SVG waveform animation.
- **Interactive Radial Pulse Speedometer**: Real-time heart rate velocity simulator with clickable presets (*Resting at 62 BPM, Normal at 74 BPM, Cardio Peak at 118 BPM*) driving a dynamic SVG gauge needle and color zones.
- **Precision Pharmacogenomics**: Informative genomic sequencing visual representation outlining molecular profiling, hydrogen bond integrity, and adverse reaction mitigation.

### 4. How It Works: 3 Simple Steps (`#how-it-works`)
- **Clear Patient Flow**:
  - *Step 01*: Choose Specialist or Diagnostic Test (Department filters & live availability).
  - *Step 02*: Book In-Clinic or Virtual Visit (Zero-wait calendar confirmation).
  - *Step 03*: Receive Care & Telemetry Reports (Personalized health intelligence).

### 5. Dynamic Specialist Directory & Department Filtering (`#specialists`)
- **Multi-Department Filter Tabs**: Filter board-certified specialists dynamically (*All, Cardiology, Pediatrics, Dermatology, Neurology, Oral Surgery*).
- **Interactive Doctor Cards**: Each card displays the specialist's subspecialty, experience, next available time slot, and patient satisfaction score.
- **Deep Filter Sync**: Hero chips, service cards, and footer links automatically synchronize active states and filter the doctor grid seamlessly.

### 6. Interactive Appointment Booking Modal
- **Dynamic Doctor Pre-Selection**: Clicking "Book Visit" or "Book a Schedule" anywhere on the page opens the modal with the chosen specialist automatically pre-selected.
- **Consultation Mode Selector**: Switch between *In-Clinic Outpatient Consultation* and *Telehealth HD Video*.
- **Interactive Time-Slot Picker**: Select available time slots (`09:00 AM`, `10:30 AM`, `02:00 PM`, etc.) with active visual feedback.
- **Client-Side Form Validation & Toast Notification**: Real-time form handling with instant confirmation toast feedback.
- **Accessible Dialog Controller**: Supports `Esc` keyboard dismissal, background backdrop click, and focus restoration.

### 7. Frequently Asked Questions Accordion (`#faq`)
- **5 Comprehensive FAQs**: Covers in-clinic vs. telehealth selection, diagnostic kit contents, insurance and payment transparency, 3D telemetry explanation, and the 2-hour cancellation/rescheduling policy.
- **Smooth Single-Open Accordion**: Clicking an item expands its drawer while cleanly collapsing open siblings.
- **Keyboard Navigation & ARIA**: Native focus indicators, `aria-expanded="true/false"`, and `role="region"`.

### 8. Fixed Floating Vertical Contact Dock
- Always-accessible vertical pill dock featuring social links (*Instagram, LinkedIn, X*) and a dedicated quick emergency phone trigger (`+1 (800) 450-CARE`).

---

## Design System & Visual Aesthetics

| Design Element | Specification |
| :--- | :--- |
| **Primary Theme** | Fresh Botanical HealthTech (*Clean White Canvas with Mint & Emerald Accents*) |
| **Color Tokens** | `--emerald-50` through `--emerald-950` (`#16a34a`, `#15803d`, `#22c55e`), `--slate-900` (`#0f172a`), `--bg-card` (`#f9fbf9`) |
| **Typography Pairing** | **Plus Jakarta Sans** (clean geometric UI & body), **JetBrains Mono** (telemetry data & code), **Caveat** (editorial signatures) |
| **Glassmorphism** | `backdrop-filter: blur(16px)` with semi-transparent white fills (`rgba(255, 255, 255, 0.88)`) and crisp hairline borders |
| **Micro-Animations** | Floating keyframes (`floatBobSlow`, `floatBobReverse`), animated EKG waveforms, rotating FAQ chevrons, and active scroll spy indicators |

---

## Responsive Design Matrix

Tested and optimized across all standard screen breakpoints:

- **Desktop (1440px+)**: Native full-width layout with a 1320px maximum container, 2-column hero grid, 3-column service cards, 3-column specialist cards, and floating vertical dock.
- **Laptop (1024px – 1439px)**: Proportional telemetry bento grid, sticky blurred glass navigation with active section indicator dot, and balanced card typography.
- **Tablet (768px – 1023px)**: 2-column services grid, 2-column specialists grid, horizontal touch-scrollable filter chips, and optimized bento layouts.
- **Mobile (320px – 767px)**: Fluid single-column stacking, sliding off-canvas drawer navigation, responsive modal dialog, 44x44px minimum touch targets, and zero horizontal overflow.

---

## Tech Stack & Architecture

| Technology | Purpose in Project |
| :--- | :--- |
| **HTML5** | Semantic structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<dialog>`, `<aside>`, `<footer>`) with ARIA roles |
| **CSS3** | Bespoke CSS variables (`:root`), Flexbox, CSS Grid, `clamp()` fluid typography, and frosted glassmorphism |
| **Vanilla JavaScript (ES6+)** | Zero dependencies; doctor filtering, appointment modal controller, pulse speedometer simulator, FAQ accordion, and active scroll spy |
| **Inline & SVG Icons** | Scalable, high-contrast medical vector icons without external icon font overhead |
| **Local Web Assets** | Optimized local medical photography and vector graphics ensuring fast, self-contained offline capability |

---

## Project Structure

```
projects/healthcare-v1/
├── index.html                  # Main semantic HTML5 document (10-section architecture)
├── README.md                   # Project documentation & portfolio notes
├── css/
│   └── style.css               # Complete design tokens, components, and responsive rules
├── js/
│   └── script.js               # Specialists roster, filtering, booking modal, FAQ, & telemetry HUD
└── assets/
    ├── icons/
    │   └── favicon.svg         # Careon medical cross SVG favicon
    └── images/                 # Medical photography & telemetry assets
        ├── doctor-hero.jpg     # Lead medical specialist portrait
        ├── doctor-pediatrician.jpg
        ├── doctor-specialist-male.jpg
        ├── doctor-specialist-female.jpg
        ├── cardiology-heart.jpg
        ├── dna-helix.jpg
        ├── diagnostic-kit.jpg
        └── clinic-plants-banner.jpg
```

---

## Running Locally

This project is completely self-contained with no package installations or build steps required:

1. Clone or download the repository.
2. Open `index.html` directly in any modern browser, or launch with any local static server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js npx
npx serve .
```

3. Navigate to `http://localhost:8080/projects/healthcare-v1/`.

---

## Author

**Tino Nurcahya**  
*Frontend Developer & Design-to-Code Specialist*  
Portfolio: [design-to-code-showcase](https://tinonurcahya.github.io/design-to-code-showcase/)
