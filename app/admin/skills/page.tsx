'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { Trash2, Plus, Edit2, Upload, X } from 'lucide-react'
import { uploadImage } from '@/lib/storage-actions'

interface Skill {
  id?: string
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  image_url?: string
  order_index: number
}

export default function SkillsEditor() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [skillForm, setSkillForm] = useState<Skill>({
    name: '',
    level: 'Intermediate',
    image_url: '',
    order_index: 0
  })

  useEffect(() => {
    const fetchSkills = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from('skills').select('*').order('order_index', { ascending: true })
      if (!error && data) setSkills(data)
      setLoading(false)
    }
    fetchSkills()
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
      setSkillForm((prev) => ({ ...prev, image_url: result.url || '' }))
      setMessage('Image uploaded!')
      setTimeout(() => setMessage(''), 2000)
    } catch (err) {
      setMessage(`Upload error: ${err instanceof Error ? err.message : 'Unknown'}`)
    } finally {
      setUploading(false)
    }
  }

  const handleSaveSkill = async () => {
    if (!skillForm.name.trim()) { setMessage('Skill name is required'); return }
    setSaving(true)
    try {
      const supabase = createClient()
      if (editingId) {
        // Update existing skill
        const { error, data } = await supabase
          .from('skills')
          .update({
            name: skillForm.name,
            level: skillForm.level,
            image_url: skillForm.image_url,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingId)
          .select()
          .single()

        if (error) throw error
        setSkills(skills.map((s) => (s.id === editingId ? data : s)))
        setMessage('Skill updated successfully!')
      } else {
        // Add new skill
        const { error, data } = await supabase
          .from('skills')
          .insert([{ ...skillForm, order_index: skills.length }])
          .select()
          .single()

        if (error) throw error
        if (data) setSkills([...skills, data])
        setMessage('Skill added successfully!')
      }
      handleCancelEdit()
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage(`Error: ${err instanceof Error ? err.message : 'Unknown'}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteSkill = async (id: string | undefined) => {
    if (!id) return
    if (!confirm('Are you sure you want to delete this skill?')) return
    setSaving(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.from('skills').delete().eq('id', id)
      if (error) throw error
      setSkills(skills.filter((s) => s.id !== id))
      setMessage('Skill deleted successfully!')
      if (editingId === id) handleCancelEdit()
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage(`Error: ${err instanceof Error ? err.message : 'Unknown'}`)
    } finally {
      setSaving(false)
    }
  }

  const handleStartEdit = (skill: Skill) => {
    if (!skill.id) return
    setEditingId(skill.id)
    setSkillForm({
      name: skill.name,
      level: skill.level,
      image_url: skill.image_url || '',
      order_index: skill.order_index
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setSkillForm({
      name: '',
      level: 'Intermediate',
      image_url: '',
      order_index: 0
    })
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Skill' : 'Add New Skill'}</CardTitle>
          <CardDescription>
            {editingId ? 'Modify the details of your skill' : 'Add a skill with an icon image'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="skill-name">Skill Name</Label>
                <Input
                  id="skill-name"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="e.g., Adobe Premiere Pro"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skill-level">Level</Label>
                <Select value={skillForm.level} onValueChange={(v) => setSkillForm({ ...skillForm, level: v as Skill['level'] })}>
                  <SelectTrigger id="skill-level"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Image upload */}
            <div className="space-y-2">
              <Label>Skill Icon / Image (optional)</Label>
              <div className="flex items-center gap-3">
                {skillForm.image_url && (
                  <img src={skillForm.image_url} alt="Preview" className="w-14 h-14 object-cover rounded-lg border" />
                )}
                <label htmlFor="skill-img" className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 border-2 border-dashed border-primary/40 hover:border-primary rounded-lg text-sm font-semibold text-primary hover:bg-primary/5 transition">
                  <Upload className="w-4 h-4" />
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </label>
                <Input id="skill-img" type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSaveSkill} disabled={saving} className="flex-1">
                {editingId ? 'Save Changes' : 'Add Skill'}
              </Button>
              {editingId && (
                <Button onClick={handleCancelEdit} variant="outline">
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {message && (
        <div className={`p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Your Skills</CardTitle>
          <CardDescription>Manage your skills ({skills.length})</CardDescription>
        </CardHeader>
        <CardContent>
          {skills.length === 0 ? (
            <p className="text-gray-500">No skills added yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition">
                  <div className="flex items-center gap-3">
                    {skill.image_url ? (
                      <img src={skill.image_url} alt={skill.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black flex-shrink-0">
                        {skill.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm truncate">{skill.name}</h3>
                      <p className="text-xs text-gray-500">{skill.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-500 hover:text-blue-700" onClick={() => handleStartEdit(skill)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => handleDeleteSkill(skill.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
