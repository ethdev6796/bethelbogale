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
    <section id="portfolio" className="py-20 md:py-32 bg-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -mt-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-20 -mb-48 -mr-48" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            Featured Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A selection of my most recent and impactful projects across video editing and graphic design
          </p>
        </div>

        {allItems.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No portfolio items yet</p>
        ) : (
          <>
            {featured.length > 0 && (
              <div className="mb-20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-transparent rounded-full" />
                  <h3 className="text-3xl font-bold text-foreground">Featured Projects</h3>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full ml-auto">HIGHLIGHTED</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {featured.map((item, index) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-2xl bg-card cursor-pointer hover:shadow-2xl transition-all duration-500 border border-border hover:border-blue-400"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative overflow-hidden h-72">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-colors duration-300" />
                        
                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <span className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.category}
                          </span>
                          <h3 className="font-bold text-xl text-white mb-2">{item.title}</h3>
                          <p className="text-sm text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {allItems.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-transparent rounded-full" />
                  <h3 className="text-3xl font-bold text-foreground">All Projects</h3>
                  <span className="text-xs font-bold text-muted-foreground bg-secondary px-2.5 py-1 rounded-full ml-auto">
                    {allItems.length} ITEMS
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-2xl bg-card cursor-pointer hover:shadow-xl transition-all duration-500 border border-border hover:border-blue-300 hover:bg-opacity-95"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="relative overflow-hidden h-56">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                        />
                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                      <div className="p-6">
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 group-hover:text-blue-700 transition">
                          {item.category}
                        </p>
                        <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-blue-600 transition line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-foreground/70 transition">
                          {item.description}
                        </p>
                        
                        {/* Hover footer */}
                        <div className="mt-4 pt-4 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center text-blue-600 font-semibold text-sm">
                            View Project
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        </div>
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
