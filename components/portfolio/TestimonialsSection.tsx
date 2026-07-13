'use client'

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
  // Duplicate for seamless loop
  const doubled = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mb-40 -mr-40" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              💬 Testimonials
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-foreground leading-tight">
            Client Love
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            What my clients have to say about working together and their experience with my services
          </p>
        </div>

        {testimonials.length === 0 ? (
          <p className="text-center text-foreground/50 py-12">No testimonials yet</p>
        ) : (
          <div
            className="overflow-hidden relative"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}
          >
            <div className="flex gap-6 testimonials-track">
              {doubled.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="group flex-shrink-0 w-80 md:w-96 relative bg-card border border-foreground/10 rounded-2xl p-7 hover:border-primary/40 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Quote mark */}
                  <div className="text-6xl text-primary/10 font-serif leading-none absolute top-3 left-5 select-none">
                    "
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg transition-all ${
                          i < testimonial.rating
                            ? 'text-yellow-400 group-hover:scale-110'
                            : 'text-foreground/20'
                        }`}
                        style={{ transitionDelay: `${i * 40}ms` }}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-foreground/80 leading-relaxed text-sm mb-5 relative z-10 italic line-clamp-4">
                    &quot;{testimonial.content}&quot;
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-primary/30 to-transparent mb-4 group-hover:from-primary/60 transition-colors" />

                  {/* Client */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-black text-sm flex-shrink-0">
                      {testimonial.client_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-foreground text-sm group-hover:text-primary transition">{testimonial.client_name}</p>
                      <p className="text-xs text-foreground/50 uppercase tracking-wider">{testimonial.client_role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .testimonials-track {
          animation: scroll-testimonials 35s linear infinite;
          width: max-content;
        }
        .testimonials-track:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-testimonials {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
