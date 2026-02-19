# PortfolioPilot

A CPO (Chief Product Officer) resource allocation dashboard built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **5 Product Areas** with sub-product progress tracking (E-Commerce Platform, Mobile App, Analytics Dashboard, Customer Portal, DevOps Infrastructure)
- **Progress Bars** for each sub-product, color-coded by completion stage
- **Skill-Based Capacity Panel** showing team member distribution, skills, and availability per product area
- **AI Resource Suggestions** that automatically identify when resources from an early-stage project can be borrowed to accelerate a near-complete project

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the dashboard.

## Build

```bash
npm run build
```

## How Suggestions Work

The suggestion engine compares overall progress across product areas:
- If a product area has sub-products close to completion (≥85%) and another area is in early stages (≤20% overall), it recommends borrowing skill-matched team members.
- Suggestions are prioritized (High / Medium) based on urgency and completion gap.
