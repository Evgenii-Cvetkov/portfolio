'use client'

import { useRole } from './RoleContext'
import { Work } from './Work'
import { About } from './About'
import { Contact } from './Contact'
import { Experience } from './Experience'
import { Speaking } from './Speaking'

export function PageContent() {
  const { role } = useRole()

  // HR: experience first, then about, work, contact
  if (role === 'hr') {
    return (
      <>
        <Experience />
        <About />
        <Work />
        <Speaking />
        <Contact />
      </>
    )
  }

  // Design Lead: Work → Speaking → Experience → About → Contact
  return (
    <>
      <Work />
      <Speaking />
      <Experience />
      <About />
      <Contact />
    </>
  )
}
