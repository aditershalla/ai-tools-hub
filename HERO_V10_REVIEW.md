# V10 hero-only preview — animated logo showcase

## Scope and preservation
- Replaced the **decorative** right hero `.hero-art` mock window and its floating badges with two responsive horizontal marquees.
- Preserved existing hero text, robot background, hero search, header, glass metrics bar, and every subsequent section and free workspace function.
- Uses **20 existing directory entries** linked to their real `/tools/{slug}/` pages; no new provider or content record is introduced.
- Official-domain favicons use the project's existing Google favicon / DuckDuckGo fallback behavior. The visible initials are fallback if third-party assets are blocked.
- Minimal `hero-logo-marquee.js` clones only a decorative second set per lane; clone anchors are removed from the sequential keyboard tab order. Normal links are native anchors.
- Two opposite animations use lightweight CSS transforms with gap-adjusted 50% travel for seamless continuous motion; hover pauses per row.

## Offline rendering and functional verification
- Rendered hero at widths **360, 390, 768 and 1440 CSS pixels** using headless Chromium with inline CSS/scripts and a local robot WebP. All four had **0 horizontal overflow** within the isolated hero + proof section, and hero/text/proof bounding boxes did not overlap.
- Each original row contains 10 working internal `href` paths; cloned row has 10 non-tabbable repeated anchors; no duplicate links in keyboard order.
- Hover pause and keyboard focus styling confirmed at 390 and 1440 px.
- `prefers-reduced-motion: reduce` disables animations and leaves horizontally scrollable static rows.
- JavaScript parsed with `node --check`.

## Verification limitations
- The local screenshot uses the logo-letter fallback because outbound favicon requests are blocked by the offline renderer. Real icons should load from the same services used by the existing directory, where allowed by the visitor network.
- Screenshots reflect current V9 homepage markup and V6 base CSS plus appended hero changes; the deployed GitHub preview uses the full latest V9 CSS, which is authoritative. Full live Cloudflare browsing and all other sections are not re-certified by the isolated browser test.
- No unrelated repository or Cloudflare project modified. Do not merge until owner approves the preview.
