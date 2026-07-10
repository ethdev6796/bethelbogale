interface AboutSectionProps {
  title: string
  bio: string
}

export function AboutSection({ title, bio }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
          {title}
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {bio}
          </p>
        </div>
      </div>
    </section>
  )
}
