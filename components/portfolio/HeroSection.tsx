import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
  ctaButtonText: string
  ctaButtonLink: string
}

export function HeroSection({
  title,
  subtitle,
  description,
  ctaButtonText,
  ctaButtonLink,
}: HeroSectionProps) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-sm font-semibold text-blue-400 mb-4 uppercase tracking-widest">
          {subtitle}
        </h2>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        <Link href={ctaButtonLink}>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            {ctaButtonText}
          </Button>
        </Link>
      </div>
    </section>
  )
}
