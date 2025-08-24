// components/AboutForm.jsx
import { useState } from 'react';

export default function AboutForm({ userId, onUpdate }) {
  const [about, setAbout] = useState({
    name: '',
    title: '',
    bio: '',
    experience: '',
    profileImage: '',
    resumeUrl: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onUpdate('about', about);
    if (result.success) alert('About section saved!');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">About</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Name"
          value={about.name}
          onChange={(e) => setAbout({ ...about, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          placeholder="Title"
          value={about.title}
          onChange={(e) => setAbout({ ...about, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Bio"
          value={about.bio}
          onChange={(e) => setAbout({ ...about, bio: e.target.value })}
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          placeholder="Experience (years)"
          value={about.experience}
          onChange={(e) => setAbout({ ...about, experience: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Profile Image URL"
          value={about.profileImage}
          onChange={(e) => setAbout({ ...about, profileImage: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Resume URL"
          value={about.resumeUrl}
          onChange={(e) => setAbout({ ...about, resumeUrl: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Save About
        </button>
      </form>
    </div>
  );
}