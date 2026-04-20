'use client'

import { motion } from 'framer-motion'
import { useRole, Role } from './RoleContext'
import { useLang } from './LanguageContext'

const roles = {
  ru: [
    {
      id: 'hr' as Role,
      title: 'HR',
      description: 'Карьерный путь, опыт работы в командах и личные качества',
    },
    {
      id: 'design-lead' as Role,
      title: 'Design Lead',
      description: 'Дизайн-процесс, системное мышление и качество работ',
    },
  ],
  en: [
    {
      id: 'hr' as Role,
      title: 'HR',
      description: 'Career path, teamwork skills, and professional background',
    },
    {
      id: 'design-lead' as Role,
      title: 'Design Lead',
      description: 'Design process, systems thinking, and craft quality',
    },
  ],
}

export function RoleSelection() {
  const { setRole } = useRole()
  const { lang } = useLang()
  const list = roles[lang]

  const heading = lang === 'ru' ? 'Кто вы?' : 'Who are you?'
  const subheading =
    lang === 'ru'
      ? 'Выберите роль — покажу самое важное для вас.'
      : "Choose your role — I'll highlight what matters most to you."

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="max-w-4xl w-full">
        <motion.p
          className="text-xs text-muted tracking-widest uppercase mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {subheading}
        </motion.p>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-8 md:mb-12"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          {heading}
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-4">
          {list.map((role, i) => (
            <motion.button
              key={role.id}
              onClick={() => setRole(role.id)}
              className="group text-left p-6 sm:p-8 border border-border rounded-2xl hover:border-foreground/40 hover:bg-foreground/[0.025] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 + i * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <span className="text-xl font-semibold block mb-3">{role.title}</span>
              <span className="text-sm text-muted leading-relaxed block mb-6">
                {role.description}
              </span>
              <span className="text-sm text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {lang === 'ru' ? 'Выбрать →' : 'Select →'}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
