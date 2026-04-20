'use client'

import { useRole } from './RoleContext'
import { Work } from './Work'
import { About } from './About'
import { Contact } from './Contact'
import { Experience } from './Experience'

export function PageContent() {
  const { role } = useRole()

  // HR: experience first, then about, work, contact
  if (role === 'hr') {
    return (
      <>
        <Experience />
        <About />
        <Work />
        <Contact />
      </>
    )
  }

  // Design Lead: Work → Experience → About → Contact
  return (
    <>
      <Work />
      <Experience />
      <About />
      <Contact />
    </>
  )
}
