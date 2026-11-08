// Pricing access summary checked against official provider pages on 2026-11-08.
// All products absent from this map must be shown as 'Not checked'.
'use strict';
const verifiedPricing = {
  "chatgpt": {
    "type": "freemium",
    "source": "https://chatgpt.com/pricing/",
    "note": "Free plan and paid subscriptions",
    "checked": "2026-11-08"
  },
  "claude": {
    "type": "freemium",
    "source": "https://claude.com/pricing",
    "note": "Free plan and paid subscriptions",
    "checked": "2026-11-08"
  },
  "perplexity": {
    "type": "freemium",
    "source": "https://www.perplexity.ai/enterprise/pricing",
    "note": "Free plan and paid subscriptions",
    "checked": "2026-11-08"
  },
  "duck-ai": {
    "type": "freemium",
    "source": "https://duckduckgo.com/duckduckgo-help-pages/duckai/usage-limits",
    "note": "Free access with limits; paid subscriptions available",
    "checked": "2026-11-08"
  },
  "canva": {
    "type": "freemium",
    "source": "https://www.canva.com/pricing/",
    "note": "Free and paid design plans",
    "checked": "2026-11-08"
  },
  "runway": {
    "type": "freemium",
    "source": "https://help.runwayml.com/hc/en-us/articles/15124877443219-How-do-credits-work",
    "note": "Free plan with a limited one-time credit grant; paid plans",
    "checked": "2026-11-08"
  },
  "elevenlabs": {
    "type": "freemium",
    "source": "https://elevenlabs.io/pricing",
    "note": "Free plan and paid plans",
    "checked": "2026-11-08"
  },
  "cursor": {
    "type": "freemium",
    "source": "https://prod.cursor.com/help/account-and-billing/pricing",
    "note": "Free Hobby tier and paid plans",
    "checked": "2026-11-08"
  },
  "gamma": {
    "type": "freemium",
    "source": "https://gamma.app/pricing",
    "note": "Free starter allowance and paid plans",
    "checked": "2026-11-08"
  },
  "midjourney": {
    "type": "paid",
    "source": "https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans",
    "note": "Paid subscriptions for Midjourney web / Discord; separate limited mobile-app trial",
    "checked": "2026-11-08"
  },
  "agent-qa": {
    "type": "free",
    "source": "https://vostride.com/pricing.md",
    "note": "Free software for permitted FSL-1.1-ALv2 use; competing-use restrictions and separate model/infrastructure costs.",
    "checked": "2026-11-08"
  }
};
function planFor(item){const name=typeof item==='string'?item:item.name;return verifiedPricing[String(name).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')]||null;}
