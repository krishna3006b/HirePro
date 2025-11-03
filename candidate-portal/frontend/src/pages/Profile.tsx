import { useAuthStore } from '@/store/authStore';
import { User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export default function Profile() {
  const candidate = useAuthStore((state) => state.candidate);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      {/* Profile Completion */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Profile Completion</h2>
          <span className="text-2xl font-bold text-primary-600">
            {candidate?.profileCompletionPercentage || 0}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary-600 h-3 rounded-full transition-all"
            style={{ width: `${candidate?.profileCompletionPercentage || 0}%` }}
          ></div>
        </div>
        {!candidate?.isProfileComplete && (
          <p className="text-sm text-gray-600 mt-2">
            Complete your profile to increase your chances of getting hired
          </p>
        )}
      </div>

      {/* Basic Information */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <User className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{candidate?.fullName}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{candidate?.email}</p>
            </div>
          </div>
          {candidate?.phone && (
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{candidate?.phone}</p>
              </div>
            </div>
          )}
          {candidate?.location?.city && (
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">
                  {candidate.location.city}, {candidate.location.state}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Professional Information */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-6">Professional Information</h2>
        <div className="space-y-4">
          {candidate?.currentJobTitle && (
            <div className="flex items-center">
              <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Current Position</p>
                <p className="font-medium">
                  {candidate.currentJobTitle}
                  {candidate.currentCompany && ` at ${candidate.currentCompany}`}
                </p>
              </div>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-500 mb-2">Experience</p>
            <p className="font-medium">{candidate?.experienceYears || 0} years</p>
          </div>
          {candidate?.education && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Education</p>
              <p className="font-medium">{candidate.education.replace('_', ' ')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Skills */}
      {candidate?.skills && candidate.skills.length > 0 && (
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Links</h2>
        <div className="space-y-3">
          {candidate?.resumeUrl && (
            <div>
              <p className="text-sm text-gray-500">Resume</p>
              <a
                href={candidate.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                View Resume
              </a>
            </div>
          )}
          {candidate?.linkedinUrl && (
            <div>
              <p className="text-sm text-gray-500">LinkedIn</p>
              <a
                href={candidate.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                {candidate.linkedinUrl}
              </a>
            </div>
          )}
          {candidate?.portfolioUrl && (
            <div>
              <p className="text-sm text-gray-500">Portfolio</p>
              <a
                href={candidate.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                {candidate.portfolioUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
