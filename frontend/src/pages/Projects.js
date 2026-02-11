import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import '../styles/Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/projects')
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      });
  }, []);

  const categories = ['all', ...new Set(projects.map(p => p.category).filter(Boolean))];
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>My Projects</h1>
        <p>A collection of security tools, research, and penetration testing projects</p>
      </div>

      <div className="projects-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${filter === category ? 'active' : ''}`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="projects-container">
        {loading ? (
          <p>Loading projects...</p>
        ) : filteredProjects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="project-image">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} />
                  ) : (
                    <div className="placeholder-image">
                      <span>🔒</span>
                    </div>
                  )}
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  
                  <div className="project-technologies">
                    {project.technologies?.split(',').map((tech, i) => (
                      <span key={i} className="tech-badge">{tech.trim()}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link">
                        <FaGithub /> Code
                      </a>
                    )}
                    {project.project_url && (
                      <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="project-link">
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
