# Cybersecurity Professional Portfolio

A modern, responsive portfolio website for cybersecurity professionals built with React, Node.js, Express, and SQLite. Features a dynamic content management system, project showcase, blog, and contact form.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dynamic Content**: Manage projects, skills, certifications, and blog posts through the database
- **Modern UI**: Cybersecurity-themed design with smooth animations
- **Project Showcase**: Display your security projects with images, descriptions, and tech stacks
- **Blog System**: Share security insights and tutorials
- **Contact Form**: Allow visitors to reach out directly
- **Admin Dashboard Ready**: Backend API prepared for admin content management
- **Database Powered**: SQLite database for easy deployment and data persistence

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Framer Motion (animations)
- React Icons
- Axios

### Backend
- Node.js
- Express.js
- SQLite3
- JWT (for future authentication)
- bcryptjs (for password hashing)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone or Download the Project

### 2. Backend Setup

```bash
cd cybersec-portfolio/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your settings
# PORT=5000
# JWT_SECRET=your_secret_key_here

# Start the backend server
npm start

# Or use nodemon for development
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
cd cybersec-portfolio/frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will start on `http://localhost:3000`

## 📊 Database Structure

The SQLite database includes the following tables:

- **projects**: Your security projects and portfolio items
- **skills**: Technical skills with proficiency levels
- **certifications**: Security certifications and credentials
- **blog_posts**: Blog articles and security insights
- **contact_messages**: Messages from the contact form
- **admin_users**: Admin authentication (for future implementation)

## 🎨 Customization

### 1. Update Personal Information

Edit these files to add your information:

- `frontend/src/pages/Home.js` - Update name, title, description, and social links
- `frontend/src/pages/Contact.js` - Update email and social media links
- `frontend/src/components/Footer.js` - Update footer links

### 2. Color Theme

Modify the CSS variables in `frontend/src/styles/App.css`:

```css
:root {
  --primary-color: #00ff88;      /* Main accent color */
  --secondary-color: #0066ff;    /* Secondary accent */
  --dark-bg: #0a0e27;           /* Main background */
  --accent-cyan: #00d4ff;       /* Highlight color */
}
```

### 3. Add Content

You can add content directly to the database or use the backend API:

**Add a Project:**
```bash
POST /api/admin/projects
{
  "title": "Vulnerability Scanner",
  "description": "Automated security vulnerability scanner",
  "technologies": "Python, Nmap, Metasploit",
  "github_url": "https://github.com/yourusername/scanner",
  "category": "Security Tools",
  "featured": true
}
```

**Add a Blog Post:**
```bash
POST /api/admin/blog
{
  "title": "Understanding SQL Injection",
  "slug": "understanding-sql-injection",
  "content": "Full blog post content here...",
  "excerpt": "A brief summary...",
  "tags": "security, web-security, sql",
  "published": true
}
```

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints at:
- Mobile: < 640px
- Tablet: 641px - 968px
- Desktop: > 968px

## 🔐 Adding Authentication (Optional)

To add admin authentication:

1. Uncomment authentication middleware in `backend/server.js`
2. Create authentication routes for login/register
3. Use JWT tokens for protected routes
4. Build admin dashboard frontend pages

Example middleware:
```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Push your code to GitHub
2. Connect to deployment platform
3. Set environment variables
4. Deploy!

### Frontend Deployment (Vercel/Netlify)

1. Build the production version:
```bash
cd frontend
npm run build
```

2. Deploy the `build` folder to your hosting service

3. Update the API URL in your frontend to point to your deployed backend

## 📝 API Endpoints

### Public Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `GET /api/skills` - Get all skills
- `GET /api/certifications` - Get all certifications
- `GET /api/blog` - Get published blog posts
- `GET /api/blog/:slug` - Get single blog post
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Add auth middleware)
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- Similar endpoints for skills, certifications, and blog posts

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📄 License

This project is open source and available under the MIT License.

## 💡 Tips

1. **Images**: Store project images in `frontend/public/images/` or use external URLs
2. **SEO**: Update meta tags in `public/index.html` for better SEO
3. **Performance**: Use lazy loading for images in production
4. **Security**: Always validate and sanitize user inputs
5. **Testing**: Add tests before deploying to production

## 🐛 Troubleshooting

**CORS Issues**: Make sure backend has CORS enabled for your frontend URL

**Database Connection**: Check that SQLite database file has proper permissions

**Port Conflicts**: Change ports in `.env` if 5000 or 3000 are already in use

## 📞 Support

For questions or issues, please open an issue on GitHub or contact through the portfolio contact form.

---

Built with ❤️ for the cybersecurity community
