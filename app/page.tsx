'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { FeedbackButton } from './components/FeedbackButton'
import { FeedbackForm } from './components/FeedbackForm'
import { SuccessMessage } from './components/SuccessMessage'

type FormState = 'idle' | 'loading' | 'success'

export default function FeedbackComponentCSS() {
  const [open, setOpen] = useState(false)
  const [formState, setFormState] = useState<FormState>('idle')
  const [feedback, setFeedback] = useState('')

  function submit() {
    setFormState('loading')
    setTimeout(() => {
      setFormState('success')
    }, 1500)

    setTimeout(() => {
      setOpen(false)
      setFeedback('')
    }, 3300)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === 'Enter' &&
        open &&
        formState === 'idle'
      ) {
        submit()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, formState])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 dark:bg-neutral-900">
      <div className="h-[500px] flex justify-center items-center w-full">
        <FeedbackButton
          onClick={() => {
            setOpen(true)
            setFormState('idle')
            setFeedback('')
          }}
        />
        <AnimatePresence>
          {open ? (
            <motion.div
              layoutId="wrapper"
              className="absolute h-[192px] w-[364px] overflow-hidden rounded-lg bg-gray-100 dark:bg-neutral-700 p-1 outline-none shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_2px_rgba(0,0,0,0.04)"
              style={{ borderRadius: 12 }}
            >
              <motion.span
                aria-hidden
                className="absolute text-sm left-4 top-4 text-neutral-400 data-[feedback=true]:opacity-0!"
                layoutId="title"
                data-success={formState === 'success' ? 'true' : 'false'}
                data-feedback={feedback ? 'true' : 'false'}
              >
                Feedback
              </motion.span>
              <AnimatePresence mode="popLayout">
                {formState === 'success' ? (
                  <SuccessMessage />
                ) : (
                  <FeedbackForm
                    formState={formState}
                    onSubmit={(e) => {
                      e.preventDefault()
                      submit()
                    }}
                    feedback={feedback}
                    onFeedbackChange={(value) => setFeedback(value)}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  )
}
