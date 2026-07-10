'use server'

import { createClient } from '@/lib/supabase/server'

export async function uploadImage(formData: FormData, bucket: string) {
  const supabase = await createClient()
  const file = formData.get('file') as File

  if (!file) {
    return { error: 'No file provided' }
  }

  const fileName = `${Date.now()}-${file.name}`

  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) throw error

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return { url: publicUrlData.publicUrl, path: data.path }
  } catch (error) {
    console.error('Upload error:', error)
    return { error: error instanceof Error ? error.message : 'Upload failed' }
  }
}

export async function deleteImage(path: string, bucket: string) {
  const supabase = await createClient()

  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Delete error:', error)
    return { error: error instanceof Error ? error.message : 'Delete failed' }
  }
}
