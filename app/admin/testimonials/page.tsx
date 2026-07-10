'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { Trash2, Plus } from 'lucide-react'

interface Testimonial {
  id?: string
  client_name: string
  client_role: string
  content: string
  rating: number
  order_index: number
}

export default function TestimonialsEditor() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [newTestimonial, setNewTestimonial] = useState<Testimonial>({
    client_name: '',
    client_role: '',
    content: '',
    rating: 5,
    order_index: 0,
  })

  useEffect(() => {
    const fetchTestimonials = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_index', { ascending: true })

      if (!error && data) {
        setTestimonials(data)
      }
      setLoading(false)
    }

    fetchTestimonials()
  }, [])

  const handleAddTestimonial = async () => {
    if (
      !newTestimonial.client_name.trim() ||
      !newTestimonial.content.trim()
    ) {
      setMessage('Client name and testimonial are required')
      return
    }

    setSaving(true)
    try {
      const supabase = createClient()
      const { error, data } = await supabase
        .from('testimonials')
        .insert([
          {
            ...newTestimonial,
            order_index: testimonials.length,
          },
        ])
        .select()
        .single()

      if (error) throw error
      if (data) {
        setTestimonials([...testimonials, data])
        setNewTestimonial({
          client_name: '',
          client_role: '',
          content: '',
          rating: 5,
          order_index: 0,
        })
        setMessage('Testimonial added successfully!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteTestimonial = async (id: string | undefined) => {
    if (!id) return
    setSaving(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from('testimonials').delete().eq('id', id)

      if (error) throw error
      setTestimonials(testimonials.filter((t) => t.id !== id))
      setMessage('Testimonial deleted successfully!')
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
          <CardTitle>Add New Testimonial</CardTitle>
          <CardDescription>Add a client testimonial or review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client-name">Client Name</Label>
                <Input
                  id="client-name"
                  value={newTestimonial.client_name}
                  onChange={(e) =>
                    setNewTestimonial({ ...newTestimonial, client_name: e.target.value })
                  }
                  placeholder="Client's name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="client-role">Role/Company</Label>
                <Input
                  id="client-role"
                  value={newTestimonial.client_role}
                  onChange={(e) =>
                    setNewTestimonial({ ...newTestimonial, client_role: e.target.value })
                  }
                  placeholder="e.g., CEO at StartUp Inc"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="testimonial-content">Testimonial</Label>
              <Textarea
                id="testimonial-content"
                value={newTestimonial.content}
                onChange={(e) =>
                  setNewTestimonial({ ...newTestimonial, content: e.target.value })
                }
                placeholder="What did the client say?"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Select
                value={newTestimonial.rating.toString()}
                onValueChange={(v) =>
                  setNewTestimonial({ ...newTestimonial, rating: parseInt(v) })
                }
              >
                <SelectTrigger id="rating">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Star</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleAddTestimonial} disabled={saving} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
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
          <CardTitle>Testimonials</CardTitle>
          <CardDescription>Manage your testimonials ({testimonials.length})</CardDescription>
        </CardHeader>
        <CardContent>
          {testimonials.length === 0 ? (
            <p className="text-gray-500">No testimonials yet</p>
          ) : (
            <div className="space-y-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="p-4 border rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{testimonial.client_name}</h3>
                        <span className="text-yellow-500">{'⭐'.repeat(testimonial.rating)}</span>
                      </div>
                      <p className="text-sm text-gray-500">{testimonial.client_role}</p>
                      <p className="text-gray-700 mt-2">{testimonial.content}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                      disabled={saving}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
