const { Router } = require('express');

const router = Router();


const { renderNoteForm, createNewNote, renderNotes, renderEditForm, updateNotes, deleteNotes } = require('../controllers/notes.controllers');

const { isAuthenticated } =require('../helpers/auth');

// New Note
router.get('/notes/add', isAuthenticated, renderNoteForm);
router.post('/notes/new-note', isAuthenticated, createNewNote);

// Get all notes

router.get('/notes', isAuthenticated, renderNotes);

// Edit notes
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);
router.put('/notes/edit/:id', isAuthenticated, updateNotes);

// Delete notes
router.delete('/notes/delete/:id', isAuthenticated, deleteNotes);


module.exports = router;
