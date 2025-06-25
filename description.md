# Square POS App Setup and Configuration

This document tracks all setup steps for the Square POS app using Next.js, NextAuth, Panda CSS, and ESLint.

---

## 1. GitHub Repository Setup

### Create GitHub Repository
- Via GitHub web interface:
  - Repository name: `square-pos-app`
  - Description: Square POS application with Next.js, NextAuth, and Pallas UI
  - Initialize with README

### Clone Local Repository

git clone https://github.com/YOUR_USERNAME/square-pos-app.git
cd square-pos-app
## 2. Next.js Project Initialization
Initialize Next.js with TypeScript
npx create-next-app@latest . --typescript --no-tailwind --eslint --app --src-dir --import-alias "@/*"
Install Core Dependencies
Panda CSS only (skip Pallas UI for now)
npm install @pandacss/dev

 Authentication
npm install next-auth @auth/prisma-adapter

 Square SDK
npm install squareup

 Utilities
npm install zod @hookform/resolvers react-hook-form
npm install 
# 3. Panda CSS Configuration
Initialize Panda CSS
npx panda init
### Update panda.config.ts
typescript
import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          brand: {
            50: { value: '#f0f9ff' },
            100: { value: '#e0f2fe' },
            500: { value: '#0ea5e9' },
            600: { value: '#0284c7' },
            900: { value: '#0c4a6e' }
          },
          gray: {
            50: { value: '#f9fafb' },
            100: { value: '#f3f4f6' },
            200: { value: '#e5e7eb' },
            300: { value: '#d1d5db' },
            500: { value: '#6b7280' },
            700: { value: '#374151' },
            900: { value: '#111827' }
          }
        },
        fonts: {
          body: { value: 'Inter, system-ui, sans-serif' },
          heading: { value: 'Inter, system-ui, sans-serif' }
        },
        fontSizes: {
          xs: { value: '0.75rem' },
          sm: { value: '0.875rem' },
          md: { value: '1rem' },
          lg: { value: '1.125rem' },
          xl: { value: '1.25rem' },
          '2xl': { value: '1.5rem' }
        },
        spacing: {
          '1': { value: '0.25rem' },
          '2': { value: '0.5rem' },
          '3': { value: '0.75rem' },
          '4': { value: '1rem' },
          '6': { value: '1.5rem' },
          '8': { value: '2rem' }
        }
      }
    }
  },
  outdir: 'styled-system',
  jsxFramework: 'react'
})
### Update src/app/globals.css
@layer reset, base, tokens, recipes, utilities;
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

html {
  font-family: var(--fonts-body);
}

body {
  background: var(--colors-bg-canvas);
  color: var(--colors-text-primary);
}
Update package.json Scripts
json
Copy
Edit
{
  "scripts": {
    "prepare": "panda codegen",
    "dev": "panda --watch & next dev --turbo",
    "build": "panda && next build",
    "start": "next start",
    "lint": "next lint",
    "panda": "panda",
    "panda:watch": "panda --watch"
  }
}
## 4. Environment Configuration
Create .env.local
env
Copy
Edit
 NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

 Square
SQUARE_APPLICATION_ID=your-square-app-id
SQUARE_APPLICATION_SECRET=your-square-app-secret
SQUARE_ENVIRONMENT=sandbox
SQUARE_WEBHOOK_SIGNATURE_KEY=your-webhook-signature-key

Database (if using)
DATABASE_URL=your-database-url
Update .env.example
env
Copy
Edit
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

SQUARE_APPLICATION_ID=
SQUARE_APPLICATION_SECRET=
SQUARE_ENVIRONMENT=sandbox
SQUARE_WEBHOOK_SIGNATURE_KEY=

DATABASE_URL=
## 5. ESLint Configuration
Update eslint.config.mjs
javascript
Copy
Edit
// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "prefer-const": "error",
      "no-unused-vars": "warn",
      "react/react-in-jsx-scope": "off", // React 17+ doesn't need React import
      "react/jsx-uses-react": "off"      // React 17+ doesn't need React import
    },
  },
];

export default eslintConfig;

