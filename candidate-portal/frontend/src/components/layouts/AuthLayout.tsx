import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary-600">HireFlow AI</h1>
            <p className="text-gray-600 mt-2">Find your dream job with AI</p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
