// components/SkillsForm.jsx
import { useState } from 'react';

export default function SkillsForm({ userId, onUpdate }) {
  const [skills, setSkills] = useState([{ name: '', level: 'Intermediate', category: 'Frontend' }]);

  const addSkill = () => setSkills([...skills, { name: '', level: 'Intermediate', category: 'Frontend' }]);
  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

  const updateSkill = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;
    setSkills(newSkills);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onUpdate('skills', { skills });
    if (result.success) alert('Skills saved!');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Skills</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 items-center p-3 border border-gray-200 rounded-lg">
            <input
              placeholder="Name"
              value={skill.name}
              onChange={(e) => updateSkill(index, 'name', e.target.value)}
              className="col-span-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              value={skill.level}
              onChange={(e) => updateSkill(index, 'level', e.target.value)}
              className="col-span-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(lvl => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
            <select
              value={skill.category}
              onChange={(e) => updateSkill(index, 'category', e.target.value)}
              className="col-span-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {['Frontend', 'Backend', 'Database', 'Tools', 'Other'].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="col-span-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        ))}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            + Add Skill
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Skills
          </button>
        </div>
      </form>
    </div>
  );
}