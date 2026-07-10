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
    <section id="skills" className="py-20 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A diverse range of professional skills developed through years of hands-on experience
          </p>
        </div>

        {skills.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No skills added yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {skills.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-foreground text-lg">
                    {skill.name}
                  </h3>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                    {skill.level}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full ${getLevelColor(skill.level)} rounded-full transition-all duration-500`}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
