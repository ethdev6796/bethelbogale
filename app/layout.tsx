import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

import { createClient } from '@/lib/supabase/server'

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient()
  const { data } = await supabase.from('hero').select('profile_image_url').single()
  const iconUrl = data?.profile_image_url || '/icon.svg'

  return {
    title: 'Bethel Bogale - Creative Video Editor & Graphic Designer',
    description: 'Professional portfolio showcasing stunning video editing, motion graphics, and graphic design work. Bringing creative visions to life.',
    generator: 'v0.app',
    icons: {
      icon: [
        {
          url: iconUrl,
        },
      ],
      apple: iconUrl,
    },
  }
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
