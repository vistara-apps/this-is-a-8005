# Know Your Rights Buddy

**Empowering you with legal knowledge in your pocket.**

A mobile-first web application that provides state-specific legal rights guides, pre-written scripts for interactions with law enforcement, and quick recording tools for individuals to stay informed and safe.

## 🚀 Features

### Core Features
- **State-Specific Rights Guides**: One-page, mobile-optimized guides summarizing fundamental rights and 'dos/don'ts' when interacting with law enforcement, tailored to specific US states.
- **English & Spanish Script Library**: Pre-written, effective phrases for common law enforcement interaction scenarios, with dual-language options.
- **One-Tap Incident Recording**: Prominent button that immediately starts capturing audio and/or video of interactions, securely and discreetly.
- **Location-Based Alert & Content Sharing**: Automatically detects user location to associate with recorded incidents and generates shareable 'incident cards'.

### Premium Features
- **AI-Powered Script Customization**: Customize scripts using OpenAI for specific situations
- **Cloud Backup**: Secure IPFS storage via Pinata for incident recordings
- **Advanced State-Specific Details**: Enhanced legal information for each state
- **Unlimited Script Access**: Access to all premium scenarios and customization

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context + Custom Hooks
- **Storage**: LocalStorage + IPFS (Pinata)
- **AI Integration**: OpenAI GPT-3.5-turbo
- **Payments**: Stripe
- **Data**: Airstack (for legal data updates)

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- API keys for:
  - OpenAI (for AI script customization)
  - Pinata (for IPFS storage)
  - Stripe (for payments)
  - Airstack (for legal data)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd know-your-rights-buddy
npm install
```

### 2. Environment Setup

Copy the example environment file and add your API keys:

```bash
cp .env.example .env
```

Edit `.env` with your API keys:

```env
# API Keys - Replace with your actual keys
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_PINATA_API_KEY=your_pinata_api_key_here
VITE_PINATA_SECRET_KEY=your_pinata_secret_key_here
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
VITE_AIRSTACK_API_KEY=your_airstack_api_key_here

# App Configuration
VITE_APP_NAME=Know Your Rights Buddy
VITE_APP_VERSION=1.0.0
VITE_SUBSCRIPTION_PRICE=3.00
```

### 3. Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

### 4. Build for Production

```bash
npm run build
npm run preview
```

## 🔧 API Keys Setup

### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add to `VITE_OPENAI_API_KEY` in your `.env` file

### Pinata API Keys
1. Sign up at [Pinata](https://pinata.cloud/)
2. Go to API Keys section
3. Create new API key with admin permissions
4. Add API Key to `VITE_PINATA_API_KEY`
5. Add Secret Key to `VITE_PINATA_SECRET_KEY`

### Stripe Publishable Key
1. Create account at [Stripe](https://stripe.com/)
2. Get your publishable key from the dashboard
3. Add to `VITE_STRIPE_PUBLISHABLE_KEY`

### Airstack API Key
1. Sign up at [Airstack](https://airstack.xyz/)
2. Get your API key from the dashboard
3. Add to `VITE_AIRSTACK_API_KEY`

## 📱 Usage

### Basic Usage (Free Tier)
- Select your state to view rights guides
- Access basic script library in English and Spanish
- Record incidents locally
- Share incident information

### Premium Features
- Customize scripts with AI assistance
- Cloud backup of recordings to IPFS
- Advanced state-specific legal information
- Unlimited access to all scenarios

## 🏗️ Architecture

### Data Models
- **User**: User profile and subscription information
- **IncidentRecord**: Recorded interactions with metadata
- **StateRightsGuide**: State-specific legal information
- **Script**: Pre-written phrases for various scenarios
- **IncidentCard**: Shareable incident summaries

### Services
- **OpenAI Service**: AI-powered script customization
- **Pinata Service**: IPFS storage for recordings
- **Stripe Service**: Payment processing
- **Recording Service**: Audio/video capture and processing

### Key Components
- **AppShell**: Main navigation and layout
- **StateSelector**: State selection dropdown
- **ScriptPhrase**: Interactive script display
- **RecordButton**: One-tap recording functionality
- **ShareButton**: Incident sharing capabilities

## 🔒 Privacy & Security

- **Local-First**: Core functionality works offline
- **Encrypted Storage**: Sensitive data encrypted in IPFS
- **No Tracking**: No user tracking or analytics
- **Open Source**: Transparent and auditable code

## 🌍 Supported States

Currently includes detailed guides for:
- California
- Texas  
- New York
- Florida

Additional states use general constitutional rights information with plans for expansion.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Legal Disclaimer

This application provides general information about legal rights and is not a substitute for professional legal advice. Always consult with a qualified attorney for specific legal situations. The developers are not responsible for any outcomes resulting from the use of this application.

## 🆘 Support

For support, please:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Contact support at support@knowyourrights.app

## 🗺️ Roadmap

- [ ] Additional state-specific guides
- [ ] Multi-language support (beyond English/Spanish)
- [ ] Integration with legal aid organizations
- [ ] Mobile app versions (iOS/Android)
- [ ] Real-time legal updates
- [ ] Community-contributed scripts

---

**Know Your Rights Buddy** - Empowering citizens with legal knowledge and tools for safe interactions with law enforcement.
