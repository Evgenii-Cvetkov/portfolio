'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion'

export function UnificationScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 30 })

  const floatY = useMotionValue(0)
  const t = useRef(0)

  useAnimationFrame((time) => {
    t.current = time
    const float = Math.sin(time / 1000 * (Math.PI * 2) / 4) * 14
    floatY.set(float)
  })

  const combinedY = useMotionValue(0)
  useAnimationFrame(() => {
    combinedY.set(springY.get() + floatY.get())
  })

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-[#F3F2F3] rounded-2xl"
      onMouseMove={(e) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const maxDist = rect.width / 2
        const strength = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / maxDist) * 60
        mouseX.set(-(dx / maxDist) * strength)
        mouseY.set(-(dy / maxDist) * strength)
      }}
      onMouseLeave={() => {
        mouseX.set(0)
        mouseY.set(0)
      }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ x: springX, y: combinedY, overflow: 'visible' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/work/unification/x5-object.png"
          alt=""
          className="w-[108%] h-auto object-contain select-none pointer-events-none"
          style={{ mixBlendMode: 'lighten' }}
          draggable={false}
        />
      </motion.div>
    </div>
  )
}
