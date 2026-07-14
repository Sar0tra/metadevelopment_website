import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Positioning is done imperatively via refs + CSS transitions instead of
// framer-motion's useSpring/useMotionValue. Safari can leave a JS/WAAPI-driven
// infinite-tracking loop frozen at its first value until an input event forces
// a compositor tick — a plain mousemove -> style.transform write has no such
// idle-start state, so it tracks correctly from the very first frame.
export default function CustomCursor() {
  const dotWrapRef = useRef(null)
  const ringWrapRef = useRef(null)
  const labelWrapRef = useRef(null)
  const lastTarget = useRef(null)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')

  useEffect(() => {
    const handleMove = (event) => {
      const transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      if (dotWrapRef.current) dotWrapRef.current.style.transform = transform
      if (ringWrapRef.current) ringWrapRef.current.style.transform = transform
      if (labelWrapRef.current) labelWrapRef.current.style.transform = transform

      // closest() walks the DOM — skip it unless the raw target actually changed
      if (event.target === lastTarget.current) return
      lastTarget.current = event.target
      const link = event.target.closest?.('[data-cursor="link"]')
      setHovering(Boolean(link))
      setLabel(link?.dataset.cursorText ?? '')
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <>
      <div
        ref={dotWrapRef}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
        className="pointer-events-none fixed left-0 top-0 z-[999] -ml-[5px] -mt-[5px]"
      >
        <div
          className={`h-2.5 w-2.5 rounded-full bg-acid transition-transform duration-150 ease-out ${
            hovering ? 'scale-[0.4]' : 'scale-100'
          }`}
        />
      </div>

      <div
        ref={ringWrapRef}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
        className="pointer-events-none fixed left-0 top-0 z-[998] -ml-4 -mt-4"
      >
        <div
          className={`h-8 w-8 rounded-full border border-acid/70 transition-[transform,opacity] duration-200 ease-out ${
            hovering ? 'scale-[2.6] opacity-100' : 'scale-100 opacity-50'
          }`}
        />
      </div>

      <div
        ref={labelWrapRef}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
        className="pointer-events-none fixed left-0 top-0 z-[999] -ml-9 -mt-12"
      >
        <AnimatePresence>
          {hovering && label && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="whitespace-nowrap rounded-full bg-acid px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink"
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
