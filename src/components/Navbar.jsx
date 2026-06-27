import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiShield, FiMenu, FiX } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Track window scroll to add elevation/shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close drawer on path transition
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Toggle class on body to hide marquee banner when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }
    return () => {
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isOpen])

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Scan', path: '/scan' },
    { name: 'Vulnerability Quiz', path: '/quiz' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[#0f172a]/90 backdrop-blur-md shadow-lg border-white/10'
            : 'bg-[#0f172a]/40 backdrop-blur-sm border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group focus:outline-none" id="navbar-logo">
              <FiShield className="w-6 h-6 text-[#00d4ff] transition-transform duration-300 group-hover:scale-110" />
              <span className="text-xl font-extrabold tracking-tight text-white">
                Phish<span className="text-[#00d4ff]">Zero</span>
              </span>
            </Link>
  
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex space-x-8 items-center">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative py-2 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                      isActive
                        ? 'text-[#00d4ff] font-bold'
                        : 'text-gray-300 hover:text-[#00d4ff]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00d4ff] rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              
              {/* Theme Toggle */}
              <ThemeToggle />
  
              {/* Action Call-to-Action */}
              <Link
                to="/scan"
                className="hidden lg:flex items-center space-x-1 px-4 py-2 rounded-xl bg-[#00d4ff] hover:bg-[#00d4ff]/80 text-slate-950 font-extrabold text-xs tracking-wider transition-all shadow-md shadow-[#00d4ff]/20 hover:scale-105 active:scale-95 cursor-pointer ml-2"
              >
                <span>Try Now</span>
                <span className="font-sans">→</span>
              </Link>
            </nav>
  
            {/* Mobile Right Controls */}
            <div className="flex items-center space-x-4 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-300 hover:text-[#00d4ff] focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
  
          </div>
        </div>
      </header>
  
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 sm:top-20 bg-[#0f172a]/95 backdrop-blur-xl z-40 transition-all duration-300 border-t border-white/10">
          <nav className="flex flex-col space-y-4 px-6 pt-8 pb-10">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-lg font-bold py-2 border-b border-muted/10 transition-colors duration-300 ${
                    isActive ? 'text-[#00d4ff] border-[#00d4ff]/20' : 'text-gray-300 hover:text-[#00d4ff]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            <Link
              to="/scan"
              className="flex items-center justify-center space-x-1.5 py-3.5 px-4 rounded-xl bg-[#00d4ff] hover:bg-[#00d4ff]/80 text-slate-950 font-extrabold text-sm tracking-wider transition-all text-center mt-4 shadow-lg shadow-[#00d4ff]/15"
            >
              <span>Try Now</span>
              <span className="font-sans">→</span>
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}

export default Navbar