<script setup lang="ts">
useSeoMeta({
  title: "Privacy — Colophon",
  description:
    "Colophon collects no analytics, ships no third-party trackers, and keeps every byte of article content on your device.",
  ogTitle: "Privacy — Colophon",
  ogDescription:
    "Colophon collects no analytics, ships no third-party trackers, and keeps every byte of article content on your device.",
  ogUrl: "https://colophonrss.app/privacy",
});

const lastUpdated = "May 27, 2026";
</script>

<template>
  <article class="privacy">
    <header class="privacy__header">
      <p class="privacy__crumb">
        <NuxtLink to="/">← Colophon</NuxtLink>
      </p>
      <h1>Privacy</h1>
      <p class="privacy__updated">Last updated {{ lastUpdated }}</p>
    </header>

    <section class="privacy__intro">
      <p>
        Colophon is a reading app. It collects no analytics, ships no
        third-party trackers, and keeps every byte of article content on your
        device. This page describes what the app stores, what it sends over the
        network, and where to ask questions.
      </p>
    </section>

    <section>
      <h2>What stays on your device</h2>
      <p>
        Your feeds, folders, read state, Later queue, and reading preferences
        are stored locally using Apple's SwiftData framework. When iCloud sync
        is enabled, this data is mirrored to your private iCloud database via
        CloudKit. Apple holds those records; Colophon's author cannot read them.
      </p>
      <p>
        AI summaries are generated on-device using Apple's Foundation Models
        framework. Article text never leaves your device for summarization, and
        summaries are not persisted to CloudKit.
      </p>
    </section>

    <section>
      <h2>What the app sends over the network</h2>
      <ul>
        <li>
          <strong>Feeds you subscribe to.</strong> The app fetches RSS / Atom /
          JSON Feed URLs from the publishers you choose. The publisher's server
          sees a request from your IP address.
        </li>
        <li>
          <strong>Article assets.</strong> Hero images, favicons, and linked
          media load from the URLs the feeds reference. Those publishers' CDNs
          see requests from your IP address.
        </li>
        <li>
          <strong>Translation.</strong> If you tap the translate action, Apple's
          Translation framework handles the request. On supported devices the
          translation runs on-device; on older devices it may use Apple's
          servers. Apple's privacy policy applies.
        </li>
        <li>
          <strong>Bug reports you choose to send.</strong> The in-app "Report a
          bug" flow posts your text plus optional diagnostic details to a
          GitHub issue on the private Colophon repository, using a token scoped
          to that single repo's issues. Nothing else.
        </li>
      </ul>
    </section>

    <section>
      <h2>What the app does not do</h2>
      <ul>
        <li>No analytics SDKs. No event tracking. No session replay.</li>
        <li>No advertising. No tracking pixels. No third-party scripts.</li>
        <li>No account creation. No password. No server-side profile.</li>
        <li>
          No telemetry beyond Apple's opt-in MetricKit, which the app reads only
          if you have it enabled in iOS settings.
        </li>
      </ul>
    </section>

    <section>
      <h2>Children</h2>
      <p>
        Colophon is not directed at children under 13 and does not knowingly
        collect personal information from anyone.
      </p>
    </section>

    <section>
      <h2>Changes</h2>
      <p>
        Material changes to this policy will be reflected here with an updated
        date. The current revision is dated {{ lastUpdated }}.
      </p>
    </section>

    <section>
      <h2>Contact</h2>
      <p>
        Questions about privacy or the app:
        <a href="mailto:ryanekiley@gmail.com">ryanekiley@gmail.com</a>.
      </p>
    </section>
  </article>
</template>

<style scoped lang="scss">
.privacy {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-block: 3rem 4rem;
  max-width: 38rem;
  margin-inline: auto;
  width: 100%;
  line-height: 1.65;
}

.privacy__header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h1 {
    font-size: clamp(2rem, 4vw + 1rem, 2.75rem);
  }
}

.privacy__crumb {
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

.privacy__updated {
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

ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 1.25rem;
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
