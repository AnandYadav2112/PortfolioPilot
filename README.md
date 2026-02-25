# PortfolioPilot

PortfolioPilot is an AI-powered Product Portfolio Intelligence Platform that helps CPOs make smarter, faster resourcing and prioritization decisions across multiple product areas.

## Problem

CPOs often struggle with:

- Scattered product progress updates
- Limited visibility into skill-based capacity
- Slow resource-allocation decision cycles
- No instant way to model what-if tradeoffs

## Solution

This MVP provides four core capabilities:

1. Unified Product Progress View
	- See progress across products and sub-products in one dashboard.
2. Skill-Based Capacity Intelligence
	- Instantly identify overloaded and available skills.
3. AI-Driven Recommendations
	- Prioritized recommendations such as reassigning engineers to accelerate delivery.
4. What-If Impact Simulator
	- Simulate team reallocation before making real-world changes.

## Run Locally

This is a zero-dependency frontend app.

1. Open the project folder.
2. Open `index.html` in a browser.

Or run a quick local server:

```bash
python3 -m http.server 8080
```

Then visit:

```text
http://localhost:8080
```

## Files

- `index.html` — app layout and sections
- `styles.css` — dashboard styling
- `app.js` — data model, recommendation logic, and simulator behavior