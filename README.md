# My Portfolio

This is my personal portfolio website. I built it to showcase my projects, skills and a bit about my background, and to give people an easy way to reach me.

Live at: https://anjali-portfolio-sandy.vercel.app

## What's inside

It's a full-stack app:

- **Frontend** — React (Vite) with Framer Motion for the animations
- **Backend** — Node + Express
- **Database** — MongoDB

The projects and skills are served from the backend, and the contact form saves messages to the database. I also wired up an instant alert so I get notified the moment someone reaches out.

## Project structure

```
client/   → React frontend
server/   → Express API + MongoDB models
```

## Running it locally

You'll need Node 18+ and a MongoDB connection (local or Atlas).

```bash
# backend
cd server
cp .env.example .env      # add your MONGO_URI
npm install
npm run dev               # runs on http://localhost:5050

# frontend (in another terminal)
cd client
npm install
npm run dev               # runs on http://localhost:5173
```

The frontend proxies `/api` to the backend in development, so you don't need any extra setup.

## Deploying

I deployed the frontend on Vercel and the backend on Render, with the database on MongoDB Atlas. The backend reads its config (DB connection, allowed origins, alert credentials) from environment variables, so nothing sensitive lives in the code.

---

Built and maintained by me — Anjali Devi. Feel free to look around the code.
