# Risel Growth Agency 🌱

> Premium Social Media Growth & AI Automation Agency

![Risel Growth Agency](https://img.shields.io/badge/Status-Live-007300?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.5-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0.10-646cff?style=for-the-badge&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=for-the-badge&logo=javascript)

---

## 🌐 Live Website
[riselgrowthagency.com](https://riselgrowthagency.com)

---

## 📌 About

Risel Growth Agency is a full-service social media growth and marketing agency with over 4 years of proven experience. We help brands and individuals build a strong digital presence, increase engagement, and drive real results across all major platforms.

This repository contains the modern React-based frontend for our agency website, featuring a professional design, smooth animations, and optimal performance.

---

## ✨ Features

- **Modern React Architecture** - Built with React 19 and Vite for fast development and optimized production builds
- **Responsive Design** - Fully responsive layout that works seamlessly across all devices
- **Professional UI** - Custom-designed components with elegant styling
- **Smooth Animations** - Polished transitions and animations for enhanced user experience
- **Performance Optimized** - Vite ensures fast builds and minimal bundle sizes
- **SEO Ready** - Semantic HTML and proper meta tags
- **Code Quality** - ESLint integration for maintaining code standards

---

## ✅ Services

| Service | Description |
|---------|-------------|
| Instagram Organic Growth | Real followers, real engagement |
| TikTok Organic Growth | Boost views, reach and visibility |
| Content Creation | Professional social media content |
| Social Media Consultancy | Personalized growth strategies |
| Insta DM Automation | AI-powered 24/7 auto replies |
| WhatsApp Booking AI | Automated sales and booking bot |
| Lead Qualification AI | Smart lead filtering and scoring |

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.5
- **Build Tool**: Vite 8.0.10
- **Styling**: CSS3 with custom variables and modern layouts
- **Development Tools**: ESLint, React Refresh
- **Fonts**: Google Fonts (Inter, DM Serif Display)
- **Node Version**: ES Modules (type: "module")

---

## 📋 Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

---

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/amjadazizshah/Risel-Agency.git

# Navigate to project directory
cd risel-agency

# Install dependencies
npm install
```

### Development

Start the development server with hot module reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Create an optimized production build:

```bash
npm run build
```

Vite will generate optimized assets in the `dist/` directory ready for deployment.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Code Quality

Run ESLint to check code quality and find potential issues:

```bash
npm run lint
```

---

## 🏗 Project Structure

```
risel-agency/
├── public/                      # Static assets and favicon
├── src/
│   ├── App.jsx                  # Main App component
│   ├── RiselGrowthAgency.jsx    # Primary agency component with layout
│   ├── main.jsx                 # React entry point
│   ├── App.css                  # App-level styles
│   ├── index.css                # Global styles and CSS reset
│   └── assets/                  # Images and other assets
├── index.html                   # HTML entry point
├── vite.config.js               # Vite configuration
├── eslint.config.js             # ESLint configuration
├── package.json                 # Project dependencies and scripts
└── README.md                    # This file
```

---

## 🎨 Design System

- **Color Palette**: 
  - Primary: `#1e3a5f` (Dark Blue)
  - Accent: `#ff6b35` (Coral Orange)
  - Dark: `#0d1b2a`
  - Green: `#10b981` (Success)

- **Typography**: 
  - Headings: DM Serif Display (elegant serif)
  - Body: Inter (clean sans-serif)

- **Component Features**:
  - Responsive navbar with scroll effects
  - Smooth page transitions
  - Hover animations and interactions
  - Custom spacing and border radius system

---

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR (Hot Module Replacement) |
| `npm run build` | Build for production with optimizations |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code quality with ESLint |

---

## 🔧 Configuration

### Vite Config
The project uses Vite's default React plugin configuration for optimal development experience and production builds.

### ESLint
Code linting is configured with:
- ESLint core rules
- React and React Hooks plugins
- React Refresh plugin for fast refresh compatibility

---

## 📱 Responsive Design

The website is fully responsive and optimized for:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktops (1024px and up)
- 🖥️ Large screens (1200px and up)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is private and proprietary to Risel Growth Agency. For licensing inquiries, please contact the repository owner.

---

## 👤 Author

**Amjad Aziz Shah**

---

## 📞 Contact & Support

For inquiries about Risel Growth Agency services:
- 🌐 Website: [riselgrowthagency.com](https://riselgrowthagency.com)
- 📧 Email: contact@riselgrowthagency.com
- 💼 For technical issues: Open an issue on this repository

---

## 🚀 Deployment

This project is ready for deployment on:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Just run `npm run build` to generate the production-ready files in the `dist/` directory.

---

Built with ❤️ using React and Vite
- **Google Fonts** — Playfair Display + Inter
- **GitHub Pages** — Hosting

---

## 📧 EmailJS Setup

This project uses EmailJS to handle contact form submissions.

1. Create account at [emailjs.com](https://emailjs.com)
2. Connect your Gmail as email service
3. Create an email template with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{phone}}`
   - `{{message}}`
4. Replace in `index.html`:
   - `YOUR_PUBLIC_KEY`
   - `YOUR_SERVICE_ID`
   - `YOUR_TEMPLATE_ID`

---

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub
2. Go to **Settings → Pages**
3. Source → **Deploy from branch → main**
4. Site goes live at `https://username.github.io/repo-name`

### Netlify (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop `index.html`
3. Connect custom domain

---

## 🔄 How to Update Website

```bash
git add .
git commit -m "your update description"
git push
```

---

## 🤝 Top Clients

- Fleur & Compagnie
- Adopterz
- Magnifiscience
- Ean Elliot
- 365Digital
- KFC

---

## 📞 Contact

| | |
|--|--|
| 📱 Phone | +92 335 8169111 |
| 📧 Email | riselgrowthagency@gmail.com |

---

## 📄 License

© 2026 Risel Growth Agency — All Rights Reserved
