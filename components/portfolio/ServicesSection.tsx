interface Service {
  id: string
  title: string
  description: string
  icon?: string
  price?: string
}

interface ServicesSectionProps {
  services: Service[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Services & Offerings
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive creative services tailored to bring your vision to life
          </p>
        </div>

        {services.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No services listed yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group relative overflow-hidden bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:border-accent"
              >
                {/* Accent background */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-xl" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-2xl font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {service.icon || (index + 1)}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-600 transition">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Price */}
                  {service.price && (
                    <div className="flex items-baseline gap-2 pt-4 border-t border-border">
                      <span className="text-2xl font-bold text-foreground">
                        {service.price.split('/')[0]}
                      </span>
                      {service.price.includes('/') && (
                        <span className="text-muted-foreground text-sm">
                          {service.price.split('/')[1]}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Link arrow */}
                  <div className="mt-6 flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
