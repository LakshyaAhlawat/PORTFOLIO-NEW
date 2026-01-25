import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

export const attachAuthToken = (token) => {
  if (!token) {
    delete apiClient.defaults.headers.common.Authorization;
    return;
  }
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};
