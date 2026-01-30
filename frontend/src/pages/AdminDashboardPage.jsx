import { useState, useEffect } from 'react';
import { apiClient } from '../services/apiClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../atoms/Section.jsx';
import { Heading } from '../atoms/Heading.jsx';
import { Text } from '../atoms/Text.jsx';
import { Button } from '../atoms/Button.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useAdminProjects, useProjects } from '../hooks/useProjects.js';
import { useAdminResume, useResume } from '../hooks/useResume.js';
import { SiteHeader } from '../organisms/SiteHeader.jsx';
import { SiteFooter } from '../organisms/SiteFooter.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';

export const AdminDashboardPage = () => {
  const { user, logout } = useAuth();
  const { projects, reload: reloadProjects } = useProjects();
  const { create, update, remove } = useAdminProjects();
  const { resume, reload: reloadResume } = useResume();
  const { uploadPdf, deletePdf, uploadPdfWithMeta, deletePdfByPublicId, updatePdfMeta, error: resumeError } = useAdminResume();
  const [pdfFile, setPdfFile] = useState(null);
  const [multiPdfFile, setMultiPdfFile] = useState(null);
  const [multiTitle, setMultiTitle] = useState('');
  const [multiPurpose, setMultiPurpose] = useState('');
  const [savingPdf, setSavingPdf] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle | uploading | success | error
  const [projectImageFile, setProjectImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [confirmState, setConfirmState] = useState({ open: false, title: '', message: '', action: null });

  useEffect(() => {
    if (!projectImageFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(projectImageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [projectImageFile]);

  const handlePdfUpload = async (e) => {
    e.preventDefault();
    if (!pdfFile) return;
    setSavingPdf(true);
    setUploadStatus('uploading');
    try {
      await uploadPdf(pdfFile);
      await reloadResume();
      setUploadStatus('success');
      setPdfFile(null);
      setTimeout(() => setUploadStatus('idle'), 2000);
    } catch (err) {
      setUploadStatus('error');
    } finally {
      setSavingPdf(false);
    }
  };

  const handlePdfDelete = async () => {
    setSavingPdf(true);
    try {
      await deletePdf();
      await reloadResume();
    } finally {
      setSavingPdf(false);
    }
  };


  // Show confirm dialog and store the action to run on confirm
  const showConfirm = ({ title, message, action }) => {
    setConfirmState({ open: true, title, message, action });
  };

  // Close confirm dialog
  const closeConfirm = () => setConfirmState({ open: false, title: '', message: '', action: null });

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50">
      <SiteHeader />
      {/* ConfirmDialog for all destructive actions */}
      <ConfirmDialog
        open={confirmState.open}
        title={confirmState.title}
        message={confirmState.message}
        onConfirm={async () => {
          if (typeof confirmState.action === 'function') {
            await confirmState.action();
          }
          closeConfirm();
        }}
        onCancel={closeConfirm}
      />
      <main className="flex-1 py-10">
        <Section>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Heading level={2}>Admin Dashboard</Heading>
              <Text className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Signed in as {user?.email}
              </Text>
            </div>
            <Button variant="ghost" onClick={logout}>
              Log out
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
          <section className="space-y-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <Heading level={3}>Resume PDF</Heading>
            <Text className="text-xs">
              Upload, replace, or delete the single active resume PDF. Visitors see a download button
              only when a PDF is present.
            </Text>
            <form onSubmit={handlePdfUpload} className="space-y-3 text-sm">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                className="block w-full text-xs text-gray-700 file:mr-3 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:px-3 file:py-1 file:text-xs file:font-medium hover:file:bg-gray-200 dark:text-gray-200 dark:file:border-gray-700 dark:file:bg-gray-800 dark:hover:file:bg-gray-700"
              />
              <div className="flex gap-3 items-center">
                <Button type="submit" disabled={!pdfFile || savingPdf}>
                  {savingPdf ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-blue-500" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
                      Uploading...
                    </span>
                  ) : 'Upload / Replace PDF'}
                </Button>
                {resume?.pdf?.url && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => showConfirm({ title: 'Delete current resume', message: 'Delete this resume?', action: async () => { await handlePdfDelete(); } })}
                    disabled={savingPdf}
                  >
                    Delete PDF
                  </Button>
                )}
                <AnimatePresence>
                  {uploadStatus === 'success' && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="ml-2 flex items-center text-green-600 text-xs font-semibold"
                    >
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Upload successful!
                    </motion.span>
                  )}
                  {uploadStatus === 'error' && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="ml-2 flex items-center text-red-600 text-xs font-semibold"
                    >
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      Upload failed
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {resume?.pdf?.url && (
                <a
                  href={resume.pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-blue-600 underline"
                >
                  View current PDF
                </a>
              )}
              {resumeError && (
                <p className="text-xs text-red-500">
                  {resumeError.response?.data?.message || resumeError.message || 'Failed to update resume PDF'}
                </p>
              )}
            </form>
          </section>

            <section className="space-y-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <Heading level={3}>Resumes (multiple)</Heading>
              <Text className="text-xs">Upload multiple resume PDFs with a title and purpose. Manage which are available to visitors.</Text>
              <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (!multiPdfFile) return;
                  setSavingPdf(true);
                  try {
                    await uploadPdfWithMeta(multiPdfFile, { title: multiTitle, purpose: multiPurpose });
                    await reloadResume();
                    setMultiPdfFile(null);
                    setMultiTitle('');
                    setMultiPurpose('');
                  } catch (err) {
                    console.error('Multi resume upload failed', err);
                    alert(err?.response?.data?.message || err?.message || 'Upload failed');
                  } finally {
                    setSavingPdf(false);
                  }
              }} className="space-y-2 text-sm">
                <input type="text" value={multiTitle} onChange={(e) => setMultiTitle(e.target.value)} placeholder="Title (e.g. Senior Frontend Resume)" className="w-full rounded-md border px-3 py-2 bg-gray-50 dark:bg-gray-800" />
                <input type="text" value={multiPurpose} onChange={(e) => setMultiPurpose(e.target.value)} placeholder="Purpose (e.g. Job applications, Freelance, University)" className="w-full rounded-md border px-3 py-2 bg-gray-50 dark:bg-gray-800" />
                <input type="file" accept="application/pdf" onChange={(e) => setMultiPdfFile(e.target.files?.[0] || null)} className="w-full rounded-md" />
                <div className="flex gap-2">
                  <Button type="submit" disabled={!multiPdfFile || savingPdf}>{savingPdf ? 'Uploading...' : 'Upload Resume'}</Button>
                  <Button type="button" variant="ghost" onClick={async () => { await reloadResume(); }}>Refresh</Button>
                </div>
              </form>

              <div className="mt-4">
                <Heading level={4}>Uploaded Resumes</Heading>
                <ul className="mt-2 space-y-2 text-sm">
                  {(resume?.pdfs || []).map((p) => (
                    <li key={p.publicId} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{p.title || 'Untitled'}</div>
                        <div className="text-xs text-gray-500">{p.purpose} · {new Date(p.uploadedAt).toLocaleString()}</div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <span className={`text-sm ${p.downloadable ? 'text-green-400' : 'text-gray-400'}`}>{p.downloadable ? 'Downloadable' : 'Not downloadable'}</span>
                        {p.downloadable ? (
                          <a href={p.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">View</a>
                        ) : (
                          <button type="button" className="text-gray-400" disabled>Preview</button>
                        )}

                        <button type="button" onClick={async () => {
                          try {
                            await updatePdfMeta(p.publicId, { downloadable: !p.downloadable });
                            await reloadResume();
                          } catch (err) {
                            alert(err?.response?.data?.message || err?.message || 'Update failed');
                          }
                        }} className="text-sm text-indigo-400 hover:underline">Toggle Download</button>

                        <button
                          type="button"
                          onClick={() => showConfirm({ title: 'Delete resume', message: 'Delete this resume?', action: async () => {
                            try {
                              await deletePdfByPublicId(p.publicId);
                              await reloadResume();
                            } catch (err) {
                              alert(err?.response?.data?.message || err?.message || 'Delete failed');
                            }
                          } })}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                  {!resume?.pdfs?.length && <li className="text-xs text-gray-500">No uploaded resumes</li>}
                </ul>
              </div>
            </section>

          <section className="space-y-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <Heading level={3}>Projects (overview)</Heading>
            <Text className="text-xs">
              Create, update, or delete projects. Projects created here appear on the public Projects page.
            </Text>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                let imageUrl = fd.get('image');

                try {
                  if (projectImageFile) {
                    setUploadingImage(true);
                    setUploadProgress(0);
                    const form = new FormData();
                    form.append('image', projectImageFile);

                    const { data } = await apiClient.post('/projects/upload-image', form, {
                      headers: { 'Content-Type': 'multipart/form-data' },
                      onUploadProgress: (progressEvent) => {
                        if (progressEvent.lengthComputable) {
                          const percent = (progressEvent.loaded / progressEvent.total) * 100;
                          setUploadProgress(percent);
                        }
                      },
                    });

                    imageUrl = data.url;
                    setProjectImageFile(null);
                    setUploadProgress(100);
                  }

                  const payload = {
                    title: fd.get('title'),
                    description: fd.get('description'),
                    githubUrl: fd.get('githubUrl'),
                    liveUrl: fd.get('liveUrl'),
                    techStack: (fd.get('techStack') || '').split(',').map(s => s.trim()).filter(Boolean),
                    image: imageUrl,
                  };

                  // Ensure apiClient has latest token from localStorage (in case auth context didn't attach yet)
                  try {
                    const stored = typeof window !== 'undefined' && localStorage.getItem('auth_token');
                    if (stored) apiClient.defaults.headers.common.Authorization = `Bearer ${stored}`;
                  } catch (e) {}

                  await create(payload);
                  await reloadProjects();
                  e.target.reset();
                } catch (err) {
                  console.error('Project create failed:', err);
                  const status = err?.response?.status;
                  if (status === 401) {
                    alert('Request failed with status code 401 — please re-login as admin and try again.');
                  } else if (status === 400) {
                    alert(err?.response?.data?.message || 'Bad request — check required fields.');
                  } else {
                    alert(err?.response?.data?.message || err?.message || 'Failed to create project');
                  }
                } finally {
                  setUploadingImage(false);
                }
              }}
              className="space-y-2 text-sm mt-2"
            >
              <input name="title" placeholder="Title" className="w-full rounded-md border px-3 py-2 bg-gray-50 dark:bg-gray-800" required />
              <input name="githubUrl" placeholder="GitHub URL" className="w-full rounded-md border px-3 py-2 bg-gray-50 dark:bg-gray-800" />
              <input name="liveUrl" placeholder="Live URL" className="w-full rounded-md border px-3 py-2 bg-gray-50 dark:bg-gray-800" />
              <input type="file" accept="image/*" onChange={(e) => setProjectImageFile(e.target.files?.[0] || null)} className="w-full rounded-md" />
              {projectImageFile && (
                <div className="mt-2">
                  <div className="text-xs text-gray-500 mb-1">Preview</div>
                  <img src={previewUrl} alt="preview" className="h-28 w-full object-cover rounded-md border" />
                </div>
              )}
              {uploadingImage && (
                <div className="mt-2">
                  <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
                    <div className="h-2 bg-blue-500" style={{ width: `${uploadProgress}%` }} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Uploading: {Math.round(uploadProgress)}%</div>
                </div>
              )}
              <div className="text-xs text-gray-400">Or paste an image URL below</div>
              <input name="image" placeholder="Image URL (thumbnail)" className="w-full rounded-md border px-3 py-2 bg-gray-50 dark:bg-gray-800" />
              <input name="techStack" placeholder="Tech stack (comma separated)" className="w-full rounded-md border px-3 py-2 bg-gray-50 dark:bg-gray-800" />
              <textarea name="description" placeholder="Short description" rows={3} className="w-full rounded-md border px-3 py-2 bg-gray-50 dark:bg-gray-800"></textarea>
              <div className="flex gap-2">
                <Button type="submit" disabled={uploadingImage}>{uploadingImage ? 'Uploading...' : 'Create Project'}</Button>
                <Button type="button" variant="ghost" onClick={async () => { await reloadProjects(); }}>Refresh</Button>
              </div>
            </form>

            <ul className="mt-4 space-y-2 text-sm">
              {projects.map((p) => (
                <li key={p.id || p._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {p.image ? <img src={p.image} alt={p.title} className="h-8 w-12 rounded-md object-cover" /> : <div className="h-8 w-12 rounded-md bg-gray-200" />}
                    <span className="font-medium">{p.title}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => showConfirm({ title: 'Delete project', message: 'Delete this project?', action: async () => { await remove(p.id || p._id); await reloadProjects(); } })}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
};
