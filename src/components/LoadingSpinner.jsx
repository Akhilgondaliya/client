import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export const LoadingSpinner = ({ message = 'Analyzing website elements' }) => {
  const [dots, setDots] = useState('')
  const [subMessage, setSubMessage] = useState('Initiating security protocols')

  // Cycle dots
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'))
    }, 400)
    return () => clearInterval(dotsInterval)
  }, [])

  // Cycle sub-messages to feel like a deep scan is running
  useEffect(() => {
    const messages = [
      'Extracting hostname structure',
      'Running 13+ heuristic tests',
      'Establishing SSL handshake',
      'Verifying certificate authority',
      'Querying global WHOIS registries',
      'Compiling threat signatures',
      'Evaluating final risk scores'
    ]
    let index = 0
    const msgInterval = setInterval(() => {
      index = (index + 1) % messages.length
      setSubMessage(messages[index])
    }, 1200)

    return () => clearInterval(msgInterval)
  }, [])

  return (
    <div
      id="scanning-loader"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary/90 dark:bg-primary/95 backdrop-blur-md"
    >
      <div className="relative flex flex-col items-center space-y-6 max-w-sm px-4 text-center">
        
        {/* Cybersecurity radar scanning circle */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Outer rotating pulse ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-accent/30"
          />
          {/* Inner solid rotating ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className="absolute w-20 h-20 rounded-full border-t-2 border-b-2 border-accent"
          />
          {/* Pulse center core */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/40"
          >
            <div className="w-4 h-4 rounded-full bg-accent" />
          </motion.div>
        </div>

        {/* Text descriptions */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-wide text-[#0d1b2a] dark:text-white">
            {message}{dots}
          </h3>
          <p className="text-xs font-mono text-accent uppercase tracking-widest font-semibold">
            {subMessage}
          </p>
        </div>

        {/* Informative advice */}
        <div className="p-3 bg-card border border-muted/10 rounded-xl mt-4">
          <p className="text-[10px] text-muted leading-relaxed">
            PhishZero parses redirects, domain expiration patterns, and URL heuristics locally. Please do not close this browser window.
          </p>
        </div>

      </div>
    </div>
  )
}
export default LoadingSpinner
