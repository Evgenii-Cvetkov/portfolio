'use client'

import { motion } from 'framer-motion'

export function CommercialProposalScene() {
  return (
    <div className="relative w-full h-full bg-[#F3F2F3] rounded-2xl overflow-hidden flex items-center justify-center">
      <motion.div
        className="flex items-center justify-center w-full h-full p-10 md:p-12"
        whileHover={{ scale: 1.07 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/work/commercial-proposal/object.png"
          alt=""
          className="max-w-full max-h-full w-auto h-auto object-contain select-none pointer-events-none"
          draggable={false}
        />
      </motion.div>
    </div>
  )
}
