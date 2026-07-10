interface AboutSectionProps {
  title: string
  bio: string
}

export function AboutSection({ title, bio }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 whitespace-pre-wrap font-light">
              {bio}
            </p>
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-foreground">10+</p>
                <p className="text-muted-foreground text-sm">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">500+</p>
                <p className="text-muted-foreground text-sm">Projects Completed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">100+</p>
                <p className="text-muted-foreground text-sm">Happy Clients</p>
              </div>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Why Work With Me</h3>
              <ul className="space-y-4">
                {['Creative & Innovative Solutions', 'Fast Turnaround Times', 'Professional Quality', 'Excellent Communication', 'On-Budget Delivery'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
