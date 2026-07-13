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
    <section id="portfolio" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full border border-primary/20">✨ Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-foreground leading-tight">
            Featured Work
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            A curated selection of my most impactful projects across video editing, motion graphics, and graphic design
          </p>
        </div>

        {allItems.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No portfolio items yet</p>
        ) : (
          <>
            {featured.length > 0 && (
              <div className="mb-20">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-primary/20">
                  <h3 className="text-2xl md:text-3xl font-black text-foreground">⭐ Featured</h3>
                  <span className="text-xs font-black text-primary bg-primary/10 px-3 py-1 rounded-full ml-auto">HIGHLIGHTED</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {featured.map((item, index) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-xl bg-card cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 border-primary/10 hover:border-primary/30"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative overflow-hidden h-80">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-colors duration-300" />
                        
                        {/* Badge */}
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          Featured
                        </div>
                        
                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                          <span className="text-xs font-black text-accent uppercase tracking-widest mb-3">
                            {item.category}
                          </span>
                          <h3 className="font-black text-2xl text-white mb-2">{item.title}</h3>
                          <p className="text-sm text-gray-100 line-clamp-2">
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
                <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-primary/20">
                  <h3 className="text-2xl md:text-3xl font-black text-foreground">📂 All Projects</h3>
                  <span className="text-xs font-black text-primary bg-primary/10 px-3 py-1 rounded-full ml-auto">
                    {allItems.length} PROJECTS
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-xl bg-card cursor-pointer hover:shadow-xl transition-all duration-500 border-2 border-foreground/10 hover:border-primary/40 h-full flex flex-col"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="relative overflow-hidden h-48 w-full">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Dark overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <p className="text-xs font-black text-primary uppercase tracking-widest mb-2">
                          {item.category}
                        </p>
                        <h3 className="font-black text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition">
                          {item.title}
                        </h3>
                        <p className="text-sm text-foreground/70 line-clamp-2 flex-1">
                          {item.description}
                        </p>
                        
                        {/* Hover footer */}
                        <div className="mt-4 pt-4 border-t border-foreground/10 group-hover:border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center text-primary font-black text-sm group-hover:gap-2 transition-all">
                            View Project
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
