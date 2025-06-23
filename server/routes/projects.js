const express = require('express');
const router = express.Router();
const auth=require('../middlewares/auth');
const admin=require('../middlewares/admin');

const {getProject, createProject, updateProject, deleteProject} = require('../controllers/projectController');

// only logged  in user can access projects and thus the github links and demo
router.get('/', auth, getProject);
// only admin can create, update and delete projects
router.post('/', auth, admin, createProject);
router.put('/:id', auth, admin, updateProject);
router.delete('/:id', auth, admin, deleteProject);

module.exports = router;
