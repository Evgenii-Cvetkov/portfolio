'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from './LanguageContext'

function nb(text: string): string {
  // Non-breaking space after short Russian prepositions and conjunctions
  return text.replace(/(\s|^)(в|и|а|к|с|о|у|я|но|не|ни|из|до|от|на|по|за|об|со|из-за|из-под|над|под|при|про|без|для|или|это|уже|ещё|чем|как|что|бы|же|ли|то)\s/g, '$1$2\u00A0')
}

function HighlightedText({ text }: { text: string }) {
  const processed = nb(text)
  const regex = /(\d+(?:[\s\u00A0]\d+)*\+?)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match

  while ((match = regex.exec(processed)) !== null) {
    if (match.index > lastIndex) {
      parts.push(processed.slice(lastIndex, match.index))
    }
    parts.push(
      <span key={match.index} className="text-green-500 font-medium">
        {match[0]}
      </span>
    )
    lastIndex = regex.lastIndex
  }

  if (lastIndex < processed.length) {
    parts.push(processed.slice(lastIndex))
  }

  return <>{parts}</>
}

interface Section {
  heading: string
  items: string[]
}

interface Job {
  period: string
  title: string
  company: string
  current: boolean
  description: string
  sections: Section[]
}

const experiences: { ru: Job[]; en: Job[] } = {
  ru: [
    {
      period: 'Окт 2024 — наст. время',
      title: 'product designer',
      company: 'x5 group',
      current: true,
      description:
        'X5 Retail Group — крупнейшая продовольственная розничная компания России, управляющая сетями Пятёрочка, Перекрёсток и Чижик. Тысячи магазинов по всей стране, быстро растущая цифровая экосистема, миллионы покупателей ежедневно. Компания известна масштабной цепочкой поставок, сложными B2B-партнёрствами и фокусом на инновации и технологии в ритейле.',
      sections: [
        {
          heading: 'Ключевые задачи и достижения',
          items: [
            'Запуск инструмента распознавания этикеток на основе OCR — время создания карточки товара сократилось с 1 часа до 10 минут',
            'Участие в унификации визуального языка и UX-паттернов в 12 продуктах для поставщиков, вклад в консистентную и масштабируемую дизайн-систему',
            'Участие в сокращении полного цикла закупок с 1 месяца до 4 дней, повысив эффективность для поставщиков и внутренних команд',
            'Разработка дашбордов для мониторинга ключевых бизнес-метрик — отслеживание цепочки поставок в режиме реального времени',
            'Проектирование модуля управления и оспаривания штрафов: упрощение процессов и повышение прозрачности для поставщиков',
          ],
        },
      ],
    },
    {
      period: 'Июнь 2023 — Окт 2024',
      title: 'product designer',
      company: 'газпром-нефть',
      current: false,
      description: 'Газпром-нефть — одна из крупнейших нефтяных компаний России. Занимается разведкой, добычей, переработкой и реализацией нефти и нефтепродуктов. Компания инвестирует в цифровые технологии и инновационные решения для оптимизации операций и бизнес-процессов.',
      sections: [
        {
          heading: 'Ключевой проект: ОПОРА',
          items: [
            'Система импортозамещения для планирования, управления и отслеживания производства и логистики нефтепродуктов',
            'Проектирование гибкого B2B-инструмента для аналитики и мониторинга планов транспортировки нефтепродуктов — используется 7 подразделениями с разными бизнес-процессами',
            'Сокращение времени подготовки отчётов с нескольких часов до 1 минуты за счёт оптимизации визуализации данных',
            'Разработка и презентация 5 концепций визуализации на основе глубинных интервью и обратной связи от стейкхолдеров',
            'Создание геокартографического интерфейса с интеграцией геосервисов — точное отслеживание активов по всей цепочке поставок от добычи до отгрузки',
            'Декомпозиция задач, унификация KPI в единый воркфлоу и итеративное уточнение прототипов для большой многодепартаментной аудитории',
            'Написание гайдлайнов по принципам дизайна карт для обеспечения консистентности платформы',
          ],
        },
        {
          heading: 'Результат',
          items: [
            'Реализован интуитивный масштабируемый инструмент визуализации с цветовой индикацией отклонений от бизнес-планов — ускорено выявление проблем и принятие решений',
            'MVP выпущен в срок благодаря agile-итерациям и кросс-функциональной координации',
          ],
        },
      ],
    },
    {
      period: 'Фев 2022 — Март 2023',
      title: 'ux/ui designer',
      company: 'credits · part-time',
      current: false,
      description: 'Credits — криптовалютный кошелёк и платёжная платформа на базе блокчейна. Быстрые и безопасные транзакции с дружелюбным интерфейсом. Фокус на упрощении доступа к блокчейн-технологиям как для новичков, так и для опытных пользователей.',
      sections: [
        {
          heading: 'Ключевые задачи и достижения',
          items: [
            'Создание сайта компании с нуля — информационная архитектура, вайрфреймы и финальный UI, запуск совместно с маркетингом: быстрый, SEO-оптимизированный сайт стал основным каналом привлечения пользователей',
            'Проектирование веб- и мобильных дашбордов кошелька: отслеживание курсов криптовалют, отображение баланса и управление личными финансами с единым опытом на всех устройствах',
            'Разработка флоу обмена и переводов — покупка, продажа и своп активов в несколько касаний с чётким отображением комиссий и курсов',
            'Создание адаптивной дизайн-системы (типографика, цвет, компоненты) для ускорения выпуска новых фич и визуальной консистентности',
            'Ежедневное взаимодействие с блокчейн-разработчиками для согласования UI-логики со смарт-контрактами и обеспечения безопасности данных',
            'Проведение пользовательских интервью и быстрых юзабилити-тестов, итерации по онбордингу и экранам резервного копирования seed-фразы',
          ],
        },
        {
          heading: 'Результат',
          items: [
            'Полноценный мультиплатформенный интерфейс кошелька и маркетинговый сайт, которые помогли Credits перейти от концепции к публичному MVP и получить позитивную обратную связь за простоту использования — особенно важную для новичков в крипте',
          ],
        },
      ],
    },
  ],
  en: [
    {
      period: 'Oct 2024 — present',
      title: 'product designer',
      company: 'x5 group',
      current: true,
      description:
        'X5 Retail Group is the largest food retail company in Russia, operating leading grocery chains such as Pyaterochka, Perekrestok, and Chizhik. With thousands of stores across the country and a rapidly growing digital ecosystem, X5 serves millions of customers daily. The company is known for its large-scale supply chain, complex B2B partnerships, and strong focus on innovation and technology in retail.',
      sections: [
        {
          heading: 'Key responsibilities & achievements',
          items: [
            'Designing and continuously evolving a B2B platform used by 70,000+ companies and 200,000+ users, supporting the full supplier journey — from submitting commercial proposals to placing products on store shelves',
            'Contributed to reducing the full procurement cycle from 1 month to just 4 days, improving efficiency for both suppliers and internal teams',
            'Worked on dashboards for tracking key business metrics, helping stakeholders monitor supply chain performance in real time',
            'Led the design of a module for managing and disputing fines, simplifying workflows and improving transparency for suppliers',
            'Launched an OCR-powered label recognition tool that reduced product card creation time from 1 hour to 10 minutes',
            'Took part in the unification of visual language and UX patterns across 12 supplier-facing products, contributing to a consistent and scalable design system',
          ],
        },
      ],
    },
    {
      period: 'Jun 2023 — Oct 2024',
      title: 'product designer',
      company: 'gazprom-neft',
      current: false,
      description: 'Gazprom Neft is one of Russia\'s largest oil companies. The company is involved in the exploration, production, refining, and sale of oil and petroleum products, and is recognized for investing in advanced digital technologies and innovative solutions to optimize operations and business processes.',
      sections: [
        {
          heading: 'Key project: OPORA',
          items: [
            'An import substitution system for planning, managing, and tracking petroleum product production and logistics',
            'Design and development of a flexible B2B tool for analytics and monitoring transportation plans, used by 7 departments with distinct business processes',
            'Reduced reporting preparation time from hours to 1 minute by streamlining data visualization and workflows',
            'Created and presented 5 visualization concepts based on deep user interviews and stakeholder feedback, facilitating alignment across multiple departments',
            'Developed a geo-mapping interface with integrated geoservices, enabling accurate tracking of assets along the entire supply chain — from extraction to shipment',
            'Addressed complex challenges of a large, multi-departmental user base by decomposing tasks, unifying KPIs into a single workflow, and iteratively refining prototypes',
            'Authored guidelines on map design principles to ensure consistency and usability across the platform',
          ],
        },
        {
          heading: 'Impact',
          items: [
            'Delivered an intuitive, scalable visualization tool that highlights deviations from business plans using color-coded map layers, enabling quick issue detection and decision-making',
            'Successfully met tight MVP deadlines through agile iteration and cross-departmental coordination',
          ],
        },
      ],
    },
    {
      period: 'Feb 2022 — Mar 2023',
      title: 'ux/ui designer',
      company: 'credits · part-time',
      current: false,
      description: 'Credits is a cryptocurrency wallet and blockchain-based payment platform offering fast and secure transactions with a user-friendly interface. It focused on simplifying access to blockchain technologies for both newcomers and experienced users.',
      sections: [
        {
          heading: 'Key responsibilities & achievements',
          items: [
            'Built the company website from scratch — defined information architecture, created wireframes and high-fidelity UI, and collaborated with marketing to launch a fast, SEO-friendly site that became the main acquisition funnel for wallet sign-ups',
            'Designed web & mobile wallet dashboards for tracking crypto prices, viewing balances, and controlling personal finances, ensuring a seamless experience across devices',
            'Created exchange and transfer flows that let users buy, sell, and swap assets in just a few taps while clearly exposing fees and rates',
            'Established a responsive design system (typography, color, components) so new features ship faster and remain visually consistent',
            'Partnered daily with blockchain developers to match UI logic with smart-contract mechanics and guarantee data security in every interaction',
            'Conducted user interviews and quick-cycle usability tests, iterating on onboarding and seed-phrase backup screens to minimise drop-offs and support tickets',
          ],
        },
        {
          heading: 'Impact',
          items: [
            'A polished multi-platform wallet interface and marketing website that helped Credits move from concept to public MVP and earned positive feedback for clarity and ease of use — especially important for crypto newcomers',
          ],
        },
      ],
    },
  ],
}

