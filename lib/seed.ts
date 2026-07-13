import { createClient } from '@/lib/supabase/server'

export async function seedDatabase() {
  const supabase = await createClient()

  // Seed Hero
  const { data: heroData } = await supabase.from('hero').select('id').limit(1)
  if (!heroData || heroData.length === 0) {
    await supabase.from('hero').insert({
      title: 'Hi, I&apos;m Bethel Bogale',
      subtitle: 'Video Editor & Graphic Designer',
      description: 'I craft compelling visual narratives through professional video editing and stunning graphic design. Bringing your creative vision to life with precision and artistry.',
      cta_button_text: 'Explore My Work',
      cta_button_link: '#portfolio',
    })
  }

  // Seed About
  const { data: aboutData } = await supabase.from('about').select('id').limit(1)
  if (!aboutData || aboutData.length === 0) {
    await supabase.from('about').insert({
      title: 'About Bethel',
      bio: 'Hello! I&apos;m Bethel Bogale, a passionate video editor and graphic designer with a keen eye for detail and creative storytelling. With expertise in motion graphics, video production, and brand design, I transform ideas into visually captivating content. My mission is to help brands and creators stand out through exceptional design and compelling visual narratives. Every project is an opportunity to push creative boundaries and deliver excellence.',
    })
  }

  // Seed Skills
  const { data: skillsData } = await supabase.from('skills').select('id').limit(1)
  if (!skillsData || skillsData.length === 0) {
    const skills = [
      { name: 'Video Editing', level: 'Expert', order_index: 0 },
      { name: 'Motion Graphics', level: 'Advanced', order_index: 1 },
      { name: 'Graphic Design', level: 'Expert', order_index: 2 },
      { name: 'Adobe Creative Suite', level: 'Expert', order_index: 3 },
      { name: 'UI/UX Design', level: 'Advanced', order_index: 4 },
      { name: 'After Effects', level: 'Expert', order_index: 5 },
      { name: 'Premiere Pro', level: 'Expert', order_index: 6 },
      { name: 'Photoshop', level: 'Expert', order_index: 7 },
    ]
    await supabase.from('skills').insert(skills)
  }

  // Seed Services
  const { data: servicesData } = await supabase.from('services').select('id').limit(1)
  if (!servicesData || servicesData.length === 0) {
    const services = [
      {
        title: 'Video Editing',
        description: 'Professional video editing for commercials, social media, and corporate videos.',
        icon: '🎬',
        price: '$50-200/hour',
        order_index: 0,
      },
      {
        title: 'Motion Graphics',
        description: 'Animated graphics and motion design for engaging visual storytelling.',
        icon: '✨',
        price: '$75-250/hour',
        order_index: 1,
      },
      {
        title: 'Graphic Design',
        description: 'Custom branding, logos, and design assets tailored to your vision.',
        icon: '🎨',
        price: '$40-150/hour',
        order_index: 2,
      },
      {
        title: 'Brand Identity',
        description: 'Complete brand design packages including logos, guidelines, and collateral.',
        icon: '🏢',
        price: '$2000-5000',
        order_index: 3,
      },
    ]
    await supabase.from('services').insert(services)
  }

  // Seed Portfolio Items
  const { data: portfolioData } = await supabase.from('portfolio_items').select('id').limit(1)
  if (!portfolioData || portfolioData.length === 0) {
    const portfolioItems = [
      {
        title: 'Corporate Brand Identity',
        description: 'Complete visual identity system for a tech startup including logo, color palette, and brand guidelines.',
        category: 'Graphic Design',
        image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
        featured: true,
        order_index: 0,
      },
      {
        title: 'Product Launch Video',
        description: 'High-impact promotional video for product launch with motion graphics and effects.',
        category: 'Video Editing',
        image_url: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=500&fit=crop',
        featured: true,
        order_index: 1,
      },
      {
        title: 'Social Media Campaign',
        description: 'Series of animated graphics and short videos for social media marketing campaign.',
        category: 'Motion Graphics',
        image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop',
        featured: true,
        order_index: 2,
      },
      {
        title: 'Website Design System',
        description: 'UI/UX design system with comprehensive components and design tokens for a modern web platform.',
        category: 'UI/UX Design',
        image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
        featured: false,
        order_index: 3,
      },
      {
        title: 'Wedding Highlight Reel',
        description: 'Cinematic wedding video edit with professional color grading and music synchronization.',
        category: 'Video Editing',
        image_url: 'https://images.unsplash.com/photo-1516321318423-f06f70a504f0?w=500&h=500&fit=crop',
        featured: false,
        order_index: 4,
      },
      {
        title: 'Brand Marketing Package',
        description: 'Comprehensive marketing collateral including brochures, social media templates, and promotional materials.',
        category: 'Graphic Design',
        image_url: 'https://images.unsplash.com/photo-1559389417773-efb91ebf1ee9?w=500&h=500&fit=crop',
        featured: false,
        order_index: 5,
      },
      {
        title: 'Motion Graphics Animation',
        description: 'Complex motion graphics sequence for corporate presentation with 3D elements.',
        category: 'Motion Graphics',
        image_url: 'https://images.unsplash.com/photo-1536647834828-2b2fc4ebeaa0?w=500&h=500&fit=crop',
        featured: false,
        order_index: 6,
      },
      {
        title: 'App Icon Design Set',
        description: 'Comprehensive icon set for mobile and web application with multiple states and variations.',
        category: 'Graphic Design',
        image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
        featured: false,
        order_index: 7,
      },
      {
        title: 'Commercial Production',
        description: 'Full production and editing of 30-second commercial for television and streaming platforms.',
        category: 'Video Editing',
        image_url: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&h=500&fit=crop',
        featured: false,
        order_index: 8,
      },
    ]
    await supabase.from('portfolio_items').insert(portfolioItems)
  }

  // Seed Testimonials
  const { data: testimonialsData } = await supabase.from('testimonials').select('id').limit(1)
  if (!testimonialsData || testimonialsData.length === 0) {
    const testimonials = [
      {
        client_name: 'Sarah Johnson',
        client_role: 'Marketing Director, Tech Corp',
        content: 'The video editing work was exceptional. The team delivered professional-quality content that exceeded our expectations and significantly improved our engagement metrics.',
        rating: 5,
        order_index: 0,
      },
      {
        client_name: 'Michael Chen',
        client_role: 'Founder, Creative Startup',
        content: 'Outstanding graphic design work for our brand identity. Every detail was carefully considered and perfectly executed. Highly recommended for any design project.',
        rating: 5,
        order_index: 1,
      },
      {
        client_name: 'Emma Roberts',
        client_role: 'Event Coordinator',
        content: 'The motion graphics for our event promotion were absolutely stunning. They perfectly captured the energy and excitement we wanted to convey. Great collaboration!',
        rating: 5,
        order_index: 2,
      },
      {
        client_name: 'David Thompson',
        client_role: 'CEO, Digital Agency',
        content: 'Professional, creative, and incredibly responsive to feedback. Delivered the project on time with exceptional quality. Would definitely work together again.',
        rating: 5,
        order_index: 3,
      },
      {
        client_name: 'Jessica Williams',
        client_role: 'Social Media Manager',
        content: 'The creative solutions provided were innovative and modern. Our social media presence improved dramatically after implementing these designs. Fantastic work!',
        rating: 5,
        order_index: 4,
      },
    ]
    await supabase.from('testimonials').insert(testimonials)
  }

  // Seed Contact Info
  const { data: contactData } = await supabase.from('contact_info').select('id').limit(1)
  if (!contactData || contactData.length === 0) {
    await supabase.from('contact_info').insert({
      email: 'bethel@bogale.design',
      phone: '+1 (555) 456-7890',
      address: 'Creative Hub, Addis Ababa, Ethiopia',
      social_links: {
        instagram: 'https://instagram.com/bethelbogale',
        linkedin: 'https://linkedin.com/in/bethelbogale',
        behance: 'https://behance.net/bethelbogale',
        twitter: 'https://twitter.com/bethelbogale',
      },
      form_description: 'Ready to bring your vision to life? I specialize in video editing, graphic design, and motion graphics. Let&apos;s collaborate on your next creative project and create something extraordinary together.',
    })
  }
}
