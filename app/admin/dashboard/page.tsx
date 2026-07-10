import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const sections = [
    {
      title: 'Hero Section',
      description: 'Main banner with title and CTA',
      href: '/admin/hero',
      icon: '🎯',
    },
    {
      title: 'About Section',
      description: 'Your biography and introduction',
      href: '/admin/about',
      icon: '👤',
    },
    {
      title: 'Skills',
      description: 'Manage your skills and expertise',
      href: '/admin/skills',
      icon: '⭐',
    },
    {
      title: 'Portfolio',
      description: 'Showcase your work and projects',
      href: '/admin/portfolio',
      icon: '🎨',
    },
    {
      title: 'Services',
      description: 'List services you offer',
      href: '/admin/services',
      icon: '💼',
    },
    {
      title: 'Testimonials',
      description: 'Client reviews and feedback',
      href: '/admin/testimonials',
      icon: '⭐',
    },
    {
      title: 'Contact Information',
      description: 'Contact details and social links',
      href: '/admin/contact',
      icon: '📧',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Portfolio Management</h1>
        <p className="text-gray-600">Manage all sections of your portfolio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="text-3xl mb-2">{section.icon}</div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
