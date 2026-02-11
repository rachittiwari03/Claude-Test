# 🚀 QUICK START GUIDE

## Get Your Portfolio Running in 5 Minutes!

### Step 1: Install Dependencies

**Backend:**
```bash
cd cybersec-portfolio/backend
npm install
```

**Frontend:**
```bash
cd cybersec-portfolio/frontend
npm install
```

### Step 2: Configure Environment

```bash
cd backend
cp .env.example .env
```

The default settings will work fine for local development!

### Step 3: Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
✅ Backend running on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
✅ Frontend running on http://localhost:3000

### Step 4: View Your Portfolio

Open your browser to: **http://localhost:3000**

## 🎨 First Customizations

### 1. Update Your Info (5 minutes)

Edit `frontend/src/pages/Home.js`:
- Line 34-35: Your name and title
- Line 37-39: Your description
- Lines 47-58: Social media links

### 2. Change Colors (2 minutes)

Edit `frontend/src/styles/App.css`:
```css
:root {
  --primary-color: #00ff88;  /* Your main color */
  --secondary-color: #0066ff; /* Your accent color */
}
```

### 3. Add Your First Project (via API)

Use Postman, Insomnia, or curl:
```bash
curl -X POST http://localhost:5000/api/admin/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Security Scanner",
    "description": "Automated vulnerability scanner",
    "technologies": "Python, Nmap",
    "category": "Security Tools",
    "featured": true
  }'
```

## 📱 Features Overview

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Project showcase with filtering
- ✅ Blog system
- ✅ Contact form
- ✅ Skills & certifications display
- ✅ Database-powered content
- ✅ Cybersecurity-themed design

## 🎯 Next Steps

1. **Add Content**: Use the API endpoints to add projects, skills, blog posts
2. **Customize Design**: Modify CSS files in `frontend/src/styles/`
3. **Add Photos**: Place images in `frontend/public/images/`
4. **Deploy**: Follow deployment guide in main README.md

## 🆘 Troubleshooting

**Port 5000 already in use?**
```bash
# Edit backend/.env
PORT=5001
```

**CORS errors?**
- Make sure backend is running first
- Check backend console for errors

**Database not working?**
- Database auto-creates on first backend start
- Check `backend/database/` folder

## 📚 Documentation

Full documentation in `README.md`

---

Need help? Check the main README or open an issue!
