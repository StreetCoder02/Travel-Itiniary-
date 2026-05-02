# AI Travel Itinerary Planner

A full-stack travel planning application that generates personalized, multi-day itineraries from user preferences such as destination, budget, interests, accommodation type, and transport mode.

This project is prepared for public portfolio use and demonstrates frontend engineering, API design, fallback handling, and deployment readiness.

## Features

- Personalized itinerary generation for 1 to 30 days
- Budget-aware day planning with INR cost estimates
- Interest-driven recommendations
- Daily schedules with activities, meals, and accommodation notes
- Travel tips and emergency contact guidance
- Responsive UI for desktop and mobile
- API-backed architecture with Netlify function support

## Tech Stack

- Frontend: React 18, TypeScript, Vite, React Router
- Styling/UI: TailwindCSS, Radix UI, shadcn-style components, Lucide icons
- Backend: Express 5
- Serverless: Netlify Functions
- Testing: Vitest

## Architecture

- client: SPA pages and reusable UI components
- server: Express API routes and production server entry
- netlify/functions: serverless handlers for deployment
- shared: shared types between client and server

## API

Endpoint:

- POST /api/generate-itinerary

Example request:

{
	"city": "Jaipur",
	"budget": 50000,
	"days": 4,
	"travelers": 2,
	"interests": ["Culture & History", "Food & Dining"],
	"accommodation": "hotel",
	"transportation": "public"
}

## Environment Variables

Create a local environment file before running:

1. Copy .env.example to .env
2. Fill in values as needed

Variables:

- PERPLEXITY_API_KEY: optional, needed only when live Perplexity calls are enabled
- GOOGLE_MAPS_API_KEY: optional, used for live place lookups
- PING_MESSAGE: optional value for /api/ping response

If keys are missing, itinerary generation falls back to internal/default logic.

## Local Setup

Recommended (pnpm):

1. pnpm install
2. pnpm dev
3. open http://localhost:8080

Alternative (npm):

1. npm install
2. npm run dev

## Build and Run

1. pnpm build
2. pnpm start

## Security Notes

- Do not commit real API keys
- Keep .env files private
- Use .env.example for public configuration templates

## Portfolio Highlights

- Built a full-stack AI-assisted itinerary planner using React, TypeScript, Express, and Netlify Functions
- Implemented structured multi-day planning and budget-aware itinerary rendering
- Added fallback behavior for external API failures to improve reliability
- Configured SPA and API routing for both local development and deploy environments
