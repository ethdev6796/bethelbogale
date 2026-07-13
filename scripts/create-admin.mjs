#!/usr/bin/env node

/**
 * Admin User Creation Script
 * Uses Supabase service role key to create an admin user and register them in admin_users table.
 *
 * Usage:
 *   node scripts/create-admin.mjs [email] [password]
 *
 * Defaults:
 *   email:    bethel@bogale.design
 *   password: Admin@2026!
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ──────────────────────────────────────────────
// 1. Load .env manually (no dotenv needed)
// ──────────────────────────────────────────────
function loadEnv() {
  const envPath = resolve(__dirname, '../.env')
  const lines = readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    const key = trimmed.slice(0, idx).trim()
    const val = trimmed.slice(idx + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
}

loadEnv()

const SUPABASE_URL      = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env')
  process.exit(1)
}

// ──────────────────────────────────────────────
// 2. Parse CLI arguments
// ──────────────────────────────────────────────
const email    = process.argv[2] || 'bethel@bogale.design'
const password = process.argv[3] || 'Admin@2026!'

// ──────────────────────────────────────────────
// 3. Admin Supabase client (bypasses RLS)
//    Realtime is disabled – not needed here and
//    requires native WebSocket (Node 22+).
// ──────────────────────────────────────────────

// Provide a stub WebSocket so the realtime constructor doesn't throw
class NoopWebSocket {
  constructor() {}
  addEventListener() {}
  removeEventListener() {}
  send() {}
  close() {}
}
globalThis.WebSocket = NoopWebSocket

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth:     { autoRefreshToken: false, persistSession: false },
  realtime: { transport: () => new NoopWebSocket() },
})

async function createAdmin() {
  console.log(`\n🚀  Creating admin user: ${email}\n`)

  // Step 1 – Create (or fetch existing) Auth user
  const { data: createData, error: createError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,   // skip email verification
    })

  let userId

  if (createError) {
    if (createError.message?.includes('already been registered') ||
        createError.message?.includes('already exists')) {
      console.log('ℹ️   User already exists in Auth – looking up existing ID…')

      const { data: listData, error: listError } =
        await supabase.auth.admin.listUsers()

      if (listError) {
        console.error('❌  Failed to list users:', listError.message)
        process.exit(1)
      }

      const existing = listData.users.find(u => u.email === email)
      if (!existing) {
        console.error('❌  Could not find existing user. Please check Supabase dashboard.')
        process.exit(1)
      }

      userId = existing.id
      console.log(`✅  Found existing user  → ID: ${userId}`)
    } else {
      console.error('❌  Auth user creation failed:', createError.message)
      process.exit(1)
    }
  } else {
    userId = createData.user.id
    console.log(`✅  Auth user created     → ID: ${userId}`)
  }

  // Step 2 – Upsert into admin_users table
  const { error: adminError } = await supabase
    .from('admin_users')
    .upsert({ id: userId, is_admin: true }, { onConflict: 'id' })

  if (adminError) {
    console.error('❌  admin_users insert failed:', adminError.message)
    console.error('    Hint: make sure the admin_users table exists with columns: id (uuid), is_admin (bool)')
    process.exit(1)
  }

  console.log(`✅  admin_users record    → is_admin: true`)

  // ── Summary ──────────────────────────────────
  console.log(`
╔══════════════════════════════════════════════╗
║           ✅  Admin Created Successfully      ║
╠══════════════════════════════════════════════╣
║  Email    : ${email.padEnd(32)}║
║  Password : ${password.padEnd(32)}║
║  User ID  : ${userId.slice(0, 32).padEnd(32)}║
╚══════════════════════════════════════════════╝

  Login URL: http://localhost:3002/auth/login
`)
}

createAdmin().catch(err => {
  console.error('❌  Unexpected error:', err)
  process.exit(1)
})
