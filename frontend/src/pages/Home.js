import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowRight } from 'react-icons/fa';
import '../styles/Home.css';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/projects?featured=true')
      .then(response => {
        setFeaturedProjects(response.data.slice(0, 3));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <motion.section 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="hero-title">
              Securing Digital <span className="highlight">Infrastructure</span>
            </h1>
            <p className="hero-subtitle">
              Cybersecurity Professional | Penetration Tester | Security Researcher
            </p>
            <p className="hero-description">
              Protecting organizations from evolving threats through ethical hacking,
              vulnerability assessments, and security architecture design.
            </p>
            <div className="hero-buttons">
              <Link to="/projects" className="btn btn-primary">
                View My Work <FaArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get In Touch
              </Link>
            </div>
            <div className="social-links">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            </div>
          </motion.div>
        </div>
        <div className="hero-visual">
          <div className="terminal-window">
            <div className="terminal-header">
              <span></span><span></span><span></span>
            </div>
            <div className="terminal-body">
              <TypewriterEffect />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Projects */}
      <section className="featured-section">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {loading ? (
            <p>Loading projects...</p>
          ) : (
            featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="project-card"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="project-image">
                  <img src={project.image_url || '/placeholder.jpg'} alt={project.title} />
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies?.split(',').map((tech, i) => (
                      <span key={i} className="tech-tag">{tech.trim()}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
        <div className="text-center">
          <Link to="/projects" className="btn btn-outline">
            View All Projects
          </Link>
        </div>
      </section>
    </div>
  );
};

const TypewriterEffect = () => {
  const commands = [
    '$ nmap -sV -sC target.com',
    '$ Starting Nmap scan...',
    '$ 22/tcp   open  ssh',
    '$ 80/tcp   open  http',
    '$ 443/tcp  open  https',
    '$ Scan complete. 3 open ports found.',
  ];

  const [displayText, setDisplayText] = useState('');
  const [commandIndex, setCommandIndex] = useState(0);

  useEffect(() => {
    if (commandIndex < commands.length) {
      const command = commands[commandIndex];
      let charIndex = 0;
      
      const interval = setInterval(() => {
        if (charIndex <= command.length) {
          setDisplayText(prev => prev + command[charIndex]);
          charIndex++;
        } else {
          setDisplayText(prev => prev + '\n');
          setCommandIndex(prev => prev + 1);
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [commandIndex]);

  return <pre>{displayText}<span className="cursor">_</span></pre>;
};

export default Home;
