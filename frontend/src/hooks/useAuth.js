import { useEffect } from 'react';
import { attachAuthToken } from '../services/apiClient';
import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const ctx = useAuthContext();

  useEffect(() => {
    attachAuthToken(ctx.token);
  }, [ctx.token]);

  return ctx;
};
