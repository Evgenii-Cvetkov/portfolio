'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from './LanguageContext'
import { t } from '@/lib/translations'
import { projects, type Project } from '@/lib/projects'
import { nb } from '@/lib/nb'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      className="border border-border rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      <Link href={`/work/${project.slug}`} className="flex flex-col h-full group">
        {/* Cover */}
        <div className="relative aspect-[4/3] bg-foreground/5 overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={`transition-transform duration-500 group-hover:scale-[1.03] ${
                project.imageFit === 'contain' ? 'object-contain p-4' : 'object-cover'
              }`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl text-muted font-mono opacity-20">{project.number}</span>
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="p-8 md:p-10 flex flex-col gap-5 flex-1">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted font-mono">{project.company}</span>
            <span className="text-xs text-muted opacity-40">·</span>
            <span className="text-xs text-muted font-mono">{project.year}</span>
          </div>

          <div>
            <h3 className="text-2xl font-semibold tracking-tight mb-2 group-hover:opacity-70 transition-opacity">
              {project.title}
            </h3>
            <p className="text-base text-muted leading-relaxed">{nb(project.subtitle)}</p>
          </div>

          <div className="mt-auto pt-4 border-t border-border flex flex-wrap gap-2">
            {(project.tags ?? [project.role]).map((tag) => (
              <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-border text-muted">
                {tag}
              </span>
            ))}
          </div>
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

      <div className="grid md:grid-cols-2 gap-6">
        {list.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
