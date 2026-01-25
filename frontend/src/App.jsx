import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { SkillsPage } from './pages/SkillsPage.jsx';
import { ProjectsPage } from './pages/ProjectsPage.jsx';
import { ResumePage } from './pages/ResumePage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { AdminDashboardPage } from './pages/AdminDashboardPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { SignupPage } from './pages/SignupPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { useAuth } from './hooks/useAuth.js';

const ProtectedAdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const { initialized } = useAuth();
  if (!initialized) {
    return null; // or a loader
  }
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
