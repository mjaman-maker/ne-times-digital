# NE Times Digital - Vite + React

A fast, clean, mobile-first news website for Assam and Northeast India, built with **Vite** and **React**.

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ (npm comes with Node.js)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open automatically at `http://localhost:5173` in your browser with hot module replacement (HMR).

### Build for Production

```bash
npm run build
```

The optimized build output goes to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── main.tsx              # React app entry point
├── App.tsx               # Root component
├── styles.css            # Global Tailwind CSS
├── components/
│   ├── news/             # News-specific components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── SectionRow.tsx
│   │   ├── VideoStrip.tsx
│   │   ├── Opinion.tsx
│   │   ├── Footer.tsx
│   │   └── BreakingTicker.tsx
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── routes/
│   └── index.tsx         # Home page
├── assets/               # Images and static assets
└── public/               # Static files
```

## 🛠️ Tech Stack

- **Vite** - Lightning-fast build tool and dev server
- **React 19** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautifully designed components
- **React Hook Form** - Efficient form state management
- **Zod** - TypeScript-first schema validation

## 📦 Available Scripts

| Command           | Description               |
| ----------------- | ------------------------- |
| `npm run dev`     | Start development server  |
| `npm run build`   | Build for production      |
| `npm run preview` | Preview production build  |
| `npm run lint`    | Run ESLint                |
| `npm run format`  | Format code with Prettier |

## 🎨 Styling

This project uses **Tailwind CSS** for styling with a custom configuration. All UI components use Tailwind classes for a consistent, responsive design.

## 📱 Features

- ✅ Mobile-first, responsive design
- ✅ Fast, optimized build with Vite
- ✅ Dark mode support
- ✅ Accessible UI components (shadcn/ui)
- ✅ Type-safe React with TypeScript
- ✅ Clean, modular component architecture

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration with React and Tailwind plugins
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration (if present)
- `eslint.config.js` - ESLint rules
- `.prettierrc` - Prettier formatting rules

## 📄 Environment Variables

Create a `.env.local` file in the project root for local environment variables:

```env
VITE_API_URL=https://api.example.com
```

Note: Variables must be prefixed with `VITE_` to be exposed to the client.

## 🚀 Deployment

### Static Hosting (GitHub Pages, Netlify, Vercel, etc.)

The `dist/` folder is ready to deploy:

```bash
npm run build
# Deploy the contents of the dist/ folder
```

### Example: Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command to `npm run build`
3. Set publish directory to `dist`

## 📝 Notes

- This is a **client-side only** React application
- All routing is currently handled within a single page (static content)
- For multi-page routing, consider adding React Router: `npm install react-router-dom`
- For server-side rendering, consider upgrading to a framework like Next.js

## 📞 Support

For issues or questions, check the [Vite docs](https://vitejs.dev/) or [React docs](https://react.dev/).

---

**Built with Vite ⚡ and React ⚛️**
