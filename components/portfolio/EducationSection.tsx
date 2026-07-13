'use client'

interface EducationItem {
  id: string
  school: string
  degree: string
  field: string
  start_year: number
  end_year: number
  description: string
  order_index: number
}

interface EducationSectionProps {
  education: EducationItem[]
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              🎓 Education
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-foreground leading-tight">
            Education & Certification
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Professional education and certifications that shaped my creative expertise
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-transparent opacity-30" />

          {/* Education items */}
          <div className="space-y-12">
            {education.map((item, index) => (
              <div key={item.id} className="relative">
                <div className="md:flex gap-8 items-center">
                  {/* Timeline dot */}
                  <div className="hidden md:flex md:w-1/2 justify-end pr-12">
                    <div className="text-right">
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
                    </div>
                  </div>

                  {/* Content - alternates left/right on desktop */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="bg-card border-2 border-primary/10 hover:border-primary/30 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                      {/* School and dates */}
                      <div className="mb-4">
                        <p className="text-xs font-black text-primary uppercase tracking-widest mb-2">
                          {item.start_year} - {item.end_year}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-black text-foreground group-hover:text-primary transition">
                          {item.degree}
                        </h3>
                      </div>

                      {/* Field and school */}
                      <div className="mb-4 border-t border-primary/10 pt-4">
                        <p className="text-primary font-bold mb-2">{item.field}</p>
                        <p className="text-foreground/80 font-semibold">{item.school}</p>
                      </div>

                      {/* Description */}
                      {item.description && (
                        <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
                          {item.description}
                        </p>
                      )}

                      {/* Accent icon */}
                      <div className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-40 transition-opacity">
                        🎓
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 pt-12 border-t-2 border-primary/10">
          <div className="text-center">
            <p className="text-3xl font-black text-primary mb-2">{education.length}</p>
            <p className="text-foreground/70 font-semibold">Educational Programs</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-primary mb-2">
              {Math.max(...education.map(e => e.end_year)) - Math.min(...education.map(e => e.start_year))}+
            </p>
            <p className="text-foreground/70 font-semibold">Years of Learning</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-primary mb-2">100%</p>
            <p className="text-foreground/70 font-semibold">Continuous Improvement</p>
          </div>
        </div>
      </div>
    </section>
  )
}
