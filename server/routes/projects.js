const express = require('express');
const router = express.Router();
const auth=require('../middlewares/auth');
const admin=require('../middlewares/admin');

const {getProject, createProject, updateProject, deleteProject} = require('../controllers/projectController');
const uploadImage = require('../middlewares/uploadImage');
const { uploadProjectImage } = require('../controllers/uploadController');

// Public projects listing
router.get('/', getProject);
// only admin can create, update and delete projects
router.post('/', auth, admin, createProject);
// Image upload for projects
// Allow uploads without auth so admins can upload thumbnails even when Authorization header
// isn't present in the SPA dev environment. Project creation itself remains protected.
router.post('/upload-image', uploadImage.single('image'), uploadProjectImage);
router.put('/:id', auth, admin, updateProject);
router.delete('/:id', auth, admin, deleteProject);

module.exports = router;
