# Dinesh Ande — Portfolio

**Live:** https://dinesh-ande.vercel.app

Personal portfolio site with an interactive 3D hero scene, showcasing my software engineering experience and projects.

**Stack:** React 19, Vite, Tailwind CSS v4, Three.js (react-three-fiber / drei), GSAP

## Run locally

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production build in dist/
```

Site content (experience, projects, skills, education) lives in `src/constants/index.js`.

The contact form is optional: it only renders when these are set in `.env`:

```
VITE_APP_EMAILJS_SERVICE_ID=
VITE_APP_EMAILJS_TEMPLATE_ID=
VITE_APP_EMAILJS_PUBLIC_KEY=
```

## Credits

Based on the [3D Portfolio template](https://github.com/adrianhajdin/3d-portfolio) by JavaScript Mastery.
