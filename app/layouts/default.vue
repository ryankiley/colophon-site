<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <div class="page">
    <a href="#main" class="skip-link">Skip to content</a>
    <main id="main" class="main">
      <slot />
    </main>
    <footer class="footer">
      <nav class="footer__nav" aria-label="Footer">
        <NuxtLink to="/privacy" class="footer__link">Privacy</NuxtLink>
        <NuxtLink to="/terms" class="footer__link">Terms</NuxtLink>
        <a :href="GITHUB_URL" rel="noopener" class="footer__link">GitHub</a>
        <a :href="`mailto:${CONTACT_EMAIL}`" class="footer__link">Contact</a>
      </nav>
      <p class="footer__meta">
        <a
          href="https://ryankiley.com"
          rel="noopener author me"
          class="footer__link"
        >© {{ year }} Ryan Kiley</a>
      </p>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.page {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: $max-content-width;
  margin: 0 auto;
  // max() keeps the gutter on normal screens but expands to clear the
  // notch / rounded corners on landscape iPhone (viewport-fit=cover).
  padding-inline: max(#{$gutter}, env(safe-area-inset-left), env(safe-area-inset-right));
}

.main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 2.5rem 2rem;
  border-top: 1px solid var(--rule);
  color: var(--fg-muted);
  font-size: $type-small;
  opacity: 0;
  animation: footer-fade $duration-reveal $ease-reveal $duration-reveal forwards;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
}

.footer__nav {
  display: flex;
  gap: 1.5rem;
}

.footer__link {
  color: var(--fg-muted);
  transition: color $transition-fast $ease-out;

  &:hover,
  &:focus-visible {
    color: var(--fg);
  }
}

.footer__meta {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

@keyframes footer-fade {
  to {
    opacity: 1;
  }
}
</style>
