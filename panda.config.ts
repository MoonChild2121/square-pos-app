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