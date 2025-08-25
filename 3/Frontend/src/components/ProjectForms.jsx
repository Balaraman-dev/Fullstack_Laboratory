// components/ProjectsForm.jsx
import { useState, useEffect } from 'react';

export default function ProjectsForm({ userId, onUpdate, initialData }) {
  const [projects, setProjects] = useState([
    { title: '', description: '', technologies: '', githubUrl: '' }
  ]);

  // Update form when initialData changes
  useEffect(() => {
    if (initialData && Array.isArray(initialData) && initialData.length > 0) {
      // Convert technologies array back to comma-separated string for editing
      const formattedProjects = initialData.map(project => ({
        title: project.title || '',
        description: project.description || '',
        technologies: Array.isArray(project.technologies) 
          ? project.technologies.join(', ')
          : project.technologies || '',
        githubUrl: project.githubUrl || ''
      }));
      setProjects(formattedProjects);
    }
  }, [initialData]);

  const addProject = () => {
    setProjects([
      ...projects,
      { title: '', description: '', technologies: '', githubUrl: '' }
    ]);
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Filter out projects with empty titles or descriptions
    const validProjects = projects.filter(p => p.title.trim() && p.description.trim());
    
    if (validProjects.length === 0) {
      alert('Please add at least one project with title and description.');
      return;
    }

    // Process projects: convert technologies string to array and clean data
    const processedProjects = validProjects.map(p => ({
      title: p.title.trim(),
      description: p.description.trim(),
      technologies: p.technologies
        .split(',')
        .map(t => t.trim())
        .filter(t => t), // Remove empty strings
      githubUrl: p.githubUrl.trim()
    }));

    const result = await onUpdate('projects', processedProjects);
    if (result.success) {
      alert('Projects saved successfully!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Projects</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {projects.map((project, index) => (
          <div key={index} className="p-5 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium text-gray-700">
                Project {index + 1}
              </h3>
              {projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Title *</label>
              <input
                type="text"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => updateProject(index, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Description *</label>
              <textarea
                placeholder="Describe your project, what it does, your role, etc."
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                placeholder="React, Node.js, MongoDB, Express"
                value={project.technologies}
                onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">GitHub URL</label>
              <input
                type="url"
                placeholder="https://github.com/username/repository"
                value={project.githubUrl}
                onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}

        <div className="flex gap-3 pt-3">
          <button
            type="button"
            onClick={addProject}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-1"
          >
            ➕ Add Project
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Save Projects
          </button>
        </div>
      </form>
    </div>
  );
}