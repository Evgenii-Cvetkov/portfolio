'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useLang } from './LanguageContext'
import { t } from '@/lib/translations'

function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const { resolvedTheme } = useTheme()
  const themeRef = useRef(resolvedTheme)

  useEffect(() => {
    themeRef.current = resolvedTheme
  }, [resolvedTheme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener('mousemove', handleMouse)

    const CELL = 52
    const RADIUS = 220
    const STRENGTH = 45
    const SUB = 10 // line subdivisions per cell for smooth curve

    function distort(x: number, y: number) {
      const { x: mx, y: my } = mouseRef.current
      const dx = x - mx
      const dy = y - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist >= RADIUS || dist === 0) return { x, y }
      const factor = (1 - dist / RADIUS) * (1 - dist / RADIUS) * STRENGTH
      return { x: x + (dx / dist) * factor, y: y + (dy / dist) * factor }
    }

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const isDark = themeRef.current === 'dark'
      ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'
      ctx.lineWidth = 0.75

      const cols = Math.ceil(w / CELL) + 1
      const rows = Math.ceil(h / CELL) + 1

      // Vertical lines
      for (let c = 0; c <= cols; c++) {
        const x = c * CELL
        ctx.beginPath()
        for (let s = 0; s <= rows * SUB; s++) {
          const y = s * (CELL / SUB)
          const p = distort(x, y)
          s === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()
      }

      // Horizontal lines
      for (let r = 0; r <= rows; r++) {
        const y = r * CELL
        ctx.beginPath()
        for (let s = 0; s <= cols * SUB; s++) {
          const x = s * (CELL / SUB)
          const p = distort(x, y)
          s === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' as const, delay },
  }
}

const CV_LINKS: Record<string, string> = {
  en: 'https://drive.google.com/uc?export=download&id=1350SLoMOtZOokFLEBv4GHGkIataQBBCE',
  ru: 'https://drive.google.com/uc?export=download&id=1T4kQjkIzAwDxP0QWEizmCRbD0aGn8mCR',
}

export function Hero() {
  const { lang } = useLang()
  const hero = t[lang].hero
  const [cvOpen, setCvOpen] = useState(false)
  const cvRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cvRef.current && !cvRef.current.contains(e.target as Node)) {
        setCvOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      <GridBackground />

      <div className="relative z-10 px-6 md:px-12 max-w-6xl mx-auto w-full py-24 md:py-32">
        <motion.p
          className="flex items-center gap-3 text-xl sm:text-[2rem] text-muted mb-5"
          {...fadeUp(0.15)}
        >
          <motion.span
            animate={{ rotate: [0, 20, -5, 20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' }}
            style={{ display: 'inline-block', transformOrigin: '70% 80%' }}
          >
            👋
          </motion.span>
          <span>{hero.greeting}</span>
        </motion.p>

        <motion.h1
          className="text-[1.54rem] md:text-[2.05rem] lg:text-[2.57rem] font-semibold tracking-tight leading-[1.1] mb-10 max-w-5xl"
          {...fadeUp(0.3)}
        >
          {hero.headline}
        </motion.h1>

        <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.45)}>
          <a
            href="https://t.me/evgenii_tsvetkov"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity"
          >
            {hero.cta} →
          </a>
          <div ref={cvRef} className="relative">
            <button
              onClick={() => setCvOpen(v => !v)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-medium hover:bg-foreground/5 transition-colors"
            >
              {hero.cv}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={`transition-transform duration-200 ${cvOpen ? 'rotate-180' : ''}`}
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {cvOpen && (
              <div className="absolute left-0 mt-2 w-36 rounded-xl border border-border bg-background shadow-lg overflow-hidden z-50">
                {(['en', 'ru'] as const).map(l => (
                  <a
                    key={l}
                    href={CV_LINKS[l]}
                    download
                    onClick={() => setCvOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-foreground/5 transition-colors"
                  >
                    <span className="font-medium">{l.toUpperCase()}</span>
                    <span className="text-muted text-xs">{l === 'en' ? 'English' : 'Русский'}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
