import React from 'react';
import { useStore } from '../store/useStore';
import ApplicationStatus from '../components/ApplicationStatus';
import { useNavigate } from 'react-router-dom';

export default function Applications() {
  const navigate = useNavigate();
  const applications = useStore((state) => state.applications);
  const currentUser = useStore((state) => state.currentUser);

  // Filter applications for the current student
  const userApplications = applications.filter(
    (app) => app.personalInfo.ssn === currentUser?.id
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>
        <button
          onClick={() => navigate('/apply')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          New Application
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {userApplications.map((application) => (
            <li key={application.id} className="hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-indigo-600">
                      Application #{application.id}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Submitted: {new Date(application.submissionDate || '').toLocaleDateString()}
                    </p>
                  </div>
                  <ApplicationStatus status={application.status} />
                </div>

                {(application.reviewerNotes || application.approverNotes) && (
                  <div className="mt-4 space-y-2">
                    {application.reviewerNotes && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Reviewer Notes:</span> {application.reviewerNotes}
                      </p>
                    )}
                    {application.approverNotes && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Approver Notes:</span> {application.approverNotes}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
          {userApplications.length === 0 && (
            <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
              No applications found. Start a new application to begin.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}