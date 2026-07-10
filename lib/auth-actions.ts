'use server'

import { createClient } from '@/lib/supabase/server'

export async function registerAdminUser(userId: string) {
  const supabase = await createClient()

  try {
    const { error } = await supabase.from('admin_users').insert([
      {
        id: userId,
        is_admin: true,
      },
    ])

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error registering admin user:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function logoutUser() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}
