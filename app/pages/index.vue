<script setup lang="ts">
useSeoMeta({
  title: "Colophon — a calm, content-first RSS reader",
  description:
    "A calm, content-first RSS and newsletter reader for iPhone and iPad. Now in TestFlight.",
  ogTitle: "Colophon",
  ogDescription:
    "A calm, content-first RSS and newsletter reader for iPhone and iPad.",
  ogType: "website",
  ogUrl: "https://colophonrss.app/",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <section class="hero">
    <div class="hero__mark" aria-hidden="true">
      <svg viewBox="0 0 140 149" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M73.5514 148.102C29.4879 148.102 -2.13166 112.607 0.112314 70.9911C2.15229 31.8236 34.5879 0 74.7754 0C91.5031 0 103.335 5.91592 114.351 5.91592C118.431 5.91592 124.347 5.09994 126.387 1.42799L129.243 1.22399L133.119 60.1792L130.263 60.5872C124.143 35.9035 102.315 3.67195 74.9794 3.67195C55.1916 3.67195 34.5879 22.6437 34.3839 55.4873C34.1799 92.2068 60.2915 118.93 92.3191 118.93C113.739 118.93 130.263 106.895 136.995 89.9629L139.443 90.5748C134.751 124.642 109.047 148.102 73.5514 148.102Z"
        />
      </svg>
    </div>

    <h1 class="hero__title">Colophon</h1>

    <p class="hero__tagline">
      A calm, content-first RSS and newsletter reader for iPhone and iPad.
    </p>

    <a
      class="hero__cta"
      href="https://testflight.apple.com/join/xCmmRp7d"
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

.hero__mark {
  width: clamp(3.5rem, 10vw, 5.5rem);

  svg {
    width: 100%;
    height: auto;
    fill: var(--accent);
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  padding: 0.9rem 1.5rem;
  background: var(--accent);
  color: var(--accent-fg);
  font-size: $type-body;
  font-weight: 500;
  border-radius: 999px;
  transition:
    transform $transition-fast $ease-out,
    opacity $transition-fast $ease-out;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    opacity: 0.92;
  }
}

.hero__status {
  margin-top: 0.5rem;
  font-size: $type-small;
  color: var(--fg-muted);
}
</style>
