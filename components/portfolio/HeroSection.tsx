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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8 pt-24 pb-12 bg-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-block animate-fade-in">
              <span className="text-xs font-bold text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 uppercase tracking-wider">
                ✨ Award-Winning Creative
              </span>
            </div>

            {/* Main headline */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-foreground tracking-tight">
                {title}
              </h1>
              <p className="text-2xl md:text-3xl font-semibold text-primary">
                {subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-foreground/70 leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <Link
                href={ctaButtonLink}
                className="group inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 active:scale-95 text-center"
              >
                {ctaButtonText}
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-foreground text-foreground font-bold rounded-lg hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105 text-center"
              >
                Get in Touch
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-foreground/10 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div>
                <p className="text-3xl font-black text-primary">50+</p>
                <p className="text-sm text-foreground/60 mt-1">Projects Delivered</p>
              </div>
              <div>
                <p className="text-3xl font-black text-primary">100%</p>
                <p className="text-sm text-foreground/60 mt-1">Client Satisfaction</p>
              </div>
              <div>
                <p className="text-3xl font-black text-primary">5+</p>
                <p className="text-sm text-foreground/60 mt-1">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Right visual element */}
          <div className="relative h-96 md:h-full animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-primary/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-foreground/60 font-semibold">Creative Portfolio</p>
                <p className="text-foreground/40 text-sm mt-2">Video & Graphic Design</p>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-primary/10 rounded-lg animate-pulse" />
              <div className="absolute bottom-8 left-4 w-16 h-16 bg-accent/10 rounded-lg animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <a href="#portfolio" className="inline-block group">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Scroll to see work</span>
              <svg className="w-6 h-6 text-foreground/50 group-hover:text-foreground transition-colors animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
