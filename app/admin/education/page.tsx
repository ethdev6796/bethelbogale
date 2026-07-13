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

interface EducationItem {
  id?: string
  school: string
  degree: string
  field: string
  start_year: number
  end_year: number
  description: string
  image_url?: string
  order_index: number
}

export default function EducationEditor() {
  const [education, setEducation] = useState<EducationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [newItem, setNewItem] = useState<EducationItem>({
    school: '',
    degree: '',
    field: '',
    start_year: new Date().getFullYear(),
    end_year: new Date().getFullYear(),
    description: '',
    image_url: '',
    order_index: 0,
  })

  useEffect(() => {
    const fetchEducation = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('order_index', { ascending: true })

      if (!error && data) {
        setEducation(data)
      }
      setLoading(false)
    }

    fetchEducation()
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
    if (!newItem.school.trim() || !newItem.degree.trim() || !newItem.field.trim()) {
      setMessage('School, degree, and field are required')
      return
    }

    setSaving(true)
    try {
      const supabase = createClient()
      const { error, data } = await supabase
        .from('education')
        .insert([
          {
            ...newItem,
            order_index: education.length,
          },
        ])
        .select()
        .single()

      if (error) throw error
      if (data) {
        setEducation([...education, data])
        setNewItem({
          school: '',
          degree: '',
          field: '',
          start_year: new Date().getFullYear(),
          end_year: new Date().getFullYear(),
          description: '',
          order_index: 0,
        })
        setMessage('Education record added successfully!')
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
      const { error } = await supabase.from('education').delete().eq('id', id)

      if (error) throw error
      setEducation(education.filter((item) => item.id !== id))
      setMessage('Education record deleted successfully!')
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
          <CardTitle>Add New Education / Certification</CardTitle>
          <CardDescription>Add school degrees or certifications to your timeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="degree">Degree / Certification Name</Label>
                <Input
                  id="degree"
                  value={newItem.degree}
                  onChange={(e) => setNewItem({ ...newItem, degree: e.target.value })}
                  placeholder="e.g., Bachelor of Arts or Adobe Expert Certificate"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="field">Field of Study</Label>
                <Input
                  id="field"
                  value={newItem.field}
                  onChange={(e) => setNewItem({ ...newItem, field: e.target.value })}
                  placeholder="e.g., Graphic Design & Video Editing"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="school">School / Institution</Label>
              <Input
                id="school"
                value={newItem.school}
                onChange={(e) => setNewItem({ ...newItem, school: e.target.value })}
                placeholder="e.g., Addis Ababa University or Adobe Academy"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                  value={newItem.end_year}
                  onChange={(e) => setNewItem({ ...newItem, end_year: parseInt(e.target.value) || new Date().getFullYear() })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Describe your learning experience or certificates gained"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>School / Institution Image (optional)</Label>
              <div className="flex items-center gap-3">
                {newItem.image_url && (
                  <img src={newItem.image_url} alt="preview" className="w-20 h-14 object-cover rounded-lg border" />
                )}
                <label htmlFor="edu-img" className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 border-2 border-dashed border-primary/40 hover:border-primary rounded-lg text-sm font-semibold text-primary hover:bg-primary/5 transition">
                  <Upload className="w-4 h-4" />
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </label>
                <Input id="edu-img" type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
              </div>
            </div>

            <Button onClick={handleAddItem} disabled={saving} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Education Item
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
          <CardTitle>Education & Certifications</CardTitle>
          <CardDescription>Manage your educational background ({education.length})</CardDescription>
        </CardHeader>
        <CardContent>
          {education.length === 0 ? (
            <p className="text-gray-500">No education items added yet</p>
          ) : (
            <div className="space-y-3">
              {education.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 justify-between p-4 border rounded-lg"
                >
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.school} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl flex-shrink-0">🎓</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{item.degree}</h3>
                    <p className="text-primary font-medium text-sm">{item.field} — <span className="text-gray-700 font-semibold">{item.school}</span></p>
                    <p className="text-sm text-gray-500">{item.start_year} - {item.end_year}</p>
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
