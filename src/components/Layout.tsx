import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, ClipboardList, CheckCircle, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useStore((state) => state.currentUser);
  const logout = useStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8" />
              <span className="ml-2 text-xl font-semibold">FAFSA Workflow</span>
            </div>
            <div className="flex items-center space-x-4">
              {currentUser?.role === 'student' && (
                <>
                  <Link
                    to="/apply"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/apply'
                        ? 'bg-indigo-700'
                        : 'hover:bg-indigo-500'
                    }`}
                  >
                    New Application
                  </Link>
                  <Link
                    to="/applications"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/applications'
                        ? 'bg-indigo-700'
                        : 'hover:bg-indigo-500'
                    }`}
                  >
                    My Applications
                  </Link>
                </>
              )}
              {currentUser?.role === 'reviewer' && (
                <Link
                  to="/review"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/review'
                      ? 'bg-indigo-700'
                      : 'hover:bg-indigo-500'
                  }`}
                >
                  Review Applications
                </Link>
              )}
              {currentUser?.role === 'approver' && (
                <Link
                  to="/approve"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/approve'
                      ? 'bg-indigo-700'
                      : 'hover:bg-indigo-500'
                  }`}
                >
                  Approve Applications
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} FAFSA Workflow System. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}