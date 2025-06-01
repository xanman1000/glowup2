# GlowUp.ai

> **See your future glow-up with AI-powered beauty transformations**

GlowUp.ai is a mobile-first web and native app that lets users visualize their potential beauty transformation using GPT-4o image generation and personalized product recommendations.

## 🌟 Features

- **AI-Powered Transformations**: Upload a selfie and see realistic "after" images using GPT-4o
- **Personalized Recommendations**: Get trending beauty products tailored to your skin tone and concerns
- **Social Sharing**: Share your glow-up transformations on TikTok, Instagram, and Snapchat
- **Premium Quality**: HD image generation with subscription model
- **Privacy-First**: GDPR-compliant with automatic image deletion after 30 days

## 🏗️ Architecture

This is a monorepo containing:

- **`mobile/`** - React Native/Expo mobile app
- **`web/`** - Next.js Progressive Web App (PWA)
- **`backend/`** - FastAPI Python backend with ML processing
- **`shared/`** - Shared TypeScript types and utilities

### Tech Stack

| Component | Technology |
|-----------|------------|
| Mobile App | React Native, Expo, TypeScript |
| Web App | Next.js, Tailwind CSS, Framer Motion |
| Backend | FastAPI, PostgreSQL, SQLAlchemy |
| Database | Supabase (PostgreSQL + Auth) |
| Image Storage | AWS S3 with automatic expiration |
| AI/ML | OpenAI GPT-4o, Computer Vision models |
| Payments | Stripe |
| Analytics | PostHog |
| Deployment | AWS EKS, Vercel |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Python 3.9+
- PostgreSQL (or Supabase account)
- AWS account for S3 storage
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/glowup-ai.git
   cd glowup-ai
   ```

2. **Install dependencies**
   ```bash
   npm run setup
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

4. **Start development servers**
   ```bash
   # Start all services
   npm run dev:mobile    # Mobile app (Expo)
   npm run dev:web       # Web app (Next.js)
   npm run dev:backend   # Backend API (FastAPI)
   ```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# AWS
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your_s3_bucket_name

# Other services
STRIPE_SECRET_KEY=your_stripe_secret_key
POSTHOG_API_KEY=your_posthog_api_key
```

## 📱 Mobile Development

The mobile app is built with Expo and React Native:

```bash
cd mobile
npm start                    # Start Expo development server
npm run ios                  # Run on iOS simulator
npm run android              # Run on Android emulator
npm run web                  # Run in web browser
```

### Testing the Mobile App

```bash
cd mobile
npm test                     # Run Jest tests
npm run e2e                  # Run Detox E2E tests (coming soon)
```

## 🌐 Web Development

The web app is a Next.js PWA with Tailwind CSS:

```bash
cd web
npm run dev                  # Start development server
npm run build                # Build for production
npm run start                # Start production server
```

## 🔧 Backend Development

The backend is a FastAPI application with ML processing:

```bash
cd backend
python -m venv venv
source venv/bin/activate     # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### API Documentation

Once the backend is running, visit:
- Development: http://localhost:8000/docs
- Interactive API docs with Swagger UI

## 🧪 Testing

Run tests across all packages:

```bash
npm run test:all             # Run all tests
npm run lint:all             # Lint all code
npm run type-check:all       # TypeScript type checking
```

## 🚢 Deployment

### Development
- **Mobile**: Expo Development Build
- **Web**: Vercel Preview Deployments
- **Backend**: Local FastAPI server

### Staging
- **Mobile**: Expo Internal Distribution
- **Web**: Vercel Staging Environment
- **Backend**: AWS EKS Staging Cluster

### Production
- **Mobile**: App Store + Google Play
- **Web**: Vercel Production + CDN
- **Backend**: AWS EKS Production Cluster

## 📊 Monitoring & Analytics

- **Application Performance**: Sentry
- **User Analytics**: PostHog
- **Infrastructure**: AWS CloudWatch
- **Uptime**: AWS Route 53 Health Checks

## 🔒 Security & Privacy

- GDPR compliant with automatic data deletion
- SOC-2 compliance preparation
- Encrypted image storage with AES-256
- Biometric data handling with explicit consent
- Rate limiting and DDoS protection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style (ESLint + Prettier)
- Write tests for new features
- Update documentation as needed
- Ensure all CI checks pass

## 📝 API Documentation

### Core Endpoints

- `POST /api/auth/login` - User authentication
- `POST /api/images/upload` - Upload and analyze selfie
- `POST /api/glowups/generate` - Generate transformation
- `GET /api/products/recommendations` - Get product suggestions

See full API documentation at `/docs` when running the backend.

## 🎯 Roadmap

### Phase 1 (MVP) - Current
- [x] Basic project structure
- [ ] Image upload and analysis
- [ ] GPT-4o integration
- [ ] Product recommendations
- [ ] Basic mobile/web UI

### Phase 2 (Enhanced)
- [ ] Premium subscriptions
- [ ] Social sharing
- [ ] Advanced ML models
- [ ] Real-time AR try-on

### Phase 3 (Scale)
- [ ] Marketplace for creators
- [ ] Brand partnerships
- [ ] Multi-language support
- [ ] Advanced analytics

## 📞 Support

- **Documentation**: [docs.glowup.ai](https://docs.glowup.ai)
- **Issues**: [GitHub Issues](https://github.com/your-org/glowup-ai/issues)
- **Email**: support@glowup.ai
- **Discord**: [Join our community](https://discord.gg/glowup-ai)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4o image generation
- Supabase for backend infrastructure
- Expo team for mobile development tools
- Vercel for web hosting and deployment

---

**Built with ❤️ by the GlowUp.ai team**