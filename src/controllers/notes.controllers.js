const notesController = {};

const Note = require('../models/Note');

notesController.renderNoteForm = (req, res) => {
    res.render('notes/new-note');
};

notesController.createNewNote = async (req, res) => {
    const { title, description } = req.body;
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfully');  
    res.redirect('/notes');
};

notesController.renderNotes = async (req, res) => {
    const notes = await Note.find({user: req.user.id}).sort({createdAt: 'desc'});
    res.render('notes/all-notes', {notes});
}; 

notesController.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (note.user != req.user.id){
        req.flash('error_msg', 'Not authorized');
        return res.redirect('/notes');
    }
    res.render('notes/edit-note', { note });
};

notesController.updateNotes = async (req, res) => {
    console.log(req.body);
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Note Updated Successfully');
    res.redirect('/notes');
}

notesController.deleteNotes = async (req, res) => {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (note.user != req.user.id){
        req.flash('error_msg', 'Not authorized');
    }
    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/notes');
}


module.exports = notesController;