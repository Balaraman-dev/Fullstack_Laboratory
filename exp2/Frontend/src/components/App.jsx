
import { useState, useEffect } from 'react';
import AboutForm from './AboutForm';
import ContactForm from './ContactForms';
import ProjectsForm from './ProjectForms';
import ProfileDisplay from './ProfileDisplay'
import SkillsForm from './SkillsForm';
import API from './api';

export default function App() {
  const [userId, setUserId] = useState('john-doe');
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    const res = await API.getUserProfile(userId);
    if (res.success) setProfile(res.data);
  };

  const handleUpdate = async (section, data) => {
    const res = await API.createOrUpdateUser(userId,   data);
    if (res.success) fetchProfile();
    return res;
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Portfolio Manager</h1>

        {/* User ID Input */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter User ID (e.g., john-doe)"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchProfile}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Load Profile
          </button>
        </div>

        {/* Two-column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Edit Forms */}
          <div className="space-y-6">
            <AboutForm userId={userId} onUpdate={handleUpdate} />
            <SkillsForm userId={userId} onUpdate={handleUpdate} />
            <ProjectsForm userId={userId} onUpdate={handleUpdate} />
            <ContactForm userId={userId} onUpdate={handleUpdate} />
          </div>

          {/* Right: Preview */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Public Profile</h2>
            <ProfileDisplay profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}