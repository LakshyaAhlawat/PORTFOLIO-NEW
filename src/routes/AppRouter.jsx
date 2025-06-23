import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Resume from "../pages/Resume";
import ProtectedRoute from "../components/ProtectedRoute";
import Work from "../pages/Work";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import PageTransition from "../components/PageTransition";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <PageTransition><Resume /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <PageTransition><Work /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <PageTransition><Services /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <PageTransition><Contact /></PageTransition>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}