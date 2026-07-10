import { createClient } from '@/lib/supabase/server'
import { HeroSection } from '@/components/portfolio/HeroSection'
import { AboutSection } from '@/components/portfolio/AboutSection'
import { SkillsSection } from '@/components/portfolio/SkillsSection'
import { PortfolioSection } from '@/components/portfolio/PortfolioSection'
import { ServicesSection } from '@/components/portfolio/ServicesSection'
import { TestimonialsSection } from '@/components/portfolio/TestimonialsSection'
import { ContactSection } from '@/components/portfolio/ContactSection'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()

  // Fetch all portfolio data
  const [heroData, aboutData, skillsData, portfolioData, servicesData, testimonialsData, contactData] = await Promise.all([
    supabase.from('hero').select('*').single(),
    supabase.from('about').select('*').single(),
    supabase.from('skills').select('*').order('order_index'),
    supabase.from('portfolio_items').select('*').order('order_index'),
    supabase.from('services').select('*').order('order_index'),
    supabase.from('testimonials').select('*').order('order_index'),
    supabase.from('contact_info').select('*').single(),
  ])

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">Portfolio</div>
          <div className="flex gap-6 items-center">
            <a href="#about" className="text-gray-600 hover:text-gray-900 text-sm">
              About
            </a>
            <a href="#skills" className="text-gray-600 hover:text-gray-900 text-sm">
              Skills
            </a>
            <a href="#portfolio" className="text-gray-600 hover:text-gray-900 text-sm">
              Portfolio
            </a>
            <a href="#services" className="text-gray-600 hover:text-gray-900 text-sm">
              Services
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 text-sm">
              Testimonials
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 text-sm">
              Contact
            </a>
            <Link href="/auth/login" className="text-xs bg-gray-100 px-3 py-2 rounded hover:bg-gray-200">
              Admin
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      {heroData.data && (
        <HeroSection
          title={heroData.data.title}
          subtitle={heroData.data.subtitle}
          description={heroData.data.description}
          ctaButtonText={heroData.data.cta_button_text}
          ctaButtonLink={heroData.data.cta_button_link}
        />
      )}

      {/* About Section */}
      {aboutData.data && (
        <AboutSection
          title={aboutData.data.title}
          bio={aboutData.data.bio}
        />
      )}

      {/* Skills Section */}
      {skillsData.data && skillsData.data.length > 0 && (
        <SkillsSection skills={skillsData.data} />
      )}

      {/* Portfolio Section */}
      {portfolioData.data && portfolioData.data.length > 0 && (
        <PortfolioSection items={portfolioData.data} />
      )}

      {/* Services Section */}
      {servicesData.data && servicesData.data.length > 0 && (
        <ServicesSection services={servicesData.data} />
      )}

      {/* Testimonials Section */}
      {testimonialsData.data && testimonialsData.data.length > 0 && (
        <TestimonialsSection testimonials={testimonialsData.data} />
      )}

      {/* Contact Section */}
      {contactData.data && (
        <ContactSection
          email={contactData.data.email}
          phone={contactData.data.phone}
          address={contactData.data.address}
          socialLinks={contactData.data.social_links}
          formDescription={contactData.data.form_description}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
