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
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
          Services
        </h2>

        {services.length === 0 ? (
          <p className="text-center text-gray-500">No services listed yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition p-8"
              >
                {service.icon && (
                  <div className="text-4xl mb-4">{service.icon}</div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                {service.price && (
                  <p className="text-lg font-semibold text-blue-600">
                    {service.price}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
