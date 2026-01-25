Vercel deployment instructions

1. Connect GitHub repo
   - Go to https://vercel.com and sign in.
   - Click "New Project" → Import Git Repository → select `LakshyaAhlawat/PORTFOLIO-NEW` (or the repo you pushed).

2. Project settings
   - Framework Preset: "Other" (Vite will be detected) or select "Vite" if shown.
   - Root Directory: `frontend`
   - Build Command: `npm run build` (runs in `frontend`)
   - Output Directory: `dist`

3. Environment variables
   - Add any environment variables used by the app (for example `REACT_APP_API_URL`) in the Vercel Project → Settings → Environment Variables.

4. Deploy via CLI (optional)
   - Install Vercel CLI: `npm i -g vercel`
   - From repo root run:

```powershell
cd frontend
vercel login
vercel --prod
```

Notes
 - The repository root contains `vercel.json` which tells Vercel to build the `frontend` folder.
 - The backend `server/` is an Express app; to host it on Vercel you'd need to convert routes into serverless functions or host the server separately (e.g., Render, Railway, or Heroku).
