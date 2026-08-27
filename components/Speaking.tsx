'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLang } from './LanguageContext'
import { nb } from '@/lib/nb'

interface Talk {
  event: string
  date: string
  topic: string
  desc: string
  tags: string[]
}

const talks: { ru: Talk[]; en: Talk[] } = {
  ru: [
    {
      event: 'Дизайн-семинар X5 Tech',
      date: '2026',
      topic: 'ИИ в работе дизайнера',
      desc: 'Делился опытом, как внедрил Claude, Figma Make, ChatGPT в повседневный рабочий процесс. Показал на реальных кейсах, где ИИ ускоряет работу, а где по-прежнему нужен человек.',
      tags: ['AI tools', 'workflow', 'productivity'],
    },
    {
      event: 'Вебинар для дизайнеров и продактов X5 Tech',
      date: '2026',
      topic: 'Пайплайн из ИИ-агентов: как внедрить в команду',
      desc: 'Провёл два вебинара, где разбирал устройство пайплайна — от базы знаний продукта до сборки макетов — и показывал, как подключить и настроить агентов под конкретную команду. Участники на практике разворачивали рабочую среду на своём продукте и разбирали, как доводить качество результата до уровня ручной работы.',
      tags: ['AI agents', 'workflow', 'design ops'],
    },
  ],
  en: [
    {
      event: 'X5 Tech Design Seminar',
      date: '2026',
      topic: "AI in a Designer's Workflow",
      desc: "Shared my experience integrating Claude, Figma Make, and ChatGPT into daily design work. Illustrated with real cases where AI accelerates delivery and where human judgment remains essential.",
      tags: ['AI tools', 'workflow', 'productivity'],
    },
    {
      event: 'X5 Tech Webinar for Designers and Product Managers',
      date: '2026',
      topic: 'AI Agent Pipeline: Rolling It Out in a Team',
      desc: 'Ran two webinars breaking down how the pipeline works — from the product knowledge base through to assembling mockups — and showing how to connect and configure the agents for a specific team. Participants deployed a working environment on their own product hands-on and worked through how to bring output quality up to the level of manual work.',
      tags: ['AI agents', 'workflow', 'design ops'],
    },
  ],
}

const labels = {
  ru: { section: 'Выступления', mic: '🎙' },
  en: { section: 'Speaking', mic: '🎙' },
}

function TalkCard({ talk, index }: { talk: Talk; index: number }) {
  return (
    <motion.div
      className="border border-border rounded-2xl p-8 md:p-10 flex flex-col gap-5"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted font-mono">{talk.event}</span>
        <span className="text-xs text-muted opacity-40">·</span>
        <span className="text-xs text-muted font-mono">{talk.date}</span>
      </div>

      <div>
        <h3 className="text-xl font-semibold tracking-tight mb-2">{talk.topic}</h3>
        <p className="text-base text-muted leading-relaxed">{nb(talk.desc)}</p>
      </div>

      <div className="mt-auto pt-4 border-t border-border flex flex-wrap gap-2">
        {talk.tags.map((tag) => (
          <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-border text-muted">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export function Speaking() {
  const { lang } = useLang()
  const list = talks[lang]
  const l = labels[lang]

  return (
    <section className="px-6 md:px-12 py-20 md:py-32 max-w-6xl mx-auto">
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs text-muted tracking-widest uppercase">{l.section}</span>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {list.map((talk, i) => (
          <TalkCard key={i} talk={talk} index={i} />
        ))}
      </div>
    </section>
  )
}
