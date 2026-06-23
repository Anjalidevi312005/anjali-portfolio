# 🚀 Deploying the Portfolio (free)

Three free pieces fit together:

```
MongoDB Atlas (database)  ←──  Render (backend / Express)  ←──  Vercel (frontend / React)  ←──  your live link
```

Total cost: **₹0** (all free tiers). Time: ~30–40 min.

---

## Step 1 — Database: MongoDB Atlas

1. Go to <https://www.mongodb.com/atlas> → sign in (you already use Atlas for Casheco).
2. **Create a free cluster** (M0, region: Mumbai `ap-south-1`).
3. **Database Access** → Add a database user (note the username & password).
4. **Network Access** → Add IP `0.0.0.0/0` (allow from anywhere — needed so Render can connect).
5. **Connect → Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/anjali_portfolio?retryWrites=true&w=majority
   ```
   - Replace `<user>` / `<password>`.
   - Keep `/anjali_portfolio` as the database name.
   - If the password has special characters (`@`, `#`…), URL-encode them (`@` → `%40`).
6. Save this string — it’s your **`MONGO_URI`**.

---

## Step 2 — Backend: Render

1. Push this project to GitHub (see “GitHub” below) — or use Render’s manual deploy.
2. Go to <https://render.com> → **New → Web Service** → connect the repo.
3. Settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
4. **Environment variables** (Render dashboard → Environment):
   | Key | Value |
   |-----|-------|
   | `MONGO_URI` | *(your Atlas string from Step 1)* |
   | `CLIENT_ORIGIN` | *(your Vercel URL — fill after Step 3, e.g. `https://anjali-portfolio.vercel.app`)* |
   | `PORT` | `5050` *(Render sets its own; this is a fallback)* |
5. Deploy. Once live, your backend URL looks like `https://anjali-portfolio-api.onrender.com`.
   - Test it: open `https://<your-render-url>/api/health` → should show `{"status":"ok","db":"connected"}`.

> ⚠️ Render free tier “sleeps” after 15 min idle — first request after that takes ~30s to wake. Fine for a portfolio.

---

## Step 3 — Frontend: Vercel

1. Go to <https://vercel.com> → **Add New → Project** → import the repo.
2. Settings:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite (auto-detected)
   - **Build Command:** `npm run build` · **Output Directory:** `dist`
3. **Environment variable:**
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://<your-render-url>/api` |
4. Deploy. You’ll get a link like `https://anjali-portfolio.vercel.app` 🎉

---

## Step 4 — Connect the two

1. Copy your Vercel URL.
2. In **Render → Environment**, set `CLIENT_ORIGIN` to that URL → save (Render redeploys).
3. Open your Vercel link → the contact form now saves to Atlas. Test it!

---

## (Optional) Push to GitHub first

```bash
cd ~/anjali-portfolio
git init
git add .
git commit -m "Portfolio — MERN"
# create an empty repo on github.com, then:
git remote add origin https://github.com/<you>/anjali-portfolio.git
git branch -M main
git push -u origin main
```
`.gitignore` already excludes `node_modules`, `dist` and `.env`, so no secrets are pushed.

---

## Before you go live — checklist
- [ ] Replace placeholder social links in `client/src/data/content.js` (`github`, `linkedin`, `leetcode`).
- [ ] `MONGO_URI` set on Render (Atlas).
- [ ] `VITE_API_URL` set on Vercel (Render URL + `/api`).
- [ ] `CLIENT_ORIGIN` set on Render (Vercel URL).
- [ ] Test the contact form on the live site → check it saved (`npm run messages` works locally only; for prod use Atlas “Browse Collections”).
