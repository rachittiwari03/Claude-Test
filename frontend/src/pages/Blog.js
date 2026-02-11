import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../styles/Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/blog')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Blog</h1>
        <p>Security insights, tutorials, and research findings</p>
      </div>

      <div className="blog-container">
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No blog posts yet. Check back soon!</p>
        ) : (
          <div className="blog-grid">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                className="blog-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="blog-meta">
                  <span className="blog-date">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <div className="blog-tags">
                    {post.tags?.split(',').map((tag, i) => (
                      <span key={i} className="blog-tag">{tag.trim()}</span>
                    ))}
                  </div>
                </div>
                <h2>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="read-more">
                  Read More →
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
