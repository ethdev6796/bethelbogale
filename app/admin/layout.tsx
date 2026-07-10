import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Check if user is admin
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!adminUser) {
    redirect('/auth/error')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex gap-6">
            <Link href="/admin/dashboard" className="font-semibold text-lg">
              Admin Dashboard
            </Link>
            <div className="flex gap-4">
              <Link href="/admin/hero" className="text-sm text-gray-600 hover:text-gray-900">
                Hero
              </Link>
              <Link href="/admin/about" className="text-sm text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/admin/skills" className="text-sm text-gray-600 hover:text-gray-900">
                Skills
              </Link>
              <Link href="/admin/portfolio" className="text-sm text-gray-600 hover:text-gray-900">
                Portfolio
              </Link>
              <Link href="/admin/services" className="text-sm text-gray-600 hover:text-gray-900">
                Services
              </Link>
              <Link href="/admin/testimonials" className="text-sm text-gray-600 hover:text-gray-900">
                Testimonials
              </Link>
              <Link href="/admin/contact" className="text-sm text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <form
              action={async () => {
                'use server'
                const supabase = await createClient()
                await supabase.auth.signOut()
                redirect('/auth/login')
              }}
            >
              <Button type="submit" variant="outline" size="sm">
                Logout
              </Button>
            </form>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
