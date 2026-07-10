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
  const icons = ['🎬', '✨', '🎨', '📱']
  
  return (
    <section id="services" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40 -mr-48" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-gray-50 rounded-full blur-3xl opacity-30 -ml-36" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            Services & Offerings
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comprehensive creative services tailored to bring your vision to life with professional quality and innovation
          </p>
        </div>

        {services.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No services listed yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group relative overflow-hidden bg-card border border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:border-blue-400 hover:-translate-y-2"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                
                <div className="relative z-10">
                  {/* Icon with enhanced styling */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:from-blue-600 group-hover:to-blue-500 group-hover:text-white group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                    {service.icon || icons[index % icons.length]}
                  </div>

                  {/* Number indicator */}
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 inline-block opacity-70 group-hover:opacity-100 transition-opacity">
                    Service {index + 1}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-blue-600 transition">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed group-hover:text-foreground/80 transition">
                    {service.description}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-border to-transparent mb-6 group-hover:from-blue-200 transition-colors" />

                  {/* Price or CTA */}
                  {service.price ? (
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Pricing</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                          {service.price.split('/')[0]}
                        </span>
                        {service.price.includes('/') && (
                          <span className="text-muted-foreground text-sm">
                            {service.price.split('/')[1]}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : null}

                  {/* CTA Button */}
                  <button className="w-full py-3 px-4 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md">
                    Get Started
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
