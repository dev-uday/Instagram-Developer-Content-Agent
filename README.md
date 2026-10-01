# Instagram Developer Content Agent

An AI agent system that researches GitHub repositories, generates high-quality developer-focused content and carousel visuals, enforces strict outbound link policies, manages publishing via the official Instagram API, and handles comment/DM engagement based on project evidence.

## Architecture

This project is structured as a TypeScript monorepo:

- `apps/backend`: Express + Node.js backend API, BullMQ job queues, GitHub research engine, LLM content generator, Puppeteer/HTML carousel renderer, and Instagram API integration.
- `apps/frontend`: React + Vite dashboard for managing repository connections, reviewing post drafts, managing link policies, content calendar, and unified inbox.
- `packages/shared`: Shared TypeScript types, schemas, and utilities.

## Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- MongoDB
- Redis (for BullMQ background queues)

## Quick Start

```bash
# Install dependencies
npm install

# Run backend development server
npm run dev:backend

# Run frontend dashboard
npm run dev:frontend
```

## Documentation

See [Instagram_Developer_Content_Agent_Plan.md](file:///Users/adsmg/development/Instagram-Developer-Content-Agent/Instagram_Developer_Content_Agent_Plan.md) for the complete design and implementation plan.
