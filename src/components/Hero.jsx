import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Marquee from './Marquee'

// static outline — the "life" comes from animating rotate/scale on the group
// (GPU transform) instead of morphing the `d` attribute every frame, which
// was pinning the main thread and making the cursor/scroll feel janky
const BLOB_PATH =
  'M120,10 C170,20 220,70 210,120 C200,170 150,210 100,205 C50,200 10,150 15,100 C20,50 70,0 120,10 Z'

const line = {
  hidden: { y: '110%' },
  visible: (i = 0) => ({
    y: '0%',
    transition: { duration: 0.9, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
  }),
}

const fade = {
  hidden: { opacity: 0, y: 14 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i, ease: [0.16, 1, 0.3, 1] },
  }),
}

function OrbitButton() {
  return (
    <a
      href="#poptavka"
      data-cursor="link"
      data-cursor-text="Poptávka"
      className="group relative flex h-32 w-32 shrink-0 items-center justify-center"
    >
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full animate-spin-slow text-fog transition-colors duration-500 group-hover:text-acid group-hover:[animation-play-state:paused]"
      >
        <defs>
          <path
            id="orbit-path"
            d="M 100,100 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
          />
        </defs>
        <text fontSize="10.5" letterSpacing="2.5" className="fill-current font-mono uppercase">
          <textPath href="#orbit-path">
            ZAČNĚME PROJEKT &#10022; ZAČNĚME PROJEKT &#10022;
          </textPath>
        </text>
      </svg>
      <span className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-acid text-ink transition-transform duration-500 ease-out group-hover:scale-110">
        <ArrowUpRight className="h-5 w-5" />
      </span>
    </a>
  )
}

function AbstractVisual() {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 })

  const handleMove = (e) => {
    const bounds = ref.current.getBoundingClientRect()
    mx.set((e.clientX - bounds.left) / bounds.width - 0.5)
    my.set((e.clientY - bounds.top) / bounds.height - 0.5)
  }
  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: 800 }}
      className="relative mx-auto aspect-square w-full max-w-md"
    >
      <div className="absolute inset-0 bg-dot-grid [background-size:22px_22px] opacity-40" />
      <div className="pointer-events-none absolute inset-0 rounded-full bg-acid-glow blur-2xl" />

      <motion.div style={{ rotateX, rotateY }} className="relative h-full w-full">
        {/* plain CSS keyframe animations here (not framer-motion's JS/WAAPI
           `animate` prop) — Safari can leave a JS-driven infinite loop frozen
           at its first frame until an input event forces a compositor tick;
           pure CSS animations start reliably on load without that quirk */}
        <svg viewBox="0 0 220 220" className="h-full w-full drop-shadow-[0_0_60px_rgba(215,255,63,0.18)]">
          <g className="animate-wobble" style={{ transformOrigin: '110px 110px' }}>
            <path d={BLOB_PATH} fill="#d7ff3f" fillOpacity="0.08" />
            <path d={BLOB_PATH} fill="none" stroke="#d7ff3f" strokeWidth="1.5" />
          </g>
        </svg>

        {/* obíhající bod — sleduje rytmus blobu */}
        <span className="absolute inset-0 flex animate-orbit-slow items-start justify-center">
          <span className="mt-2 h-2.5 w-2.5 rounded-full bg-bone shadow-acid-sm" />
        </span>
      </motion.div>

      {/* plovoucí štítky — náhrada za klišé "dashboard mockup" */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0.6}
        variants={fade}
        className="absolute -left-4 top-6 rounded-full border border-bone/15 bg-ink/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-fog backdrop-blur"
      >
        40+ dokončených projektů
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0.8}
        variants={fade}
        className="absolute -right-2 bottom-10 rounded-full border border-bone/15 bg-ink/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-fog backdrop-blur"
      >
        100 % vlastní tým
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fade}
        className="absolute bottom-0 left-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-acid"
      >
        <span className="h-1.5 w-1.5 animate-blink rounded-full bg-acid" />
        volná kapacita — Q4
      </motion.div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-ink pt-16">
      <div className="pointer-events-none absolute inset-0 noise-overlay" />

      <Marquee
        className="border-b border-bone/10 py-3"
        items={[
          'WEBOVÉ PREZENTACE',
          'WEBOVÉ APLIKACE',
          'MOBILNÍ APLIKACE',
          'META-DEVELOPMENT',
          'JABLONEC NAD NISOU, ČR — REMOTE PO CELÉM SVĚTĚ',
        ]}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 pt-20 pb-20 lg:grid-cols-12 lg:gap-6 lg:px-12 lg:pt-24 lg:pb-28">
        {/* levý pruh — vertikální index */}
        <div className="hidden flex-col justify-between lg:col-span-1 lg:flex">
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-fog [writing-mode:vertical-rl]">
            Č. 05 — Studio
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-fog [writing-mode:vertical-rl]">
            Rolovat
          </span>
        </div>

        {/* headline */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-fog"
          >
            <span className="text-acid">META-DEVELOPMENT</span>
            <span className="h-1 w-1 rounded-full bg-fog" />
            webové a mobilní aplikace &amp; prezentace
          </motion.div>

          <h1 className="font-display text-[13vw] font-medium leading-[0.92] tracking-tight text-bone sm:text-6xl lg:text-[5.4rem] xl:text-[6rem]">
            {['Weby, které', 'nejsou šablona.', 'Jsou META.'].map((text, i) => (
              <span key={text} className="block overflow-hidden">
                <motion.span
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={line}
                  className={`block ${
                    text === 'nejsou šablona.' ? 'italic text-fog' : ''
                  } ${text === 'Jsou META.' ? 'text-acid' : ''}`}
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.5}
            variants={fade}
            className="mt-10 max-w-md text-lg leading-relaxed text-fog"
          >
            META-Development staví webové prezentace, webové i mobilní
            aplikace pro týmy, které nechtějí vypadat jako další AI generovaný
            web. Strategie, design i vývoj pod jednou střechou — bez šablon,
            bez kompromisů.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.7}
            variants={fade}
            className="mt-12 flex flex-wrap items-center gap-8"
          >
            <OrbitButton />

            <a
              href="#services"
              data-cursor="link"
              className="group inline-flex items-center gap-2 text-sm font-medium text-bone"
            >
              <span className="relative">
                Naše služby
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-acid transition-transform duration-300 group-hover:scale-x-100" />
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* abstraktní vizuál namísto klišé dashboard mockupu */}
        <div className="flex items-center lg:col-span-4">
          <AbstractVisual />
        </div>
      </div>

      <motion.a
        href="#services"
        data-cursor="link"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="group mx-auto mb-10 flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-fog transition-colors hover:text-acid lg:hidden"
      >
        Rolovat
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </motion.a>
    </section>
  )
}
