/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ASCEND OS design tokens
        void: '#0D0D0D',        // matte black base
        surface: '#141414',     // card surface
        surface2: '#1B1B1D',    // elevated card
        line: '#2A2A2D',        // hairline borders
        crimson: '#E11D48',     // discipline / streaks / focus
        electric: '#3B82F6',    // work / study / running
        emerald: '#10B981',     // health / workouts / completion
        violet: '#A855F7',      // AI / intelligence layer
        gold: '#F5B841',        // achievements / XP / levels
        mist: '#8A8A93'         // secondary text
      },
      fontFamily: {
        display: ['"Clash Display"', '"General Sans"', 'system-ui', 'sans-serif'],
        body: ['"General Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0,0,0,0.45)',
        glow: '0 0 24px 0 rgba(59,130,246,0.25)'
      },
      backdropBlur: {
        xs: '2px'
      },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(8px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'pulse-ring': { '0%': { boxShadow: '0 0 0 0 rgba(59,130,246,0.4)' }, '100%': { boxShadow: '0 0 0 12px rgba(59,130,246,0)' } }
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out both',
        'pulse-ring': 'pulse-ring 1.6s ease-out infinite'
      }
    }
  },
  plugins: []
}
