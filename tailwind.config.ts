import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary palette — deep navy
        navy: '#0f172a',
        'navy-soft': '#f1f5f9',
        // Secondary — bright blue for links/CTAs
        blue: '#0066cc',
        'blue-soft': '#eff6ff',
        // Backgrounds
        paper: '#ffffff',
        'paper-alt': '#f8fafc',
        // Text
        ink: '#1e293b',
        muted: '#64748b',
        // Borders
        rule: '#e2e8f0',
        // Accent — green for positive metrics
        accent: '#10b981',
        'accent-soft': '#ecfdf5',
        // Status colors
        amber: '#f59e0b',
        'amber-soft': '#fffbeb',
        red: '#ef4444',
        'red-soft': '#fef2f2',
        slate: '#475569',
        'slate-soft': '#f1f5f9',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: { prose: '68ch', shell: '1200px' },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.04em' }],
      },
      borderRadius: {
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};
export default config;
