// components/ContactForm.jsx
import { useState } from 'react';

export default function ContactForm({ userId, onUpdate }) {
  const [contact, setContact] = useState({
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    website: '',
    location: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onUpdate('contact', { contact });
    if (result.success) alert('Contact info saved!');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Email *</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
          <input
            type="text"
            placeholder="+1 (555) 123-4567"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">LinkedIn</label>
          <input
            type="url"
            placeholder="https://linkedin.com/in/you"
            value={contact.linkedin}
            onChange={(e) => setContact({ ...contact, linkedin: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">GitHub</label>
          <input
            type="url"
            placeholder="https://github.com/you"
            value={contact.github}
            onChange={(e) => setContact({ ...contact, github: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Personal Website</label>
          <input
            type="url"
            placeholder="https://yourwebsite.com"
            value={contact.website}
            onChange={(e) => setContact({ ...contact, website: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
          <input
            type="text"
            placeholder="San Francisco, CA"
            value={contact.location}
            onChange={(e) => setContact({ ...contact, location: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Save Contact
        </button>
      </form>
    </div>
  );
}