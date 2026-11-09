# AI Tools Hub V14 — Premium Dark Hero (review only)

Based on the owner-supplied target design. This branch includes V10, V11, V12 and V13, while leaving production `main` untouched.

## Scope

- Replaced only the **dark-mode** hero robot asset with an optimized 63 KB high-resolution WebP derived from the owner's provided generative reference image, carefully masked to avoid any baked-in navigation, text or app icons. All foreground labels, links, buttons and animated icon rows remain editable and interactive HTML.
- On desktop widened the dark hero/header alignment, refined heading to the same two-line break, brought logo rows to the right, and styled the search, badges, statistic strip and tagline with dark navy, bright violet LED/glass effects.
- Preserved the existing **light-mode robot image**, 100 directory entries, all seven workspace utilities, V10 moving logos, V11 menu, V12 switch, V13 text clipping fixes and existing content. Changed the tagline HTML only to wrap `right AI` for dark emphasis; light typography remains unchanged.
- On phones positioned the robot below body copy to protect legibility while preserving glow behind the icon rows. No paid service or library added.

## Tests performed

- Offline Chromium visual and DOM checks at 360, 390, 768, 1440 and 1659 px: correct dark robot visible, theme switch Light -> Dark -> Light, menu Escape close, active marquee links, no document horizontal scrolling, no uncaught JavaScript exceptions in fixture.
- PNG screenshots for 1659, 1440, 768, 390 and 360 px.
- Local screenshot uses fallback letters for product logos because third-party favicon endpoints are inaccessible from offline Chromium. Production should use existing favicon loaders; external icons are not verified by this test.
- Site-wide pages and real Cloudflare Workers AI are not comprehensively retested. Preview publication status must be confirmed before approval.

## Deployment

Draft GitHub PR for owner review only; never merge or change `main` until owner explicitly approves. Only the `aditershalla/ai-tools-hub` repository and its existing Cloudflare project are used, leaving `vycecity` untouched.
