import { useEffect, useState } from 'react';
import { deleteResumePdf, fetchResume, updateResume, uploadResumePdf, uploadResumePdfWithMeta, deleteResumePdfByPublicId, updateResumePdfMeta } from '../services/resumeService';

export const useResume = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const resume = await fetchResume();
      setData(resume);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { resume: data, loading, error, reload: load };
};

export const useAdminResume = () => {
  const [saving, setSaving] = useState(false);
  const [pdfSaving, setPdfSaving] = useState(false);
  const [error, setError] = useState(null);

  const saveStructured = async (payload) => {
    setSaving(true);
    setError(null);
    try {
      const resume = await updateResume(payload);
      return resume;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const uploadPdf = async (file) => {
    setPdfSaving(true);
    setError(null);
    try {
      return await uploadResumePdf(file);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setPdfSaving(false);
    }
  };

  const deletePdf = async () => {
    setPdfSaving(true);
    setError(null);
    try {
      return await deleteResumePdf();
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setPdfSaving(false);
    }
  };

  const uploadPdfWithMeta = async (file, meta) => {
    setPdfSaving(true);
    setError(null);
    try {
      return await uploadResumePdfWithMeta(file, meta);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setPdfSaving(false);
    }
  };

  const deletePdfByPublicId = async (publicId) => {
    setPdfSaving(true);
    setError(null);
    try {
      return await deleteResumePdfByPublicId(publicId);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setPdfSaving(false);
    }
  };

  const updatePdfMeta = async (publicId, meta) => {
    setPdfSaving(true);
    setError(null);
    try {
      return await updateResumePdfMeta(publicId, meta);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setPdfSaving(false);
    }
  };

  return { saveStructured, uploadPdf, deletePdf, uploadPdfWithMeta, deletePdfByPublicId, updatePdfMeta, saving, pdfSaving, error };
};
