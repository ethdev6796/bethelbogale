'use client'

interface ExperienceItem {
  id: string
  company: string
  role: string
  location?: string
  start_year: number
  end_year: number | null
  description: string
  order_index: number
  image_url?: string
}

interface ExperienceSectionProps {
  experience: ExperienceItem[]
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 md:py-32 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              💼 Experience
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-foreground leading-tight">
            Work Experience
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            My professional career journey and roles in video editing and graphic design
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-transparent opacity-30" />

          <div className="space-y-12">
            {experience.map((item, index) => {
              const isEven = index % 2 === 0
              return (
                <div key={item.id} className={`relative flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'} items-center`}>
                  {/* Spacer */}
                  <div className="hidden md:block w-1/2" />

                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-20" />

                  {/* Card */}
                  <div className="w-full pl-8 md:pl-0 md:w-1/2 md:px-12">
                    <div className="bg-card border-2 border-primary/10 hover:border-primary/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                      {/* Company image */}
                      {item.image_url ? (
                        <div className="h-32 overflow-hidden">
                          <img
                            src={item.image_url}
                            alt={item.company}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="h-32 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center">
                          <span className="text-5xl opacity-60">💼</span>
                        </div>
                      )}

                      <div className="p-6 md:p-7">
                        <p className="text-xs font-black text-primary uppercase tracking-widest mb-2">
                          {item.start_year} — {item.end_year ?? 'Present'}
                        </p>
                        <h3 className="text-xl md:text-2xl font-black text-foreground group-hover:text-primary transition mb-1">
                          {item.role}
                        </h3>
                        <p className="text-primary font-bold text-sm mb-1">{item.company}</p>
                        {item.location && (
                          <p className="text-foreground/60 text-sm mb-3">📍 {item.location}</p>
                        )}
                        {item.description && (
                          <p className="text-foreground/60 text-sm leading-relaxed">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>


      </div>
    </section>
  )
}
