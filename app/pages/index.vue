<script setup lang="ts">
// Home page inherits the default title + description from the SEO plugin;
// usePageSetup still sets canonical + og:url. SITE_URL / TESTFLIGHT_URL
// are auto-imported from app/utils/site.
usePageSetup();

// SoftwareApplication schema — gives search engines + AI agents the
// metadata they need to surface the app as a product entity (name,
// category, OS, free price, link to the App Store / TestFlight).
useStructuredData({
  "@type": "SoftwareApplication",
  name: "Colophon",
  applicationCategory: "NewsApplication",
  operatingSystem: "iOS 26.0+",
  description:
    "A calm, content-first RSS and newsletter reader for iPhone and iPad.",
  url: SITE_URL,
  downloadUrl: TESTFLIGHT_URL,
  installUrl: TESTFLIGHT_URL,
  releaseNotes: "Internal alpha — invite-only via TestFlight.",
  author: {
    "@type": "Person",
    name: "Ryan Kiley",
    url: "https://ryankiley.com",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
});
</script>

<template>
  <section class="hero">
    <div class="hero__icon" aria-hidden="true">
      <svg
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--icon-bg-top)" />
            <stop offset="100%" stop-color="var(--icon-bg-bottom)" />
          </linearGradient>
          <filter id="emboss" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
            <feOffset dx="0" dy="6" result="offset" />
            <feComposite in="SourceAlpha" in2="offset" operator="arithmetic" k2="-1" k3="1" result="inner" />
            <feFlood flood-color="var(--icon-glyph-shadow)" flood-opacity="0.35" />
            <feComposite in2="inner" operator="in" />
            <feComposite in="SourceGraphic" operator="over" />
          </filter>
        </defs>
        <rect width="1024" height="1024" rx="229" ry="229" fill="url(#bg)" />
        <g filter="url(#emboss)">
          <path
            transform="translate(140 130) scale(5.24)"
            fill="var(--icon-glyph)"
            fill-opacity="0.92"
            d="M73.5514 148.102C29.4879 148.102 -2.13166 112.607 0.112314 70.9911C2.15229 31.8236 34.5879 0 74.7754 0C91.5031 0 103.335 5.91592 114.351 5.91592C118.431 5.91592 124.347 5.09994 126.387 1.42799L129.243 1.22399L133.119 60.1792L130.263 60.5872C124.143 35.9035 102.315 3.67195 74.9794 3.67195C55.1916 3.67195 34.5879 22.6437 34.3839 55.4873C34.1799 92.2068 60.2915 118.93 92.3191 118.93C113.739 118.93 130.263 106.895 136.995 89.9629L139.443 90.5748C134.751 124.642 109.047 148.102 73.5514 148.102Z"
          />
        </g>
      </svg>
    </div>

    <h1 class="hero__title">Colophon</h1>

    <p class="hero__tagline">
      A calm, content-first RSS and newsletter reader for iPhone and iPad.
    </p>

    <a
      class="hero__cta"
      :href="TESTFLIGHT_URL"
      rel="noopener"
    >
      Join the TestFlight
    </a>

    <p class="hero__status">
      Internal alpha. iOS 26+. iPhone &amp; iPad.
    </p>
  </section>
</template>

<style scoped lang="scss">
.hero {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.5rem;
  padding-block: 4rem;
  min-height: 80dvh;
}

// First-paint reveal — staggered fade-up of the hero pieces using the
// Material classic ease-out ($ease-reveal). No IntersectionObserver:
// every hero element is above the fold.
.hero > * {
  opacity: 0;
  // Entrance uses the independent `translate` property (not `transform`)
  // so the CTA's hover `transform` composes with it, rather than being
  // overridden by this animation's forwards-fill.
  translate: 0 0.75rem;
  animation: hero-rise $duration-reveal $ease-reveal forwards;
}

// Icon rises in with the rest of the hero; its (static) shadow rides along
// on the reveal's opacity, so it doesn't arrive flat.
.hero__icon {
  animation: hero-rise $duration-reveal $ease-reveal 80ms forwards;
}
.hero__title { animation-delay: 220ms; }
.hero__tagline { animation-delay: 340ms; }
.hero__cta { animation-delay: 460ms; }
.hero__status { animation-delay: 580ms; }

@keyframes hero-rise {
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero > * {
    animation: none;
    opacity: 1;
    translate: none;
  }

  // Keep the CTA's colour + elevation state changes (no vestibular
  // motion); only the hover/focus lift is removed.
  .hero__cta {
    --cta-lift: 0;
  }
}

