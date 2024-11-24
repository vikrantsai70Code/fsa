import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import ApplicationStatus from '../components/ApplicationStatus';

export default function ApproveApplications() {
  const applications = useStore((state) => state.applications);
  const updateApplication = useStore((state) => state.updateApplication);
  const [approvalNotes, setApprovalNotes] = useState<string>('');
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

  // Only show applications that have been reviewed and are pending approval
  const reviewedApplications = applications.filter(app => app.status === 'under-review');

  const handleApproval = (applicationId: string, decision: 'approved' | 'denied') => {
    if (!approvalNotes.trim()) {
      alert('Please add approval notes before submitting');
      return;
    }

    updateApplication(applicationId, {
      status: decision,
      approverNotes: approvalNotes,
    });
    setApprovalNotes('');
    setSelectedApplication(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Approve Applications</h2>
        <div className="text-sm text-gray-500">
          {reviewedApplications.length} application(s) pending approval
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {reviewedApplications.map((application) => (
            <li key={application.id} className="hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-indigo-600">
                      Application #{application.id}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Applicant:</span> {application.personalInfo.fullName}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Submitted:</span> {new Date(application.submissionDate || '').toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">School Code:</span> {application.educationalInfo.schoolCodes.join(', ')}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Enrollment:</span> {application.educationalInfo.enrollmentStatus}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Adjusted Gross Income:</span> ${application.financialInfo.taxReturnData.adjustedGrossIncome.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <ApplicationStatus status={application.status} />
                </div>

                <div className="mt-4 bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">Reviewer Notes:</span> {application.reviewerNotes}
                  </p>
                </div>

                {selectedApplication === application.id ? (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Approval Notes</label>
                      <textarea
                        rows={3}
                        className="mt-1 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Enter your approval notes..."
                        value={approvalNotes}
                        onChange={(e) => setApprovalNotes(e.target.value)}
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleApproval(application.id, 'approved')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Approve Application
                      </button>
                      <button
                        onClick={() => handleApproval(application.id, 'denied')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Deny Application
                      </button>
                      <button
                        onClick={() => {
                          setSelectedApplication(null);
                          setApprovalNotes('');
                        }}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedApplication(application.id)}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Review for Approval
                  </button>
                )}
              </div>
            </li>
          ))}
          {reviewedApplications.length === 0 && (
            <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
              No applications pending approval.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}