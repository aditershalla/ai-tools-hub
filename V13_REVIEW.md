# AI Tools Hub V13 — Dark Mode visual QA preview

## Scope
This review builds directly on V12, and therefore includes the still-unmerged V10 animated AI logo hero, V11 header/navigation, and V12 Light/Dark toggle. Production `main` remains unchanged until the owner approves the preview. Other repositories and Cloudflare projects are untouched.

## Fixes
- Replaces the over-bright translucent white robot in **Dark Mode only** with a lightweight (`~18.5 KB`) color-graded transparent navy/purple robot image made from the original hero asset. LED-style purple eyes, ear-ring circuitry and contour glow remain visible on a dark indigo gradient. The original Light Mode image is unchanged.
- Removes the erroneous full-width purple background from plain `.section-kicker` typography. This specifically fixes the label above the “100 AI tools to explore.” heading shown in the screenshot.
- Adds line-height, padding, color and unclipped overflow guards to large section headings and fixes several dark-theme muted text, link and card contrast combinations.
- Adds a narrow-screen containment guard to the existing comparison table so users scroll **inside the table**, rather than the entire webpage. This guard applies to both themes.
- No framework, paid service, external image dependency or theme-tracking service added.

## Tests performed
- Local Chromium screenshot and DOM assertions at 360, 390, 768 and 1440 px on a standalone homepage test fixture: dark-mode robot loads; original light image is hidden only in dark; Light Mode remains unchanged; Top 100 label stays intrinsic-width and transparent; heading is not vertically clipped; menu opens and closes using Escape; no page-wide horizontal overflow in the fixture after comparison scroll containment.
- No uncaught JavaScript exceptions in the fixture; review images stored locally.
- **Limitations:** The local fixture is intentionally static and cannot confirm live Cloudflare image loading, external logos, real AI Writer generation, or the complete interaction behavior of all 100 profile pages. A successful Pages build is not proof of exhaustive end-to-end testing.

## Preview checklist for the owner
Open the Cloudflare preview, switch to Dark, and inspect the robot, “100 AI tools to explore.”, workspace, category cards, comparison scrolling and the mobile header. Light Mode should look as before. Approve explicitly before merging this branch to `main`.
