'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from './LanguageContext'
import { useRole, Role } from './RoleContext'

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

const roleOptions: { id: Role; labelRu: string; labelEn: string }[] = [
  { id: 'hr', labelRu: 'HR', labelEn: 'HR' },
  { id: 'design-lead', labelRu: 'Design Lead', labelEn: 'Design Lead' },
]

function RoleSegmentedControl() {
  const { role, setRole } = useRole()
  const { lang } = useLang()

  if (!role) return null

  return (
    <div className="hidden sm:flex items-center gap-0.5 border border-border rounded-full px-1 py-1">
      {roleOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => setRole(option.id)}
          className={`text-xs px-3 py-1 rounded-full transition-all duration-200 ${
            role === option.id
              ? 'bg-foreground text-background font-medium'
              : 'text-muted hover:text-foreground'
          }`}
        >
          {lang === 'ru' ? option.labelRu : option.labelEn}
        </button>
      ))}
    </div>
  )
}

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const { lang, setLang } = useLang()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
        className={`fixed top-0 left-0 right-0 z-[110] px-6 md:px-12 py-5 transition-colors duration-300 ${
          scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : ''
        }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <nav className="grid grid-cols-3 items-center max-w-6xl mx-auto">
          {/* Left — name */}
          <a
            href="/"
            className="text-sm font-medium tracking-tight hover:opacity-60 transition-opacity"
          >
            {lang === 'ru' ? 'Евгений Цветков' : 'Evgenii Tsvetkov'}
          </a>

          {/* Center — role switcher */}
          <div className="flex justify-center">
            <RoleSegmentedControl />
          </div>

          {/* Right — language + theme */}
          <div className="flex items-center gap-4 justify-end">
            <div className="flex items-center gap-1 text-sm font-medium">
              <button
                onClick={() => setLang('ru')}
                className={`px-1.5 py-0.5 transition-opacity ${lang === 'ru' ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
              >
                RU
              </button>
              <span className="text-muted opacity-30">/</span>
              <button
                onClick={() => setLang('en')}
                className={`px-1.5 py-0.5 transition-opacity ${lang === 'en' ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full border border-border hover:bg-foreground/5 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted ? (theme === 'dark' ? <SunIcon /> : <MoonIcon />) : <MoonIcon />}
            </button>
          </div>
        </nav>
      </motion.header>
  )
}
