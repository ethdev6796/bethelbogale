'use client'

import { useState } from 'react'

interface ContactSectionProps {
  email: string
  phone?: string
  address?: string
  socialLinks?: Record<string, string>
  formDescription?: string
}

export function ContactSection({
  email,
  phone,
  address,
  socialLinks,
  formDescription,
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setMessage('')

    try {
      // Here you could integrate with an email service
      // For now, we'll just show a success message
      setMessage('Thank you for your message! I will get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setMessage(''), 5000)
    } catch (error) {
      setMessage('Error sending message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -mt-48" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-20 -mr-32" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Contact</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            Let&apos;s Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s connect and create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Email */}
              <div className="group p-6 rounded-2xl bg-card border border-border hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:from-blue-600 group-hover:to-blue-500 group-hover:text-white transition-all transform group-hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">Email</h3>
                    <a
                      href={`mailto:${email}`}
                      className="text-muted-foreground hover:text-blue-600 transition break-all text-sm"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              {phone && (
                <div className="group p-6 rounded-2xl bg-card border border-border hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:from-blue-600 group-hover:to-blue-500 group-hover:text-white transition-all transform group-hover:scale-110">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 7.492a1 1 0 00.502.756l2.73 1.365a1 1 0 001.27-1.27l-1.365-2.73a1 1 0 00-.756-.502L7.176 3.948a1 1 0 00-.684-.948H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-2.5a1 1 0 00-.5.09V5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">Phone</h3>
                      <a
                        href={`tel:${phone}`}
                        className="text-muted-foreground hover:text-blue-600 transition text-sm"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Address */}
              {address && (
                <div className="group p-6 rounded-2xl bg-card border border-border hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:from-blue-600 group-hover:to-blue-500 group-hover:text-white transition-all transform group-hover:scale-110 flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">Location</h3>
                      <p className="text-muted-foreground text-sm">{address}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Social Links */}
              {socialLinks && Object.keys(socialLinks).length > 0 && (
                <div className="pt-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Follow Me</p>
                  <div className="flex gap-2">
                    {Object.entries(socialLinks).map(([platform, url]) =>
                      url ? (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center text-blue-600 hover:from-blue-600 hover:to-blue-500 hover:text-white hover:shadow-lg transition-all transform hover:scale-110"
                          title={platform}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            {platform.toLowerCase() === 'linkedin' && (
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                            )}
                            {platform.toLowerCase() === 'twitter' && (
                              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7s1.1 1 3 1.5z" />
                            )}
                            {platform.toLowerCase() === 'instagram' && (
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            )}
                            {platform.toLowerCase() === 'github' && (
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            )}
                          </svg>
                        </a>
                      ) : null
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8 bg-gradient-to-br from-card to-secondary border border-border rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-shadow">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Send Me a Message</h3>
                <p className="text-muted-foreground text-sm">I&apos;ll get back to you as soon as possible</p>
              </div>
              
              {formDescription && (
                <p className="text-muted-foreground text-sm bg-blue-50 border border-blue-200 rounded-lg p-4">{formDescription}</p>
              )}

              {/* Name Field */}
              <div className="space-y-2.5">
                <label htmlFor="name" className="block text-foreground font-semibold text-sm">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-border text-foreground placeholder:text-muted-foreground rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2.5">
                <label htmlFor="email" className="block text-foreground font-semibold text-sm">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-border text-foreground placeholder:text-muted-foreground rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2.5">
                <label htmlFor="message" className="block text-foreground font-semibold text-sm">
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell me about your project, requirements, or any questions you have..."
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-border text-foreground placeholder:text-muted-foreground rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                />
              </div>

              {/* Success/Error Message */}
              {message && (
                <div
                  className={`p-4 rounded-xl border-2 flex items-start gap-3 animate-slideIn ${
                    message.includes('Error')
                      ? 'bg-red-50 border-red-300 text-red-700'
                      : 'bg-green-50 border-green-300 text-green-700'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    {message.includes('Error') ? (
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    ) : (
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    )}
                  </svg>
                  <p className="text-sm font-medium">{message}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
