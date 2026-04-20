'use client'

import { AnimatePresence } from 'framer-motion'
import { useRole } from './RoleContext'
import { RoleSelection } from './RoleSelection'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { PageContent } from './PageContent'
import { StickyBar } from './StickyBar'

export function PageWrapper() {
  const { role } = useRole()

  return (
    <>
      <AnimatePresence>
        {role === null && <RoleSelection key="role-selection" />}
      </AnimatePresence>
      <Navbar />
      <main>
        <Hero />
        <PageContent />
      </main>
      <StickyBar />
    </>
  )
}
