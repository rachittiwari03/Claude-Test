import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post('/api/contact', formData);
      setStatus({ 
        type: 'success', 
        message: 'Message sent successfully! I\'ll get back to you soon.' 
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>Have a question or want to work together? Drop me a message!</p>
      </div>

      <div className="contact-container">
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2>Let's Connect</h2>
          <p>
            I'm always interested in hearing about new opportunities, 
            security challenges, or just connecting with fellow professionals.
          </p>

          <div className="contact-methods">
            <div className="contact-method">
              <FaEnvelope className="contact-icon" />
              <div>
                <h3>Email</h3>
                <a href="mailto:your.email@example.com">your.email@example.com</a>
              </div>
            </div>

            <div className="contact-method">
              <FaLinkedin className="contact-icon" />
              <div>
                <h3>LinkedIn</h3>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/yourusername
                </a>
              </div>
            </div>

            <div className="contact-method">
              <FaGithub className="contact-icon" />
              <div>
                <h3>GitHub</h3>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                  github.com/yourusername
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form 
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {status.message && (
            <div className={`status-message ${status.type}`}>
              {status.message}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
