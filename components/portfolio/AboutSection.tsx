interface AboutSectionProps {
  title: string
  bio: string
}

export function AboutSection({ title, bio }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-block mb-6">
              <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full border border-primary/20">👤 About Me</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-foreground leading-tight">
              {title}
            </h2>
            
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed mb-8 whitespace-pre-wrap font-light">
              {bio}
            </p>

            {/* Stats Grid
            <div className="grid grid-cols-3 gap-6 py-8 border-t-2 border-b-2 border-primary/10">
              <div className="text-center">
                <p className="text-4xl font-black text-primary">5+</p>
                <p className="text-foreground/60 text-sm mt-1 font-semibold">Years</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-primary">50+</p>
                <p className="text-foreground/60 text-sm mt-1 font-semibold">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-primary">100%</p>
                <p className="text-foreground/60 text-sm mt-1 font-semibold">Satisfied</p>
              </div>
            </div> */}
          </div>

          {/* Right: Highlights Box */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary to-accent/20 rounded-2xl p-8 md:p-10 text-primary-foreground shadow-lg hover:shadow-2xl transition-all duration-300 relative z-20 border border-primary/20">
              <div className="mb-2">
                <h3 className="text-2xl md:text-3xl font-black">Why Work Together</h3>
                <p className="text-primary-foreground/80 text-sm mt-1">What sets me apart</p>
              </div>
              
              <ul className="space-y-4 mt-8">
                {['Creative Problem Solving', 'Fast Turnarounds', 'Premium Quality', 'Clear Communication', 'Transparent Pricing'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center mt-0.5 hover:bg-primary-foreground/40 transition-colors">
                      <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold text-sm md:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a href="#contact" className="mt-8 block w-full py-3 px-4 bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-black rounded-lg transition-all duration-300 border-2 border-primary-foreground text-center">
                Let&apos;s Collaborate
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
