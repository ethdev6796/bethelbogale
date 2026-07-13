'use client'

interface Skill {
  id: string
  name: string
  level: string
  image_url?: string
}

interface SkillsSectionProps {
  skills: Skill[]
}

const levelColors: Record<string, string> = {
  Expert:       'from-violet-500 to-indigo-600',
  Advanced:     'from-blue-500 to-cyan-500',
  Intermediate: 'from-emerald-500 to-teal-500',
  Beginner:     'from-amber-400 to-orange-500',
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-20 md:py-32 bg-secondary relative overflow-hidden">
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              🛠 Skills
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-foreground leading-tight">
            Skills &amp; Expertise
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            A diverse range of professional skills developed through years of hands-on experience
          </p>
        </div>

        {skills.length === 0 ? (
          <p className="text-center text-foreground/50 py-12">No skills added yet</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {skills.map((skill) => {
              const gradient = levelColors[skill.level] || 'from-primary to-accent'
              return (
                <div
                  key={skill.id}
                  className="group flex flex-col items-center text-center gap-3 p-5 bg-card rounded-2xl border border-foreground/10 hover:border-primary/40 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-default"
                >
                  {/* Image or gradient avatar */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                    {skill.image_url ? (
                      <img
                        src={skill.image_url}
                        alt={skill.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <span className="text-white font-black text-xl">
                          {skill.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <p className="font-black text-sm text-foreground group-hover:text-primary transition leading-tight">
                    {skill.name}
                  </p>

                  {/* Level badge */}
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r ${gradient} text-white`}>
                    {skill.level}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
