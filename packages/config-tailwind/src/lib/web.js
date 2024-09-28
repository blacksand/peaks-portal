// import { addIconSelectors } from '@iconify/tailwind'
// import gridAreas from '@savvywombat/tailwindcss-grid-areas'
import containerQueries from '@tailwindcss/container-queries'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import scrollbar from 'tailwind-scrollbar'
import animate from 'tailwindcss-animate'

import fluid from '@peaks/tailwindcss-plugin-fluid'

/**
 * @type {Partial<import('tailwindcss').Config>}
 */
const preset = {
  darkMode: ['class'],
  plugins: [
    animate,
    fluid,
    containerQueries,
    forms,
    // gridAreas,
    // addIconSelectors(['line-md']),
    scrollbar({ nocompatible: true }),
    typography,
  ],
  prefix: '',
  safelist: ['text-station-10', 'text-station-20'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.3s ease-in',
        'accordion-up': 'accordion-up 0.3s ease-out',
        'collapse-down': 'collapse-down 0.3s ease-in',
        'collapse-up': 'collapse-up 0.3s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        border: 'hsl(var(--border))',
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        station: {
          10: 'hsl(var(--station-type-10))',
          20: 'hsl(var(--station-type-20))',
        },

        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },

        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      gridAutoRows: {
        details: 'minmax(2rem, auto)',
      },
      // gridTemplateAreas: {
      //   layout: [
      //     'navbar navbar  navbar',
      //     'sidebar header header',
      //     'sidebar main   drawer',
      //     'sidebar footer footer',
      //   ],
      // },
      gridTemplateColumns: {
        details: '[label] var(--grid-cols-details-label-width) [content] minmax(0, 1fr) [action] 2.5rem',
        fill: 'repeat(auto-fill, minmax(var(--grid-cols-fill-min-width), 1fr))',
        fit: 'repeat(auto-fit, minmax(var(--grid-cols-fit-min-width), 1fr))',
        // layout: 'auto 1fr auto',
      },
      gridTemplateRows: {
        // layout: 'min-content min-content 1fr auto',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'collapse-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapse-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
      },
    },
  },
}

export default preset
