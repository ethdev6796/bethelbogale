# Login & Admin Setup Guide

## Quick Admin Setup (3 Steps)

### Step 1: Create Your Account
Visit: http://localhost:3000/auth/login

1. Look for "Sign Up" or "Create Account" option
2. Enter email: `bethel@bogale.design`
3. Create a strong password
4. Confirm the signup

### Step 2: Get Your User ID
After signup, in **Supabase Dashboard**:
1. Go to Authentication > Users
2. Find your user (bethel@bogale.design)
3. Copy the **User ID** (UUID)

### Step 3: Grant Admin Access
In **Supabase SQL Editor**, run this command:
```sql
INSERT INTO admin_users (id, is_admin) 
VALUES ('PASTE_YOUR_USER_ID_HERE', true);
```

Replace `PASTE_YOUR_USER_ID_HERE` with the ID from Step 2

## Login to Admin Panel

**URL:** http://localhost:3000/auth/login

**Credentials:**
- Email: `bethel@bogale.design`
- Password: (whatever you created)

**After Login:**
- Redirects to: http://localhost:3000/admin/dashboard
- You can now manage all portfolio content

## Accessing Supabase

**Dashboard:** https://supabase.com/dashboard

### View Database Tables
1. Click your project
2. In left sidebar, click **"Tables"**
3. You'll see all tables:
   - hero
   - about
   - education (NEW)
   - skills
   - portfolio_items
   - services
   - testimonials
   - contact_info
   - admin_users

### View Table Data
1. Select any table
2. Click the table name to view all records
3. Click any row to edit
4. Click "+" to add new entries

### Run SQL Queries
1. Click **"SQL Editor"** in left sidebar
2. Paste SQL commands
3. Click "Run" to execute

## Admin User ID Already Set

Your admin user has already been created with ID:
```
f9b7fd6b-5319-4278-9cb1-f21ef1ccebb3
```

This means you can skip Steps 2-3 and just:
1. Create account at http://localhost:3000/auth/login
2. Use email: bethel@bogale.design
3. Create password
4. Login and access admin panel

## Supabase Database Schema Visible

To see the schema in Supabase:

### Method 1: Tables View
1. Open Supabase Dashboard
2. Click "Tables" in left sidebar
3. All tables visible with column names and types

### Method 2: SQL Editor
```sql
-- See all tables
SELECT * FROM information_schema.tables 
WHERE table_schema = 'public';

-- See columns for a table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'education';
```

## Portfolio Sections Editable

In admin dashboard, you can edit:
- Hero (name, subtitle, description, profile image)
- About (biography, photo)
- Education (new entries, years, descriptions)
- Skills (name, proficiency level)
- Portfolio (projects, images, descriptions)
- Services (title, description, pricing)
- Testimonials (client name, review, rating)
- Contact (email, phone, social media)

## Troubleshooting

### "Admin access denied"
- Make sure you added yourself to `admin_users` table
- Check the User ID matches exactly
- Try logging out and back in

### Can't see database tables
- Make sure you're in the right Supabase project
- Click "Tables" in the left sidebar
- Or use SQL Editor to query

### Profile image not showing
- Check the URL is valid and accessible
- Try a different image URL from Unsplash
- Update in admin dashboard or SQL Editor

### Login page errors
- Clear browser cache
- Try incognito/private window
- Check Supabase project is connected correctly

## Sample Data

The portfolio comes pre-populated with:
- 3 education entries
- 8 skills
- 9 portfolio projects
- 4 services
- 5 testimonials

Edit or delete any of these to add your own content.
