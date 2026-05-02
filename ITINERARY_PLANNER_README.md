# AI-Powered Travel Itinerary Planner

This document focuses on the itinerary generation module and practical implementation behavior.

## What It Does

- Accepts destination, budget, trip duration, travelers, interests, accommodation, and transportation
- Generates a structured day-by-day itinerary
- Returns activity blocks, meal suggestions, budget-aware estimates, and travel tips
- Includes emergency contact guidance for destination planning

## Request Contract

POST /api/generate-itinerary

Request body:

{
   "city": "Goa",
   "budget": 40000,
   "days": 3,
   "travelers": 2,
   "interests": ["Food & Dining", "Nature & Outdoors"],
   "accommodation": "hotel",
   "transportation": "public"
}

## Response Contract

{
   "city": "Goa",
   "summary": "...",
   "totalBudget": 38000,
   "days": [
      {
         "day": 1,
         "activities": ["..."],
         "meals": ["..."],
         "accommodation": "...",
         "estimatedCost": 12000
      }
   ],
   "tips": ["..."],
   "emergencyContacts": ["..."]
}

## Runtime Modes

- Development: Vite + Express API middleware
- Production: Express serves API plus built SPA assets
- Netlify: function-based route support for deployed environments

## Environment Variables

- PERPLEXITY_API_KEY: optional, used only when live Perplexity integration is enabled
- GOOGLE_MAPS_API_KEY: optional, used for live geocoding and places lookups
- PING_MESSAGE: optional ping endpoint message

When external keys are missing, the app falls back to internal itinerary generation logic.

## Reliability Notes

- Validates required inputs before itinerary generation
- Uses fallback behavior when third-party lookups fail
- Keeps output structure predictable for frontend rendering
