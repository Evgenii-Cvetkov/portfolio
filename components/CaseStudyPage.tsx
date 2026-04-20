'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { useLang } from './LanguageContext'
import { Navbar } from './Navbar'
import { StickyBar } from './StickyBar'
import { UnificationScene } from './UnificationScene'
import { CommercialProposalScene } from './CommercialProposalScene'
import { projects, type ResultPart, type RichSection } from '@/lib/projects'

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === '0') { setScale(1); setPos({ x: 0, y: 0 }) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Scroll to zoom
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    setScale(s => Math.min(8, Math.max(1, s - e.deltaY * 0.002)))
  }, [])

  // Drag to pan
  const onMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return
    isDragging.current = true
    dragStart.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y }
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    const newPos = { x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y }
    posRef.current = newPos
    setPos(newPos)
  }
  const onMouseUp = () => { isDragging.current = false }

  const resetZoom = () => { setScale(1); setPos({ x: 0, y: 0 }); posRef.current = { x: 0, y: 0 } }

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={scale <= 1 ? onClose : undefined}
      onWheel={onWheel}
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        {scale > 1 && (
          <button
            onClick={resetZoom}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs backdrop-blur-sm transition-colors"
          >
            Сбросить zoom
          </button>
        )}
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Zoom hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs">
        {scale <= 1 ? 'Скролл для увеличения · Клик вне для закрытия' : 'Скролл · Тащи для перемещения · Esc для закрытия'}
      </div>

      <motion.div
        className="relative"
        style={{
          cursor: scale > 1 ? (isDragging.current ? 'grabbing' : 'grab') : 'zoom-in',
          x: pos.x,
          y: pos.y,
          scale,
        }}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl select-none"
          draggable={false}
        />
      </motion.div>
    </motion.div>,
    document.body
  )
}

function ResultText({ result, resultParts }: { result: string; resultParts?: ResultPart[] }) {
  if (resultParts) {
    return (
      <>
        {resultParts.map((part, i) => (
          <span
            key={i}
            className={
              part.color === 'red'
                ? 'text-red-500 font-medium'
                : part.color === 'green'
                ? 'text-green-500 font-medium'
                : ''
            }
          >
            {part.text}
          </span>
        ))}
      </>
    )
  }
  return <>{result}</>
}

