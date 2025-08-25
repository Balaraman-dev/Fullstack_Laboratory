// App.jsx
import { useState, useEffect } from 'react';
import AboutForm from './AboutForm.jsx';
import ContactForm from './ContactForms';
import ProjectsForm from './ProjectForms';
import ProfileDisplay from './ProfileDisplay';
import SkillsForm from './SkillsForm';

export default function App() {
  const [userId, setUserId] = useState('john-doe'); // Default userId for testing
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`http://localhost:5173/api/users/${userId}`);
      const data = await res.json();
      
      if (data.success) {
        setProfile(data.data);
      } else {
        // User doesn't exist yet, that's okay
        setProfile(null);
        console.log("User profile not found - will be created on first save");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (section, data) => {
    if (!userId) {
      alert('Please enter a User ID first');
      return { success: false };
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5173/api/users', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId, 
          [section]: data[section] || data 
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();

      if (result.success) {
        await fetchProfile(); // Refresh the profile
      } else {
        setError(result.message || 'Update failed');
        alert(`Error: ${result.message || 'Update failed'}`);
      }

      return result;
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMsg = error.message || 'Network error occurred';
      setError(errorMsg);
      alert(`Error: ${errorMsg}`);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Portfolio Updater</h1>
        
        {/* User ID Input */}
        <div className="flex gap-4 mb-8 bg-white p-4 rounded-xl shadow-md">
          <input
            type="text"
            placeholder="Enter User ID (e.g., john-doe)"
            value={userId}
            onChange={(e) => setUserId(e.target.value.toLowerCase().trim())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchProfile}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load Profile'}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
            Error: {error}
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Forms Section */}
          <div className="space-y-6">
            <AboutForm 
              userId={userId} 
              onUpdate={handleUpdate} 
              initialData={profile?.about}
            />
            <SkillsForm 
              userId={userId} 
              onUpdate={handleUpdate} 
              initialData={profile?.skills}
            />
            <ProjectsForm 
              userId={userId} 
              onUpdate={handleUpdate} 
              initialData={profile?.projects}
            />
            <ContactForm 
              userId={userId} 
              onUpdate={handleUpdate} 
              initialData={profile?.contact}
            />
          </div>

          {/* Profile Preview Section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Public Profile Preview</h2>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <ProfileDisplay profile={profile} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}