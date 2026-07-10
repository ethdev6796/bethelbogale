interface Skill {
  id: string
  name: string
  level: string
}

interface SkillsSectionProps {
  skills: Skill[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const getLevelWidth = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'w-full'
      case 'Advanced':
        return 'w-5/6'
      case 'Intermediate':
        return 'w-3/4'
      case 'Beginner':
        return 'w-1/2'
      default:
        return 'w-3/4'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-blue-600'
      case 'Advanced':
        return 'bg-blue-500'
      case 'Intermediate':
        return 'bg-blue-400'
      case 'Beginner':
        return 'bg-blue-300'
      default:
        return 'bg-blue-400'
    }
  }

  return (
    <section id="skills" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-40" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-gray-50 rounded-full blur-3xl opacity-30" />
      
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Skills</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A diverse range of professional skills developed through years of hands-on experience in creative industries
          </p>
        </div>

        {skills.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No skills added yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {skills.map((skill, index) => (
              <div key={skill.id} className="group">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-blue-600 transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full">
                    {skill.level}
                  </span>
                </div>
                
                {/* Skill bar with enhanced styling */}
                <div className="relative w-full h-3 bg-secondary rounded-full overflow-hidden shadow-sm">
                  <div
                    className={`h-full ${getLevelColor(skill.level)} rounded-full transition-all duration-700 ease-out shadow-md group-hover:shadow-lg group-hover:shadow-blue-400/50`}
                    style={{ width: '100%' }}
                  />
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                </div>

                {/* Skill description indicator */}
                <div className="mt-3 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  {skill.level === 'Expert' && 'Master-level proficiency'}
                  {skill.level === 'Advanced' && 'Deep expertise with practical experience'}
                  {skill.level === 'Intermediate' && 'Solid working knowledge'}
                  {skill.level === 'Beginner' && 'Foundational skills'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills footer */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['Video Editing', 'Motion Graphics', 'UI/UX Design', 'Post-Production'].map((skill, i) => (
              <div key={i} className="p-4 bg-secondary rounded-lg hover:bg-opacity-75 transition-colors cursor-default">
                <p className="text-sm font-semibold text-foreground">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
