import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FAFSAApplication } from '../types/fafsa';

interface Store {
  applications: FAFSAApplication[];
  currentUser: {
    role: 'student' | 'reviewer' | 'approver';
    id: string;
  } | null;
  addApplication: (application: FAFSAApplication) => void;
  updateApplication: (id: string, updates: Partial<FAFSAApplication>) => void;
  setCurrentUser: (user: Store['currentUser']) => void;
  logout: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      applications: [
        {
          id: '1',
          personalInfo: {
            ssn: 'student-1',
            fullName: 'John Doe',
            dateOfBirth: '2000-01-01',
            email: 'john@example.com',
            phone: '123-456-7890',
          },
          financialInfo: {
            taxReturnData: {
              adjustedGrossIncome: 45000,
              taxableIncome: 35000,
            },
            estimatedFamilyContribution: 5000,
          },
          educationalInfo: {
            schoolCodes: ['SCH001'],
            enrollmentStatus: 'full-time',
          },
          status: 'submitted',
          submissionDate: '2024-03-15T10:00:00Z',
        }
      ],
      currentUser: null,
      addApplication: (application) =>
        set((state) => ({
          applications: [...state.applications, application],
        })),
      updateApplication: (id, updates) =>
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, ...updates } : app
          ),
        })),
      setCurrentUser: (user) => set({ currentUser: user }),
      logout: () => set({ currentUser: null }),
    }),
    {
      name: 'fafsa-storage',
    }
  )
);