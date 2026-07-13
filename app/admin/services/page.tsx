'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import { Trash2, Plus, Edit2, Upload, X } from 'lucide-react'
import { uploadImage } from '@/lib/storage-actions'

interface Service {
  id?: string
  title: string
  description: string
  icon?: string
  image_url?: string
  order_index: number
}

export default function ServicesEditor() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [serviceForm, setServiceForm] = useState<Service>({
    title: '',
    description: '',
    icon: '',
    image_url: '',
    order_index: 0
  })

  useEffect(() => {
    const fetchServices = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from('services').select('*').order('order_index', { ascending: true })
      if (!error && data) setServices(data)
      setLoading(false)
    }
    fetchServices()
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
      setServiceForm((prev) => ({ ...prev, image_url: result.url || '' }))
      setMessage('Image uploaded!')
      setTimeout(() => setMessage(''), 2000)
    } catch (err) {
      setMessage(`Upload error: ${err instanceof Error ? err.message : 'Unknown'}`)
    } finally { setUploading(false) }
  }

  const handleSaveService = async () => {
    if (!serviceForm.title.trim() || !serviceForm.description.trim()) {
      setMessage('Title and description are required')
      return
    }
    setSaving(true)
    try {
      const supabase = createClient()
      if (editingId) {
        // Update service
        const { error, data } = await supabase
          .from('services')
          .update({
            title: serviceForm.title,
            description: serviceForm.description,
            icon: serviceForm.icon,
            image_url: serviceForm.image_url,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingId)
          .select()
          .single()

        if (error) throw error
        setServices(services.map((s) => (s.id === editingId ? data : s)))
        setMessage('Service updated successfully!')
      } else {
        // Add service
        const { error, data } = await supabase
          .from('services')
          .insert([{ ...serviceForm, order_index: services.length }])
          .select()
          .single()

        if (error) throw error
        if (data) setServices([...services, data])
        setMessage('Service added successfully!')
      }
      handleCancelEdit()
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage(`Error: ${err instanceof Error ? err.message : 'Unknown'}`)
    } finally { setSaving(false) }
  }

  const handleDeleteService = async (id: string | undefined) => {
    if (!id) return
    if (!confirm('Are you sure you want to delete this service?')) return
    setSaving(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.from('services').delete().eq('id', id)
      if (error) throw error
      setServices(services.filter((s) => s.id !== id))
      setMessage('Service deleted successfully!')
      if (editingId === id) handleCancelEdit()
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage(`Error: ${err instanceof Error ? err.message : 'Unknown'}`)
    } finally { setSaving(false) }
  }

  const handleStartEdit = (service: Service) => {
    if (!service.id) return
    setEditingId(service.id)
    setServiceForm({
      title: service.title,
      description: service.description,
      icon: service.icon || '',
      image_url: service.image_url || '',
      order_index: service.order_index
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setServiceForm({
      title: '',
      description: '',
      icon: '',
      image_url: '',
      order_index: 0
    })
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Service' : 'Add New Service'}</CardTitle>
          <CardDescription>
            {editingId ? 'Modify the details of your service' : 'Add a service with an image for the What I Offer section'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="service-title">Service Title</Label>
              <Input id="service-title" value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} placeholder="e.g., Video Editing" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service-description">Description</Label>
              <Textarea id="service-description" value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} placeholder="Describe this service" rows={4} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service-icon">Fallback Icon Emoji</Label>
                <Input id="service-icon" value={serviceForm.icon || ''} onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })} placeholder="e.g., 🎬" maxLength={2} />
              </div>
            </div>

            {/* Image upload */}
            <div className="space-y-2">
              <Label>Service Image (replaces emoji icon)</Label>
              <div className="flex items-center gap-3">
                {serviceForm.image_url && (
                  <img src={serviceForm.image_url} alt="Preview" className="w-20 h-14 object-cover rounded-lg border" />
                )}
                <label htmlFor="service-img" className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 border-2 border-dashed border-primary/40 hover:border-primary rounded-lg text-sm font-semibold text-primary hover:bg-primary/5 transition">
                  <Upload className="w-4 h-4" />
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </label>
                <Input id="service-img" type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSaveService} disabled={saving} className="flex-1">
                {editingId ? 'Save Changes' : 'Add Service'}
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
        <div className={`p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</div>
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
                <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg group hover:bg-slate-50 transition">
                  <div className="flex items-center gap-4 min-w-0">
                    {service.image_url ? (
                      <img src={service.image_url} alt={service.title} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />
                    ) : (
                      <div className="w-16 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">{service.icon || '⚡'}</div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-semibold truncate">{service.title}</h3>
                      <p className="text-sm text-gray-500 truncate">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-500 hover:text-blue-700" onClick={() => handleStartEdit(service)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => handleDeleteService(service.id)}>
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
