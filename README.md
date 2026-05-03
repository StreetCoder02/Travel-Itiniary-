# ✈️ AI Travel Itinerary Planner

[![TypeScript](https://img.shields.io/badge/TypeScript-94.5%25-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=flat&logo=netlify)](https://netlify.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Triply%20AI-00C7B7?style=flat&logo=netlify)](https://triplyai.netlify.app)

A full-stack AI-powered travel planning app that generates personalized day-by-day itineraries based on your destination, budget, interests, and travel style.

---

## ✨ Features

- 🗓️ **Personalized Itineraries** — Day-by-day plans for 1 to 30 days
- 💰 **Budget-Aware Planning** — All recommendations fit within your total budget
- 🎯 **Interest-Driven** — Filter by Culture, Food, Adventure, Nature and more
- 🏨 **Accommodation & Transport** — Customize hotel type and travel mode
- 🆘 **Emergency Contacts** — Local emergency info included in every plan
- 📱 **Responsive UI** — Works on desktop and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, React Router |
| **Styling** | TailwindCSS, Radix UI, shadcn/ui, Lucide Icons |
| **Backend** | Node.js, Express 5 |
| **AI** | Perplexity AI API |
| **Serverless** | Netlify Functions |
| **Testing** | Vitest |

---

## 🚀 Quick Start

### 1. Clone the repo
```bash
git clone https://github.com/StreetCoder02/Travel-Itinerary.git
cd Travel-Itinerary
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
```bash
cp .env.example .env
```

Add your keys to `.env`:
PERPLEXITY_API_KEY=your_key_here

### 4. Start the app
```bash
npm run dev
```
Open http://localhost:8080

---

## 📁 Project Structure
Travel-Itinerary/
├── client/          # React frontend (pages, components, hooks)
├── server/          # Express API routes
├── netlify/         # Serverless functions for deployment
├── shared/          # Shared TypeScript types
└── package.json
---

## 🔌 API

**POST** `/api/generate-itinerary`

```json
{
  "city": "Jaipur",
  "budget": 50000,
  "days": 4,
  "travelers": 2,
  "interests": ["Culture & History", "Food & Dining"],
  "accommodation": "hotel",
  "transportation": "public"
}
```

---

## 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PERPLEXITY_API_KEY` | Optional | For live AI itinerary generation |
| `GOOGLE_MAPS_API_KEY` | Optional | For live place lookups |

If keys are missing, the app falls back to internal logic automatically.

---

## 🚢 Deployment

Configured for **Netlify** out of the box:
```bash
npm run build
```
Connect your GitHub repo to Netlify for auto-deploy on every push.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push and open a Pull Request

---

## 📝 License

MIT License — see [LICENSE](LICENSE) for details.

---

**Made with ❤️ by Aniruddha Pratap Singh**

⭐ Star this repo if you found it useful!
