# Creative Interactions, Motion & WebGL Playbook

A curated catalog of award-winning frontend motion techniques, creative libraries, and WebGL/shader effects. Use this guide during the slicing workflow to evaluate, select, and implement high-impact interactive visual experiences.

> [!IMPORTANT]
> **Menu Referensi Berbasis Kecocokan & Harmoni Visual (Bebas Batasan Selagi Cocok)**:
> - Dokumen ini adalah **katalog referensi**, bukan kewajiban untuk memasukkan semuanya ke setiap website.
> - **Tidak ada batasan kaku jumlah teknik**: Agent bebas menggabungkan teknik animasi, interaksi, atau library apapun (misal: Lenis + GSAP ScrollTrigger + SplitText + Magnetic button + Circular dark mode) **selagi cocok, selaras dengan estetika desain sumber, dan performa tetap mulus di 60 FPS**.
> - Prioritaskan pengalaman pengguna yang memukau (Awwwards-level visual fidelity) tanpa mengorbankan fluiditas navigasi dan performa render.

---

## 1. Creative Libraries & Technology Stack

When a design demands rich motion, 3D depth, or creative storytelling, select the appropriate lightweight library loaded via modern CDN or native browser APIs:

| Technology / Library | Primary Capability & Use Case | CDN / Implementation Pattern |
| :--- | :--- | :--- |
| **GSAP & ScrollTrigger** | High-performance timeline animations linked to scroll, viewport enter, and pins. | `https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js`<br>`https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js` |
| **Lenis** | Ultra-smooth momentum scrolling that synchronizes with ScrollTrigger. | `https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js` |
| **Canvas Image Sequence** | Scrubbing high-fidelity 3D video/render frames on scroll (Apple-style interactive product reveals). | Native HTML5 `<canvas>` + frame preloader + GSAP ScrollTrigger timeline. |
| **GSAP SplitText** | Deconstructs headings into characters, words, or lines for staggered kinetic reveals. | Script-based character/word wrapping or GSAP SplitText. |
| **GSAP Flip** | Smooth layout transitions when resizing cards, filtering grids, or expanding items. | `https://cdn.jsdelivr.net/npm/gsap@3/dist/Flip.min.js` |
| **GSAP DrawSVG / MorphSVG** | Animating SVG strokes as if being drawn; morphing vector paths between shapes. | SVG `stroke-dasharray` / `stroke-dashoffset` or GSAP SVG plugins. |
| **GSAP MotionPath** | Animating UI badges, particles, or icons along curved SVG bezier paths. | `https://cdn.jsdelivr.net/npm/gsap@3/dist/MotionPathPlugin.min.js` |
| **GSAP Draggable / Inertia** | Physics-based momentum dragging for dials, carousels, and visual nodes. | `https://cdn.jsdelivr.net/npm/gsap@3/dist/Draggable.min.js` |
| **View Transition API** | Native browser state transitions (e.g. dark/light mode circular reveal, seamless page transitions). | `document.startViewTransition(() => ...)` with CSS `::view-transition`. |
| **CSS Scroll-driven Animations** | Native zero-JS animations bound to scroll timeline (`animation-timeline: scroll()`). | Pure modern CSS3 with `@supports (animation-timeline: scroll())`. |
| **Web Animations API (WAAPI)** | Native performant JS animations running directly on the compositor thread. | `element.animate([...], { duration, easing })`. |
| **Spline Viewer** | Embedding visual 3D interactive scenes and web objects. | `<script type="module" src="https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js"></script>` |
| **OGL / Three.js** | Minimal WebGL library for custom shader backgrounds, fluid distortion, and 3D scenes. | ES Modules via `unpkg.com` or `esm.sh`. |
| **PixiJS** | 2D GPU-accelerated rendering for thousands of particles, dynamic ripples, and sprites. | `https://cdn.jsdelivr.net/npm/pixi.js@7/dist/pixi.min.js` |
| **Rive / Lottie** | Interactive state-driven vector animations and micro-illustrations. | `@rive-app/canvas` or `@dotlottie/player-component`. |
| **Embla Carousel / Swiper** | Highly customizable, fluid touch-enabled carousel foundations. | `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js` |
| **Howler.js / Web Audio API**| Subtle UI audio feedback, click chimes, and ambient spatial audio. | `https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.4/howler.min.js` |

---

## 2. Visual Interaction & Motion Techniques

Select techniques from this index to elevate standard slicing into an award-winning showcase:

