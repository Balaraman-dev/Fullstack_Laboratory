// components/ProjectsForm.jsx
import { useState } from 'react';

export default function ProjectsForm({ userId, onUpdate }) {
  const [projects, setProjects] = useState([
    { title: '', description: '', technologies: '', githubUrl: '' }
  ]);

  const addProject = () => {
    setProjects([
      ...projects,
      { title: '', description: '', technologies: '', githubUrl: '' }
    ]);
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const processed = projects.map(p => ({
      ...p,
      technologies: p.technologies
        .split(',')
        .map(t => t.trim())
        .filter(t => t)
    }));
    const result = await onUpdate('projects', { projects: processed });
    if (result.success) alert('Projects saved!');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Projects</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {projects.map((project, index) => (
          <div key={index} className="p-5 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
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
              <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
              <textarea
                placeholder="Describe your project..."
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
                placeholder="React, Node.js, MongoDB"
                value={project.technologies}
                onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">GitHub URL</label>
              <input
                type="url"
                placeholder="https://github.com/user/repo"
                value={project.githubUrl}
                onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="button"
              onClick={() => removeProject(index)}
              className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
            >
              Remove Project
            </button>
          </div>
        ))}

        <div className="flex gap-3 pt-3">
          <button
            type="button"
            onClick={addProject}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-1"
          >
            + Add Project
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