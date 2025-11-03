import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { jobService } from '@/services/jobService';
import { useAuthStore } from '@/store/authStore';
import { MapPin, Briefcase, DollarSign, Calendar, Users, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const candidate = useAuthStore((state) => state.candidate);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  // Fetch job details
  const { data: job, isLoading } = useQuery({
    queryKey: ['job', id],
    queryFn: () => jobService.getJobById(id!),
    enabled: !!id,
  });

  // Apply mutation
  const applyMutation = useMutation({
    mutationFn: () =>
      jobService.applyForJob(id!, {
        candidateInfo: {
          fullName: candidate?.fullName,
          email: candidate?.email,
          phone: candidate?.phone,
          resumeUrl: candidate?.resumeUrl,
          skills: candidate?.skills || [],
          experienceYears: candidate?.experienceYears || 0,
          location: candidate?.location,
        },
        coverLetter,
      }),
    onSuccess: () => {
      toast.success('Application submitted successfully!');
      setShowApplicationModal(false);
      navigate('/applications');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to apply');
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Job not found</p>
        <button onClick={() => navigate('/jobs')} className="btn btn-primary mt-4">
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button onClick={() => navigate('/jobs')} className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Jobs
      </button>

      {/* Job Header */}
      <div className="card mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-xl text-gray-700">{job.companyName}</p>
          </div>
          {job.companyLogo && (
            <img src={job.companyLogo} alt={job.companyName} className="w-20 h-20 rounded object-cover" />
          )}
        </div>

        {/* Job Meta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-gray-700">
            <MapPin className="w-5 h-5 mr-3 text-gray-400" />
            <span>{job.location.city || 'Remote'} · {job.workMode}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
            <span>{job.employmentType}</span>
          </div>
          {job.salaryRange && (
            <div className="flex items-center text-gray-700">
              <DollarSign className="w-5 h-5 mr-3 text-gray-400" />
              <span>
                {job.salaryRange.currency} {job.salaryRange.min?.toLocaleString()} - {job.salaryRange.max?.toLocaleString()}
              </span>
            </div>
          )}
          {job.experienceRequired && (
            <div className="flex items-center text-gray-700">
              <Users className="w-5 h-5 mr-3 text-gray-400" />
              <span>
                {job.experienceRequired.min} - {job.experienceRequired.max} years
              </span>
            </div>
          )}
          {job.deadline && (
            <div className="flex items-center text-gray-700">
              <Calendar className="w-5 h-5 mr-3 text-gray-400" />
              <span>Apply by {format(new Date(job.deadline), 'MMM dd, yyyy')}</span>
            </div>
          )}
        </div>

        {/* Apply Button */}
        <button
          onClick={() => setShowApplicationModal(true)}
          className="btn btn-primary w-full md:w-auto"
        >
          Apply Now
        </button>
      </div>

      {/* Job Description */}
      <div className="card mb-6">
        <h2 className="text-xl font-bold mb-4">Job Description</h2>
        <div className="prose max-w-none text-gray-700 whitespace-pre-line">
          {job.description}
        </div>
      </div>

      {/* Requirements */}
      <div className="card mb-6">
        <h2 className="text-xl font-bold mb-4">Requirements</h2>
        <div className="prose max-w-none text-gray-700 whitespace-pre-line">
          {job.requirements}
        </div>
      </div>

      {/* Skills */}
      <div className="card mb-6">
        <h2 className="text-xl font-bold mb-4">Required Skills</h2>
        <div className="flex flex-wrap gap-2">
          {job.skillsRequired.map((skill) => (
            <span key={skill} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Benefits */}
      {job.benefits && job.benefits.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Benefits & Perks</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {job.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Apply for {job.title}</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Cover Letter (Optional)</label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={6}
                className="input"
                placeholder="Tell us why you're a great fit..."
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => applyMutation.mutate()}
                disabled={applyMutation.isPending}
                className="btn btn-primary flex-1"
              >
                {applyMutation.isPending ? 'Submitting...' : 'Submit Application'}
              </button>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
