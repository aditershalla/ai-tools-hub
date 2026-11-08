# AI Tools Hub V5 — review before release

**Status:** PREVIEW ONLY. Keep this branch unmerged until the operator reviews the copy, contact information, privacy disclosures and Pages preview deployment. Intended production host: `https://ai-tools-hub-882.pages.dev`.

## Files / changes

- Added `about/index.html`, `contact/index.html`, `privacy/index.html` (a deliberately marked **draft** until verified against Cloudflare settings); footer and navigation now link to the real pages.
- Added `404.html` to opt out of Cloudflare Pages' default SPA fallback; absent routes should return proper 404 after deployment, per official Cloudflare Pages serving docs.
- Added `sitemap.xml` with 16 canonical URLs and corrected `robots.txt`; deliberately **no ads.txt** pending the precise authorized AdSense entry (otherwise its URL should 404).
- Added static `top-100/index.html`, with all 100 editorial entries available from initial HTML; added static HTML card content to homepage and static detailed editorial overview pages for the 12 featured tools under `tools/…/index.html`.
- Added canonical, OG, Twitter card metadata and an efficient self-hosted social share image `assets/og-cover.jpg`.
- Added keyboard-operable mobile navigation (`navigation.js`), visible input focus, small-screen layout refinements, contrast tweaks and copy/status/error handling for AI Writer.
- Preserved prior hero and 7-workspace-tool design; all original V4 tool JS/data and Cloudflare AI Pages Function remain in project.

## Local QA (not a production audit)

- 81 UI assertions passed: widths 360 / 390 / 768 / 1440, no document overflow, menu toggling / Escape, JS console errors, no-match/reset, Top 100 filtering / Show more, card overview and official hrefs, browser tools including malformed JSON/URL and password no-set, AI Writer **mocked** success/503 and blank prompt. See test runner outside repo.
- Additional static link/SEO audit: 19 HTML files, 16 XML sitemap URLs, 0 missing local href targets, 103 distinct external links structurally parsed but NOT verified by a live provider request. All sitemap URLs match a static canonical HTML page.
- The Cloudflare production site and live Workers AI generation could not be reliably fetched from the current environment, therefore **not verified** after this change.
- PageSpeed Insights and public Lighthouse audit could not be retrieved here; **no performance score claimed**. File sizes (pre-deploy): robot WebP 17,526 bytes, share JPEG 28,576 bytes, home HTML ~26 KB, styles ~45 KB. Server/network impact not measured.

## Owner decisions required BEFORE release

1. Provide a **public-facing site operator identity** appropriate for the site's jurisdiction and a **private contact channel/email** (preferably one the owner monitors). Do not publish private personal information inadvertently.
2. Confirm Cloudflare hosting/account log retention, Workers AI model processing/retention, any enabled analytics, favicon provider usage, intended visitor regions and privacy jurisdiction. Tailor and approve the Privacy Policy; it currently states clearly that it is a draft.
3. If using AdSense, provide the **exact ads.txt line from your own AdSense account**. No publisher ID is fabricated. Before placing ad tags, establish all applicable privacy notices and a Google-certified CMP where required for EEA, UK and Switzerland.
4. Check the **Cloudflare preview deployment status** and test HTTP 404/sitemap MIME types, live Workers AI, and all externally hosted product links. Then run Google PageSpeed Insights on the deployed preview and production to guide further optimization.
5. Approve the preview and explicitly request merge to `main`; do not merge automatically.

## Product claims policy

The Top 100 list is a **curated editorial selection**, not a measured global market ranking. There are no fabricated review scores, user counts, hands-on tests, specific price claims or paid placements. The 12 static overviews use existing editorial notes and generic testing advice, with links to official providers.

## Useful official documentation

- Cloudflare Pages serving and 404 behavior: https://developers.cloudflare.com/pages/configuration/serving-pages/
- Cloudflare Pages preview deployments: https://developers.cloudflare.com/pages/configuration/preview-deployments/
- Google XML sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google JavaScript SEO basics: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google AdSense suitability: https://support.google.com/adsense/answer/7299563
- Google Publisher Policies: https://support.google.com/adsense/answer/10502938
- Google CMP requirements: https://support.google.com/adsense/answer/13554116
