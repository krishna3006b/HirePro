import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Briefcase, User, LogOut, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MainLayout() {
  const navigate = useNavigate();
  const { candidate, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/jobs" className="flex items-center space-x-2">
              <Briefcase className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">HireFlow AI</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/jobs"
                className="text-gray-700 hover:text-primary-600 font-medium transition"
              >
                Browse Jobs
              </Link>
              <Link
                to="/applications"
                className="text-gray-700 hover:text-primary-600 font-medium transition"
              >
                My Applications
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                {candidate?.fullName}
              </span>
              <Link
                to="/profile"
                className="p-2 rounded-full hover:bg-gray-100 transition"
                title="Profile"
              >
                <User className="w-5 h-5 text-gray-700" />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-gray-100 transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2025 HireFlow AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
