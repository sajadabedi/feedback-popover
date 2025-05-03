'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Spinner } from './Spinner'
import './styles.css'

export default function FeedbackComponentCSS() {
  const [open, setOpen] = useState(false)
  const [formState, setFormState] = useState('idle')
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="h-[500px] flex justify-center items-center w-full">
        <motion.button
          layoutId="wrapper"
          onClick={() => {
            setOpen(true)
            setFormState('idle')
            setFeedback('')
          }}
          key="button"
          className="relative flex h-9 items-center rounded-md bg-white py-3 px-2 font-medium shadow-sm outline outline-gray-200/70"
          style={{ borderRadius: 8 }}
        >
          <motion.span layoutId="title" className="block text-sm">
            Feedback
          </motion.span>
        </motion.button>
        <AnimatePresence>
          {open ? (
            <motion.div
              layoutId="wrapper"
              className="absolute h-[192px] w-[364px] overflow-hidden rounded-lg bg-[#f5f6f7] p-1 outline-none shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_2px_rgba(0,0,0,0.04)"
              style={{ borderRadius: 12 }}
            >
              <motion.span
                aria-hidden
                className="absolute text-sm left-4 top-[17px] placeholder"
                layoutId="title"
                data-success={formState === 'success' ? 'true' : 'false'}
                data-feedback={feedback ? 'true' : 'false'}
              >
                Feedback
              </motion.span>
              <AnimatePresence mode="popLayout">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ y: -32, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
                    className="flex h-full flex-col items-center justify-center"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-1"
                    >
                      <path
                        d="M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
                        fill="#2090FF"
                        fillOpacity="0.16"
                      />
                      <path
                        d="M12.1334 16.9667L15.0334 19.8667L19.8667 13.1M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
                        stroke="#2090FF"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h3 className="mb-1 mt-2 text-sm font-medium text-black">
                      Feedback received!
                    </h3>
                    <p className="text-sm text-gray-600">
                      Thanks for helping me improve Sonner
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    exit={{ y: 8, opacity: 0, filter: 'blur(4px)' }}
                    transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
                    onSubmit={(e) => {
                      e.preventDefault()
                      submit()
                    }}
                    className="rounded-md border border-gray-100 bg-white dark:bg-black"
                  >
                    <textarea
                      autoFocus
                      placeholder="Feedback"
                      onChange={(e) => setFeedback(e.target.value)}
                      className="h-32 resize-none rounded-t-md rounded-b-md outline-none placeholder:opacity-0"
                    />
                    <div className="relative flex h-12 items-center py-2.5">
                      <div className="absolute left-0 right-0 translate-x-[-1.5px] translate-y-[-50%]"></div>

                      <div className="bsolute top-0 right-0 translate-x-[-1.5px] translate-y-[-50%] rotate-180"></div>

                      <button
                        type="submit"
                        className="ml-auto flex items-center justify-center rounded-md font-medium text-sm h-8 overflow-hidden bg-black relative"
                      >
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                              className='flex w-full items-center justify-center text-white'
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
                              <Spinner size={14} color="rgba(255, 255, 255, 0.65)" />
                            ) : (
                              <span>Send feedback</span>
                            )}
                          </motion.span>
                        </AnimatePresence>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  )
}
