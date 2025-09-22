import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PortfolioForm = () => {
  const navigate=useNavigate();
 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [about, setAbout] = useState({
    name: '',
    role: '',
    description: ''
  });

  const [projects, setProjects] = useState([
    {
      id: Date.now(),
      name: '',
      link: '',
      img: '',
      description: ''
    }
  ]);

  const [skills, setSkills] = useState(['']);

  const [certificate, setCertificate] = useState({
    name: '',
    link: ''
  });

  const [contact, setContact] = useState({
    email: '',
    mobile: '',
    location: '',
    github: '',
    linkedin: ''
  });

  const [errors, setErrors] = useState({});

  const handleAboutChange = (field, value) => {
    setAbout(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleProjectChange = (id, field, value) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    );

    if (errors[`project-${id}-${field}`]) {
      setErrors(prev => ({ ...prev, [`project-${id}-${field}`]: '' }));
    }
  };

  const addProject = () => {
    setProjects(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        name: '',
        link: '',
        img: '',
        description: ''
      }
    ]);
  };

  const deleteProject = (id) => {
    if (projects.length > 1) {
      setProjects(prev => prev.filter(project => project.id !== id));
    }
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
    
    if (errors[`skill-${index}`]) {
      setErrors(prev => ({ ...prev, [`skill-${index}`]: '' }));
    }
  };

  const addSkill = () => {
    setSkills(prev => [...prev, '']);
  };

  const deleteSkill = (index) => {
    if (skills.length > 1) {
      const newSkills = [...skills];
      newSkills.splice(index, 1);
      setSkills(newSkills);
    }
  };

  const handleCertificateChange = (field, value) => {
    setCertificate(prev => ({ ...prev, [field]: value }));

    if (errors[`certificate-${field}`]) {
      setErrors(prev => ({ ...prev, [`certificate-${field}`]: '' }));
    }
  };

  const handleContactChange = (field, value) => {
    setContact(prev => ({ ...prev, [field]: value }));
    if (errors[`contact-${field}`]) {
      setErrors(prev => ({ ...prev, [`contact-${field}`]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!about.name.trim()) newErrors.name = 'Name is required';
    if (!about.role.trim()) newErrors.role = 'Role is required';
    if (!about.description.trim()) newErrors.description = 'Description is required';

    projects.forEach(project => {
      if (!project.name.trim()) newErrors[`project-${project.id}-name`] = 'Project name is required';
      if (!project.link.trim()) newErrors[`project-${project.id}-link`] = 'Project link is required';
      if (project.img && !isValidUrl(project.img)) {
        newErrors[`project-${project.id}-img`] = 'Image must be a valid URL';
      }
      if (!project.description.trim()) newErrors[`project-${project.id}-description`] = 'Project description is required';
    });

    skills.forEach((skill, index) => {
      if (!skill.trim()) newErrors[`skill-${index}`] = 'Skill cannot be empty';
    });

    if ((certificate.name && !certificate.link) || (!certificate.name && certificate.link)) {
      if (certificate.name && !certificate.link) {
        newErrors['certificate-link'] = 'Certificate link is required when name is provided';
      }
      if (!certificate.name && certificate.link) {
        newErrors['certificate-name'] = 'Certificate name is required when link is provided';
      }
    }
    if (certificate.link && !isValidUrl(certificate.link)) {
      newErrors['certificate-link'] = 'Certificate link must be a valid URL';
    }

    if (!contact.email.trim()) {
      newErrors['contact-email'] = 'Email is required';
    } else if (!isValidEmail(contact.email)) {
      newErrors['contact-email'] = 'Email is not valid';
    }
    
    if (!contact.mobile.trim()) {
      newErrors['contact-mobile'] = 'Mobile number is required';
    } else if (!isValidPhone(contact.mobile)) {
      newErrors['contact-mobile'] = 'Mobile number is not valid';
    }
    
    if (!contact.location.trim()) newErrors['contact-location'] = 'Location is required';
    
    if (contact.github && !isValidUrl(contact.github)) {
      newErrors['contact-github'] = 'GitHub link must be a valid URL';
    }
    
    if (contact.linkedin && !isValidUrl(contact.linkedin)) {
      newErrors['contact-linkedin'] = 'LinkedIn link must be a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const userId = localStorage.getItem("userId");
  console.log(userId);
  if (!userId) {
    alert("User not logged in. Please log in again.");
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log(userId);

  if (validateForm()) {
    const formData = {
      userId: userId,  
      about: {
        name: about.name,
        role: about.role,
        description: about.description,
      },
      projects,
      skills,
      certificate,
      contact: {
        email: contact.email,
        mobile: contact.mobile,
        location: contact.location,
        github: contact.github || "",
        linkedin: contact.linkedin || "",
      },
    };

    try {
      const response = await fetch("http://localhost:3000/createportfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save portfolio");
      }

      alert("Portfolio data saved successfully!");
      console.log("Saved Portfolio Data:", result.data);
      navigate("/loadportfolio");

    } catch (error) {
      console.error("Error saving portfolio:", error);
      alert("Error saving portfolio: " + error.message);
    }
  } else {
    alert("Please fix the validation errors before submitting");
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Portfolio Form</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">About</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={about.name}
                onChange={(e) => handleAboutChange('name', e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your full name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role *
              </label>
              <input
                type="text"
                id="role"
                value={about.role}
                onChange={(e) => handleAboutChange('role', e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                  errors.role ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your professional role"
              />
              {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                rows="4"
                value={about.description}
                onChange={(e) => handleAboutChange('description', e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Tell us about yourself"
              ></textarea>
              {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Projects</h2>
            <button
              type="button"
              onClick={addProject}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              + Add Project
            </button>
          </div>
          
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={project.id} className="p-4 border border-gray-200 rounded-lg relative">
                {projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => deleteProject(project.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
                    aria-label="Delete project"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                
                <h3 className="text-lg font-medium mb-3 text-gray-700">Project {index + 1}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => handleProjectChange(project.id, 'name', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                        errors[`project-${project.id}-name`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Project name"
                    />
                    {errors[`project-${project.id}-name`] && (
                      <p className="mt-1 text-sm text-red-500">{errors[`project-${project.id}-name`]}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Link *
                    </label>
                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                        errors[`project-${project.id}-link`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="https://example.com"
                    />
                    {errors[`project-${project.id}-link`] && (
                      <p className="mt-1 text-sm text-red-500">{errors[`project-${project.id}-link`]}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL (optional)
                  </label>
                  <input
                    type="url"
                    value={project.img}
                    onChange={(e) => handleProjectChange(project.id, 'img', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                      errors[`project-${project.id}-img`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors[`project-${project.id}-img`] && (
                    <p className="mt-1 text-sm text-red-500">{errors[`project-${project.id}-img`]}</p>
                  )}
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    rows="3"
                    value={project.description}
                    onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                      errors[`project-${project.id}-description`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Project description"
                  ></textarea>
                  {errors[`project-${project.id}-description`] && (
                    <p className="mt-1 text-sm text-red-500">{errors[`project-${project.id}-description`]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Skills</h2>
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              + Add Skill
            </button>
          </div>
          
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-grow">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                      errors[`skill-${index}`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Skill name"
                  />
                  {errors[`skill-${index}`] && (
                    <p className="mt-1 text-sm text-red-500">{errors[`skill-${index}`]}</p>
                  )}
                </div>
                {skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => deleteSkill(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
                    aria-label="Delete skill"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Certificate</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certificate Name
              </label>
              <input
                type="text"
                value={certificate.name}
                onChange={(e) => handleCertificateChange('name', e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                  errors['certificate-name'] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Certificate name"
              />
              {errors['certificate-name'] && (
                <p className="mt-1 text-sm text-red-500">{errors['certificate-name']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certificate Link
              </label>
              <input
                type="url"
                value={certificate.link}
                onChange={(e) => handleCertificateChange('link', e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                  errors['certificate-link'] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://example.com/certificate"
              />
              {errors['certificate-link'] && (
                <p className="mt-1 text-sm text-red-500">{errors['certificate-link']}</p>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={contact.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                  errors['contact-email'] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
              {errors['contact-email'] && (
                <p className="mt-1 text-sm text-red-500">{errors['contact-email']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                value={contact.mobile}
                onChange={(e) => handleContactChange('mobile', e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                  errors['contact-mobile'] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+1234567890"
              />
              {errors['contact-mobile'] && (
                <p className="mt-1 text-sm text-red-500">{errors['contact-mobile']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                value={contact.location}
                onChange={(e) => handleContactChange('location', e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                  errors['contact-location'] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="City, Country"
              />
              {errors['contact-location'] && (
                <p className="mt-1 text-sm text-red-500">{errors['contact-location']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GitHub Profile Link
              </label>
              <input
                type="url"
                value={contact.github}
                onChange={(e) => handleContactChange('github', e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                  errors['contact-github'] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://github.com/username"
              />
              {errors['contact-github'] && (
                <p className="mt-1 text-sm text-red-500">{errors['contact-github']}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn Profile Link
              </label>
              <input
                type="url"
                value={contact.linkedin}
                onChange={(e) => handleContactChange('linkedin', e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                  errors['contact-linkedin'] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://linkedin.com/in/username"
              />
              {errors['contact-linkedin'] && (
                <p className="mt-1 text-sm text-red-500">{errors['contact-linkedin']}</p>
              )}
            </div>
          </div>
        </section>

        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition transform hover:scale-105"
          >
            Save Portfolio
          </button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioForm;