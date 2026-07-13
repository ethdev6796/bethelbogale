'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import { Trash2, Plus, Upload } from 'lucide-react'
import { uploadImage } from '@/lib/storage-actions'

interface ExperienceItem {
  id?: string
  company: string
  role: string
  location?: string
  start_year: number
  end_year: number | null
  description: string
  image_url?: string
  order_index: number
}

export default function ExperienceEditor() {
  const [experience, setExperience] = useState<ExperienceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [newItem, setNewItem] = useState<ExperienceItem>({
    company: '',
    role: '',
    location: '',
    start_year: new Date().getFullYear(),
    end_year: null,
    description: '',
    image_url: '',
    order_index: 0,
  })

  // End year is either a number or null (representing Present)
  const [isPresent, setIsPresent] = useState(true)

  useEffect(() => {
    const fetchExperience = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('order_index', { ascending: true })

      if (!error && data) {
        setExperience(data)
      }
      setLoading(false)
    }

    fetchExperience()
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const result = await uploadImage(fd, 'portfolio')
      if (result.error) throw new Error(result.error)
      setNewItem((prev) => ({ ...prev, image_url: result.url || '' }))
    } catch (err) {
      setMessage(`Upload error: ${err instanceof Error ? err.message : 'Unknown'}`)
    } finally { setUploading(false) }
  }

  const handleAddItem = async () => {
    if (!newItem.company.trim() || !newItem.role.trim()) {
      setMessage('Company and role are required')
      return
    }

    setSaving(true)
    try {
      const supabase = createClient()
      const { error, data } = await supabase
        .from('experience')
        .insert([
          {
            ...newItem,
            end_year: isPresent ? null : newItem.end_year,
            order_index: experience.length,
          },
        ])
        .select()
        .single()

      if (error) throw error
      if (data) {
        setExperience([...experience, data])
        setNewItem({
          company: '',
          role: '',
          location: '',
          start_year: new Date().getFullYear(),
          end_year: null,
          description: '',
          order_index: 0,
        })
        setIsPresent(true)
        setMessage('Experience record added successfully!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteItem = async (id: string | undefined) => {
    if (!id) return
    setSaving(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from('experience').delete().eq('id', id)

      if (error) throw error
      setExperience(experience.filter((item) => item.id !== id))
      setMessage('Experience record deleted successfully!')
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
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Work Experience</CardTitle>
          <CardDescription>Add roles, companies, and timelines to your experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role / Job Title</Label>
                <Input
                  id="role"
                  value={newItem.role}
                  onChange={(e) => setNewItem({ ...newItem, role: e.target.value })}
                  placeholder="e.g., Senior Video Editor"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company / Client</Label>
                <Input
                  id="company"
                  value={newItem.company}
                  onChange={(e) => setNewItem({ ...newItem, company: e.target.value })}
                  placeholder="e.g., Creative Hub"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                value={newItem.location || ''}
                onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                placeholder="e.g., Addis Ababa, Ethiopia (or Remote)"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="start_year">Start Year</Label>
                <Input
                  id="start_year"
                  type="number"
                  value={newItem.start_year}
                  onChange={(e) => setNewItem({ ...newItem, start_year: parseInt(e.target.value) || new Date().getFullYear() })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end_year">End Year</Label>
                <Input
                  id="end_year"
                  type="number"
                  value={newItem.end_year || ''}
                  onChange={(e) => setNewItem({ ...newItem, end_year: parseInt(e.target.value) || null })}
                  disabled={isPresent}
                  placeholder="Present"
                />
              </div>

              <div className="flex items-center space-x-2 h-10">
                <input
                  id="present"
                  type="checkbox"
                  checked={isPresent}
                  onChange={(e) => {
                    setIsPresent(e.target.checked)
                    if (e.target.checked) {
                      setNewItem({ ...newItem, end_year: null })
                    } else {
                      setNewItem({ ...newItem, end_year: new Date().getFullYear() })
                    }
                  }}
                  className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                />
                <Label htmlFor="present" className="cursor-pointer">Currently Work Here</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description / Key Accomplishments</Label>
              <Textarea
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Describe your role and key contributions"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Company Logo / Image (optional)</Label>
              <div className="flex items-center gap-3">
                {newItem.image_url && (
                  <img src={newItem.image_url} alt="preview" className="w-20 h-14 object-cover rounded-lg border" />
                )}
                <label htmlFor="exp-img" className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 border-2 border-dashed border-primary/40 hover:border-primary rounded-lg text-sm font-semibold text-primary hover:bg-primary/5 transition">
                  <Upload className="w-4 h-4" />
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </label>
                <Input id="exp-img" type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
              </div>
            </div>

            <Button onClick={handleAddItem} disabled={saving} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience Item
            </Button>
          </div>
        </CardContent>
      </Card>

      {message && (
        <div
          className={`p-3 rounded ${
            message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}
        >
          {message}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Work Experience List</CardTitle>
          <CardDescription>Manage your career history ({experience.length})</CardDescription>
        </CardHeader>
        <CardContent>
          {experience.length === 0 ? (
            <p className="text-gray-500">No experience items added yet</p>
          ) : (
            <div className="space-y-3">
              {experience.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 justify-between p-4 border rounded-lg"
                >
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.company} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl flex-shrink-0">💼</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{item.role}</h3>
                    <p className="text-primary font-medium text-sm">{item.company} {item.location && `— ${item.location}`}</p>
                    <p className="text-sm text-gray-500">{item.start_year} - {item.end_year ?? 'Present'}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    disabled={saving}
                    className="text-red-500 hover:text-red-700 ml-4 flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
