import { motion } from 'framer-motion'

interface FeedbackButtonProps {
  onClick: () => void
}

export function FeedbackButton({ onClick }: FeedbackButtonProps) {
  return (
    <motion.button
      layoutId="wrapper"
      onClick={onClick}
      key="button"
      className="relative flex h-9 items-center rounded-lg bg-white dark:bg-neutral-800 py-3 px-2 font-medium shadow-sm outline outline-gray-200/70 dark:outline-neutral-600/60 bg-gradient-to-b from-white/1 to-white/5 dark:hover:bg-neutral-800/80 hover:bg-gray-50 transition-color"
      style={{ borderRadius: 8 }}
    >
      <motion.span layoutId="title" className="block text-sm">
        Feedback
      </motion.span>
    </motion.button>
  )
}
