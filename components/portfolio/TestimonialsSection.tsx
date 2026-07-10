interface Testimonial {
  id: string
  client_name: string
  client_role: string
  content: string
  rating: number
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-30 -mb-40 -mr-40" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            Client Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            What my clients have to say about working together and their experience with my services
          </p>
        </div>

        {testimonials.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No testimonials yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-2xl hover:border-blue-400 transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Decorative quote mark */}
                <div className="absolute -top-6 -left-2 text-6xl text-blue-100/50 font-serif leading-none">
                  "
                </div>

                {/* Rating stars */}
                <div className="flex gap-1.5 mb-5 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl transition-all ${
                        i < testimonial.rating
                          ? 'text-yellow-400 group-hover:scale-110'
                          : 'text-gray-300 group-hover:opacity-50'
                      }`}
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Testimonial content */}
                <p className="text-foreground mb-6 leading-relaxed text-sm relative z-10 group-hover:text-foreground/90 transition italic">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-border via-border to-transparent mb-5 group-hover:from-blue-200 transition-colors" />

                {/* Client Info */}
                <div className="pt-2">
                  <p className="font-bold text-foreground group-hover:text-blue-600 transition">{testimonial.client_name}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">{testimonial.client_role}</p>
                </div>

                {/* Hover badge */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Verified</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