function JobContent({ job }: { job: Job }) {
  return (
    <div className="space-y-6">
      {job.sections.map((section) => (
        <div key={section.heading}>
          <p className="font-semibold text-sm mb-2">{nb(section.heading)}</p>
          <ul className="space-y-1">
            {section.items.map((item, i) => (
              <li key={i} className="text-base text-muted leading-relaxed">
                • <HighlightedText text={item} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function JobRow({ job }: { job: Job }) {
  const [open, setOpen] = useState(job.current)

  return (
    <div className="border-t border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative w-full py-8 text-left group"
      >
        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] sm:gap-10 md:grid-cols-[220px_1fr] md:gap-16 pr-8">
          <div className="mb-2 sm:mb-0">
            <p className={`text-sm font-medium mb-1 ${job.current ? 'text-foreground' : 'text-muted'}`}>{job.period}</p>
            <p className="text-sm">{job.title}</p>
            <p className="text-sm">{job.company}</p>
          </div>
          <p className="text-base text-muted">
            {nb(job.description)}
          </p>
        </div>
        <span
          className="absolute top-8 right-0 text-muted text-lg transition-transform duration-300 group-hover:opacity-60"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] sm:gap-10 md:grid-cols-[220px_1fr] md:gap-16 pb-8">
              <div className="hidden sm:block" />
              <JobContent job={job} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Experience() {
  const { lang } = useLang()
  const jobs = experiences[lang]
  const label = lang === 'ru' ? 'Опыт работы' : 'Experience'

  return (
    <section className="px-6 md:px-12 py-20 md:py-32 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <span className="text-xs text-muted tracking-widest uppercase">{label}</span>
      </motion.div>

      <div>
        {jobs.map((job) => (
          <JobRow key={job.company} job={job} />
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  )
}
