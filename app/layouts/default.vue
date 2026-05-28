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
        <a href="mailto:ryanekiley@gmail.com" class="footer__link">Contact</a>
      </nav>
      <p class="footer__meta">
        <span>colophonrss.app</span>
        <span aria-hidden="true">·</span>
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
  padding-inline: $gutter;
}

.main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-block: 2.5rem 2rem;
  border-top: 1px solid var(--rule);
  color: var(--fg-muted);
  font-size: $type-small;
  opacity: 0;
  animation: footer-fade 720ms cubic-bezier(0, 0, 0.2, 1) 720ms forwards;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }

  @media (min-width: $breakpoint-tablet) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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
