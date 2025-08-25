// components/ContactForm.jsx
import { useState, useEffect } from 'react';

export default function ContactForm({ userId, onUpdate, initialData }) {
  const [contact, setContact] = useState({
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    website: '',
    location: ''
  });

  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setContact({
        email: initialData.email || '',
        phone: initialData.phone || '',
        linkedin: initialData.linkedin || '',
        github: initialData.github || '',
        website: initialData.website || '',
        location: initialData.location || ''
      });
    }
  }, [initialData]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateURL = (url) => {
    if (!url) return true; // Optional URLs are valid when empty
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Email validation
    if (!contact.email.trim()) {
      setEmailError('Email is required.');
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(contact.email)) {
      setEmailError('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    // URL validations
    if (contact.linkedin && !validateURL(contact.linkedin)) {
      alert('Please enter a valid LinkedIn URL.');
      setIsSubmitting(false);
      return;
    }

    if (contact.github && !validateURL(contact.github)) {
      alert('Please enter a valid GitHub URL.');
      setIsSubmitting(false);
      return;
    }

    if (contact.website && !validateURL(contact.website)) {
      alert('Please enter a valid website URL.');
      setIsSubmitting(false);
      return;
    }

    setEmailError('');

    // Clean the data
    const cleanedContact = {
      email: contact.email.trim().toLowerCase(),
      phone: contact.phone.trim(),
      linkedin: contact.linkedin.trim(),
      github: contact.github.trim(),
      website: contact.website.trim(),
      location: contact.location.trim()
    };

    try {
      const result = await onUpdate('contact', cleanedContact);
      if (result.success) {
        alert('Contact information saved successfully!');
      }
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Failed to save contact information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setContact(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear email error when user starts typing
    if (field === 'email' && emailError) {
      setEmailError('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={contact.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              emailError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            required
            disabled={isSubmitting}
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={contact.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
          <p className="text-xs text-gray-500 mt-1">Include country code for international numbers</p>
        </div>

        {/* LinkedIn Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">LinkedIn</label>
          <input
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            value={contact.linkedin}
            onChange={(e) => handleInputChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
        </div>

        {/* GitHub Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">GitHub</label>
          <input
            type="url"
            placeholder="https://github.com/yourusername"
            value={contact.github}
            onChange={(e) => handleInputChange('github', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
        </div>

        {/* Website Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Personal Website</label>
          <input
            type="url"
            placeholder="https://yourwebsite.com"
            value={contact.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
        </div>

        {/* Location Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
          <input
            type="text"
            placeholder="San Francisco, CA"
            value={contact.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
          <p className="text-xs text-gray-500 mt-1">City, State/Province, Country</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 mt-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save Contact Information'}
        </button>

        {/* Help Text */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Tips:</strong>
          </p>
          <ul className="text-xs text-gray-500 mt-1 space-y-1">
            <li>• Email is required - this will be your primary contact method</li>
            <li>• All URLs should include https:// or http://</li>
            <li>• Your LinkedIn profile helps with professional networking</li>
            <li>• GitHub showcases your code and projects</li>
          </ul>
        </div>
      </form>
    </div>
  );
}