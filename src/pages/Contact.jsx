import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { FiMail, FiGithub, FiLinkedin, FiSend, FiUser } from 'react-icons/fi'
import { FaGraduationCap } from 'react-icons/fa'

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const { name, email, message } = formData
    if (!name || !email || !message) {
      toast.error('Please fill in all form fields')
      return
    }

    setIsSubmitting(true)
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || ''
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      })

      const data = await response.json()
      if (response.ok) {
        toast.success('Thanks for reaching out! Your message has been saved successfully.')
        setFormData({ name: '', email: '', message: '' })
      } else {
        toast.error(data.error || 'Failed to send message. Please try again.')
      }
    } catch (err) {
      toast.error('Could not connect to the API server. Make sure the backend is active.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0d1b2a] dark:text-white">
           Get in Touch
        </h1>
        <p className="text-sm text-muted max-w-xl mx-auto">
          Have a question about the safety rules or a suggestion to improve the scanner? I'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Contact info */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Box 2: Internship & Project Details */}
          <section className="bg-card border border-muted/20 rounded-3xl p-6 space-y-6 shadow-md">
            <h3 className="text-lg font-bold text-[#0d1b2a] dark:text-white border-b border-muted/5 pb-3">
              Internship & Project Details
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start space-x-3 text-muted">
                <FaGraduationCap className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <span className="font-bold text-[#0d1b2a] dark:text-white block">Internship Project</span>
                  <span>IBM CSRBOX Cybersecurity Internship 2026</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-muted">
                <FiMail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <span className="font-bold text-[#0d1b2a] dark:text-white block">Email Direct</span>
                  <a href="mailto:akhilgondaliya30@gmail.com" className="hover:text-accent font-mono transition-colors">
                    akhilgondaliya30@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="border-t border-muted/5 pt-4 space-y-3">
              <span className="text-[10px] font-extrabold text-muted uppercase tracking-wider block">Find me online</span>
              <div className="flex items-center space-x-3">
                <a
                  href="https://github.com/Akhilgondaliya"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 text-xs text-muted hover:text-accent font-semibold transition-colors"
                  id="github-profile-link"
                >
                  <FiGithub className="w-4 h-4 text-accent" />
                  <span>GitHub Profile</span>
                </a>
                <span className="text-muted/30">|</span>
                <a
                  href="https://www.linkedin.com/in/akhil-gondaliya"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 text-xs text-muted hover:text-accent font-semibold transition-colors"
                  id="linkedin-profile-link"
                >
                  <FiLinkedin className="w-4 h-4 text-accent" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

          </section>
        </div>

        {/* Right Col: Contact form */}
        <div className="md:col-span-7">
          <section className="bg-card dark:bg-card border border-muted/20 rounded-3xl p-6 sm:p-8 shadow-md">
            
            <h3 className="text-lg font-bold text-[#0d1b2a] dark:text-white border-b border-muted/5 pb-3 mb-6">
              Drop a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider text-muted">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full bg-primary/30 border border-muted/30 focus:border-accent rounded-xl px-4 py-3.5 text-sm text-[#0d1b2a] dark:text-white placeholder-muted/50 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-muted">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-primary/30 border border-muted/30 focus:border-accent rounded-xl px-4 py-3.5 text-sm text-[#0d1b2a] dark:text-white placeholder-muted/50 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider text-muted">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ask a question or share your feedback here..."
                  rows="4"
                  className="w-full bg-primary/30 border border-muted/30 focus:border-accent rounded-xl px-4 py-3.5 text-sm text-[#0d1b2a] dark:text-white placeholder-muted/50 focus:outline-none transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-accent text-primary dark:text-primary font-bold text-sm tracking-wide hover:bg-accent/80 transition-colors shadow-lg shadow-accent/10 cursor-pointer disabled:opacity-50"
                id="submit-contact-btn"
              >
                <FiSend className="w-4 h-4 font-bold" />
                <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
              </button>

            </form>
          </section>
        </div>

      </div>

    </div>
  )
}
export default Contact
