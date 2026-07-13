'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import { Upload, FileText, ExternalLink, Trash2 } from 'lucide-react'

interface AboutData {
  id?: string
  title: string
  bio: string
  image_url?: string
  resume_url?: string
}

export default function AboutEditor() {
  const [data, setData] = useState<AboutData>({ title: '', bio: '', resume_url: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data: aboutData, error } = await supabase.from('about').select('*').single()
      if (!error && aboutData) setData(aboutData)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingResume(true)
    try {
      const supabase = createClient()
      const fileName = `resume-${Date.now()}.${file.name.split('.').pop()}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(`resumes/${fileName}`, file, { cacheControl: '3600', upsert: false })

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(uploadData.path)
      setData((prev) => ({ ...prev, resume_url: urlData.publicUrl }))
      setMessage('Resume uploaded! Click "Save About Section" to apply.')
      setTimeout(() => setMessage(''), 5000)
    } catch (err) {
      setMessage(`Upload error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setUploadingResume(false)
    }
  }

  const handleRemoveResume = () => {
    setData((prev) => ({ ...prev, resume_url: '' }))
    setMessage('Resume removed. Click Save to apply.')
    setTimeout(() => setMessage(''), 4000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const supabase = createClient()

      if (data.id) {
        const { error } = await supabase
          .from('about')
          .update({
            title: data.title,
            bio: data.bio,
            resume_url: data.resume_url || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', data.id)

        if (error) throw error
      } else {
        const { error, data: newData } = await supabase
          .from('about')
          .insert([data])
          .select()
          .single()

        if (error) throw error
        if (newData) setData(newData)
      }

      setMessage('About section updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit About Section</CardTitle>
          <CardDescription>Tell your story and share your background</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Section Title</Label>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                placeholder="e.g., About Me"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea
                id="bio"
                value={data.bio}
                onChange={(e) => setData({ ...data, bio: e.target.value })}
                placeholder="Write your biography and background..."
                rows={8}
              />
            </div>

            {message && (
              <div className={`p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {message}
              </div>
            )}

            <Button type="submit" disabled={saving} className="w-full">
              {saving ? 'Saving...' : 'Save About Section'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Resume Management Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Resume / CV
          </CardTitle>
          <CardDescription>
            Upload your resume. It will appear as a &quot;Download CV&quot; button in the site header.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current resume */}
          {data.resume_url ? (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-green-800">Resume uploaded</p>
                <p className="text-xs text-green-600 truncate">{data.resume_url}</p>
              </div>
              <a
                href={data.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 flex-shrink-0"
                title="Preview"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={handleRemoveResume}
                className="text-red-500 hover:text-red-700 flex-shrink-0"
                title="Remove resume"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="p-4 bg-foreground/5 border-2 border-dashed border-foreground/20 rounded-lg text-center text-foreground/50 text-sm">
              No resume uploaded yet — the Download CV button won&apos;t show on the site.
            </div>
          )}

          {/* Upload */}
          <div className="flex gap-3">
            <label
              htmlFor="resume-upload"
              className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-primary/40 hover:border-primary rounded-lg text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
            >
              <Upload className="w-4 h-4" />
              {uploadingResume ? 'Uploading...' : 'Upload Resume (PDF)'}
            </label>
            <Input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              disabled={uploadingResume}
              className="hidden"
            />
          </div>

          {data.resume_url && (
            <Button
              onClick={handleSubmit as any}
              disabled={saving}
              className="w-full"
              variant="default"
            >
              Save Resume Change
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
