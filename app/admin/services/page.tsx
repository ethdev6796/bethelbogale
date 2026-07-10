'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import { Trash2, Plus } from 'lucide-react'

interface Service {
  id?: string
  title: string
  description: string
  icon?: string
  price?: string
  order_index: number
}

export default function ServicesEditor() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [newService, setNewService] = useState<Service>({
    title: '',
    description: '',
    icon: '',
    price: '',
    order_index: 0,
  })

  useEffect(() => {
    const fetchServices = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true })

      if (!error && data) {
        setServices(data)
      }
      setLoading(false)
    }

    fetchServices()
  }, [])

  const handleAddService = async () => {
    if (!newService.title.trim() || !newService.description.trim()) {
      setMessage('Title and description are required')
      return
    }

    setSaving(true)
    try {
      const supabase = createClient()
      const { error, data } = await supabase
        .from('services')
        .insert([
          {
            ...newService,
            order_index: services.length,
          },
        ])
        .select()
        .single()

      if (error) throw error
      if (data) {
        setServices([...services, data])
        setNewService({
          title: '',
          description: '',
          icon: '',
          price: '',
          order_index: 0,
        })
        setMessage('Service added successfully!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteService = async (id: string | undefined) => {
    if (!id) return
    setSaving(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from('services').delete().eq('id', id)

      if (error) throw error
      setServices(services.filter((s) => s.id !== id))
      setMessage('Service deleted successfully!')
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
          <CardTitle>Add New Service</CardTitle>
          <CardDescription>Add a service to your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="service-title">Service Title</Label>
              <Input
                id="service-title"
                value={newService.title}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                placeholder="e.g., Video Editing"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service-description">Description</Label>
              <Textarea
                id="service-description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                placeholder="Describe this service"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service-icon">Icon Emoji</Label>
                <Input
                  id="service-icon"
                  value={newService.icon || ''}
                  onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                  placeholder="e.g., 🎬"
                  maxLength={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service-price">Price (Optional)</Label>
                <Input
                  id="service-price"
                  value={newService.price || ''}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  placeholder="e.g., $500 - $2000"
                />
              </div>
            </div>

            <Button onClick={handleAddService} disabled={saving} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
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
          <CardTitle>Your Services</CardTitle>
          <CardDescription>Manage your services ({services.length})</CardDescription>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <p className="text-gray-500">No services added yet</p>
          ) : (
            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      {service.icon && <span className="text-2xl">{service.icon}</span>}
                      <div>
                        <h3 className="font-medium">{service.title}</h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        {service.price && <p className="text-sm font-semibold text-gray-700">{service.price}</p>}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteService(service.id)}
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
