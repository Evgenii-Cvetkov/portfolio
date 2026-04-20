'use client'

import { motion } from 'framer-motion'

export function CommercialProposalScene({ size = '360%' }: { size?: string }) {
  return (
    <div className="relative w-full h-full bg-[#F3F2F3] rounded-2xl overflow-hidden flex items-center justify-center">
      <motion.div
        className="flex items-center justify-center"
        style={{ width: size }}
        whileHover={{ scale: 1.07 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/work/commercial-proposal/cover.png"
          alt=""
          className="w-full h-auto object-contain select-none pointer-events-none"
          style={{ mixBlendMode: 'multiply' }}
          draggable={false}
        />
      </motion.div>
    </div>
  )
}
