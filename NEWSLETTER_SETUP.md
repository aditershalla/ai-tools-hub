# AI Tools Hub newsletter — explicit owner activation required

The public website displays the newsletter design but **does not accept email addresses until all bindings are provided**. The browser calls `GET /api/newsletter`: it returns `available:false` with no storage, and the submit button stays disabled. Never say the service is active without performing a real email confirmation and unsubscribe test.

Cloudflare's Email Service as of November 2026 restricts arbitrary-recipient outbound email to Workers Paid. **Do not upgrade Cloudflare or add a third-party service automatically.** The owner must first approve an appropriate free email-delivery provider (or other eligible owner-operated service) and ensure it meets their usage and marketing-email requirements.

To activate after approval:

1. Set up a private Cloudflare Workers KV namespace, bound to this Pages project as `NEWSLETTER_KV`. Do not expose the binding in client code.
2. Set up a free Cloudflare Turnstile widget and bind its public `NEWSLETTER_TURNSTILE_SITEKEY` and secret `NEWSLETTER_TURNSTILE_SECRET` (encrypted secret). Verify it works on both the custom host and preview host if testing there.
3. Set an owner-approved retention period between 1 and 365 days as `NEWSLETTER_TTL_DAYS`. Active records expire automatically after this TTL; expired subscribers will not be emailed. Pending confirmations expire in 24 hours.
4. After choosing a permitted mail delivery solution, create a Cloudflare Worker exposing a `POST /send` route, with service binding `NEWSLETTER_MAILER` on Pages. It should accept JSON `{to,type,subject,text,html}`, authenticate its callers through Cloudflare service binding (no public insecure route), and return HTTP 2xx **only after the provider accepted the delivery request**. Do not expose mailing credentials to browsers or the public repository. Bulk sending and verified sender setup are **not** included in the current implementation.
5. Test a live signup: server-side Turnstile, received confirmation email, click link, click Confirm, received welcome email, unsubscribe action, KV deletion, duplicate signup, validation and mailer failure behavior.
6. Update and complete the Privacy Policy with actual operator/contact identity, mailer/processor, data retention and request procedure before activating signup. Confirm applicable marketing consent rules (e.g. GDPR, CAN-SPAM). No manufactured subscriber numbers or commercial offers.

### Data flow in prepared implementation

- Email and affirmative consent are sent only after configured Turnstile verification. Pending entries in KV are stored for 24 hours to deliver a verification link. If the approved mailer fails, the pending entry is deleted.
- The user clicks a confirmation email link and presses a Confirm button on a first-party website (GET alone does not subscribe). A confirmed email is stored in KV with an explicit owner-selected TTL, along with a random unsubscribe token hash. A welcome email includes the unsubscribe link.
- The unsubscribe link leads to a POST confirmation button that deletes the active email record and token mapping.
- No IP address is permanently stored by this application. Turnstile verification may include the request IP in the verification request. Cloudflare and the external mailer may have their own logs and retention; the owner must verify and disclose actual settings.
- Newsletter mail dispatch to subscribers (news, digests) is intentionally **not implemented** until the owner chooses and authorizes a compliant email provider or sending service.

See [Cloudflare Email Service](https://developers.cloudflare.com/email-service/) for current free vs paid sending limits.
