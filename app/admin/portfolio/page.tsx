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

interface PortfolioItem {
  id?: string
  title: string
  description: string
  category: string
  image_url: string
  video_link?: string
  featured: boolean
  order_index: number
}

export default function PortfolioEditor() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [newItem, setNewItem] = useState<PortfolioItem>({
    title: '',
    description: '',
    category: '',
    image_url: '',
    featured: false,
    order_index: 0,
  })

  useEffect(() => {
    const fetchItems = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('order_index', { ascending: true })

      if (!error && data) {
        setItems(data)
      }
      setLoading(false)
    }

    fetchItems()
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

      setNewItem({ ...newItem, image_url: result.url || '' })
      setMessage('Image uploaded successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(`Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }

  const handleAddItem = async () => {
    if (!newItem.title.trim() || !newItem.image_url) {
      setMessage('Title and image are required')
      return
    }

    setSaving(true)
    try {
      const supabase = createClient()
      const { error, data } = await supabase
        .from('portfolio_items')
        .insert([
          {
            ...newItem,
            order_index: items.length,
          },
        ])
        .select()
        .single()

      if (error) throw error
      if (data) {
        setItems([...items, data])
        setNewItem({
          title: '',
          description: '',
          category: '',
          image_url: '',
          featured: false,
          order_index: 0,
        })
        setMessage('Portfolio item added successfully!')
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
      const { error } = await supabase.from('portfolio_items').delete().eq('id', id)

      if (error) throw error
      setItems(items.filter((item) => item.id !== id))
      setMessage('Item deleted successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  const handleToggleFeatured = async (item: PortfolioItem) => {
    if (!item.id) return
    setSaving(true)

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('portfolio_items')
        .update({ featured: !item.featured, updated_at: new Date().toISOString() })
        .eq('id', item.id)

      if (error) throw error
      setItems(
        items.map((i) =>
          i.id === item.id ? { ...i, featured: !i.featured } : i
        )
      )
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
    <div className="max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Portfolio Item</CardTitle>
          <CardDescription>Add a new project to your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Project title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                placeholder="e.g., Video Editing, Graphic Design"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Project description"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Project Image</Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                <Button disabled={uploading} variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
              {newItem.image_url && (
                <div className="mt-2">
                  <img
                    src={newItem.image_url}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="video">Video Link (Optional)</Label>
              <Input
                id="video"
                value={newItem.video_link || ''}
                onChange={(e) => setNewItem({ ...newItem, video_link: e.target.value })}
                placeholder="YouTube or Vimeo link"
              />
            </div>

            <Button onClick={handleAddItem} disabled={saving || !newItem.image_url} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
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
          <CardTitle>Portfolio Items</CardTitle>
          <CardDescription>Manage your portfolio ({items.length})</CardDescription>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-gray-500">No portfolio items yet</p>
          ) : (
            <div className="grid gap-4">
              {items.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 flex gap-4">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="h-24 w-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <button
                        onClick={() => handleToggleFeatured(item)}
                        disabled={saving}
                        className={`text-sm px-3 py-1 rounded ${
                          item.featured
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {item.featured ? 'Featured' : 'Not Featured'}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
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
