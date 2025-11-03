import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { User, Mail, Phone, MapPin, Briefcase, Edit2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const { candidate, setCandidate } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: candidate?.fullName || '',
    phone: candidate?.phone || '',
    resumeUrl: candidate?.resumeUrl || '',
    linkedinUrl: candidate?.linkedinUrl || '',
    githubUrl: candidate?.githubUrl || '',
    portfolioUrl: candidate?.portfolioUrl || '',
    skills: candidate?.skills?.join(', ') || '',
    currentJobTitle: candidate?.currentJobTitle || '',
    currentCompany: candidate?.currentCompany || '',
    experienceYears: candidate?.experienceYears || 0,
    location: {
      city: candidate?.location?.city || '',
      state: candidate?.location?.state || '',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = {
        ...formData,
        skills: formData.skills.split(',').map((s: string) => s.trim()).filter(Boolean),
      };

      const response = await authService.updateProfile(updateData);
      setCandidate(response.candidate);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: candidate?.fullName || '',
      phone: candidate?.phone || '',
      resumeUrl: candidate?.resumeUrl || '',
      linkedinUrl: candidate?.linkedinUrl || '',
      githubUrl: candidate?.githubUrl || '',
      portfolioUrl: candidate?.portfolioUrl || '',
      skills: candidate?.skills?.join(', ') || '',
      currentJobTitle: candidate?.currentJobTitle || '',
      currentCompany: candidate?.currentCompany || '',
      experienceYears: candidate?.experienceYears || 0,
      location: {
        city: candidate?.location?.city || '',
        state: candidate?.location?.state || '',
      },
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-secondary flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="btn-secondary flex items-center gap-2"
              disabled={loading}
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="btn-primary flex items-center gap-2"
              disabled={loading}
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

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

      {isEditing ? (
        // Edit Mode
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={candidate?.email}
                  className="input bg-gray-100"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.location.city}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      location: { ...formData.location, city: e.target.value }
                    })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.location.state}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      location: { ...formData.location, state: e.target.value }
                    })}
                    className="input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Professional Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Job Title
                </label>
                <input
                  type="text"
                  value={formData.currentJobTitle}
                  onChange={(e) => setFormData({ ...formData, currentJobTitle: e.target.value })}
                  className="input"
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Company
                </label>
                <input
                  type="text"
                  value={formData.currentCompany}
                  onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                  className="input"
                  placeholder="e.g., TechCorp Inc"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) || 0 })}
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills (comma-separated)
                </label>
                <textarea
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="input"
                  rows={3}
                  placeholder="e.g., React, TypeScript, Node.js, Python"
                />
                <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Links & Documents</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume URL
                </label>
                <input
                  type="url"
                  value={formData.resumeUrl}
                  onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                  className="input"
                  placeholder="https://drive.google.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  className="input"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Profile
                </label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="input"
                  placeholder="https://github.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className="input"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>
          </div>
        </form>
      ) : (
        // View Mode - Display profile information
        <div>
          {/* Basic Information */}
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{candidate?.fullName || 'Not set'}</p>
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
                    <p className="font-medium">{candidate.phone}</p>
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
              {candidate?.currentJobTitle ? (
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
              ) : (
                <p className="text-sm text-gray-500">No job title set</p>
              )}
              <div>
                <p className="text-sm text-gray-500 mb-2">Experience</p>
                <p className="font-medium">{candidate?.experienceYears || 0} years</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          {candidate?.skills && candidate.skills.length > 0 && (
            <div className="card mb-6">
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill: string, index: number) => (
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
            <h2 className="text-xl font-semibold mb-4">Links & Documents</h2>
            <div className="space-y-3">
              {candidate?.resumeUrl ? (
                <div>
                  <p className="text-sm text-gray-500">Resume</p>
                  <a
                    href={candidate.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    View Resume →
                  </a>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No resume uploaded</p>
              )}
              {candidate?.linkedinUrl && (
                <div>
                  <p className="text-sm text-gray-500">LinkedIn</p>
                  <a
                    href={candidate.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 break-all"
                  >
                    {candidate.linkedinUrl}
                  </a>
                </div>
              )}
              {candidate?.githubUrl && (
                <div>
                  <p className="text-sm text-gray-500">GitHub</p>
                  <a
                    href={candidate.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 break-all"
                  >
                    {candidate.githubUrl}
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
                    className="text-primary-600 hover:text-primary-700 break-all"
                  >
                    {candidate.portfolioUrl}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
