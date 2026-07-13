'use client'

interface PortfolioItem {
  id: string
  title: string
  description: string
  category: string
  image_url: string
  video_link?: string
  featured: boolean
}

interface PortfolioSectionProps {
  items: PortfolioItem[]
}

export function PortfolioSection({ items }: PortfolioSectionProps) {
  const allItems = items.slice(0, 9)

  const handleClick = (item: PortfolioItem) => {
    const url = item.video_link || item.image_url
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              ✨ Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-foreground leading-tight">
            My Work
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            A curated selection of my most impactful projects — click any card to view it
          </p>
        </div>

        {allItems.length === 0 ? (
          <p className="text-center text-foreground/50 py-12">No portfolio items yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleClick(item)}
                className="group relative overflow-hidden rounded-2xl bg-card cursor-pointer hover:shadow-2xl transition-all duration-500 border border-foreground/10 hover:border-primary/40 hover:-translate-y-2"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-60">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-300" />

                  {/* Open in new tab icon */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>

                  {/* Category badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-black text-white bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h3 className="font-black text-xl text-foreground mb-2 group-hover:text-primary transition line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/60 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* CTA row */}
                  <div className="mt-4 pt-4 border-t border-foreground/10 group-hover:border-primary/30 transition-colors flex items-center gap-2 text-primary font-bold text-sm">
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {item.video_link ? 'Watch Video' : 'View Project'}
                    </span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
