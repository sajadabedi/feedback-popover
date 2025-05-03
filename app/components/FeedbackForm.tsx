import { AnimatePresence, motion } from 'framer-motion'
import Spinner from './Spinner'

interface FeedbackFormProps {
  formState: 'idle' | 'loading' | 'success'
  onSubmit: (e: React.FormEvent) => void
  feedback: string
  onFeedbackChange: (value: string) => void
}

export function FeedbackForm({
  formState,
  onSubmit,
  feedback,
  onFeedbackChange,
}: FeedbackFormProps) {
  return (
    <motion.form
      key="form"
      exit={{ y: 8, opacity: 0, filter: 'blur(4px)' }}
      transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
      onSubmit={onSubmit}
      className="rounded-[8px] outline outline-gray-200/30 dark:outline-neutral-500/30 shadow-sm bg-white  dark:bg-neutral-800"
    >
      <textarea
        autoFocus
        placeholder="Feedback"
        value={feedback}
        onChange={(e) => onFeedbackChange(e.target.value)}
        className="h-32 w-full p-2.5 resize-none rounded-t-md rounded-b-md outline-none placeholder:opacity-0"
      />
      <div className="relative flex h-12 items-center px-2">
        <button
          type="submit"
          className="ml-auto px-2 flex items-center justify-center rounded-md font-medium text-sm h-8 overflow-hidden bg-cyan-300 relative shadow-[shadow:inset_0_1px_--theme(--color-white/15%)] outline outline-cyan-400/80 dark:outline-0 hover:bg-cyan-300/90 transition-colors"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              className="flex w-full items-center justify-center text-cyan-950"
              transition={{
                type: 'spring',
                duration: 0.3,
                bounce: 0,
              }}
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              key={formState}
            >
              {formState === 'loading' ? (
                <Spinner className="size-4 w-25" />
              ) : (
                <span>Send feedback</span>
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </motion.form>
  )
}
