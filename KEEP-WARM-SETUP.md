# Keep-Warm Setup (Prevent Cold Starts)

Render free tier spins down after inactivity; Neon scales DB compute to zero. Pinging `/warm` every 5 minutes keeps both the backend and the database ready so the first request is fast.

## Endpoints

| Route      | Purpose |
|-----------|---------|
| `GET /health` | Returns `200` and `{ "status": "ok" }` immediately. Does **not** touch the database. Use for load balancers or simple uptime checks. |
| `GET /warm`   | Runs a minimal DB query (`SELECT 1`) and returns `200` and `{ "status": "ok" }` if the DB is reachable. Returns `503` with a generic message if the DB is down. Use this for keep-warm pings so both Render and Neon stay active. |

Replace `https://course-marketplace.onrender.com` below with your actual backend URL if different.

---

## Option A: UptimeRobot (recommended)

1. Go to [UptimeRobot](https://uptimerobot.com) and sign up (free).
2. Click **Add New Monitor**.
3. Set:
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: e.g. `Course Marketplace Backend Warm`
   - **URL**: `https://course-marketplace.onrender.com/warm`
   - **Monitoring Interval**: 5 minutes
4. Save. UptimeRobot will request `/warm` every 5 minutes.

No secrets or API keys are required for this monitor.

---

## Option B: GitHub Actions cron

A workflow in this repo pings `/warm` every 5 minutes.

- **File**: `.github/workflows/keep-warm.yml`
- **Schedule**: `*/5 * * * *` (every 5 minutes)
- **Action**: Sends a GET request to `https://course-marketplace.onrender.com/warm`

To use a different backend URL, set the `BACKEND_URL` environment variable in the workflow (e.g. in the job or step) to your backend base URL, e.g. `https://your-app.onrender.com`.

No secrets are required; the workflow is public and only calls your public `/warm` endpoint.

---

## Why pinging `/warm` every 5 minutes helps

- **Render**: Free services sleep after inactivity. A request every 5 minutes counts as activity, so the service stays (or gets) warm and the first real user request is fast.
- **Neon**: DB compute can scale to zero. A lightweight query from `/warm` keeps the DB connection used and the compute active, so the first real request doesn’t wait for a cold start.

Using `/warm` (instead of `/health`) ensures both the app and the database are touched regularly.

---

## Testing

**Locally**

```bash
# Health (no DB)
curl http://localhost:3000/health

# Warm (hits DB)
curl http://localhost:3000/warm
```

**Production**

```bash
curl https://course-marketplace.onrender.com/health
curl https://course-marketplace.onrender.com/warm
```

Expect `200` and `{ "status": "ok" }` when the app (and for `/warm`, the DB) is healthy.

---

## Blocking / CORS

- `/health` and `/warm` are registered **before** any API routes and do **not** use auth middleware.
- There is no rate limiting or IP allowlist in this project, so external monitors (UptimeRobot or GitHub Actions) will not be blocked.
- CORS does not block GET requests from monitors; they do not need CORS for a simple GET.

If you add rate limiting or auth to the whole app later, exempt `/health` and `/warm` so the keep-warm ping still works.
