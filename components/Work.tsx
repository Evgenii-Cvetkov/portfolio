'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from './LanguageContext'
import { t } from '@/lib/translations'
import { projects, type Project, type ResultPart } from '@/lib/projects'
import { UnificationScene } from './UnificationScene'
import { CommercialProposalScene } from './CommercialProposalScene'

// Map of slug → custom visual component
const visuals: Record<string, React.ReactNode> = {
  unification: <UnificationScene />,
  'commercial-proposal': <CommercialProposalScene size="720%" />,
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

function ProjectCard({
  project,
  index,
  labels,
}: {
  project: Project
  index: number
  labels: { tasksLabel: string; resultLabel: string }
}) {
  const visual = visuals[project.slug]

  return (
    <motion.article
      className="border border-border rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      <Link href={`/work/${project.slug}`} className="grid md:grid-cols-2 group">
        {/* Left — content */}
        <div className="p-8 md:p-10 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted font-mono">{project.company}</span>
            <span className="text-xs text-muted opacity-40">·</span>
            <span className="text-xs text-muted font-mono">{project.year}</span>
          </div>

          <div>
            <h3 className="text-2xl font-semibold tracking-tight mb-2 group-hover:opacity-70 transition-opacity">
              {project.title}
            </h3>
            <p className="text-base text-muted leading-relaxed">{project.subtitle}</p>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <p className="text-xs text-muted tracking-widest uppercase mb-1.5">{labels.tasksLabel}</p>
              <p className="text-sm text-foreground leading-relaxed">{project.tasks}</p>
            </div>
            <div>
              <p className="text-xs text-muted tracking-widest uppercase mb-1.5">{labels.resultLabel}</p>
              <p className="text-sm text-foreground leading-relaxed">
                <ResultText result={project.result} resultParts={project.resultParts} />
              </p>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-border flex flex-wrap gap-2">
            {(project.tags ?? [project.role]).map((tag) => (
              <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-border text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right — image / visual */}
        <div className="relative bg-foreground/5 min-h-[200px] md:min-h-0 order-first md:order-last">
          {visual ? (
            <div className="absolute inset-0">{visual}</div>
          ) : project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs text-muted font-mono opacity-30">{project.number}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  )
}

export function Work() {
  const { lang } = useLang()
  const list = projects[lang]

  return (
    <section id="work" className="px-6 md:px-12 py-20 md:py-32 max-w-6xl mx-auto">
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs text-muted tracking-widest uppercase">{t[lang].work.label}</span>
      </motion.div>

      <div className="space-y-6">
        {list.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} labels={t[lang].work} />
        ))}
      </div>
    </section>
  )
}
