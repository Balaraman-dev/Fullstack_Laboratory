// components/AboutForm.jsx
import { useState, useEffect } from 'react';

export default function AboutForm({ userId, onUpdate, initialData }) {
  const [about, setAbout] = useState({
    name: '',
    title: '',
    bio: '',
    experience: '',
    profileImage: '',
    resumeUrl: '',
  });

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setAbout({
        name: initialData.name || '',
        title: initialData.title || '',
        bio: initialData.bio || '',
        experience: initialData.experience || '',
        profileImage: initialData.profileImage || '',
        resumeUrl: initialData.resumeUrl || '',
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!about.name.trim() || !about.title.trim() || !about.bio.trim()) {
      alert('Name, title, and bio are required fields.');
      return;
    }

    // Prepare data - convert experience to number if provided
    const aboutData = {
      ...about,
      name: about.name.trim(),
      title: about.title.trim(),
      bio: about.bio.trim(),
      experience: about.experience ? parseInt(about.experience) : undefined,
    };

    const result = await onUpdate('about', aboutData);
    if (result.success) {
      alert('About section saved successfully!');
    }
  };

  const handleInputChange = (field, value) => {
    setAbout(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">About</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Name *</label>
          <input
            type="text"
            placeholder="Your full name"
            value={about.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Title *</label>
          <input
            type="text"
            placeholder="Your professional title"
            value={about.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Bio *</label>
          <textarea
            placeholder="Tell us about yourself..."
            value={about.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Experience (years)</label>
          <input
            type="number"
            placeholder="Years of experience"
            value={about.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Profile Image URL</label>
          <input
            type="url"
            placeholder="https://example.com/your-photo.jpg"
            value={about.profileImage}
            onChange={(e) => handleInputChange('profileImage', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Resume URL</label>
          <input
            type="url"
            placeholder="https://example.com/your-resume.pdf"
            value={about.resumeUrl}
            onChange={(e) => handleInputChange('resumeUrl', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Save About Section
        </button>
      </form>
    </div>
  );
}