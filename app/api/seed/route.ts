import { seedDatabase } from '@/lib/seed'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await seedDatabase()
    return NextResponse.json({ success: true, message: 'Database seeded successfully' })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
