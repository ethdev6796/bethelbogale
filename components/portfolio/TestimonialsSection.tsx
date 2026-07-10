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
    <section id="testimonials" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Client Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What my clients have to say about working together
          </p>
        </div>

        {testimonials.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No testimonials yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="group relative bg-card border border-border rounded-xl p-8 hover:shadow-lg hover:border-accent transition-all duration-300"
              >
                {/* Quote mark */}
                <div className="absolute -top-4 -left-4 text-5xl text-blue-200 font-serif">
                  "
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < testimonial.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground mb-6 leading-relaxed italic font-light">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Client Info */}
                <div className="pt-6 border-t border-border">
                  <p className="font-bold text-foreground">{testimonial.client_name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.client_role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