.hero__icon {
  width: clamp(5rem, 12vw, 7.5rem);
  aspect-ratio: 1;

  // Light-mode icon palette — matches the iOS app icon (cream squircle,
  // dark C glyph with a soft shadow that reads as embossed). Dark-mode
  // values overridden below.
  --icon-bg-top: #f5f5f5;
  --icon-bg-bottom: #d8d8d8;
  --icon-glyph: #1c1c1c;
  --icon-glyph-shadow: #000;

  // Static soft drop shadow with literal alphas — no custom-property /
  // @property indirection. WebKit boxes the shadow when an @property-driven
  // alpha is used inside a filter and the CSS is external (not inlined);
  // literal values render identically everywhere. Dark mode deepens it below.
  filter: drop-shadow(0 18px 36px rgb(0 0 0 / 0.18))
    drop-shadow(0 4px 10px rgb(0 0 0 / 0.08));

  svg {
    width: 100%;
    height: auto;
    display: block;
  }
}

@media (prefers-color-scheme: dark) {
  .hero__icon {
    --icon-bg-top: #2d2d2d;
    --icon-bg-bottom: #181818;
    --icon-glyph: #f0f0f0;
    --icon-glyph-shadow: #000;
    // Deeper shadow in dark mode.
    filter: drop-shadow(0 18px 36px rgb(0 0 0 / 0.55))
      drop-shadow(0 4px 10px rgb(0 0 0 / 0.35));
  }
}

.hero__title {
  font-size: $type-hero;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.hero__tagline {
  font-size: clamp(1.125rem, 1.5vw + 0.75rem, 1.375rem);
  line-height: 1.4;
  color: var(--fg-muted);
  max-width: 32ch;
  text-wrap: balance;
}

.hero__cta {
  // Interaction-state palette as custom properties: the dark theme retunes
  // the elevation without restating the rules, and reduced motion zeroes
  // the lift in one place.
  --cta-fill: var(--accent);
  --cta-lift: -2px;
  --cta-shadow-rest:
    0 1px 2px rgb(0 0 0 / 0.10),
    0 2px 6px rgb(0 0 0 / 0.06);
  --cta-shadow-raised:
    0 4px 10px rgb(0 0 0 / 0.14),
    0 10px 24px rgb(0 0 0 / 0.10);
  --cta-shadow-pressed: 0 1px 2px rgb(0 0 0 / 0.12);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  padding: 0.9rem 1.5rem;
  background: var(--cta-fill);
  color: var(--accent-fg);
  font-size: $type-body;
  font-weight: 500;
  border-radius: 999px;
  box-shadow: var(--cta-shadow-rest);
  // Interruptible (transition, not keyframes) so a reversed hover retargets
  // mid-flight. Elevation and a state-layer colour shift carry the states.
  transition:
    transform $transition-fast $ease-out,
    box-shadow $transition-fast $ease-out,
    background-color $transition-fast $ease-out;

  // Hover and keyboard focus share the raised look: lift + deeper shadow.
  &:hover,
  &:focus-visible {
    box-shadow: var(--cta-shadow-raised);
    transform: translateY(var(--cta-lift));
  }

  // State layer — mix the on-accent colour into the fill. The Material
  // overlay model: theme-correct in both schemes, no hand-picked hues.
  &:hover {
    --cta-fill: color-mix(in oklab, var(--accent), var(--accent-fg) 8%);
  }

  // Keyboard focus adds a ring, offset by the page surface so the
  // affordance never rests on colour contrast alone. Suppressed while
  // pressed (:not(:active)) so the ring doesn't stack on the press state.
  &:focus-visible:not(:active) {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  // Press: settle back down onto a tight shadow with a stronger layer, fast.
  &:active {
    --cta-fill: color-mix(in oklab, var(--accent), var(--accent-fg) 14%);
    box-shadow: var(--cta-shadow-pressed);
    transform: translateY(0);
    transition-duration: 80ms;
  }
}

// A light button on the near-black dark surface casts almost no dark
// shadow, so dark mode leans on deeper alphas plus the lift to read raised.
@media (prefers-color-scheme: dark) {
  .hero__cta {
    --cta-shadow-rest: 0 1px 3px rgb(0 0 0 / 0.5);
    --cta-shadow-raised:
      0 6px 18px rgb(0 0 0 / 0.6),
      0 2px 6px rgb(0 0 0 / 0.4);
    --cta-shadow-pressed: 0 1px 2px rgb(0 0 0 / 0.5);
  }
}

.hero__status {
  margin-top: 0.5rem;
  font-size: $type-small;
  color: var(--fg-muted);
}
</style>
