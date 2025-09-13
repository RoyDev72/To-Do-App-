# To Do App

This repository contains a simple To-Do application with a Node/Express + MongoDB backend and a React + Vite frontend.

Quick layout:
- `Backend/` - Express server, routes, Mongoose models and DB connection
- `Frontend/` - React (Vite) app with Tailwind CSS and Axios for API calls

Prerequisites
 - Node.js (18+ recommended)
 - npm
 - A MongoDB connection string (Atlas or local). Create a `.env` file in `Backend/` with `MONGODB_URI`.

Run locally (development)

Open two terminals (PowerShell recommended) and run:

```powershell
# Start backend (from repo root)
cd C:\Users\Shivam\OneDrive\Desktop\To_Do_App
npm run dev

# In a separate terminal, start the frontend (from Frontend folder)
cd C:\Users\Shivam\OneDrive\Desktop\To_Do_App\Frontend
npm run dev
```

The backend will run on http://localhost:5000 by default and the frontend Vite dev server on http://localhost:5174 (or the port Vite reports).

Build for production

1. Build the frontend (from `Frontend/`):

```powershell
cd C:\Users\Shivam\OneDrive\Desktop\To_Do_App\Frontend
npm run build
```

2. Start the backend in production mode (from repo root). The backend is configured to serve the built frontend from `Frontend/dist` when `NODE_ENV=production`:

```powershell
cd C:\Users\Shivam\OneDrive\Desktop\To_Do_App
set NODE_ENV=production; npm start
```

Notes and troubleshooting
- If the backend fails to connect to MongoDB, verify `Backend/.env` and the `MONGODB_URI` value.
- If you see path-to-regexp PathError related to `app.get('*', ...)`, ensure the version of Express/router supports the pattern; the server already uses a RegExp catch-all to avoid that issue.
- If you get CORS errors during dev, the backend enables CORS; ensure the frontend is calling the correct base URL (Axios default baseURL is set to `http://localhost:5000` in development).

Git notes
- Your local branch in this workspace is `master`. If you were trying to push `main`, either push `master` or rename your local branch to `main`: `git branch -m master main` and then `git push -u origin main`.

License
- This project is for demonstration — add a license file if needed.
