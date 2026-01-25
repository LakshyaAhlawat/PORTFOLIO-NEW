import { apiClient } from './apiClient';

export const fetchProjects = async () => {
  const { data } = await apiClient.get('/projects');
  return data.projects || [];
};

export const createProject = async (payload) => {
  const { data } = await apiClient.post('/projects', payload);
  return data.project;
};

export const updateProject = async (id, payload) => {
  const { data } = await apiClient.put(`/projects/${id}`, payload);
  return data.project;
};

export const deleteProject = async (id) => {
  const { data } = await apiClient.delete(`/projects/${id}`);
  return data;
};
