import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/About.css';

const About = () => {
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    // Fetch skills
    axios.get('/api/skills')
      .then(response => setSkills(response.data))
      .catch(error => console.error('Error:', error));

    // Fetch certifications
    axios.get('/api/certifications')
      .then(response => setCertifications(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About Me</h1>
        <p>Cybersecurity Professional | Ethical Hacker | Security Researcher</p>
      </div>

      <section className="about-intro">
        <h2>Who I Am</h2>
        <p>
          I'm a passionate cybersecurity professional with expertise in penetration testing,
          vulnerability assessment, and security architecture. With a background in ethical hacking
          and defensive security, I help organizations identify and mitigate security risks.
        </p>
      </section>

      <section className="skills-section">
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          {skills.length > 0 ? (
            skills.map(skill => (
              <div key={skill.id} className="skill-card">
                <h3>{skill.name}</h3>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{width: `${skill.proficiency}%`}}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p>Add your skills through the admin dashboard</p>
          )}
        </div>
      </section>

      <section className="certifications-section">
        <h2>Certifications</h2>
        <div className="cert-grid">
          {certifications.length > 0 ? (
            certifications.map(cert => (
              <div key={cert.id} className="cert-card">
                <h3>{cert.name}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-date">{new Date(cert.date_obtained).getFullYear()}</p>
              </div>
            ))
          ) : (
            <p>Add your certifications through the admin dashboard</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;
