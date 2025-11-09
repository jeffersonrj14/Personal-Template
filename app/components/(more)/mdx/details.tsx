'use client'

import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

interface DetailsProps {
  summary: string
  children: React.ReactNode
}

export function Details({ summary, children }: DetailsProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className='rounded-lg bg-[#F7F7F7] dark:bg-[#181818] backdrop-blur-2xl p-3 transition-all duration-300 '>
      <button
        onClick={() => setOpen(!open)}
        className='flex w-full items-center justify-between cursor-pointer select-none font-medium text-zinc-800 dark:text-zinc-100'
      >
        <span>{summary}</span>
        <motion.div animate={{ rotate: open ? 360 : 0 }} transition={{ duration: 0.25 }}>
          <FiChevronDown className='h-4 w-4' />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key='content'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className='overflow-hidden mt-2 text-zinc-700 dark:text-zinc-300'
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
