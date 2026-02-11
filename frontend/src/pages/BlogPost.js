import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Blog.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/blog/${slug}`)
      .then(response => {
        setPost(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="blog-post-page"><p>Loading...</p></div>;
  if (!post) return <div className="blog-post-page"><p>Post not found</p></div>;

  return (
    <div className="blog-post-page">
      <Link to="/blog" className="back-link">← Back to Blog</Link>
      
      <article className="blog-post">
        <header className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
            {post.author && <span>By {post.author}</span>}
          </div>
          {post.tags && (
            <div className="post-tags">
              {post.tags.split(',').map((tag, i) => (
                <span key={i} className="tag">{tag.trim()}</span>
              ))}
            </div>
          )}
        </header>

        <div className="post-content">
          {post.content}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
