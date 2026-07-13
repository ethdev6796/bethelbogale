import { createClient } from '@/lib/supabase/server'
import { HeroSection } from '@/components/portfolio/HeroSection'
import { AboutSection } from '@/components/portfolio/AboutSection'
import { EducationSection } from '@/components/portfolio/EducationSection'
import { SkillsSection } from '@/components/portfolio/SkillsSection'
import { PortfolioSection } from '@/components/portfolio/PortfolioSection'
import { ServicesSection } from '@/components/portfolio/ServicesSection'
import { TestimonialsSection } from '@/components/portfolio/TestimonialsSection'
import { ContactSection } from '@/components/portfolio/ContactSection'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()

  // Fetch all portfolio data with proper error handling
  const [heroResult, aboutResult, educationResult, skillsResult, portfolioResult, servicesResult, testimonialsResult, contactResult] = await Promise.all([
    supabase.from('hero').select('*').single(),
    supabase.from('about').select('*').single(),
    supabase.from('education').select('*').order('order_index'),
    supabase.from('skills').select('*').order('order_index'),
    supabase.from('portfolio_items').select('*').order('order_index'),
    supabase.from('services').select('*').order('order_index'),
    supabase.from('testimonials').select('*').order('order_index'),
    supabase.from('contact_info').select('*').single(),
  ])

  const heroData = heroResult.data
  const aboutData = aboutResult.data
  const educationData = educationResult.data || []
  const skillsData = skillsResult.data || []
  const portfolioData = portfolioResult.data || []
  const servicesData = servicesResult.data || []
  const testimonialsData = testimonialsResult.data || []
  const contactData = contactResult.data

  return (
    <div className="min-h-screen">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-foreground/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-black text-primary">BB</div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#about" className="text-foreground/70 hover:text-primary font-semibold text-sm transition">
              About
            </a>
            <a href="#education" className="text-foreground/70 hover:text-primary font-semibold text-sm transition">
              Education
            </a>
            <a href="#skills" className="text-foreground/70 hover:text-primary font-semibold text-sm transition">
              Skills
            </a>
            <a href="#portfolio" className="text-foreground/70 hover:text-primary font-semibold text-sm transition">
              Work
            </a>
            <a href="#services" className="text-foreground/70 hover:text-primary font-semibold text-sm transition">
              Services
            </a>
            <a href="#testimonials" className="text-foreground/70 hover:text-primary font-semibold text-sm transition">
              Testimonials
            </a>
            <a href="#contact" className="text-foreground/70 hover:text-primary font-semibold text-sm transition">
              Contact
            </a>
          </div>
          <Link href="/auth/login" className="px-5 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all text-xs">
            Admin
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      {heroData && (
        <HeroSection
          title={heroData.title}
          subtitle={heroData.subtitle}
          description={heroData.description}
          ctaButtonText={heroData.cta_button_text}
          ctaButtonLink={heroData.cta_button_link}
          profileImageUrl={heroData.profile_image_url}
        />
      )}

      {/* About Section */}
      {aboutData && (
        <AboutSection
          title={aboutData.title}
          bio={aboutData.bio}
        />
      )}

      {/* Education Section */}
      {educationData && educationData.length > 0 && (
        <EducationSection education={educationData} />
      )}

      {/* Skills Section */}
      {skillsData && skillsData.length > 0 && (
        <SkillsSection skills={skillsData} />
      )}

      {/* Portfolio Section */}
      {portfolioData && portfolioData.length > 0 && (
        <PortfolioSection items={portfolioData} />
      )}

      {/* Services Section */}
      {servicesData && servicesData.length > 0 && (
        <ServicesSection services={servicesData} />
      )}

      {/* Testimonials Section */}
      {testimonialsData && testimonialsData.length > 0 && (
        <TestimonialsSection testimonials={testimonialsData} />
      )}

      {/* Contact Section */}
      {contactData && (
        <ContactSection
          email={contactData.email}
          phone={contactData.phone}
          address={contactData.address}
          socialLinks={contactData.social_links}
          formDescription={contactData.form_description}
        />
      )}

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-black mb-4">BB</div>
              <p className="text-background/70 text-sm">Creative Studio</p>
            </div>
            <div className="md:text-center">
              <p className="text-background/60 text-sm">
                © {new Date().getFullYear()} Bethel Bogale. All rights reserved.
              </p>
            </div>
            <div className="md:text-right">
              <p className="text-background/60 text-sm">Crafted with creativity</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
