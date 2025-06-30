import { defineConfig } from '@pandacss/dev'
import { textStyles } from './src/themes/textStyles'
import { buttonRecipe } from './src/themes/recipes/button'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          black: { value: '#000000' },
          white: { value: '#ffffff' },
          gray: {
            100: { value: '#f5f5f5' },
            200: { value: '#e5e5e5' },
            300: { value: '#d4d4d4' },
            400: { value: '#a3a3a3' },
            500: { value: '#737373' },
            600: { value: '#525252' },
            700: { value: '#404040' },
            800: { value: '#262626' },
            900: { value: '#171717' },
          },
        },
        fonts: {
          body: { value: 'Inter, system-ui, sans-serif' },
          heading: { value: 'Inter, system-ui, sans-serif' },
        },
        fontSizes: {
          xs: { value: '0.75rem' },
          sm: { value: '0.875rem' },
          md: { value: '1rem' },
          lg: { value: '1.125rem' },
          xl: { value: '1.25rem' },
          '2xl': { value: '1.5rem' },
          '3xl': { value: '1.875rem' },
        },
        spacing: {
          '0.5': { value: '0.125rem' },
          '1': { value: '0.25rem' },
          '2': { value: '0.5rem' },
          '3': { value: '0.75rem' },
          '4': { value: '1rem' },
          '5': { value: '1.25rem' },
          '6': { value: '1.5rem' },
          '8': { value: '2rem' },
          '10': { value: '2.5rem' },
          '12': { value: '3rem' },
        },
        radii: {
          none: { value: '0' },
          sm: { value: '0.125rem' },
          md: { value: '0.375rem' },
          lg: { value: '0.5rem' },
          full: { value: '9999px' },
        },
      },
      semanticTokens: {
        colors: {
          surface: {
            base: {
              value: {
                base: '{colors.white}',
                _dark: '{colors.gray.900}',
              },
            },
            elevated: {
              value: {
                base: '{colors.white}',
                _dark: '{colors.gray.800}',
              },
            },
          },
          content: {
            primary: {
              value: {
                base: '{colors.gray.900}',
                _dark: '{colors.gray.50}',
              },
            },
            secondary: {
              value: {
                base: '{colors.gray.600}',
                _dark: '{colors.gray.300}',
              },
            },
          },
          border: {
            primary: {
              value: {
                base: '{colors.gray.200}',
                _dark: '{colors.gray.700}',
              },
            },
            secondary: {
              value: {
                base: '{colors.gray.100}',
                _dark: '{colors.gray.800}',
              },
            },
          },
          interactive: {
            value: {
              base: '{colors.gray.300}',
              _dark: '{colors.gray.600}',
            },
          },
          focus: {
            default: { value: '{colors.gray.400}' },
            _dark: { value: '{colors.gray.600}' },
          },
        },
      },
    },
    textStyles,
    recipes: {
      button: buttonRecipe,
    },
  },
  outdir: 'styled-system',
  jsxFramework: 'react',
})
