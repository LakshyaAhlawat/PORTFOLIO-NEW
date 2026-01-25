import { useEffect, useState } from 'react';
import { createProject, deleteProject, fetchProjects, updateProject } from '../services/projectsService';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchProjects();
      setProjects(list);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { projects, loading, error, reload: load };
};

export const useAdminProjects = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const create = async (payload) => {
    setSaving(true);
    setError(null);
    try {
      return await createProject(payload);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const update = async (id, payload) => {
    setSaving(true);
    setError(null);
    try {
      return await updateProject(id, payload);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    setSaving(true);
    setError(null);
    try {
      return await deleteProject(id);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return { create, update, remove, saving, error };
};
