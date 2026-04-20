'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from './LanguageContext'

export function StickyBar() {
  const [visible, setVisible] = useState(false)
  const { lang } = useLang()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
            <a
              href={lang === 'ru' ? '/cv-ru.pdf' : '/cv-en.pdf'}
              download
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-foreground/5 transition-colors"
            >
              {lang === 'ru' ? 'Скачать резюме' : 'Download CV'}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
