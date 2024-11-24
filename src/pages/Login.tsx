import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Login() {
  const navigate = useNavigate();
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleLogin = (role: 'student' | 'reviewer' | 'approver') => {
    // Generate a unique ID for the user
    const userId = `${role}-${Date.now()}`;
    setCurrentUser({ role, id: userId });
    
    // Redirect based on role
    switch (role) {
      case 'student':
        navigate('/applications');
        break;
      case 'reviewer':
        navigate('/review');
        break;
      case 'approver':
        navigate('/approve');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <GraduationCap className="w-12 h-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          FAFSA Workflow System
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Select your role to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Choose a role</option>
                <option value="student">Student</option>
                <option value="reviewer">Reviewer</option>
                <option value="approver">Approver</option>
              </select>
            </div>

            <button
              onClick={() => handleLogin(selectedRole as 'student' | 'reviewer' | 'approver')}
              disabled={!selectedRole}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Continue as {selectedRole || '...'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}