| Technique | Visual Description & Implementation Guide |
| :--- | :--- |
| **Kinetic Typography** | Headings translate, rotate, or track on scroll using bezier timing. |
| **Staggered Text Reveal** | Line-by-line or word-by-word reveal using `overflow: hidden` parent with children translating from `translateY(110%)`. |
| **Text Masking** | Large editorial typography masked inside clipping containers or acting as a background video mask. |
| **Variable Font Animation** | Dynamically altering `font-variation-settings: 'wght' 800, 'wdth' 120` based on scroll velocity or mouse proximity. |
| **Clip-Path Reveal** | Expanding image cards using `clip-path: circle(0% at 50% 50%)` to `circle(100% at 50% 50%)` or polygon insets. |
| **SVG Masking & Morphing** | Vector silhouettes masking media; shape paths morphing organically on hover. |
| **Pinned Storytelling** | Pinning a viewport section with `ScrollTrigger.create({ pin: true })` while side-text or visual steps unfold. |
| **Horizontal Scroll Section** | Vertically scrubbing through a horizontal flex row using GSAP `xPercent: -100 * (sections.length - 1)`. |
| **Layered Parallax** | Background, midground, and foreground elements moving at staggered speeds (`data-speed="0.2"`, `0.5"`, `0.8"`). |
| **Scroll-Linked 3D / Canvas Sequence** | Pre-rendering 60-120 high-res WebP/JPG frames of a 3D product rotation and drawing the current frame to a fixed `<canvas>` mapped to scroll progress. |
| **Mouse-Follow Tilt** | 3D card tilt effect tracking cursor position with CSS `transform: perspective(1000px) rotateX(...) rotateY(...)`. |
| **Magnetic Interaction** | Buttons or badge pills softly snapping toward the cursor when hovering within a 50px radius. |
| **Cursor Image Preview** | Floating image thumbnail following the pointer when hovering table/list rows. |
| **Circular Reveal Dark/Light Mode** | Using `document.startViewTransition()` to clip-path expand dark or light mode from the toggle button's click coordinates. |
| **Scroll Velocity Effects** | Skewing or stretching card typography based on scroll speed (`clamp(-15deg, velocity * 0.1, 15deg)`). |

---

## 3. WebGL & Shader Effects

For cutting-edge or experiential portfolios:

| Shader / WebGL Effect | Visual Result |
| :--- | :--- |
| **Displacement Transition** | Image transitions using liquid ripple, turbulence noise, or water wave distortion textures. |
| **Flowmap Distortion** | Mouse pointer leaves a temporary fluid trail across media that organically dissipates. |
| **Refraction / Transmission** | Chromatic aberration and realistic glass dispersion warping the content behind it. |
| **Particle Morphing** | GPU points dispersing into cloud formations or rearranging into logos/typography. |
| **Dissolve / Noise Erosion** | Images dissolve via procedural Simplex/Perlin noise burn patterns. |
| **Post-Processing (Bloom / Grain)** | Film grain overlays, cinematic vignette, and subtle glow passes. |

---

## 4. Key Implementation Recipes

### A. Lenis Smooth Scroll + GSAP ScrollTrigger Integration
```javascript
// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});

// Synchronize Lenis with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### B. Canvas Image Sequence (Apple-Style 3D Product Scroll)
```javascript
function initCanvasSequence(canvasSelector, frameCount, frameUrlGenerator) {
  const canvas = document.querySelector(canvasSelector);
  const context = canvas.getContext('2d');
  const images = [];
  const sequence = { frame: 0 };

  // 1. Preload frames
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = frameUrlGenerator(i);
    images.push(img);
  }

  // 2. Render helper
  function render() {
    const img = images[sequence.frame];
    if (img && img.complete) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }

  images[0].onload = render;

  // 3. Bind to ScrollTrigger
  gsap.to(sequence, {
    frame: frameCount - 1,
    snap: 'frame',
    ease: 'none',
    scrollTrigger: {
      trigger: canvas.parentElement,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 0.5
    },
    onUpdate: render
  });
}
```

### C. Circular Reveal Theme Toggle (View Transition API)
```javascript
function toggleThemeWithCircularReveal(event) {
  if (!document.startViewTransition) {
    document.body.classList.toggle('dark-theme');
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const transition = document.startViewTransition(() => {
    document.body.classList.toggle('dark-theme');
  });

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: 500,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        pseudoElement: '::view-transition-new(root)'
      }
    );
  });
}
```

### D. Magnetic Interaction (Button Snapping)
```javascript
function initMagneticButton(buttonSelector) {
  const btn = document.querySelector(buttonSelector);
  if (!btn) return;

  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0px, 0px)';
  });
}
```

---

## 5. Performance & Accessibility Guardrails

1. **60 FPS Rule**: Always animate `transform` and `opacity`. Never animate `top`, `left`, `width`, `height`, or `margin` during continuous scroll.
2. **Graceful Mobile Degradation**: Heavy 3D canvas sequences or complex WebGL shaders must automatically fallback to optimized static imagery or CSS keyframes on screens < 768px.
3. **Respect Reduced Motion**:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```
4. **Zero Layout Shifts**: Pin containers must maintain explicit height wrappers (`min-height: 100vh`) to prevent sudden scroll jumps.
