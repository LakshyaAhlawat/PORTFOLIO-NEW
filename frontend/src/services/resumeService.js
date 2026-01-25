import { apiClient } from './apiClient';

export const fetchResume = async () => {
  const { data } = await apiClient.get('/resume');
  return data.resume;
};

export const updateResume = async (payload) => {
  const { data } = await apiClient.put('/resume', payload);
  return data.resume;
};

export const uploadResumePdf = async (file) => {
  const formData = new FormData();
  formData.append('pdf', file);
  const { data } = await apiClient.post('/resume/pdf', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.pdf;
};

export const deleteResumePdf = async () => {
  const { data } = await apiClient.delete('/resume/pdf');
  return data;
};

export const uploadResumePdfWithMeta = async (file, meta = {}) => {
  const formData = new FormData();
  formData.append('pdf', file);
  if (meta.title) formData.append('title', meta.title);
  if (meta.purpose) formData.append('purpose', meta.purpose);
  const { data } = await apiClient.post('/resume/pdfs', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.pdf;
};

export const deleteResumePdfByPublicId = async (publicId) => {
  const { data } = await apiClient.delete(`/resume/pdfs/${encodeURIComponent(publicId)}`);
  return data;
};

export const updateResumePdfMeta = async (publicId, meta = {}) => {
  const { data } = await apiClient.patch(`/resume/pdfs/${encodeURIComponent(publicId)}`, meta);
  return data.pdf;
};
