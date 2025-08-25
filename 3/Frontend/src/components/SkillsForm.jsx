// components/SkillsForm.jsx
import { useState, useEffect } from 'react';

export default function SkillsForm({ userId, onUpdate, initialData }) {
  const [skills, setSkills] = useState([{ name: '', level: 'Intermediate', category: 'Frontend' }]);

  // Update form when initialData changes
  useEffect(() => {
    if (initialData && Array.isArray(initialData) && initialData.length > 0) {
      setSkills(initialData);
    }
  }, [initialData]);

  const addSkill = () => {
    setSkills([...skills, { name: '', level: 'Intermediate', category: 'Frontend' }]);
  };

  const removeSkill = (index) => {
    if (skills.length > 1) {
      setSkills(skills.filter((_, i) => i !== index));
    }
  };

  const updateSkill = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;
    setSkills(newSkills);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Filter out skills with empty names
    const validSkills = skills.filter(skill => skill.name.trim());
    
    if (validSkills.length === 0) {
      alert('Please add at least one skill with a name.');
      return;
    }

    // Clean the skills data
    const cleanedSkills = validSkills.map(skill => ({
      name: skill.name.trim(),
      level: skill.level,
      category: skill.category
    }));

    const result = await onUpdate('skills', cleanedSkills);
    if (result.success) {
      alert('Skills saved successfully!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Skills</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-center p-3 border border-gray-200 rounded-lg bg-gray-50">
            <div className="col-span-4">
              <label className="block text-xs font-medium text-gray-600 mb-1">Skill Name</label>
              <input
                type="text"
                placeholder="e.g., React"
                value={skill.name}
                onChange={(e) => updateSkill(index, 'name', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
            </div>
            
            <div className="col-span-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">Level</label>
              <select
                value={skill.level}
                onChange={(e) => updateSkill(index, 'level', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(lvl => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>
            
            <div className="col-span-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
              <select
                value={skill.category}
                onChange={(e) => updateSkill(index, 'category', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {['Frontend', 'Backend', 'Database', 'Tools', 'Other'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Action</label>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                disabled={skills.length === 1}
                className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        
        <div className="flex gap-3 pt-3">
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            ➕ Add Skill
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Save Skills
          </button>
        </div>
      </form>
    </div>
  );
}