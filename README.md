# AI Tools Hub — GitHub + Cloudflare Pages starter

A responsive AI tools directory plus **seven usable tools**, with a luminous robot hero and a glass-style stats section. No npm, Node build step, paid API key, or database is required for this starter.

## Included

- Directory with search, category filters, direct official links, and favorites saved in the visitor's browser.
- New **Top 100 AI tools** section with 100 curated worldwide tools, editorial numbered list, category chips, text search, official links and progressive "Show more" loading.
- Glassmorphism statistics ribbon with values **calculated from the real site content**, not invented site traffic or ratings. The futuristic robot image is a local, optimized visual asset in `assets/robot-background.webp`.
- Six entirely browser-side utilities: Word Counter, Case Converter, JSON Formatter, Password Maker, URL Encoder, Text Cleaner.
- One AI-powered tool: AI Writer (captions, SEO titles, summaries, emails, general prompts) using Cloudflare Workers AI.
- Responsive English UI, metadata, robots.txt and basic security headers.
- No cookies or analytics added by this starter. Favorites are stored in localStorage.

## Deploy with GitHub and Cloudflare Pages

1. Unzip the starter. On github.com, create an empty public repository named `ai-tools-hub`.
2. Upload **the contents** of the extracted `ai-tools-hub` folder, ensuring that `index.html`, `styles.css`, `app.js`, `top100-data.js`, `functions/api/generate.js`, and `assets/favicon.svg` retain their directory structure. GitHub Desktop or the Git CLI is reliable for nested folders.
3. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git / Import an existing Git repository**.
4. Authorize GitHub if prompted, pick `ai-tools-hub` and choose **Begin setup**.
5. Framework preset: **None**. Build command: `exit 0`. Build output directory: `.`. Production branch: `main`.
6. Deploy. Cloudflare will give you a URL like `https://ai-tools-hub-xxxx.pages.dev` (your actual URL may vary).
7. The directory and six browser tools work immediately after deploy.

### Activate real AI generation (optional, after deployment)

1. In Cloudflare dashboard → **Workers & Pages** → open the new Pages project → **Settings**.
2. Choose the **Production** environment, then **Bindings** → **Add binding** → **Workers AI**.
3. Set the binding variable name to exactly `AI`, save, and **redeploy** the project.
4. Test **Free tools → AI Writer → Generate with AI**.
5. This project uses the Cloudflare model `@cf/google/gemma-4-26b-a4b-it` (updated for the November 2026 Cloudflare model-deprecation announcements).

Cloudflare Workers AI has free daily usage limits; requests can fail when the limit is reached. The AI endpoint is public, so before promotion or significant traffic add abuse protection (Cloudflare Turnstile and/or rate limiting), monitoring, and a privacy policy. Do not add secrets to `app.js`.

## Alternative: push using Git CLI

```bash
cd ai-tools-hub
git init
git add .
git commit -m "Initial AI Tools Hub starter"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-tools-hub.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username. GitHub authentication may be required. For future updates, edit the repo; Cloudflare can redeploy automatically.

## Run locally

The static site can be viewed by serving this folder with any local HTTP server, e.g. `python -m http.server 8000`, then visiting http://localhost:8000. **AI Writer will not work with a plain static server**, because it requires the Cloudflare Pages Function and AI binding.

To test Pages Functions locally (requires Node and Cloudflare account):

```bash
npx wrangler pages dev . --ai AI
```

## Notes

- Featured provider names are trademarks of their owners, and listing them does not imply endorsement or affiliation.
- Review external links periodically; some providers may change URLs or products.
- AI outputs may contain errors and should be reviewed before publication.
- To launch commercially, add genuine content, an About page, Contact page, a Privacy Policy and appropriate compliance/consent features, tailored to how you actually operate.

## Top 100 methodology

The 100 tools are a **curated editorial selection**, not a measured top-100 usage ranking. The position labels are editorial ordering. Inspiration and independent measured sources are linked on the page: [a16z Top 100 Consumer AI Apps (October 2026)](https://a16z.com/100-gen-ai-apps-7/) and [Similarweb](https://www.similarweb.com/top-websites/ai-chatbots-and-tools/). Ratings, user counts and daily updates are deliberately **not claimed** without evidence. Edit `top100-data.js` to add, remove or reorder products. Check links periodically.

## Version 3 design

- The robot is a decorative, optimized, self-hosted WebP illustration under `assets/robot-background.webp`. The overlay remains selectable text, functional form fields, and clickable cards — no full-page screenshot background.
- The glass metric strip is built from HTML, CSS and inline SVG. It shows **100 curated picks, 12 featured tools, 7 workspace tools** (counts updated by `app.js`) and **Free to browse & discover**. These are site counts, not unverified ratings or visitor figures.
- If you uploaded version 2, upload/commit all changed files including the `assets` folder; Cloudflare Pages should redeploy on new commits when Git integration is connected.

## V4 — tool logos, hover glow and overview pages

- Tool logos use public website favicons, loaded from the providers' official domains via Google favicon service. DuckDuckGo favicon service is tried if a request fails; otherwise an initial-letter fallback appears. No API key or paid CDN is required.
- Every card in Top 100 and Featured Directory opens its own overview URL such as `/tool.html?tool=chatgpt`; "Official site" buttons open the providers directly.
- Profiles are independent, practical editorial summaries with possible use cases, strengths, cautions, a visit button and alternatives. **No fabricated user reviews, ratings, usage figures, or affiliate claims.**
- All changes are static assets and work on the free Cloudflare Pages setup already configured.
