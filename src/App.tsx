import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from './components/Layout';
import { useStore } from './store/useStore';

// Lazy load pages
const Login = React.lazy(() => import('./pages/Login'));
const ApplicationForm = React.lazy(() => import('./pages/ApplicationForm'));
const Applications = React.lazy(() => import('./pages/Applications'));
const ReviewApplications = React.lazy(() => import('./pages/ReviewApplications'));
const ApproveApplications = React.lazy(() => import('./pages/ApproveApplications'));

export default function App() {
  const currentUser = useStore((state) => state.currentUser);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Login />
            </React.Suspense>
          }
        />
        <Route
          path="/"
          element={currentUser ? <Layout /> : <Navigate to="/login" />}
        >
          <Route
            path="apply"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <ApplicationForm />
              </React.Suspense>
            }
          />
          <Route
            path="applications"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Applications />
              </React.Suspense>
            }
          />
          <Route
            path="review"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <ReviewApplications />
              </React.Suspense>
            }
          />
          <Route
            path="approve"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <ApproveApplications />
              </React.Suspense>
            }
          />
          <Route path="" element={<Navigate to={currentUser?.role === 'student' ? '/applications' : `/${currentUser?.role}`} />} />
        </Route>
      </Routes>
    </Router>
  );
}