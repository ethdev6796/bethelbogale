export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { HeroSection } from '@/components/portfolio/HeroSection'
import { AboutSection } from '@/components/portfolio/AboutSection'
import { EducationSection } from '@/components/portfolio/EducationSection'
import { ExperienceSection } from '@/components/portfolio/ExperienceSection'
import { SkillsSection } from '@/components/portfolio/SkillsSection'
import { PortfolioSection } from '@/components/portfolio/PortfolioSection'
import { ServicesSection } from '@/components/portfolio/ServicesSection'
import { TestimonialsSection } from '@/components/portfolio/TestimonialsSection'
import { ContactSection } from '@/components/portfolio/ContactSection'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()

  // Fetch all portfolio data with proper error handling
  const [heroResult, aboutResult, educationResult, experienceResult, skillsResult, portfolioResult, servicesResult, testimonialsResult, contactResult] = await Promise.all([
    supabase.from('hero').select('*').single(),
    supabase.from('about').select('*').single(),
    supabase.from('education').select('*').order('order_index'),
    supabase.from('experience').select('*').order('order_index'),
    supabase.from('skills').select('*').order('order_index'),
    supabase.from('portfolio_items').select('*').order('order_index'),
    supabase.from('services').select('*').order('order_index'),
    supabase.from('testimonials').select('*').order('order_index'),
    supabase.from('contact_info').select('*').single(),
  ])

  const heroData = heroResult.data
  const aboutData = aboutResult.data
  const educationData = educationResult.data || []
  const experienceData = experienceResult.data || []
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
            <a href="#about" className="text-foreground/70 hover:text-primary font-semibold text-sm transition">About</a>
            <a href="#experience" className="text-foreground/70 hover:text-primary font-semibold text-sm transition">Experience</a>
            <a href="#education" className="text-foreground/70 hover:text-primary font-semibold text-sm transition">Education</a>
            <a href="#skills" className="text-foreground/70 hover:text-primary font-semibold text-sm transition">Skills</a>
            <a href="#portfolio" className="text-foreground/70 hover:text-primary font-semibold text-sm transition">Work</a>
            <a href="#services" className="text-foreground/70 hover:text-primary font-semibold text-sm transition">Services</a>
            <a href="#testimonials" className="text-foreground/70 hover:text-primary font-semibold text-sm transition">Testimonials</a>
            <a href="#contact" className="text-foreground/70 hover:text-primary font-semibold text-sm transition">Contact</a>
          </div>
          {/* Download Resume Button */}
          {aboutData?.resume_url && (
            <a
              href={aboutData.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-black text-xs text-white overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(265,80%,65%) 50%, hsl(var(--primary)) 100%)',
                backgroundSize: '200% 200%',
                animation: 'shineMove 3s linear infinite',
              }}
            >
              {/* Shine overlay */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <svg className="w-4 h-4 relative z-10 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <span className="relative z-10">Download CV</span>
            </a>
          )}
        </nav>
      </header>
      <style>{`
        @keyframes shineMove {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-flow {
          background-size: 200% auto;
          animation: gradientFlow 4s ease infinite;
        }
        .animate-heartbeat {
          animation: heartBeat 2s ease-in-out infinite;
        }
      `}</style>



      <main>

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

      {/* Experience Section */}
      {experienceData && experienceData.length > 0 && (
        <ExperienceSection experience={experienceData} />
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

      </main>

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
