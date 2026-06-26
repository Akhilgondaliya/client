import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiActivity, FiX } from 'react-icons/fi'

export const GlobalThreatIndicator = () => {
  const advisories = [
    { text: "90%+ of cyberattacks start with phishing attempts", icon: "🎣", severity: "High" },
    { text: "Over 3 billion phishing emails are sent every day", icon: "📧", severity: "Critical" },
    { text: "A new phishing site is created every few seconds", icon: "🌐", severity: "Elevated" },
    { text: "QR phishing (Quishing) attacks are rapidly increasing", icon: "📱", severity: "High" },
    { text: "One click on a malicious link can compromise sensitive data", icon: "⚠️", severity: "Critical" },
    { text: "HTTPS does not always mean a website is safe", icon: "🔒", severity: "Elevated" },
    { text: "Cybercriminals often impersonate trusted brands and banks", icon: "🎯", severity: "High" },
    { text: "Always verify URLs before entering passwords", icon: "🔍", severity: "Elevated" }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % advisories.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [advisories.length])

  if (!isVisible) return null

  const currentAdvisory = advisories[currentIndex]

  // Dynamic severity-based coloring
  let pulseColor = 'bg-rose-500 shadow-rose-500/50'
  let labelColor = 'text-rose-500 bg-rose-500/10 border-rose-500/20'
  let statusText = 'CRITICAL'

  if (currentAdvisory.severity === 'High') {
    pulseColor = 'bg-amber-500 shadow-amber-500/50'
    labelColor = 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    statusText = 'HIGH'
  } else if (currentAdvisory.severity === 'Elevated') {
    pulseColor = 'bg-cyan-500 shadow-cyan-500/50'
    labelColor = 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20'
    statusText = 'ELEVATED'
  }

  return (
    <div className="w-full mt-16 sm:mt-20 bg-card/85 dark:bg-card/45 backdrop-blur-md border-b border-muted/20 dark:border-accent/10 px-4 py-3 flex items-center justify-between z-40 relative select-none">
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center sm:justify-between gap-3 text-xs sm:text-sm">
        
        {/* Left Side: Real-time threat index widget */}
        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <div className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pulseColor}`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${pulseColor}`}></span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-muted uppercase tracking-wider text-[10px] sm:text-xs">Global Threat Level:</span>
            <span className={`px-2 py-0.5 rounded border text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide ${labelColor}`}>
              {statusText}
            </span>
          </div>
        </div>

        {/* Center: Dynamic Advisory Text (using AnimatePresence for smooth transitions) */}
        <div className="flex-grow flex items-center justify-center max-w-xl text-center px-4 font-bold text-muted dark:text-white/80">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex items-center space-x-2"
            >
              <span>{currentAdvisory.icon}</span>
              <span className="truncate max-w-[280px] sm:max-w-[450px]">{currentAdvisory.text}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Close Button or Active Alert Text */}
        <div className="flex items-center space-x-3 text-[10px] sm:text-xs font-bold text-muted/60 dark:text-muted self-end sm:self-auto">
          <span className="hidden md:inline-flex items-center space-x-1">
            <FiActivity className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span>Real-time feeds active</span>
          </span>
          <button 
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-md hover:bg-primary/20 hover:text-accent transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <FiX className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  )
}

export default GlobalThreatIndicator
