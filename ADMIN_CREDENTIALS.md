# Bethel Bogale Portfolio - Admin Setup

## 🎉 Welcome to Your Portfolio!

Your professional portfolio website for Bethel Bogale has been set up and is ready to use!

## 📋 Portfolio Details

**Name:** Bethel Bogale  
**Title:** Video Editor & Graphic Designer  
**Email:** bethel@bogale.design  
**Location:** Creative Hub, Addis Ababa, Ethiopia

## 🌐 Website Sections

Your portfolio includes the following sections, all managed from the admin panel:

1. **Hero Section** - Eye-catching landing section with call-to-action
2. **About Section** - Biography and personal stats
3. **Skills Section** - Professional skills and expertise levels
4. **Portfolio Section** - Featured projects and all projects gallery
5. **Services Section** - Services offered with pricing
6. **Testimonials Section** - Client reviews and feedback
7. **Contact Section** - Contact information and inquiry form

## 🔐 Admin Access

### How to Access the Admin Panel:

1. Go to your portfolio website
2. Click the **"Admin"** button in the top-right corner
3. You'll be redirected to the login page

### Login URL:
```
http://localhost:3000/auth/login
```

### Setting Up Your Admin Account:

Since this is your first time, you'll need to create an admin account in Supabase:

1. **Go to Supabase Dashboard**
   - URL: Your Supabase project URL
   - Find the "Auth" section

2. **Create a new user:**
   - Email: bethel@bogale.design
   - Password: Create a strong password
   - Click "Create User"

3. **Make this user an admin:**
   - Go to the `admin_users` table in the database
   - Add a record with:
     - `id`: The user ID from the auth user you just created
     - `is_admin`: true

4. **Log in:**
   - Email: bethel@bogale.design
   - Password: Your chosen password

## 🛠️ Admin Features

Once logged in, you can:

### Hero Section
- Edit your name, subtitle, and introduction
- Update call-to-action button text and links
- Add a background image

### About Section
- Update your bio and story
- Add a profile photo
- Modify "Why Work With Me" highlights

### Skills
- Add, edit, or remove skills
- Set proficiency levels (Expert, Advanced, etc.)
- Organize in any order

### Portfolio
- Add your video editing and graphic design projects
- Upload project images
- Add project descriptions and categories
- Mark projects as "Featured" for special highlighting
- Link to video content

### Services
- Create service offerings
- Set pricing
- Add descriptions
- Use emoji icons for visual appeal

### Testimonials
- Add client testimonials
- Include client names and roles
- Add star ratings
- Add client profile images

### Contact Information
- Update email address
- Update phone number
- Update location/address
- Add social media links (Instagram, LinkedIn, Behance, Twitter, etc.)
- Customize contact form description

## 📊 Database Tables

All content is stored in Supabase with Row Level Security (RLS) enabled:

- `admin_users` - Admin user management
- `hero` - Hero section content
- `about` - About section content
- `skills` - Professional skills
- `portfolio_items` - Project portfolio
- `services` - Service offerings
- `testimonials` - Client testimonials
- `contact_info` - Contact information

## 🚀 First Steps

1. **Create your admin account** (see above)
2. **Update your information** with your real details
3. **Add your portfolio projects** - Upload images and descriptions
4. **Add client testimonials** - Show social proof
5. **Share your portfolio** - The client-facing site is ready!

## 🎨 Design Features

Your portfolio includes:

- ✨ Modern, professional design
- 🎯 Responsive layout (works on desktop, tablet, mobile)
- ⚡ Fast performance
- 🔒 Secure authentication
- 📊 SEO-optimized

## 📝 Seeded Sample Data

Your database has been pre-populated with sample data:

- **Portfolio Projects:** 9 featured projects
- **Services:** 4 service offerings
- **Skills:** 8 professional skills
- **Testimonials:** 5 client testimonials

You can edit or delete all of this content from the admin panel!

## 🆘 Troubleshooting

### Admin Login Not Working
- Make sure you've created a user in Supabase Auth
- Verify the user is marked as admin in the `admin_users` table
- Check that your email and password are correct

### Content Not Showing
- Make sure you've added content to all sections
- Check that Row Level Security (RLS) policies allow reading as an authenticated user
- Refresh your browser

### Images Not Uploading
- Check file size (should be under 10MB)
- Use common image formats (JPG, PNG, WebP)
- Make sure you have storage configured in Supabase

## 📱 Social Links Available

- Instagram
- LinkedIn
- Behance
- Twitter

Add your profile URLs in the contact section!

## 🎯 Next Steps

1. ✅ Database seeded with sample data
2. ✅ Admin panel ready
3. ✅ Portfolio website deployed
4. 👉 Create your admin account
5. 👉 Customize all sections with your content
6. 👉 Share with clients and potential customers!

---

**Your portfolio is now live and ready for customization!**

For support with any issues or to add more features, feel free to reach out to your development team.
