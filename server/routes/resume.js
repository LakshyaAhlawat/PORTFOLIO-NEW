const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const upload = require('../middlewares/upload');
const {
  getResume,
  updateResume,
  uploadResumePdf,
  deleteResumePdf,
  uploadResumePdfWithMeta,
  deleteResumePdfByPublicId,
} = require('../controllers/resumeController');

// Public resume data
router.get('/', getResume);

// Admin-only structured resume update
router.put('/', auth, admin, updateResume);

// Admin-only PDF upload/replace
router.post('/pdf', auth, admin, upload.single('pdf'), uploadResumePdf);

// Admin-only PDF delete
router.delete('/pdf', auth, admin, deleteResumePdf);

// Admin: upload additional PDFs with metadata
router.post('/pdfs', auth, admin, upload.single('pdf'), uploadResumePdfWithMeta);

// Admin: delete specific PDF by publicId
router.delete('/pdfs/:publicId', auth, admin, deleteResumePdfByPublicId);

// Admin: update metadata for a specific PDF
router.patch('/pdfs/:publicId', auth, admin, require('../controllers/resumeController').updateResumePdfMeta);

module.exports = router;
