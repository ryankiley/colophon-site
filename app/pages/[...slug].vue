<script setup lang="ts">
// Static, JS-free not-found page for any unmatched path. A real page
// rather than error.vue (which only renders client-side — useless under
// features.noScripts), so it prerenders to plain HTML. Built at
// /not-found and copied over 404.html by the prerender hook in
// nuxt.config; Vercel serves that file with a 404 status.
useHead({ title: "Page not found" });
</script>

<template>
  <section class="notfound">
    <p class="notfound__code">404</p>
    <h1 class="notfound__headline">Page not found</h1>
    <p class="notfound__hint">
      <NuxtLink to="/">← Back to Colophon</NuxtLink>
    </p>
  </section>
</template>

<style scoped lang="scss">
.notfound {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.75rem;
  min-height: 70dvh;
  padding-block: 4rem;
}

.notfound__code {
  font-size: $type-small;
  letter-spacing: 0.08em;
  color: var(--fg-muted);
  font-variant-numeric: tabular-nums;
}

.notfound__headline {
  font-size: $type-h1;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.notfound__hint {
  margin-top: 0.5rem;
  font-size: $type-body;

  a {
    color: var(--fg-muted);
    transition: color $transition-fast $ease-out;

    &:hover,
    &:focus-visible {
      color: var(--fg);
    }
  }
}
</style>
