import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-acid">
      <motion.path
        d="M12 2 L22 12 L12 22 L2 12 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '12px 12px' }}
      />
    </svg>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'border-b border-bone/10 bg-ink/80 backdrop-blur-lg' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <a
          href="#hero"
          data-cursor="link"
          data-cursor-text="Domů"
          className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.3em] text-bone"
        >
          <LogoMark />
          META-DevHouse
        </a>

        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.25em] text-fog sm:flex">
          <a href="#services" data-cursor="link" className="transition-colors hover:text-bone">
            Služby
          </a>
          <a href="#poptavka" data-cursor="link" className="transition-colors hover:text-bone">
            Poptávka
          </a>
        </nav>

        <a
          href="#poptavka"
          data-cursor="link"
          data-cursor-text="Napsat"
          className="group inline-flex items-center gap-2 rounded-full border border-acid/40 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-acid transition-colors duration-300 hover:bg-acid hover:text-ink"
        >
          Poptávka
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </motion.header>
  )
}
