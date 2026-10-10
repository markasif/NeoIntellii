# NeoIntelli Web Application

Official web platform for **NeoIntelli** — India's AI-first Global Capability Centre (GCC), talent, and engineering delivery partner.

## Tech Stack

- **Framework**: React 18, Vite, Next.js (SSG/SSR tooling)
- **Styling**: Tailwind CSS, PostCSS, Framer Motion
- **UI Components**: Radix UI primitives, Lucide Icons, shadcn-ui
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or bun

### Local Development

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Run test suite
npm run test

# Type check
npx tsc --noEmit
```

## Project Structure

```
├── public/              # Static assets, images, icons
├── src/
│   ├── components/      # Reusable UI primitives and section components
│   ├── data/            # Canonical domain and services data
│   ├── features/        # Feature-specific components
│   ├── lib/             # Utility functions, calculators, helpers
│   ├── pages/           # Application views and service pages
│   └── test/            # Vitest unit and integration test suite
└── vite.config.ts       # Vite build configuration
```

## Production Build

```sh
npm run build
```
