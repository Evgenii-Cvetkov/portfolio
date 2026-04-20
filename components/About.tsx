'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from './LanguageContext'
import { useRole } from './RoleContext'
import { t } from '@/lib/translations'

const hardSkills = ['Figma', 'Claude Code', 'ChatGPT', 'Cursor', 'AI Prototyping', 'Figma Make', 'Kaiten']

export function About() {
  const { lang } = useLang()
  const { role } = useRole()
  const a = t[lang].about
  const roleContent = role ? a.byRole[role] : null
  const bio1 = roleContent?.bio1 ?? a.bio1
  const bio2 = roleContent?.bio2 ?? a.bio2
  const bio3 = (roleContent as { bio3?: string } | null)?.bio3 ?? a.bio3

  return (
    <section id="about" className="px-6 md:px-12 py-20 md:py-32 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <span className="text-xs text-muted tracking-widest uppercase">{a.label}</span>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* Left col — photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm">
            <Image
              src="/photo.jpg"
              alt="Evgenii Tsvetkov"
              fill
              className="object-cover object-top grayscale"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </motion.div>

        {/* Right col */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-muted leading-relaxed">{bio1}</p>
          <p className="text-muted leading-relaxed">{bio2}</p>
          {bio3 && <p className="text-muted leading-relaxed">{bio3}</p>}

          <div className="pt-4 space-y-6">
            <div>
              <p className="text-xs text-muted tracking-widest uppercase mb-4">{a.hardSkillsLabel}</p>
              <div className="flex flex-wrap gap-2">
                {hardSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-full border border-border text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted tracking-widest uppercase mb-4">{a.softSkillsLabel}</p>
              <div className="flex flex-wrap gap-2">
                {a.softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-full border border-border text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
