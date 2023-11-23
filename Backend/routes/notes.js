const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Centralized error handling middleware
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Route: Get all notes
router.get('/fetchallnotes', fetchUser, async (req, res, next) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error")
  }
});

// Route: Adding notes
router.post(
  '/addnotes',
  fetchUser,
  [
    body('title', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
  ],
  async (req, res, next) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNotes = await notes.save();
      res.json(savedNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error")
    }
  }
);

// Route : 3 Update an existing note

router.put('/updatenotes/:id', fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  // Create a new note object
  try {
    
  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;

  // Find the note to be updated and update it
  
    const note = await Notes.findOne({ _id: req.params.id });
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    const updatedNote = await Notes.findOneAndUpdate(
      { _id: req.params.id },
      { $set: newNote },
      { new: true }
    );
    res.json(updatedNote);
    }catch(error){
      console.error(error.message);
      res.status(500).send("Internal server error")
    }
});
// ROUTE : 4 deleting note
router.delete('/deletenotes/:id', fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  // Find the note to be deleted and delete it
  try {
    

    const note = await Notes.findOne({ _id: req.params.id });
    if (!note) {
      return res.status(404).send("Not found");
    }

    // if user is invalid then don't allow deletion
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    const updatedNote = await Notes.findOneAndDelete(
      { _id: req.params.id }
    );
    res.json({"Success" : "Note has been deleted" , note:note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error")
  }
});

module.exports = router;
