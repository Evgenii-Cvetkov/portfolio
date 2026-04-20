'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from './LanguageContext'

const CV_LINKS: Record<string, string> = {
  en: 'https://drive.google.com/uc?export=download&id=1350SLoMOtZOokFLEBv4GHGkIataQBBCE',
  ru: 'https://drive.google.com/uc?export=download&id=1T4kQjkIzAwDxP0QWEizmCRbD0aGn8mCR',
}

export function StickyBar() {
  const [visible, setVisible] = useState(false)
  const [cvOpen, setCvOpen] = useState(false)
  const { lang } = useLang()
  const cvRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 left-1/2 z-40"
          style={{ x: '-50%' }}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center gap-2 px-2 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg">
            <a
              href="https://t.me/evgenii_tsvetkov"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-foreground text-background text-xs sm:text-sm font-medium hover:opacity-80 transition-opacity"
            >
              {lang === 'ru' ? 'Написать в ТГ' : 'Message on TG'} →
            </a>
            <div ref={cvRef} className="relative">
              <button
                onClick={() => setCvOpen(v => !v)}
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-foreground/5 transition-colors"
              >
                {lang === 'ru' ? 'Скачать резюме' : 'Download CV'}
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
                <div className="absolute bottom-full left-0 mb-2 w-36 rounded-xl border border-border bg-background shadow-lg overflow-hidden z-50">
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
