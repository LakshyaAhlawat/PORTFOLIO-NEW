const Resume = require('../models/Resume');
const { uploadPdfBuffer, deleteAsset } = require('../utils/supabaseStorage');

// GET /resume
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne();
    if (!resume) {
      return res.status(200).json({ resume: null });
    }
    return res.status(200).json({ resume });
  } catch (error) {
    console.error('Error fetching resume:', error);
    return res.status(500).json({ message: 'Failed to fetch resume' });
  }
};

// PUT /resume
exports.updateResume = async (req, res) => {
  try {
    const payload = req.body;
    let resume = await Resume.findOne();

    if (!resume) {
      resume = new Resume();
    }

    resume.experience = payload.experience || [];
    resume.education = payload.education || [];
    resume.skills = payload.skills || [];
    resume.projects = payload.projects || [];
    resume.achievements = payload.achievements || [];

    await resume.save();

    return res.status(200).json({ message: 'Resume updated successfully', resume });
  } catch (error) {
    console.error('Error updating resume:', error);
    return res.status(500).json({ message: 'Failed to update resume' });
  }
};

// POST /resume/pdf
exports.uploadResumePdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({
        message:
          'Resume upload is not configured yet. Please add SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and SUPABASE_BUCKET (optional, defaults to resume-pdfs) to the server .env file.',
      });
    }

    let resume = await Resume.findOne();
    if (!resume) {
      resume = new Resume();
    }

    // delete old PDF if exists
    if (resume.pdf && resume.pdf.publicId) {
      await deleteAsset(resume.pdf.publicId);
    }

    const uploadResult = await uploadPdfBuffer({
      buffer: req.file.buffer,
      filename: `resume-${Date.now()}`,
    });

    resume.pdf = {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      uploadedAt: new Date(),
    };

    await resume.save();

    return res.status(200).json({
      message: 'Resume PDF uploaded successfully',
      pdf: resume.pdf,
    });
  } catch (error) {
    console.error('Error uploading resume PDF:', error);
    return res.status(500).json({ message: 'Failed to upload resume PDF' });
  }
};

// DELETE /resume/pdf
exports.deleteResumePdf = async (req, res) => {
  try {
    const resume = await Resume.findOne();
    if (!resume || !resume.pdf || !resume.pdf.publicId) {
      return res.status(404).json({ message: 'No resume PDF to delete' });
    }

    await deleteAsset(resume.pdf.publicId);

    resume.pdf = { url: null, publicId: null, uploadedAt: null };
    await resume.save();

    return res.status(200).json({ message: 'Resume PDF deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume PDF:', error);
    return res.status(500).json({ message: 'Failed to delete resume PDF' });
  }
};

// POST /resume/pdfs - upload additional resume PDF with metadata
exports.uploadResumePdfWithMeta = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({
        message:
          'Resume upload is not configured yet. Please add SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and SUPABASE_BUCKET (optional, defaults to resume-pdfs) to the server .env file.',
      });
    }

    const { title, purpose, downloadable } = req.body;

    let resume = await Resume.findOne();
    if (!resume) resume = new Resume();

    const uploadResult = await uploadPdfBuffer({
      buffer: req.file.buffer,
      filename: `resume-${Date.now()}`,
    });

    const newDoc = {
      title: title || `Resume ${new Date().toISOString()}`,
      purpose: purpose || 'General',
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      uploadedAt: new Date(),
      downloadable: downloadable === 'false' ? false : true,
    };

    resume.pdfs = resume.pdfs || [];
    resume.pdfs.push(newDoc);
    await resume.save();

    return res.status(200).json({ message: 'Resume uploaded', pdf: newDoc });
  } catch (error) {
    console.error('Error uploading resume PDF (multi):', error);
    return res.status(500).json({ message: 'Failed to upload resume PDF' });
  }
};

// PATCH /resume/pdfs/:publicId - update metadata (title, purpose, downloadable)
exports.updateResumePdfMeta = async (req, res) => {
  try {
    const { publicId } = req.params;
    const { title, purpose, downloadable } = req.body;

    const resume = await Resume.findOne();
    if (!resume || !Array.isArray(resume.pdfs)) {
      return res.status(404).json({ message: 'No resumes found' });
    }

    const idx = resume.pdfs.findIndex((p) => p.publicId === publicId);
    if (idx === -1) return res.status(404).json({ message: 'Resume not found' });

    if (typeof title !== 'undefined') resume.pdfs[idx].title = title;
    if (typeof purpose !== 'undefined') resume.pdfs[idx].purpose = purpose;
    if (typeof downloadable !== 'undefined') resume.pdfs[idx].downloadable = downloadable === 'true' || downloadable === true;

    await resume.save();
    return res.status(200).json({ message: 'Resume metadata updated', pdf: resume.pdfs[idx] });
  } catch (error) {
    console.error('Error updating resume pdf meta:', error);
    return res.status(500).json({ message: 'Failed to update resume metadata' });
  }
};

// DELETE /resume/pdfs/:publicId - delete a specific resume PDF
exports.deleteResumePdfByPublicId = async (req, res) => {
  try {
    const { publicId } = req.params;
    if (!publicId) return res.status(400).json({ message: 'Missing publicId' });

    const resume = await Resume.findOne();
    if (!resume || !Array.isArray(resume.pdfs)) {
      return res.status(404).json({ message: 'No resumes found' });
    }

    const idx = resume.pdfs.findIndex((p) => p.publicId === publicId);
    if (idx === -1) return res.status(404).json({ message: 'Resume not found' });

    // delete asset from storage
    await deleteAsset(publicId);

    // remove from array
    resume.pdfs.splice(idx, 1);
    await resume.save();

    return res.status(200).json({ message: 'Resume deleted' });
  } catch (error) {
    console.error('Error deleting resume PDF by publicId:', error);
    return res.status(500).json({ message: 'Failed to delete resume PDF' });
  }
};
