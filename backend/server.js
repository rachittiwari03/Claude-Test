require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============ PUBLIC ROUTES ============

// Get all projects
app.get('/api/projects', (req, res) => {
  const featured = req.query.featured;
  let query = 'SELECT * FROM projects';
  if (featured === 'true') {
    query += ' WHERE featured = 1';
  }
  query += ' ORDER BY created_at DESC';
  
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get single project
app.get('/api/projects/:id', (req, res) => {
  db.get('SELECT * FROM projects WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(row);
  });
});

// Get all skills
app.get('/api/skills', (req, res) => {
  db.all('SELECT * FROM skills ORDER BY category, proficiency DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get all certifications
app.get('/api/certifications', (req, res) => {
  db.all('SELECT * FROM certifications ORDER BY date_obtained DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get published blog posts
app.get('/api/blog', (req, res) => {
  db.all('SELECT * FROM blog_posts WHERE published = 1 ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get single blog post
app.get('/api/blog/:slug', (req, res) => {
  db.get('SELECT * FROM blog_posts WHERE slug = ? AND published = 1', [req.params.slug], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(row);
  });
});

// Submit contact form
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }
  
  db.run(
    'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
    [name, email, subject, message],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Message sent successfully', id: this.lastID });
    }
  );
});

// ============ ADMIN ROUTES (Add authentication middleware in production) ============

// Create project
app.post('/api/admin/projects', (req, res) => {
  const { title, description, technologies, image_url, project_url, github_url, category, featured } = req.body;
  
  db.run(
    'INSERT INTO projects (title, description, technologies, image_url, project_url, github_url, category, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [title, description, technologies, image_url, project_url, github_url, category, featured || 0],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Project created', id: this.lastID });
    }
  );
});

// Update project
app.put('/api/admin/projects/:id', (req, res) => {
  const { title, description, technologies, image_url, project_url, github_url, category, featured } = req.body;
  
  db.run(
    'UPDATE projects SET title=?, description=?, technologies=?, image_url=?, project_url=?, github_url=?, category=?, featured=? WHERE id=?',
    [title, description, technologies, image_url, project_url, github_url, category, featured, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Project updated' });
    }
  );
});

// Delete project
app.delete('/api/admin/projects/:id', (req, res) => {
  db.run('DELETE FROM projects WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Project deleted' });
  });
});

// Similar CRUD endpoints for skills, certifications, and blog posts...

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
