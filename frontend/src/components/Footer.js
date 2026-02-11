import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>CyberSec Portfolio</h3>
          <p>Building secure digital solutions through ethical hacking and security research.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect</h4>
          <div className="footer-social">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="mailto:your.email@example.com">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CyberSec Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
