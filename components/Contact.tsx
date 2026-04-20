'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from './LanguageContext'

const EMAIL = 'evgenii.tsvet@gmail.com'

function EmailRow() {
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="inline-flex items-center gap-2 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>

      <a
        href={`mailto:${EMAIL}`}
        className="text-sm sm:text-lg font-medium hover:opacity-60 transition-opacity break-all"
      >
        {EMAIL}
      </a>

      <div className="relative">
        <button
          onClick={handleCopy}
          className={`transition-all duration-200 ${hovered ? 'opacity-100' : 'opacity-0'} hover:opacity-60`}
          aria-label="Copy email"
        >
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>

        <motion.div
          className="absolute bottom-full left-1/2 mb-2 px-2.5 py-1.5 rounded-lg bg-foreground text-background text-xs whitespace-nowrap pointer-events-none"
          style={{ x: '-50%' }}
          initial={false}
          animate={{ opacity: copied ? 1 : 0, y: copied ? 0 : 4 }}
          transition={{ duration: 0.2 }}
        >
          Скопировано
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
        </motion.div>
      </div>
    </div>
  )
}

export function Contact() {
  const { lang } = useLang()

  return (
    <section id="contact" className="px-6 md:px-12 py-20 md:py-32 max-w-6xl mx-auto">
      <div className="border-t border-border pt-24">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs text-muted tracking-widest uppercase block mb-10">
            {lang === 'ru' ? 'Контакты' : 'Contact'}
          </span>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-8">
            {lang === 'ru' ? (
              <>
                <span className="text-muted">Давайте</span>{' '}
                <span>работать вместе.</span>
              </>
            ) : (
              <>
                <span className="text-muted">Let's</span>{' '}
                <span>work together.</span>
              </>
            )}
          </h2>

          <EmailRow />
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-6 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="https://t.me/evgenii_tsvetkov"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors"
          >
            Telegram
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/evgenii-tsvetkov/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors"
          >
            LinkedIn
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </motion.div>

        <motion.p
          className="mt-16 text-xs text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          © 2026 Evgenii Tsvetkov. Designed and built in Claude Code.
        </motion.p>
      </div>
    </section>
  )
}
