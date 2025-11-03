import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { applicationService } from '@/services/applicationService';
import { Application } from '@/types';
import { format } from 'date-fns';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const statusColors = {
  applied: 'bg-blue-100 text-blue-800',
  under_review: 'bg-yellow-100 text-yellow-800',
  shortlisted: 'bg-green-100 text-green-800',
  interview_scheduled: 'bg-purple-100 text-purple-800',
  interviewed: 'bg-indigo-100 text-indigo-800',
  rejected: 'bg-red-100 text-red-800',
  hired: 'bg-green-100 text-green-800',
  withdrawn: 'bg-gray-100 text-gray-800',
};

export default function MyApplications() {
  const { data, isLoading } = useQuery({
    queryKey: ['myApplications'],
    queryFn: () => applicationService.getMyApplications(),
  });

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">My Applications</h1>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Applications</h1>

      {data?.applications.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 mb-4">You haven't applied to any jobs yet</p>
          <Link to="/jobs" className="btn btn-primary">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {data?.applications.map((application: Application) => (
            <div key={application._id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <Link
                    to={`/jobs/${application.jobId._id}`}
                    className="text-xl font-semibold text-gray-900 hover:text-primary-600"
                  >
                    {application.jobId.title}
                  </Link>
                  <p className="text-gray-600 mt-1">{application.jobId.companyName}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusColors[application.status as keyof typeof statusColors]
                  }`}
                >
                  {application.status.replace('_', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Applied {format(new Date(application.appliedAt), 'MMM dd, yyyy')}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {application.jobId.location.city || 'Remote'} · {application.jobId.workMode}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {application.jobId.employmentType}
                </div>
              </div>

              {/* Scores */}
              {(application.resumeScore || application.aiInterviewScore || application.overallScore) && (
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  {application.resumeScore && (
                    <div>
                      <p className="text-xs text-gray-500">Resume Score</p>
                      <p className="font-semibold text-primary-600">{application.resumeScore}%</p>
                    </div>
                  )}
                  {application.aiInterviewScore && (
                    <div>
                      <p className="text-xs text-gray-500">Interview Score</p>
                      <p className="font-semibold text-primary-600">{application.aiInterviewScore}%</p>
                    </div>
                  )}
                  {application.overallScore && (
                    <div>
                      <p className="text-xs text-gray-500">Overall Score</p>
                      <p className="font-semibold text-primary-600">{application.overallScore}%</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
