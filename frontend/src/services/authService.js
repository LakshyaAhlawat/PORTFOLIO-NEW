import { apiClient } from './apiClient';

export const loginWithEmail = async ({ email, password }) => {
  const { data } = await apiClient.post('/auth/login', { email, password });
  return data;
};

export const signupWithEmail = async ({ name, email, password, confirmPassword }) => {
  const { data } = await apiClient.post('/auth/signup', {
    name,
    email,
    password,
    confirmPassword,
  });
  return data;
};

export const getGoogleOAuthUrl = () => {
  const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
  return `${base.replace(/\/api$/, '')}/api/auth/google`;
};
