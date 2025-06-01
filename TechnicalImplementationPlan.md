# GlowUp.ai – Technical Implementation Plan

*Version 0.1 – May 31 2025*

---

## 15.1 System Architecture (Logical)

```
Client (React Native / Next.js PWA)
     │
     ▼
API Gateway  (FastAPI ⇄ Supabase Edge Functions)
     │
┌──────────┬───────────┬───────────┐
│ AuthSvc  │ ImageSvc  │ RecSvc    │
│ (JWT)    │ (S3)      │ (Python)  │
└──────────┴───────────┴───────────┘
     │               │
     ▼               ▼
 GPT‑4o Image API   Product DB  ← Affiliate APIs
```

### Component Details

| Component                           | Responsibilities                                                           | Tech                                     |
| ----------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------- |
| **Frontend**                        | Upload UI, consent screens, results gallery, Stripe paywall                | React Native + Expo; Web PWA via Next.js |
| **Auth Service**                    | Social login (Apple, Google)                                               | Supabase Auth (OAuth)                    |
| **Image Service**                   | Store originals (encrypted S3), invoke GPT‑4o, store outputs, purge old    | AWS S3, Lambda, Step Functions           |
| **Analysis Microservice**           | Run face/skin classifier                                                   | AWS Lambda (PyTorch, pretrained ResNet)  |
| **Recommendation Service (RecSvc)** | Retrieve trending product embeddings, rank by match & virality score       | Python FastAPI, PGVector                 |
| **Product DB**                      | Schema: product\_id, name, category, tags, virality\_score, affiliate\_url | Supabase Postgres + pgvector             |
| **Affiliate Integrations**          | Product data, deep links, commission tracking                              | Amazon PA‑API, LTK Creator Commerce      |
| **Payments**                        | Sell credits/subscriptions                                                 | Stripe Billing                           |
| **Analytics & Events**              | Track funnel; content safety                                               | PostHog, OpenAI Moderation API           |
| **CI/CD**                           | PR checks, automated tests, deploy to Vercel/AWS                           | GitHub Actions                           |
| **Observability**                   | Logs, APM                                                                  | CloudWatch, Sentry                       |

## 15.2 Data Flow (End‑to‑End)

1. **Upload**: Client → API Gateway → ImageSvc stores selfie.
2. **Analysis**: Event triggers Analysis MS, returns feature vector.
3. **Recommendation**: RecSvc queries Product DB w/ feature vector + virality filter; returns top N items.
4. **Image Generation**: ImageSvc sends prompt + selfie ID to GPT‑4o image API; receives "after" image.
5. **Response**: API Gateway returns product cards + before/after URL.
6. **Tracking**: Affiliate clicks fire server‑side redirect for attribution.

## 15.3 Product Catalog Pipeline

* **Sources**:
  * TikTok hashtag scraper (`#viralbeauty`, `#skincare2025`)
  * Publisher lists (Teen Vogue, Vogue, Allure)
  * Amazon top sellers
* **ETL** runs nightly (Airflow): scrape → deduplicate → enrich with ingredients, price, virality\_score → embed via OpenAI embeddings → upsert into Postgres.

## 15.4 Machine Learning & AI

| Task                     | Model / API                                 | Details                                                          |
| ------------------------ | ------------------------------------------- | ---------------------------------------------------------------- |
| Face attribute detection | MobileNet fine‑tuned on dermatology dataset | On Lambda GPU                                                    |
| Embedding & similarity   | OpenAI `text-embedding-3-small`             | Products + user feature string                                   |
| Image generation         | GPT‑4o image API                            | Prompt template combines detected attributes + selected products |

**Prompt Template (simplified)**
"Generate a realistic portrait of the same person in \[input\_image] after 4 weeks of using \[product\_list], highlighting improved \[attribute] and subtle glam makeup."

## 15.5 Security & Privacy

* AES‑256 at rest, TLS 1.3 in transit
* Face images deleted after 30 days (configurable)
* Separate PII and biometrics tables
* **Compliance**: GDPR Article 9 (biometric data) → explicit consent, Data Protection Impact Assessment (DPIA)

## 15.6 Testing Strategy

| Layer       | Tests                                |
| ----------- | ------------------------------------ |
| Unit        | RecSvc scoring, prompt generation    |
| Integration | Selfie → glow‑up pipeline            |
| E2E         | Detox tests for mobile upload/share  |
| Load        | GPT‑4o concurrent render stress      |
| Safety      | Red‑team prompts, adversarial images |

## 15.7 DevOps & Deployment

* **Environments**: Dev → Staging → Prod (Kubernetes on AWS EKS)
* **IaC**: Terraform modules for S3, EKS, RDS, Cognito
* Blue/green deploys, automatic rollback on health‑check fail

## 15.8 Rollout Plan

1. **Closed Alpha** (25 users, TestFlight) – validate render quality
2. **Beta Waitlist** – invite codes, collect NPS
3. **Public Launch** (App Store + PWA) – influencer push, TikTok campaign
4. **Scale** to 100k DAU – leverage CloudFront CDN for images

## 15.9 Resource Estimate (MVP)

| Item                                 | Monthly Cost (est.) |
| ------------------------------------ | ------------------- |
| GPT‑4o image renders (100k @ \$0.01) | \$1 k               |
| OpenAI embeddings                    | \$200               |
| AWS infra (EKS, S3, Lambda)          | \$1.2 k             |
| Supabase (Pro tier)                  | \$25                |
| Analytics (PostHog)                  | \$100               |
| **Total**                            | **\$2.5 k**         |

## 15.10 Timeline (Gantt‑style)

| Week  | Milestone                              |
| ----- | -------------------------------------- |
| 0‑1   | Kick‑off, infra scaffolding            |
| 2‑3   | Selfie upload + storage                |
| 4‑5   | GPT‑4o integration, manual recs        |
| 6     | Product ETL pipeline                   |
| 7‑8   | Recommendation engine, affiliate links |
| 9     | Payments & subscriptions               |
| 10    | Closed Alpha                           |
| 11‑12 | Beta & bug‑bash                        |
| 13    | Public launch                          |

---

*Prepared by: ChatGPT (o3) for glowup.ai*