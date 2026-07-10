interface PortfolioItem {
  id: string
  title: string
  description: string
  category: string
  image_url: string
  featured: boolean
}

interface PortfolioSectionProps {
  items: PortfolioItem[]
}

export function PortfolioSection({ items }: PortfolioSectionProps) {
  const featured = items.filter((item) => item.featured).slice(0, 3)
  const allItems = items.slice(0, 9)

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Featured Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of my most recent and impactful projects across video editing and graphic design
          </p>
        </div>

        {allItems.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No portfolio items yet</p>
        ) : (
          <>
            {featured.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-8 text-foreground">Featured Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {featured.map((item) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-xl bg-card cursor-pointer hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative overflow-hidden h-64">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex flex-col justify-end p-6">
                          <h3 className="font-bold text-lg text-white mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-200">{item.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {allItems.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-8 text-foreground">All Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allItems.map((item) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-xl bg-card cursor-pointer hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative overflow-hidden h-56">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                          {item.category}
                        </p>
                        <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-blue-600 transition">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
