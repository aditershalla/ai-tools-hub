# AI Tools Hub V9 — Homepage review preview

Date: 8 November 2026. **Do not merge to main without owner approval.**

## Preservation / changed files

Existing hero robot, branding, Top 100 listings, 100 static profiles, free workspace tools, guides and legal pages retained. Only the homepage lower sections are reorganized: old redundant "Three steps" and CTA blocks removed, and existing three guide teasers preserved inside the new category section. No guides or pages are deleted.

New static discovery data uses the existing 100-tool editorial list. A tool can have multiple editorial cross-tags. Counts are derived by exact tool name/category, not guessed market counts.

| Category | Matching current catalog entries |
|---|---:|
| Chatbots & AI Assistants | 13 |
| Image Generation | 15 |
| Video AI | 15 |
| Code & Dev Tools | 16 |
| Voice & Audio | 13 |
| Writing & Content | 11 |
| Data & Analytics | 5 |
| Marketing AI | 7 |
| Education & Learning | 9 |
| AI Search Engines | 7 |
| Health & Wellness | 0 — none matched, do not invent |
| Business & Productivity | 15 |

## Insights — source-checked, not site traffic

- 88% of 2025 McKinsey AI survey respondents reported organizational AI use in at least one business function: https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2025
- 62% of the same survey respondents reported at least AI agent experimentation: same source.
- $285.9B U.S. private AI investment in 2025: https://hai.stanford.edu/ai-index/2026-ai-index-report
- >90% of notable frontier models produced by industry in 2025: same Stanford report.
- Four in five university students used generative AI in educational contexts, per Stanford AI Index 2026: same.
- 362 documented AI incidents, compared to 233 in 2024: same.

Do not overgeneralize survey populations or cite AI Tools Hub as the primary source.

## Chatbot comparison

ChatGPT, Claude, Gemini, Perplexity and DeepSeek link to their existing /tools/<slug>/ profiles. Feature information is conservatively worded and dated November 8, 2026, with official source links. Context length and exact paid prices are intentionally omitted unless model/plan-specific current verification is possible.

## Newsletter limitation and architecture

- Beautiful opt-in newsletter panel is in place. It is **disabled by default**, and `GET /api/newsletter` returns `available:false` until all owner-controlled KV / Turnstile / retention / mailer settings exist.
- Cloudflare Email Service as of Oct 2026 **requires Workers Paid for arbitrary-recipient sending**. We have **not** activated a paid plan or unapproved third-party email provider.
- The prepared API supports encrypted environment credentials through a private owner-approved Worker service mailer, Turnstile verification, pending verification emails (24-hour TTL), explicit POST double opt-in, a confirmed email record with configured TTL, welcome email with an unsubscribe link, and POST unsubscribe with KV deletion.
- Newsletters cannot actually be sent from the current project until an owner-approved email provider / mailer service is configured. Do not collect addresses or claim deliveries before end-to-end live testing and final legal disclosures. See NEWSLETTER_SETUP.md.

## Tests run

- Offline Chromium (HTML/CSS/JS injected without network) at widths 360, 390, 768, 1440: 12 category cards, six insights, nine feature rows, seven workspace buttons, no page horizontal overflow and no uncaught JS errors.
- 42 offline browser assertions: seven workspace panels, 100-directory show more, search no-match/reset, category-filtered HTML-first directory (including zero matches), sort, verified plan filters, share click, newsletter disabled state.
- 18 mocked Worker function tests: default inactive, input, consent, origin, Turnstile, successful pending email, explicit confirmation, welcome mail, unsubscribe, KV deletion, mailer failures.
- 2,774 static local links checked: 0 broken internal hrefs.
- `node --check` passed for new scripts and Functions.
- Direct live Cloudflare HTTP / browser tests, actual mail delivery and Lighthouse/Core Web Vitals are **not** verified; the current runtime blocks direct network navigation. A successful Cloudflare preview build would confirm deployment, not real email success.

## Owner configuration needed

1. Choose and approve a free email delivery provider / permitted email Worker or equivalent. Cloudflare Workers Free cannot send arbitrary outbound mail itself. Do not activate any provider without owner permission.
2. Provide actual public operator name, contact email, legal jurisdiction, and documented retention/analytics settings for the final Privacy Policy and marketing consent.
3. Configure `NEWSLETTER_KV`, Turnstile keys, `NEWSLETTER_TTL_DAYS`, `NEWSLETTER_MAILER` service binding after approval.
4. Verify real signup, email delivery, click-to-confirm and unsubscribe end-to-end; test external links, PageSpeed and mobile on live preview.

The website remains fully free in its current inactive-newsletter state.
