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
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Badge */}
        <div className="mb-8 inline-block">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
            ✨ Creative Designer & Video Editor
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-foreground leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground font-light mb-6">
          {subtitle}
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          {description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={ctaButtonLink}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 hover:shadow-xl active:scale-95"
          >
            {ctaButtonText}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-foreground text-foreground font-semibold rounded-lg hover:bg-secondary transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <a href="#about" className="inline-block animate-bounce">
            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
