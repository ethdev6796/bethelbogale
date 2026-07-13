'use client'

interface Service {
  id: string
  title: string
  description: string
  icon?: string
  image_url?: string
}

interface ServicesSectionProps {
  services: Service[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              ⚡ Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-foreground">
            What I Offer
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Comprehensive creative services to transform your ideas into stunning visual reality
          </p>
        </div>

        {services.length === 0 ? (
          <p className="text-center text-foreground/50 py-12">No services listed yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group relative overflow-hidden bg-card border-2 border-primary/10 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:border-primary/40 hover:-translate-y-2 flex flex-col"
              >
                {/* Gradient hover bg */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                {/* Service image */}
                <div className="relative overflow-hidden h-44 flex-shrink-0">
                  {service.image_url ? (
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center">
                      <span className="text-5xl">{service.icon || ['🎬', '✨', '🎨', '📱'][index % 4]}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-7 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-foreground mb-3 group-hover:text-primary transition">
                    {service.title}
                  </h3>

                  <p className="text-foreground/70 text-sm leading-relaxed flex-1 mb-6 group-hover:text-foreground/85 transition">
                    {service.description}
                  </p>

                  {/* CTA → contact */}
                  <a
                    href="#contact"
                    className="w-full py-3 px-4 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground font-black rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Get Started
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
