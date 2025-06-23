const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const multer = require('multer');
const { downloadCV, uploadCV } = require('../controllers/cvController');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../assets/')); // Use absolute path
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Endpoint to get the latest resume filename
router.get('/latest-filename', auth, (req, res) => {
  const assetsDir = path.resolve(__dirname, '../assets/');
  const files = fs.readdirSync(assetsDir)
    .filter(f => f.endsWith('.pdf'))
    .sort((a, b) => fs.statSync(path.join(assetsDir, b)).mtime - fs.statSync(path.join(assetsDir, a)).mtime);
  if (files.length === 0) {
    return res.status(404).json({ message: 'No resume found.' });
  }
  res.json({ fileName: files[0] });
});

// download cv
router.get('/:fileName', auth, downloadCV); // only logged in user can download cv

// upload cv
router.post('/', auth, admin, upload.single('cv'), uploadCV);

module.exports = router;