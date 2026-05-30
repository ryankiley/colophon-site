<script setup lang="ts">
// CONTACT_EMAIL is auto-imported from app/utils/site.
usePageSetup({
  title: "Terms of Use",
  description:
    "The plain-language terms for using the Colophon app and this website. Colophon is free, in beta, and provided as-is.",
});

const lastUpdated = "May 30, 2026";
const APPLE_EULA =
  "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";
</script>

<template>
  <article class="legal">
    <header class="legal__header">
      <p class="legal__crumb">
        <NuxtLink to="/">← Colophon</NuxtLink>
      </p>
      <h1>Terms of Use</h1>
      <p class="legal__updated">Last updated {{ lastUpdated }}</p>
    </header>

    <section>
      <p>
        These terms cover your use of the Colophon app and this website
        (colophonrss.app). They're written to be readable, not to trap you.
        Colophon is made by one person, it's free, and it's currently in beta.
        By using the app or the site, you agree to what's below. If you don't
        agree, that's completely fine — just don't use them.
      </p>
    </section>

    <section>
      <h2>It's a beta, provided “as is”</h2>
      <p>
        Colophon is early software offered free of charge for testing. It may
        contain bugs, change between builds, lose data, or stop working. It's
        provided <strong>as is</strong> and <strong>as available</strong>, with
        no warranties of any kind, to the fullest extent the law allows. Please
        don't rely on it as the only place you keep anything important.
      </p>
    </section>

    <section>
      <h2>Your data is yours</h2>
      <p>
        There are no accounts and no Colophon server. Your reading lives on your
        device and, if you enable it, in your own private iCloud. What the app
        and site do with data is described in the
        <NuxtLink to="/privacy">Privacy</NuxtLink> page, which is part of these
        terms.
      </p>
    </section>

    <section>
      <h2>Feeds and articles belong to their publishers</h2>
      <p>
        Colophon is a reader. The feeds, articles, images, and other content you
        view through it are created and owned by the publishers you subscribe
        to, not by Colophon. The app simply fetches and displays what you ask it
        to. You're responsible for honouring those publishers' own terms and
        copyright, and for the feeds you choose to add.
      </p>
    </section>

    <section>
      <h2>Fair use of the app</h2>
      <p>
        Please don't use Colophon to break the law, to infringe others' rights,
        or to attack, overload, or abuse the small set of services the app talks
        to — including the in-app bug-report channel. The app is for personal,
        non-commercial reading.
      </p>
    </section>

    <section>
      <h2>The app's licence</h2>
      <p>
        The Colophon app is licensed, not sold, to you for use under Apple's
        standard
        <a :href="APPLE_EULA" rel="noopener">Licensed Application End User
        License Agreement</a>, except where these terms add to it. That
        agreement covers the licence to install and use the app on your Apple
        devices.
      </p>
    </section>

    <section>
      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, the author of Colophon is not
        liable for any indirect, incidental, or consequential damages, or for
        any loss of data, arising from your use of the app or this website. As
        beta software offered for free, it comes with no guarantee of
        availability, accuracy, or fitness for any particular purpose.
      </p>
    </section>

    <section>
      <h2>Changes</h2>
      <p>
        These terms may change as the app grows. Material changes will be
        reflected here with a new date. Continuing to use Colophon after a
        change means you accept the updated terms.
      </p>
    </section>

    <section>
      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Oregon, United
        States, without regard to its conflict-of-laws rules. Nothing here
        limits any rights you have under the mandatory laws of the place you
        live.
      </p>
    </section>

    <section>
      <h2>Contact</h2>
      <p>
        Questions about these terms or the app:
        <a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>.
      </p>
    </section>
  </article>
</template>

<style scoped lang="scss">
.legal {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-block: 3rem 4rem;
  max-width: 38rem;
  margin-inline: auto;
  width: 100%;
  line-height: $leading-prose;
}

.legal__header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h1 {
    font-size: $type-h1;
  }
}

.legal__crumb {
  font-size: $type-small;
  color: var(--fg-muted);

  a {
    transition: color $transition-fast $ease-out;

    &:hover,
    &:focus-visible {
      color: var(--fg);
    }
  }
}

.legal__updated {
  font-size: $type-small;
  color: var(--fg-muted);
}

section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

h2 {
  font-size: 1.25rem;
  margin-top: 0.5rem;
}

a {
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--rule);
  transition: text-decoration-color $transition-fast $ease-out;

  &:hover,
  &:focus-visible {
    text-decoration-color: currentColor;
  }
}

strong {
  font-weight: 600;
  color: var(--fg);
}
</style>
