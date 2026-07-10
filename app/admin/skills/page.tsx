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
import { Trash2, Plus } from 'lucide-react'

interface Skill {
  id?: string
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  order_index: number
}

export default function SkillsEditor() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [newSkill, setNewSkill] = useState<Skill>({
    name: '',
    level: 'Intermediate',
    order_index: 0,
  })

  useEffect(() => {
    const fetchSkills = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('order_index', { ascending: true })

      if (!error && data) {
        setSkills(data)
      }
      setLoading(false)
    }

    fetchSkills()
  }, [])

  const handleAddSkill = async () => {
    if (!newSkill.name.trim()) {
      setMessage('Skill name is required')
      return
    }

    setSaving(true)
    try {
      const supabase = createClient()
      const { error, data } = await supabase
        .from('skills')
        .insert([
          {
            ...newSkill,
            order_index: skills.length,
          },
        ])
        .select()
        .single()

      if (error) throw error
      if (data) {
        setSkills([...skills, data])
        setNewSkill({ name: '', level: 'Intermediate', order_index: 0 })
        setMessage('Skill added successfully!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteSkill = async (id: string | undefined) => {
    if (!id) return
    setSaving(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from('skills').delete().eq('id', id)

      if (error) throw error
      setSkills(skills.filter((s) => s.id !== id))
      setMessage('Skill deleted successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateSkill = async (skill: Skill) => {
    if (!skill.id) return
    setSaving(true)

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('skills')
        .update({
          name: skill.name,
          level: skill.level,
          updated_at: new Date().toISOString(),
        })
        .eq('id', skill.id)

      if (error) throw error
      setMessage('Skill updated successfully!')
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
          <CardTitle>Add New Skill</CardTitle>
          <CardDescription>Add a new skill to your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="skill-name">Skill Name</Label>
                <Input
                  id="skill-name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="e.g., Adobe Premiere Pro"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skill-level">Level</Label>
                <Select value={newSkill.level} onValueChange={(v) => setNewSkill({ ...newSkill, level: v as Skill['level'] })}>
                  <SelectTrigger id="skill-level">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleAddSkill} disabled={saving} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
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
          <CardTitle>Your Skills</CardTitle>
          <CardDescription>Manage your skills ({skills.length})</CardDescription>
        </CardHeader>
        <CardContent>
          {skills.length === 0 ? (
            <p className="text-gray-500">No skills added yet</p>
          ) : (
            <div className="space-y-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{skill.name}</h3>
                    <p className="text-sm text-gray-500">{skill.level}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    disabled={saving}
                    className="text-red-500 hover:text-red-700"
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
