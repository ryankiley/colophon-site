<script setup lang="ts">
// CONTACT_EMAIL is auto-imported from app/utils/site.
usePageSetup({
  title: "Privacy",
  description:
    "Colophon collects no analytics and ships no third-party trackers. Your reading lives on your device and in your own private iCloud — there is no Colophon server.",
});

const lastUpdated = "May 30, 2026";
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

    <section>
      <p>
        Colophon is a reading app. It collects no analytics and ships no
        third-party trackers. There is no Colophon account, no Colophon server,
        and no Colophon-operated cloud: your reading lives on your device and,
        if you turn on iCloud sync, in your <em>own</em> private iCloud, which
        the author cannot read. This page describes what the app stores, what
        it sends over the network and when, and where to ask questions. It also
        discloses the (very small) analytics this marketing website itself uses.
      </p>
    </section>

    <section>
      <h2>About this website</h2>
      <p>
        This website (colophonrss.app) is hosted on Vercel and uses Vercel's
        <strong>Web Analytics</strong> and <strong>Speed Insights</strong>.
        Both are cookieless. IP addresses are hashed at the edge and never
        stored. There is no cross-site tracking, no advertising profile, and
        no personal data collected.
      </p>
      <ul>
        <li>
          <strong>Web Analytics</strong> counts page views and tracks which
          referrers send traffic to the site.
        </li>
        <li>
          <strong>Speed Insights</strong> measures Core Web Vitals (loading,
          interactivity, layout stability) so loading regressions are visible
          to the author.
        </li>
      </ul>
      <p>
        See Vercel's
        <a href="https://vercel.com/docs/analytics/privacy-policy" rel="noopener">Analytics privacy policy</a>
        for the underlying behaviour. The iOS app itself collects none of this.
      </p>
    </section>

    <section>
      <h2>Where your data lives</h2>
      <p>
        Your feeds, folders, read state, Later queue, reading preferences, and
        the article content Colophon saves for offline reading are stored
        locally on your device using Apple's SwiftData framework. There is no
        Colophon server and no Colophon account, so none of this is sent to the
        author.
      </p>
      <p>
        When you turn on iCloud sync, this data — including saved article
        text — is mirrored to your <em>own</em> private iCloud database via
        Apple's CloudKit, so your reading follows you across your devices. Those
        records live in your personal iCloud account; the author cannot read
        them. Sensitive fields — article titles, links, authors, excerpts, image
        addresses, and your feed and folder names — are additionally encrypted,
        so even Apple's sync servers store only ciphertext for those. Turn
        iCloud sync off and everything stays on your device alone.
      </p>
      <p>
        AI summaries are generated on-device using Apple's Foundation Models
        framework. Article text never leaves your device for summarisation, and
        summaries are not synced to iCloud — they are cached only on the device
        that created them.
      </p>
    </section>

    <section>
      <h2>Keeping and deleting your data</h2>
      <p>
        Colophon keeps your articles until you remove them. You can set a
        retention window in Settings to clear older read articles automatically,
        delete individual articles or feeds at any time, and remove everything
        by deleting the app. When iCloud sync is on, you can also manage or
        delete Colophon's data from your device's iCloud storage settings.
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
          <strong>Optional OpenAI voices (off by default).</strong> Read-aloud
          uses Apple's on-device speech by default, so nothing leaves your
          device. If you switch on the experimental OpenAI voices and enter your
          own OpenAI API key, the text to be spoken and your key are sent
          directly from your device to OpenAI to generate the audio. Your key is
          held in your device's Keychain; there is no Colophon server in
          between, and the author never sees it. OpenAI's privacy policy governs
          that request. Leave the feature off and nothing goes to OpenAI.
        </li>
        <li>
          <strong>Bug reports you choose to send.</strong> The in-app "Report a
          bug" flow posts your message — plus basic diagnostics if you include
          them (app version, iOS version, and device model) — to an issue on the
          Colophon repository on GitHub, using a token scoped to that single
          repository's issues. Nothing else is sent.
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
        date.
      </p>
    </section>

    <section>
      <h2>Contact</h2>
      <p>
        Questions about privacy or the app:
        <a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>.
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
  line-height: $leading-prose;
}

.privacy__header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h1 {
    font-size: $type-h1;
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
