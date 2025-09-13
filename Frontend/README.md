# Frontend — To Do App (React + Vite)

This folder contains the React frontend for the To Do App, built with Vite and Tailwind CSS.

The frontend expects the backend API to be available at `http://localhost:5000` while developing. Axios is configured with that base URL by default.

Development

1. Install dependencies (first time):

```powershell
cd C:\Users\Shivam\OneDrive\Desktop\To_Do_App\Frontend
npm install
```

2. Start the dev server:

```powershell
npm run dev
```

The Vite dev server will report the local URL (usually `http://localhost:5174`).

Build for production

```powershell
npm run build
```

This produces a `dist/` folder that the backend can serve in production mode.

Troubleshooting

- If `npm run dev` exits with code 1, check the terminal output for the first error lines — common causes are misconfigured Tailwind or a syntax error in React components.
- If the frontend cannot reach the backend in development, ensure the backend is running on port 5000 and that there are no CORS issues.

Notes

- To serve the built frontend from the backend, run the backend with `NODE_ENV=production`; the backend is configured to serve `Frontend/dist`.
- If you need to change the API host for development, update the axios base URL in the frontend source where axios is configured.

License

This project is provided as-is for learning/demonstration purposes.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
