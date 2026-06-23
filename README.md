# Anjali Devi — Portfolio (MERN Stack)

A personal portfolio website built with the **MERN stack** — MongoDB, Express, React, Node.js — featuring smooth animations (Framer Motion), an elegant light theme, and a working contact form that saves messages to a database.

![Stack](https://img.shields.io/badge/Stack-MERN-4f46e5) ![React](https://img.shields.io/badge/React-18-61dafb) ![Node](https://img.shields.io/badge/Node-Express-339933)

## ✨ Features

- **Elegant light + indigo design**, fully responsive (mobile → desktop)
- **Framer Motion animations** — scroll reveals, typewriter role text, floating photo
- **Real MERN backend**:
  - `GET /api/projects` — project data from MongoDB
  - `GET /api/skills` — skills grouped by category
  - `POST /api/contact` — saves visitor messages to MongoDB
- **Graceful fallback** — the site still renders project/skill data even if the database is offline
- Resume download, social links, scroll-to-top, sticky navbar

## 🗂 Project Structure

```
anjali-portfolio/
├── client/          # React + Vite frontend
│   ├── public/      # photo, resume PDF, favicon
│   └── src/
│       ├── components/   # Navbar, Hero, About, Skills, Experience, Projects, Contact, Footer
│       ├── data/content.js  # resume content + fallback data
│       └── api.js       # fetch helpers
└── server/          # Express + MongoDB backend
    └── src/
        ├── models/      # Message, Project, Skill (Mongoose)
        ├── routes/api.js
        ├── data/seedData.js
        └── index.js
```

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) 18+
- [MongoDB](https://www.mongodb.com/try/download/community) running locally **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

### 2. Install dependencies
```bash
# from the project root
npm run install:all
```

### 3. Configure the backend
```bash
cd server
cp .env.example .env      # then edit .env if needed
```
Default `MONGO_URI` points to a local MongoDB. For Atlas, paste your connection string.

### 4. Run it (two terminals)
```bash
# Terminal 1 — backend (http://localhost:5050)
npm run server

# Terminal 2 — frontend (http://localhost:5173)
npm run client
```
Open **http://localhost:5173** 🎉

> The frontend proxies `/api` calls to the backend automatically (see `client/vite.config.js`).

## 🛠 Build for Production
```bash
npm run build         # outputs client/dist
```

## 🌐 Deploying
- **Frontend** → Vercel / Netlify (build command `npm run build`, output `client/dist`)
- **Backend** → Render / Railway (set `MONGO_URI` + `CLIENT_ORIGIN` env vars)
- Use **MongoDB Atlas** for a free cloud database

---

Built with ❤️ by Anjali Devi · Jaipur, India