function RichContent({ sections, lang }: { sections: RichSection[]; lang: string }) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const closeLightbox = useCallback(() => setLightboxSrc(null), [])
  return (
    <div className="space-y-16 mb-24">
      {sections.map((section, i) => {
        if (section.type === 'intro') {
          return (
            <motion.p
              key={i}
              className="text-xl md:text-2xl text-muted leading-relaxed max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
            >
              {section.body}
            </motion.p>
          )
        }

        if (section.type === 'task') {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
            >
              {section.heading && (
                <p className="text-xs text-muted tracking-widest uppercase mb-4">{section.heading}</p>
              )}
              <p className="text-lg leading-relaxed max-w-2xl">{section.body}</p>
            </motion.div>
          )
        }

        if (section.type === 'what-i-did') {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
            >
              {section.heading && (
                <p className="text-xs text-muted tracking-widest uppercase mb-6">{section.heading}</p>
              )}
              <ul className="space-y-3">
                {section.items?.map((item, j) => (
                  <li key={j} className="flex gap-3 text-base leading-relaxed">
                    <span className="text-muted mt-0.5 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
                {section.richItems?.map((parts, j) => (
                  <li key={j} className="flex gap-3 text-base leading-relaxed">
                    <span className="text-muted mt-0.5 shrink-0">—</span>
                    <span>
                      {parts.map((part, k) => (
                        <span key={k} className={
                          part.color === 'red' ? 'text-red-500 font-medium' :
                          part.color === 'green' ? 'text-green-500 font-medium' : ''
                        }>{part.text}</span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        }

        if (section.type === 'process') {
          return (
            <motion.div
              key={i}
              className={section.noBorder ? 'pt-4' : 'border-t border-border pt-12'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
            >
              {section.heading && (
                <p className="text-xs text-muted tracking-widest uppercase mb-6">{section.heading}</p>
              )}
              <div className="max-w-2xl space-y-4">
                {section.body?.split('\n\n').map((para, j) => (
                  <p key={j} className="text-base leading-relaxed">{para}</p>
                ))}
              </div>
              {section.images && section.images.length > 0 && (
                <div className={`grid gap-4 mt-8 ${section.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                  {section.images.map((src, j) => (
                    <div
                      key={j}
                      className="relative rounded-xl overflow-hidden cursor-zoom-in group"
                      style={section.imageMaxHeight ? { maxHeight: section.imageMaxHeight } : undefined}
                      onClick={() => setLightboxSrc(src)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        className={`w-full transition-transform duration-300 group-hover:scale-[1.02] ${section.imageMaxHeight ? 'h-full object-cover object-top' : 'h-auto object-cover'}`}
                        draggable={false}
                      />
                      {/* NDA label */}
                      {(section.imagesNda !== false) && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium tracking-widest">
                          NDA
                        </div>
                      )}
                      {/* Zoom hint */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/10">
                        <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                          {lang === 'ru' ? 'Открыть' : 'View'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )
        }

        if (section.type === 'problems') {
          return (
            <motion.div
              key={i}
              className="border-t border-border pt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
            >
              {section.heading && (
                <p className="text-xs text-muted tracking-widest uppercase mb-8">{section.heading}</p>
              )}
              <div className="space-y-8">
                {section.problems?.map((ps, j) => (
                  <div key={j} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Problem — red alert style */}
                    <div className="px-5 py-4 rounded-2xl bg-red-50 border border-red-200 dark:bg-red-950/20 dark:border-red-900/40">
                      <div className="flex items-start gap-3">
                        <svg className="shrink-0 mt-0.5 text-red-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <p className="text-sm leading-relaxed text-red-900 dark:text-red-200">{ps.problem}</p>
                      </div>
                    </div>
                    {/* Solution — green success style */}
                    <div className="px-5 py-4 rounded-2xl bg-green-50 border border-green-200 dark:bg-green-950/20 dark:border-green-900/40">
                      <div className="flex items-start gap-3">
                        <svg className="shrink-0 mt-0.5 text-green-600" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <p className="text-sm leading-relaxed text-green-900 dark:text-green-200">{ps.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {section.images && section.images.length > 0 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {section.images.map((src, j) => (
                      <div
                        key={j}
                        className="relative rounded-xl overflow-hidden cursor-zoom-in group"
                        onClick={() => setLightboxSrc(src)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt=""
                          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          draggable={false}
                        />
                        {(section.imagesNda !== false) && (
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium tracking-widest">
                            NDA
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/10">
                          <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                            {lang === 'ru' ? 'Открыть' : 'View'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted mt-2">
                    {lang === 'ru'
                      ? 'Кликни чтобы открыть · Скролл для приближения · Drag для перемещения'
                      : 'Click to open · Scroll to zoom · Drag to pan'}
                  </p>
                </>
              )}
            </motion.div>
          )
        }

        return null
      })}

      <AnimatePresence>
        {lightboxSrc && <Lightbox src={lightboxSrc} onClose={closeLightbox} />}
      </AnimatePresence>
    </div>
  )
}

export function CaseStudyPage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const { lang } = useLang()
  const list = projects[lang]
  const project = list.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Кейс не найден</p>
      </div>
    )
  }

  const others = list.filter((p) => p.slug !== slug)
  const tasksLabel = lang === 'ru' ? 'Что сделал' : 'What I did'
  const resultLabel = lang === 'ru' ? 'Результат' : 'Result'
  const backLabel = lang === 'ru' ? 'Назад' : 'Back'
  const otherLabel = lang === 'ru' ? 'Другие кейсы' : 'Other cases'

  return (
    <>
      <Navbar />
      <StickyBar />
      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24">

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            ← {backLabel}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs text-muted font-mono">{project.company}</span>
            <span className="text-xs text-muted opacity-40">·</span>
            <span className="text-xs text-muted font-mono">{project.year}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-muted leading-relaxed max-w-2xl mb-8">
            {project.subtitle}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-border text-muted">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full mb-16 relative"
          style={{ height: 'clamp(260px, 40vw, 480px)', overflow: 'hidden' }}
        >
          {project.hasVisual ? (
            slug === 'commercial-proposal' ? <CommercialProposalScene size="720%" /> : <UnificationScene />
          ) : project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image} alt={project.title} className={`w-full h-full ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover object-left-top'}`} />
          ) : (
            <div className="w-full h-full bg-foreground/5 flex items-center justify-center">
              <span className="text-4xl font-mono text-muted/20">{project.number}</span>
            </div>
          )}
        </motion.div>

        {/* Rich content (if available) or simple two-col layout */}
        {project.richContent ? (
          <RichContent sections={project.richContent} lang={lang} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-24"
          >
            <div>
              <p className="text-xs text-muted tracking-widest uppercase mb-4">{tasksLabel}</p>
              <p className="text-lg leading-relaxed">{project.tasks}</p>
            </div>
            <div>
              <p className="text-xs text-muted tracking-widest uppercase mb-4">{resultLabel}</p>
              <p className="text-lg leading-relaxed">
                <ResultText result={project.result} resultParts={project.resultParts} />
              </p>
            </div>
          </motion.div>
        )}

        {/* Other cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="border-t border-border pt-16">
            <p className="text-xs text-muted tracking-widest uppercase mb-8">{otherLabel}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/work/${other.slug}`}
                  className="group p-6 rounded-2xl border border-border hover:border-foreground/30 hover:bg-foreground/[0.02] transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-muted font-mono">{other.company}</span>
                    <span className="text-xs text-muted opacity-40">·</span>
                    <span className="text-xs text-muted font-mono">{other.year}</span>
                  </div>
                  <h3 className="font-medium mb-2 group-hover:opacity-70 transition-opacity">
                    {other.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-2">{other.subtitle}</p>
                  <span className="inline-block mt-4 text-sm text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                    → {lang === 'ru' ? 'Смотреть' : 'View'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

      </main>
    </>
  )
}
