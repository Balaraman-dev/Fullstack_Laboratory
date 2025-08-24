// components/ProfileDisplay.jsx
export default function ProfileDisplay({ profile }) {
  if (!profile) return (
    <p className="text-gray-500">No profile found. Save data to see preview.</p>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{profile.about?.name}</h1>
        <p className="text-xl text-blue-600 font-medium">{profile.about?.title}</p>
        {profile.about?.experience && (
          <p className="text-gray-600">💼 {profile.about.experience} years of experience</p>
        )}
      </div>

      {/* Bio */}
      <p className="text-gray-700 leading-relaxed">{profile.about?.bio}</p>

      {/* Profile Image */}
      {profile.about?.profileImage && (
        <img
          src={profile.about.profileImage}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full border-4 border-blue-100"
        />
      )}

      {/* Skills */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills?.map((s, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
            >
              {s.name} ({s.level})
            </span>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Projects</h2>
        {profile.projects?.map((p, i) => (
          <div key={i} className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-gray-800">{p.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{p.description}</p>
            <p className="text-xs text-gray-500">
              <strong>Tech:</strong> {p.technologies.join(', ')}
            </p>
            {p.githubUrl && (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm hover:underline"
              >
                GitHub →
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Contact */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Contact</h2>
        <div className="space-y-1 text-sm text-gray-600">
          <p>Email: {profile.contact?.email}</p>
          <p>Phone: {profile.contact?.phone || '–'}</p>
          {profile.contact?.linkedin && (
            <p>
              LinkedIn:{' '}
              <a href={profile.contact.linkedin} target="_blank" className="text-blue-600 hover:underline">
                {profile.contact.linkedin}
              </a>
            </p>
          )}
          {profile.contact?.github && (
            <p>
              GitHub:{' '}
              <a href={profile.contact.github} target="_blank" className="text-blue-600 hover:underline">
                {profile.contact.github}
              </a>
            </p>
          )}
          <p>Location: {profile.contact?.location || '–'}</p>
        </div>
      </div>
    </div>
  );
}