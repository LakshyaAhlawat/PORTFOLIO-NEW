import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Section } from '../atoms/Section.jsx';
import { Heading } from '../atoms/Heading.jsx';
import { Text } from '../atoms/Text.jsx';
import { Button } from '../atoms/Button.jsx';
import { signupWithEmail } from '../services/authService.js';
import { useAuth } from '../hooks/useAuth.js';
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || '';

export const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  // If already authenticated, send to About page instead of showing signup
  const { user } = useAuth();
  if (user) {
    navigate('/about');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (ADMIN_EMAIL && email !== ADMIN_EMAIL) {
      setError('Signups are restricted to the portfolio admin email.');
      setLoading(false);
      return;
    }
    try {
      const data = await signupWithEmail({ name, email, password, confirmPassword });
      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      // Surface more detail so failures are easier to debug
      const backendMessage =
        typeof err.response?.data === 'string'
          ? err.response.data
          : err.response?.data?.message;
      setError(backendMessage || err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <Section className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <Heading level={2} className="mb-2 text-center">
          Create account
        </Heading>
        <Text className="mb-4 text-center text-xs text-gray-500 dark:text-gray-400">
          Use your email to create a portfolio admin account. Only your configured admin email will
          have resume management rights.
        </Text>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:scale-[0.995] active:scale-95 transition-transform"
            >
              <svg className="h-4 w-4 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to home
            </Link>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
              Confirm password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950"
            />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <Button type="submit" className="mt-2 w-full" disabled={loading}>
            {loading ? 'Creating account…' : 'Sign up'}
          </Button>
        </form>
        <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </Section>
    </div>
  );
};
