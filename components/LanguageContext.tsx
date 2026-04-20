'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Lang = 'ru' | 'en'

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ru',
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null
    if (stored === 'ru' || stored === 'en') setLang(stored)
  }, [])

  const handleSetLang = (l: Lang) => {
    setLang(l)
    localStorage.setItem('lang', l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
