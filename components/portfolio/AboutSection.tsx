interface AboutSectionProps {
  title: string
  bio: string
}

export function AboutSection({ title, bio }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-40 -mr-32 -mt-32" />
      
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-block mb-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">About Me</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
              {title}
            </h2>
            
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 whitespace-pre-wrap font-light">
              {bio}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 py-8 border-t border-b border-border">
              <div className="text-center">
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">10+</p>
                <p className="text-muted-foreground text-sm mt-1">Years</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">500+</p>
                <p className="text-muted-foreground text-sm mt-1">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">100+</p>
                <p className="text-muted-foreground text-sm mt-1">Clients</p>
              </div>
            </div>
          </div>

          {/* Right: Highlights Box */}
          <div className="relative">
            {/* Gradient blur background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity" />
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 md:p-10 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative z-20">
              <div className="mb-2">
                <h3 className="text-2xl md:text-3xl font-bold">Why Work With Me</h3>
                <p className="text-blue-100 text-sm mt-1">What sets me apart</p>
              </div>
              
              <ul className="space-y-4 mt-8">
                {['Creative & Innovative Solutions', 'Fast Turnaround Times', 'Professional Quality', 'Excellent Communication', 'On-Budget Delivery'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5 group-hover:bg-white/40 transition-colors">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium text-sm md:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className="mt-8 w-full py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all duration-300 border border-white/30 hover:border-white/50">
                Let&apos;s Collaborate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
