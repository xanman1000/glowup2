# GlowUp.ai – Product Requirements Document (PRD)

*Version 0.1 – May 31 2025*

---

## 1. Overview & Vision

GlowUp.ai is a mobile-first web and native app that lets users *see their future glow‑up*. A user uploads a selfie, GlowUp.ai recommends trending beauty and wellness products tailored to their appearance, and then uses GPT‑4o image generation to render a realistic "after" image showing the potential results of using the recommended products. The experience is sharable, socially viral, and monetized via affiliate links, premium image credits, and brand sponsorships.

## 2. Goals & Success Metrics

| Goal             | Metric                              | Target (90‑day post‑launch) |
| ---------------- | ----------------------------------- | --------------------------- |
| Viral reach      | Organic share rate                  | >40% of sessions shared     |
| Conversion       | Affiliate click‑through rate        | >15%                        |
| Revenue          | Monthly recurring revenue           | \$50 k                      |
| Engagement       | Avg. sessions per user / month      | ≥4                          |
| Accuracy & trust | User‑rated recommendation relevance | ≥4.2⁄5                      |

## 3. Target Users & Personas

1. **Trend‑Chasing Gen‑Z** – 18‑25, TikTok native, wants quick recommendations and fun visuals to share.
2. **Millennial Makeover‑Seekers** – 26‑40, disposable income, looking for trustworthy product advice.
3. **Beauty‑Tech Enthusiasts** – Early adopters intrigued by AI glow‑ups, willing to pay for HD renders.

## 4. Problem Statement

Finding the right beauty/health products is noisy: endless TikTok trends, sponsored reviews, and conflicting advice. Visualizing results before buying is nearly impossible. Users waste time and money on products that don't suit them.

## 5. Value Proposition

GlowUp.ai delivers **hyper‑personalized, visual proof‑of‑concept** product picks in seconds, powered by cutting‑edge AI analysis + GPT‑4o image generation, turning uncertainty into confidence and fun.

## 6. Core Features (MVP)

1. **Secure Selfie Upload & Consent Flow**
2. **Face & Attribute Analysis**
   * Skin tone, texture, concerns (acne, dark circles) via computer‑vision classifier
3. **Viral Product Recommendation Engine**
   * Curated catalog of \~500 high‑velocity products (TikTok‑viral, Vogue "Best of 2025", dermatologist picks)
   * Match rules: skin concerns ↔ ingredient efficacy; style goals ↔ makeup shades
4. **GPT‑4o "Glow‑Up" Image Generation**
   * Renders 1024×1024 composite with lighter/firmer skin, styled hair, makeup overlay
   * Quick preview (low‑res) + optional HD credit
5. **Interactive Product Cards**
   * Price, key ingredients, affiliate "Buy" buttons, user reviews snippet
6. **Social Share & Save**
   * Watermarked split "Before / After" for Instagram, TikTok, Snapchat
7. **Feedback Loop**
   * 👍/👎 on each recommendation to retrain model

## 7. Out‑of‑Scope for MVP

* In‑app checkout (use external retailer links)
* Non‑facial body transformations (hair growth, weight loss)
* Live AR try‑on

## 8. User Stories (Sample)

*As a Gen‑Z user, I take a quick selfie and instantly see what I'd look like after trying viral cherry‑gloss makeup so I can share it on TikTok.*
*As a cautious buyer, I want ingredient transparency and dermatologist notes so I trust the picks.*
*As a power user, I want unlimited HD glow‑ups for a monthly fee.*

## 9. Competitive Landscape & Differentiation

| Competitor                | Focus         | Gaps GlowUp.ai Solves                         |
| ------------------------- | ------------- | --------------------------------------------- |
| Facetune                  | Photo editing | No product recs; manual effort                |
| YouCam Makeup             | AR try‑on     | Limited to partner SKUs; no viral curation    |
| Amazon's "Virtual Try‑on" | Ecommerce     | Static catalog; no after‑care/health products |

GlowUp.ai uniquely pairs viral product discovery **and** realistic future‑self imagery in one tap.

## 10. Monetization Strategy

1. **Affiliate Revenue** via Amazon PA‑API, Sephora, Ulta, & LTK networks
2. **Premium Credits** – \$4.99 for 10 HD glow‑ups or \$9.99/mo subscription
3. **Sponsored Slots** – Brands bid to appear in recommendation carousel (flagged "Sponsored")
4. **User‑Generated Content Licensing** – Viral before/after compilations with revenue share

## 11. Key Metrics by Funnel Stage

1. **Acquisition** – CPI, organic installs, referral k‑factor
2. **Activation** – % users completing first glow‑up
3. **Engagement** – Weekly active users, session duration
4. **Revenue** – ARPU, LTV : CAC ratio
5. **Product Quality** – Reported offensive/unsafe image rate <0.1%

## 12. Assumptions & Constraints

* GPT‑4o image API latency ≤ 10 s; costs \~\$0.01/low‑res render.
* Users grant explicit biometric data consent; images auto‑purged after 30 days.
* Product catalog refreshes weekly from multiple feeds (TikTok scrapes, publisher lists).

## 13. Risks & Mitigations

| Risk                                     | Likelihood | Impact     | Mitigation                                                        |
| ---------------------------------------- | ---------- | ---------- | ----------------------------------------------------------------- |
| Inaccurate transformations (unrealistic) | Med        | Trust loss | Human QA, disclaimer                                              |
| Privacy backlash                         | High       | Legal      | SOC‑2, GDPR compliance, local on‑device processing where possible |
| Affiliate policy changes                 | Med        | Revenue    | Diversify networks, own dropshipping                              |

## 14. Roadmap

**Phase 0 (Week 0‑2)** – PoC selfie → GPT‑4o render, manual product list
**Phase 1 (Week 3‑6)** – MVP iOS/Android + Supabase backend + Amazon affiliate
**Phase 2 (Week 7‑12)** – Recommendation ML, payments, basic analytics
**Phase 3 (Month 4‑6)** – Sponsored slots, localization, AR real‑time try‑on
**Phase 4 (Month 7+)** – Marketplace for dermatologists & creators

---

*Prepared by: ChatGPT (o3) for glowup.ai*