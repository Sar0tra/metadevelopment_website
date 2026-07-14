/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm near-black + bone + acid — deliberately not the indigo/violet "AI SaaS" palette
        ink: '#0b0a08',
        panel: '#141210',
        bone: '#f4efe4',
        fog: '#8c8677',
        line: '#f4efe4',
        acid: {
          DEFAULT: '#d7ff3f',
          dim: '#9fb82f',
        },
        rust: '#ff4d1a',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'dot-grid':
          'radial-gradient(circle, rgba(244,239,228,0.16) 1px, transparent 1px)',
        'acid-glow':
          'radial-gradient(circle at 50% 50%, rgba(215,255,63,0.22), transparent 70%)',
      },
      boxShadow: {
        acid: '0 0 50px -10px rgba(215,255,63,0.5)',
        'acid-sm': '0 0 24px -6px rgba(215,255,63,0.45)',
      },
      animation: {
        'spin-slow': 'spin 16s linear infinite',
        'orbit-slow': 'spin 10s linear infinite',
        float: 'float 7s ease-in-out infinite',
        marquee: 'marquee 26s linear infinite',
        blink: 'blink 1.1s step-end infinite',
        wobble: 'wobble 12s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 50%': { opacity: 1 },
          '50.01%, 100%': { opacity: 0 },
        },
        wobble: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(6deg) scale(1.05)' },
          '50%': { transform: 'rotate(-4deg) scale(0.97)' },
          '75%': { transform: 'rotate(2deg) scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}
