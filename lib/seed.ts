import { createClient } from '@/lib/supabase/server'

export async function seedDatabase() {
  const supabase = await createClient()

  // Seed Hero
  const { data: heroData } = await supabase.from('hero').select('id').limit(1)
  if (!heroData || heroData.length === 0) {
    await supabase.from('hero').insert({
      title: 'Hi, I&apos;m a Creative Designer',
      subtitle: 'Video Editor & Graphic Designer',
      description: 'I create stunning visual content that brings your ideas to life with cutting-edge design and video editing.',
      cta_button_text: 'View My Work',
      cta_button_link: '#portfolio',
    })
  }

  // Seed About
  const { data: aboutData } = await supabase.from('about').select('id').limit(1)
  if (!aboutData || aboutData.length === 0) {
    await supabase.from('about').insert({
      title: 'About Me',
      bio: 'I&apos;m a passionate video editor and graphic designer with 5+ years of experience creating visually compelling content. I specialize in motion graphics, video production, and brand design. My work has been featured in various digital campaigns and creative projects.',
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

  // Seed Contact Info
  const { data: contactData } = await supabase.from('contact_info').select('id').limit(1)
  if (!contactData || contactData.length === 0) {
    await supabase.from('contact_info').insert({
      email: 'hello@example.com',
      phone: '+1 (555) 123-4567',
      address: 'Creative Studio, Design City, DC 12345',
      social_links: {
        instagram: 'https://instagram.com',
        behance: 'https://behance.net',
        linkedin: 'https://linkedin.com',
        youtube: 'https://youtube.com',
      },
      form_description: 'Get in touch with me for inquiries about video editing, graphic design, or creative projects.',
    })
  }
}
