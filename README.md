# PortfolioPilot — CPO Dashboard

A real-time **Chief Product Officer (CPO) portfolio management dashboard** built with React, Vite, and Tailwind CSS.

## Features

- **5 Product Areas** — each with multiple sub-products showing individual progress percentages
- **Sub-product progress tracking** — color-coded bars: 🟢 ≥80% near-complete, 🟡 50–79% in-progress, 🔴 <50% early-stage
- **Portfolio Progress Overview** — bar chart comparing all product areas at a glance
- **Skill-Based Capacity Panel** — shows utilization per skill category (Frontend, Backend, Data/ML, DevOps, Security, Design) and each team member's available capacity
- **Real-Time Resource Suggestions** — automatically identifies near-complete projects that could benefit from extra resources borrowed from early-stage projects, with named team member recommendations and estimated delivery impact
- **Progress Simulation** — click "▶ Simulate Progress" to watch all projects advance in real time and see suggestions update dynamically

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview
```

## Tech Stack

- [React 19](https://react.dev/)
- [Vite 7](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Recharts 3](https://recharts.org/)
