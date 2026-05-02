module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        primary: {
          50: '#e8f4ff',
          100: '#c3dffe',
          200: '#9acafc',
          300: '#6eb4fa',
          400: '#4aa3f8',
          500: '#2192f7',
          600: '#1a7ee0',
          700: '#1263b8',
          800: '#0b4990',
          900: '#063068',
        },
        navy: {
          950: '#06111f',
          900: '#0a1b30',
          800: '#102b4a',
          700: '#153b63',
          600: '#1c4f82',
        },
        champagne: {
          100: '#fbf4df',
          200: '#f4e3b5',
          300: '#e7c878',
          400: '#d5ad55',
          500: '#b88d35',
        },
        dark: {
          900: '#0d1117',
          800: '#161b22',
          700: '#21262d',
          600: '#30363d',
          500: '#484f58',
        },
        silver: {
          100: '#f5f6f7',
          200: '#e8eaed',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
        },
        accent: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
      },
      lineHeight: {
        hero: '4.5rem',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1a3a5c 100%)',
        'card-gradient': 'linear-gradient(145deg, #161b22 0%, #21262d 100%)',
        'cta-gradient': 'linear-gradient(90deg, #1263b8 0%, #2192f7 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'accordion-down': 'accordionDown 0.2s ease-out',
        'accordion-up': 'accordionUp 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        accordionDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        accordionUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
    },
  },
  plugins: [],
};
