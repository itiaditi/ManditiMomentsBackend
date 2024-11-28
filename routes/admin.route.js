const express = require('express');
const { addStream, updateStream ,deleteStream,addSubject, updateSubject, deleteSubject, addMark, updateMark, deleteMark, getStudentList, getMark, getStreams, getSubject, getSubjects} = require('../controllers/admin.controller');
const { auth } = require('../middlewares/auth.middleware');
const { access } = require('../middlewares/access.middleware');
const adminRouter = express.Router();

// Streams
adminRouter.get('/streams/get',auth,access("admin"), getStreams);
adminRouter.post('/streams/add',auth,access("admin"), addStream);
adminRouter.patch('/streams/update/:id',auth,access("admin"), updateStream);
adminRouter.delete('/streams/delete/:id',auth,access("admin"), deleteStream);

// Subjects
adminRouter.get('/subjects/get',auth,access("admin"), getSubjects);
adminRouter.post('/subjects/add',auth,access("admin"), addSubject);
adminRouter.put('/subjects/update/:id',auth,access("admin"), updateSubject);
adminRouter.delete('/subjects/delete/:id',auth,access("admin"), deleteSubject);

// Marks
adminRouter.get('/marks/get',auth,access("admin"),getMark);
adminRouter.post('/marks/add',auth,access("admin"), addMark);
adminRouter.put('/marks/update/:id',auth,access("admin"), updateMark);
adminRouter.delete('/marks/delete/:id',auth,access("admin"), deleteMark);

// StudentList
adminRouter.get('/studentList', getStudentList);

module.exports = {adminRouter};