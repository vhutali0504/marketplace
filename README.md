# Student Marketplace <!-- rename when the brand lands -->

**The marketplace for student hustles.**

A mobile-first platform connecting university students with student-run businesses and once-off job opportunities on their campus. Built for all South African universities, piloting at UJ.

## The problem

Student businesses live and die by word of mouth and scattered WhatsApp groups. There's no central place to find a tutor, a hairdresser, or someone to fix your laptop on campus — and no way to know who to trust. This platform is the discovery and trust layer for the campus economy.

## How it works

- **Directory:** student vendors create profiles and listings, searchable by category and campus
- **Micro-jobs:** anyone can post a once-off task; vendors apply; accepting an application creates an order
- **Trust:** reviews can only be written against completed orders — every rating is verifiable
- **WhatsApp-first:** contact happens through the channel students already use

## Tech stack

- **Frontend:** React (Vite), delivered as a Progressive Web App
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Auth:** phone number + OTP, JWT sessions

## Project structure

```
client/    React PWA
server/    Express API (routes, models, middleware, auth)
docs/      Decisions, roadmap, changelog
```

Full documentation (requirements, use cases, diagrams, feasibility, V&V plan) lives in the [project wiki](../../wiki).

## Running locally

```bash
# server
cd server
npm install
cp .env.example .env   # fill in DATABASE_URL, JWT_SECRET
npm run migrate
npm run dev

# client
cd client
npm install
npm run dev
```

## Status

🔨 **v1 in progress — Sprint 1: foundations & auth**

| Sprint | Goal | Status |
|--------|------|--------|
| 1 | Foundations & auth | 🔨 In progress |
| 2 | Vendors & listings | ⬜ |
| 3 | Search & discovery | ⬜ |
| 4 | Jobs module | ⬜ |
| 5 | Orders, reviews & beta | ⬜ |
| 6 | Hardening & launch | ⬜ |
