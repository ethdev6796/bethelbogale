'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'

interface ContactInfo {
  id?: string
  email: string
  phone?: string
  address?: string
  social_links?: Record<string, string>
  form_description?: string
}

export default function ContactEditor() {
  const [data, setData] = useState<ContactInfo>({
    email: '',
    phone: '',
    address: '',
    social_links: {},
    form_description: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data: contactData, error } = await supabase
        .from('contact_info')
        .select('*')
        .single()

      if (!error && contactData) {
        setData(contactData)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleSocialLinkChange = (platform: string, url: string) => {
    setData({
      ...data,
      social_links: {
        ...data.social_links,
        [platform]: url,
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const supabase = createClient()

      if (data.id) {
        const { error } = await supabase
          .from('contact_info')
          .update({
            email: data.email,
            phone: data.phone,
            address: data.address,
            social_links: data.social_links,
            form_description: data.form_description,
            updated_at: new Date().toISOString(),
          })
          .eq('id', data.id)

        if (error) throw error
      } else {
        const { error, data: newData } = await supabase
          .from('contact_info')
          .insert([data])
          .select()
          .single()

        if (error) throw error
        if (newData) {
          setData(newData)
        }
      }

      setMessage('Contact information updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Manage your contact details and social media links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                value={data.phone || ''}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address (Optional)</Label>
              <Input
                id="address"
                value={data.address || ''}
                onChange={(e) => setData({ ...data, address: e.target.value })}
                placeholder="Your location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="form-description">Contact Form Description</Label>
              <Textarea
                id="form-description"
                value={data.form_description || ''}
                onChange={(e) => setData({ ...data, form_description: e.target.value })}
                placeholder="Message to display on contact form"
                rows={3}
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Social Media Links</h3>
              <div className="space-y-4">
                {['twitter', 'linkedin', 'instagram', 'youtube', 'github'].map((platform) => (
                  <div key={platform} className="space-y-2">
                    <Label htmlFor={`social-${platform}`} className="capitalize">
                      {platform}
                    </Label>
                    <Input
                      id={`social-${platform}`}
                      value={data.social_links?.[platform] || ''}
                      onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                      placeholder={`Your ${platform} URL`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {message && (
              <div
                className={`p-3 rounded ${
                  message.includes('Error')
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {message}
              </div>
            )}

            <Button type="submit" disabled={saving} className="w-full">
              {saving ? 'Saving...' : 'Save Contact Information'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
