# Slicing Quality Assurance (QA) Checklist

Perform this audit before marking any design-to-code slicing project as complete.

---

## 1. Responsive & Layout Integrity

| Check | Requirement | Verification Method |
| :--- | :--- | :--- |
| **Zero Horizontal Overflow** | No horizontal scrollbars at 320px, 375px, 414px, 768px, 1024px, 1440px | Inspect `overflow-x` and verify `scrollWidth <= clientWidth` |
| **Fluid Container** | Layout is centered with standard container `max-width` (1200px – 1320px) | Check desktop widescreen view |
| **Touch Targets** | Buttons, links, filter chips, and interactive elements >= 44x44px on mobile | Inspect element dimensions on 375px viewport |
| **Grid & Flex Breakdown** | Multi-column layouts cleanly collapse to 1 or 2 columns on tablet/mobile | Test window resize transitions |
| **Media Stacking** | Images and embedded media scale proportionally (`max-width: 100%; height: auto;`) | Inspect image elements |
| **Domain Layout Authenticity** | Sections below hero strictly follow domain archetype with varied layout pacing & domain-authentic interactive widget (no repetitive cookie-cutter bento/faq stack) | Cross-reference with `references/domain_archetypes.md` |

---

## 2. Typography & Visual Fidelity

| Check | Requirement | Verification Method |
| :--- | :--- | :--- |
| **Font Pairing** | Primary UI font and accent/mono fonts correctly imported and rendered | Check font network requests & computed styles |
| **Heading Hierarchy** | Single `<h1>`, followed by sequential `<h2>`, `<h3>` (no skipped levels) | Review HTML structure |
| **Fluid Typography** | Large headings use `clamp()` or media queries to prevent text clipping | Test on 320px vs 1440px |
| **Contrast Ratios** | Text against background meets WCAG AA standards (minimum 4.5:1 for body) | Inspect text contrast |
| **Font Weight Cap** | Strictly no `700`, `800`, or `900` UNLESS explicitly present in source design AND confirmed/approved by user in Step 0 | Audit computed styles for font-weight |
| **Minimum Font Size** | Absolute floor is `12px` (`0.75rem`); no micro-text below 12px | Verify computed font-size on badges and footnotes |
| **Zero Uninvited Elements**| Strictly NO hallucinated Pill Badges, Eyebrow Tags/Chips, or subtitles unless explicitly present in source design | Compare final HTML layout against source reference image |
| **Theme Fidelity** | No uninvited dark mode switchers unless explicitly present in source design or requested | Verify page theme matches reference design |
| **Design Consistency** | Radiuses, shadows, border colors, and badge styles adhere to `:root` tokens | Review `css/style.css` variables |

---

## 3. Accessibility & Semantics

| Check | Requirement | Verification Method |
| :--- | :--- | :--- |
| **Semantic Tags** | Usage of `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<dialog>`, `<footer>` | Verify no excessive `<div>` soup |
| **Keyboard Navigability** | Tab order is logical; active focus ring is visible (`:focus-visible`) | Navigate page using `Tab` and `Shift+Tab` |
| **ARIA Attributes** | Mobile menu toggles have `aria-expanded` and `aria-label`; icons have descriptive labels | Audit markup |
| **Dialog Accessibility** | Modals trap focus, close on `Esc`, and restore focus to trigger button | Test with keyboard |
| **Alt Text on Images** | Informative alt attributes on meaningful images; empty `alt=""` for decorative | Inspect `<img>` tags |

---

## 4. Interactivity & Vanilla JavaScript

| Check | Requirement | Verification Method |
| :--- | :--- | :--- |
| **Mobile Drawer Toggle** | Hamburger menu opens/closes smoothly, locks body scroll while open | Test mobile menu interaction |
| **Active Scroll Spy** | Navigation links highlight corresponding section currently in view | Scroll through the page |
| **Interactive Modals** | Triggering "Book", "Contact", or "Details" buttons displays modal smoothly | Test modal opening, form inputs, close actions |
| **Filter Chips / Tabs** | Filtering updates the display without layout shifts or errors | Click through all filter options |
| **Creative Motion & 60fps** | Animations only touch `transform`/`opacity`; supports `prefers-reduced-motion`; mobile fallbacks active | Audit animations & test mobile view |
| **Console Errors** | Browser console contains zero uncaught errors or failed network requests | Check developer tools console |
| **Browser Subagent Visual QA** | Automated inspection at 375px, 768px, and 1440px viewports to verify layout and interaction integrity | Run `browser_subagent` inspection |

---

## 5. Documentation, Showcase Hub & Project Hygiene

| Check | Requirement | Verification Method |
| :--- | :--- | :--- |
| **Self-Contained Files** | All CSS, JS, and image assets are stored locally within the project folder | Verify no broken external CDN links |
| **Dedicated README.md** | Complete `projects/<slug>/README.md` created with architecture & token tables; temporary `PLAN.md` removed | Review generated documentation |
| **Logo & Favicon Assets** | Transparent `logo.png` present in `assets/images/` and `favicon.ico` linked in `<head>` | Verify asset files exist and load cleanly |
| **Content Language Fidelity** | All copy and typography strictly follow the language of the source Hero design (all English or all Indonesian) | Audit all page text |
| **Root Hub Registration** | Project registered in root `js/script.js` and original hero screenshot copied to `assets/screenshots/<slug>-preview.<ext>` | Check `js/script.js` and screenshot file |
| **Ethical Brand Anonymization** | Strictly no real-world registered trademarks used (Nike, Apple, Spotify, Tesla, etc.); all brand names and logos use creative dummy/fictional identities | Audit all brand names and logo text |
| **BEM & React Readiness** | Elements use component-driven BEM (`.block__element--modifier`); max 2 levels nesting | Verify CSS specificity and class names |
| **Clean Code Formatting** | Indentation, component headers (`/* COMPONENT: ... */`), and style tokens are uniform | Review source code |
