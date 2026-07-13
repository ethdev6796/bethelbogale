# Quick Start Guide - Bethel Bogale Portfolio

## 🎯 Get Started in 3 Steps

### Step 1: Create Your Admin Account
1. Visit http://localhost:3000
2. Click the **Admin** button (top right)
3. Sign up with: **bethel@bogale.design**
4. Create a strong password

### Step 2: Add Yourself as Admin
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Run this SQL:
```sql
SELECT id FROM auth.users WHERE email = 'bethel@bogale.design';
-- Copy the user ID
INSERT INTO admin_users (id, is_admin)
VALUES ('PASTE_USER_ID_HERE', true);
```

### Step 3: Login & Start Editing
1. Go to http://localhost:3000/auth/login
2. Login with your email and password
3. Visit http://localhost:3000/admin/dashboard
4. Start updating your portfolio content!

---

## 📝 What to Edit First

1. **Update Your Photo**
   - Go to Admin > About
   - Upload your professional photo

2. **Edit Your Bio**
   - Go to Admin > About
   - Update your biography
   - Customize your stats

3. **Update Contact Info**
   - Go to Admin > Contact
   - Add your real email and phone
   - Update social media links

4. **Add Your Projects**
   - Go to Admin > Portfolio
   - Delete sample projects
   - Add your real work with images and descriptions

5. **Customize Services**
   - Go to Admin > Services
   - Update service names and pricing
   - Match your actual offerings

---

## 🎨 Current Demo Data

The portfolio is pre-loaded with sample data:
- 9 sample projects
- 8 professional skills
- 5 client testimonials
- 4 service offerings

**You can delete and replace all of this with your own content!**

---

## 🌐 Live URLs

- **Portfolio:** http://localhost:3000
- **Admin Login:** http://localhost:3000/auth/login
- **Admin Dashboard:** http://localhost:3000/admin/dashboard

---

## 🚀 Deploy to the Web

Ready to go live? Deploy to Vercel:

1. Push your code to GitHub
2. Go to vercel.com and connect your repo
3. Add your Supabase environment variables
4. Click Deploy!

Your portfolio will be live instantly!

---

## 💡 Pro Tips

✓ Use high-quality images for projects
✓ Write compelling project descriptions
✓ Keep your bio concise but impactful
✓ Update testimonials as you get them
✓ Use your real contact information
✓ Link to your social media profiles
✓ Regularly update your portfolio with new work

---

## 📞 Need Help?

Check the documentation files:
- `PORTFOLIO_COMPLETE.md` - Full details
- `PROJECT_SUMMARY.md` - Technical overview
- `ADMIN_SETUP_GUIDE.md` - Detailed setup instructions

---

**That's it! You're all set to showcase your work. Good luck!** 🎬✨
