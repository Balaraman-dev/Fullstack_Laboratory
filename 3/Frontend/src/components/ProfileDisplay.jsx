// components/ProfileDisplay.jsx
export default function ProfileDisplay({ profile }) {
  if (!profile) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <p className="text-gray-500">No profile found.</p>
        <p className="text-gray-400 text-sm mt-1">Save your information to see the preview here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center">
        {profile.about?.profileImage && (
          <img
            src={profile.about.profileImage}
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full border-4 border-blue-100 mx-auto mb-4"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
        <h1 className="text-3xl font-bold text-gray-800">
          {profile.about?.name || 'Name not provided'}
        </h1>
        <p className="text-xl text-blue-600 font-medium">
          {profile.about?.title || 'Title not provided'}
        </p>
        {profile.about?.experience && (
          <p className="text-gray-600 mt-2">
            💼 {profile.about.experience} years of experience
          </p>
        )}
        {profile.about?.location && (
          <p className="text-gray-600">📍 {profile.about.location}</p>
        )}
      </div>

      {/* Bio Section */}
      {profile.about?.bio && (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">About</h2>
          <p className="text-gray-700 leading-relaxed">{profile.about.bio}</p>
        </div>
      )}

      {/* Resume Link */}
      {profile.about?.resumeUrl && (
        <div>
          <a
            href={profile.about.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            📄 View Resume
          </a>
        </div>
      )}

      {/* Skills Section */}
      {profile.skills && profile.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Skills</h2>
          <div className="space-y-2">
            {['Frontend', 'Backend', 'Database', 'Tools', 'Other'].map(category => {
              const categorySkills = profile.skills.filter(s => s.category === category);
              if (categorySkills.length === 0) return null;
              
              return (
                <div key={category} className="mb-3">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 text-sm rounded-full font-medium ${
                          skill.level === 'Expert' ? 'bg-purple-100 text-purple-800' :
                          skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                          skill.level === 'Intermediate' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {skill.name} ({skill.level})
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {profile.projects && profile.projects.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Projects</h2>
          <div className="space-y-4">
            {profile.projects.map((project, i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800 text-lg">{project.title}</h3>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                </div>
                <p className="text-gray-600 mb-3 leading-relaxed">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, j) => (
                      <span
                        key={j}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Section */}
      {profile.contact && (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Contact</h2>
          <div className="space-y-2 text-sm">
            {profile.contact.email && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">📧</span>
                <a href={`mailto:${profile.contact.email}`} className="text-blue-600 hover:underline">
                  {profile.contact.email}
                </a>
              </div>
            )}
            {profile.contact.phone && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">📱</span>
                <a href={`tel:${profile.contact.phone}`} className="text-blue-600 hover:underline">
                  {profile.contact.phone}
                </a>
              </div>
            )}
            {profile.contact.linkedin && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">💼</span>
                <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  LinkedIn Profile
                </a>
              </div>
            )}
            {profile.contact.github && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">💻</span>
                <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  GitHub Profile
                </a>
              </div>
            )}
            {profile.contact.website && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">🌐</span>
                <a href={profile.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Personal Website
                </a>
              </div>
            )}
            {profile.contact.location && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">📍</span>
                <span className="text-gray-600">{profile.contact.location}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}