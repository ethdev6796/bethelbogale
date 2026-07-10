'use client'

import Link from 'next/link'

interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
  ctaButtonText: string
  ctaButtonLink: string
}

export function HeroSection({
  title,
  subtitle,
  description,
  ctaButtonText,
  ctaButtonLink,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden px-4 md:px-8 pt-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-100 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-gray-200 to-gray-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto w-full">
        {/* Badge with animation */}
        <div className="mb-8 inline-block animate-fade-in">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-200 hover:border-blue-400 transition-colors">
            ✨ Creative Designer & Video Editor
          </span>
        </div>

        {/* Main Headline with gradient text */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-foreground leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground font-light mb-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {subtitle}
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          {description}
        </p>

        {/* CTA Buttons with stagger */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <Link
            href={ctaButtonLink}
            className="group inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/50 active:scale-95"
          >
            {ctaButtonText}
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <a
            href="#contact"
            className="group inline-flex items-center justify-center px-8 py-4 border-2 border-foreground text-foreground font-semibold rounded-lg hover:bg-secondary hover:border-blue-600 transition-all duration-300"
          >
            Get in Touch
            <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex justify-center animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <a href="#about" className="inline-block group">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Scroll to explore</span>
              <svg className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}
