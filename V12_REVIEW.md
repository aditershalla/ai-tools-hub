# AI Tools Hub V12 — Light / Dark mode preview

Scope: `aditershalla/ai-tools-hub`, branching from **V11 review** (`b16f4b2...`), so V10 animated hero and V11 header/menu are included. Production main remains unchanged until owner approval.

## Changes

- Accessible Light/Dark switch adjacent to the Top 100 crown on desktop; placed next to hamburger on mobile when Top 100 is hidden for space.
- Shared `navigation.js` injects and handles the switch across all pages that already load it (homepage, Top 100, guides, static tool profiles, About, Contact, Privacy, Terms).
- Theme is **light by default**, a visitor's explicit choice is stored in browser `localStorage` under `ai-tools-hub-theme`, and the document uses `data-theme=dark|light`. LocalStorage failure is handled safely.
- Dark color overrides scoped to `html[data-theme="dark"]` in the main stylesheet. Cards, comparison, search, workspace inputs, directory, menus, newsletter and other existing components retain their original light styles and receive matching dark colors. No color-inversion effects, new JS libraries or external API calls.
- `meta[name=theme-color]` reflects current theme in the active document where the meta tag exists.

## Tests performed

- Offline Chromium layout and interaction at 360, 390, 768 and 1440px: no horizontal page overflow; switch displayed, focus/role/state behavior, dark/light colors, menu opens and closes with Escape, no uncaught errors.
- Light and dark screenshots generated for desktop and mobile.
- Preference read/write/reinitialization tested with a mocked localStorage implementation. Native cross-page persistence could not be tested because local URL navigation was blocked by Chromium's network policy.
- `node --check navigation.js` passed.
- Cloudflare build status should be checked against the review-branch commit before approving.

## Limitations

- No live Cloudflare button-click, full-page contrast audit, or real-user Core Web Vitals score claimed.
- Preference is stored only in the visitor's browser, not on a server. Disabled storage causes the default light theme each visit.
- The code intentionally makes no changes to ad/newsletter/AI backend configuration.
