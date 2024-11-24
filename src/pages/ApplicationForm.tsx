import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import type { FAFSAApplication } from '../types/fafsa';

export default function ApplicationForm() {
  const navigate = useNavigate();
  const addApplication = useStore((state) => state.addApplication);
  const currentUser = useStore((state) => state.currentUser);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<FAFSAApplication>>({
    personalInfo: {
      ssn: currentUser?.id || '',
      fullName: '',
      dateOfBirth: '',
      email: '',
      phone: '',
    },
    financialInfo: {
      taxReturnData: {
        adjustedGrossIncome: 0,
        taxableIncome: 0,
      },
      estimatedFamilyContribution: 0,
    },
    educationalInfo: {
      schoolCodes: [''],
      enrollmentStatus: 'full-time',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const application: FAFSAApplication = {
      ...formData,
      id: Date.now().toString(),
      status: 'submitted',
      submissionDate: new Date().toISOString(),
      personalInfo: {
        ...formData.personalInfo!,
        ssn: currentUser?.id || '',
      },
      educationalInfo: {
        ...formData.educationalInfo!,
        schoolCodes: formData.educationalInfo!.schoolCodes.filter(code => code !== ''),
      },
    } as FAFSAApplication;
    
    addApplication(application);
    navigate('/applications');
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.personalInfo?.fullName && 
               formData.personalInfo?.dateOfBirth &&
               formData.personalInfo?.email &&
               formData.personalInfo?.phone;
      case 2:
        return formData.financialInfo?.taxReturnData.adjustedGrossIncome >= 0 && 
               formData.financialInfo?.taxReturnData.taxableIncome >= 0;
      case 3:
        return formData.educationalInfo?.schoolCodes[0] && 
               formData.educationalInfo?.enrollmentStatus;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.personalInfo?.fullName || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo!,
                        fullName: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.personalInfo?.dateOfBirth || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo!,
                        dateOfBirth: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.personalInfo?.email || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo!,
                        email: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.personalInfo?.phone || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo!,
                        phone: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Financial Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Adjusted Gross Income
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.financialInfo?.taxReturnData.adjustedGrossIncome}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      financialInfo: {
                        ...formData.financialInfo!,
                        taxReturnData: {
                          ...formData.financialInfo!.taxReturnData,
                          adjustedGrossIncome: Number(e.target.value),
                        },
                      },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Taxable Income
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.financialInfo?.taxReturnData.taxableIncome}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      financialInfo: {
                        ...formData.financialInfo!,
                        taxReturnData: {
                          ...formData.financialInfo!.taxReturnData,
                          taxableIncome: Number(e.target.value),
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Educational Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enrollment Status
                </label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.educationalInfo?.enrollmentStatus}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      educationalInfo: {
                        ...formData.educationalInfo!,
                        enrollmentStatus: e.target.value as 'full-time' | 'part-time',
                      },
                    })
                  }
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  School Code
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter school code"
                  value={formData.educationalInfo?.schoolCodes[0] || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      educationalInfo: {
                        ...formData.educationalInfo!,
                        schoolCodes: [e.target.value],
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-lg text-gray-600">Submitting your application...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait while we process your information.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-xl font-semibold mb-6">FAFSA Application</h2>
          
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex items-center ${
                    step < currentStep
                      ? 'text-indigo-600'
                      : step === currentStep
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  }`}
                >
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      step <= currentStep
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {step}
                  </span>
                  <span className="ml-2 text-sm font-medium">
                    {step === 1
                      ? 'Personal'
                      : step === 2
                      ? 'Financial'
                      : 'Educational'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStep()}

            <div className="mt-6 flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Previous
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  type="button"
                  disabled={!validateStep()}
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!validateStep()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Submit Application
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}