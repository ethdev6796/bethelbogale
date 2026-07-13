'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import { Upload } from 'lucide-react'
import { uploadImage } from '@/lib/storage-actions'

interface HeroData {
  id?: string
  title: string
  subtitle: string
  description: string
  cta_button_text: string
  cta_button_link: string
  background_image_url?: string
  profile_image_url?: string
}

export default function HeroEditor() {
  const [data, setData] = useState<HeroData>({
    title: '',
    subtitle: '',
    description: '',
    cta_button_text: '',
    cta_button_link: '',
    profile_image_url: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data: heroData, error } = await supabase
        .from('hero')
        .select('*')
        .single()

      if (!error && heroData) {
        setData(heroData)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const result = await uploadImage(formData, 'portfolio')
      if (result.error) throw new Error(result.error)

      setData({ ...data, profile_image_url: result.url || '' })
      setMessage('Profile image uploaded successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(`Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const supabase = createClient()

      if (data.id) {
        const { error } = await supabase
          .from('hero')
          .update({
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            cta_button_text: data.cta_button_text,
            cta_button_link: data.cta_button_link,
            profile_image_url: data.profile_image_url,
            updated_at: new Date().toISOString(),
          })
          .eq('id', data.id)

        if (error) throw error
      } else {
        const { error, data: newData } = await supabase
          .from('hero')
          .insert([data])
          .select()
          .single()

        if (error) throw error
        if (newData) {
          setData(newData)
        }
      }

      setMessage('Hero section updated successfully!')
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
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Hero Section</CardTitle>
          <CardDescription>
            Customize the main banner and call-to-action
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Main Title</Label>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                placeholder="e.g., Hi, I am a Designer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={data.subtitle}
                onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                placeholder="e.g., Video Editor & Graphic Designer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                placeholder="Main description text"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Profile Image</Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                <Button type="button" disabled={uploading} variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
              {data.profile_image_url && (
                <div className="mt-2">
                  <img
                    src={data.profile_image_url}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-lg border border-foreground/10"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta_button_text">Button Text</Label>
              <Input
                id="cta_button_text"
                value={data.cta_button_text}
                onChange={(e) => setData({ ...data, cta_button_text: e.target.value })}
                placeholder="e.g., View My Work"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta_button_link">Button Link</Label>
              <Input
                id="cta_button_link"
                value={data.cta_button_link}
                onChange={(e) => setData({ ...data, cta_button_link: e.target.value })}
                placeholder="e.g., #portfolio or /portfolio"
              />
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
              {saving ? 'Saving...' : 'Save Hero Section'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
