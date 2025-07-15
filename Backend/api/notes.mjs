import connectToMongo from '../config/db.mjs'; 
import Notes from '../models/Notes.mjs';
import fetchUser from '../middleware/fetchUser.mjs';
import { body, validationResult } from 'express-validator';

export default async function handler(req, res) {
  await connectToMongo();
  const method = req.method;
  const user = await fetchUser(req, res);
  if (!user) return; // Error already sent from middleware

  const { id } = req.query;
  const { title, description, tag } = req.body;

  try {
    switch (method) {
      case 'GET':
        // fetchallnotes
        const notes = await Notes.find({ user: user.id });
        return res.status(200).json(notes);

      case 'POST':
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const newNote = new Notes({
          title,
          description,
          tag,
          user: user.id
        });
        const savedNote = await newNote.save();
        return res.status(201).json(savedNote);

      case 'PUT':
        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (tag) updateData.tag = tag;

        const existingNote = await Notes.findById(id);
        if (!existingNote || existingNote.user.toString() !== user.id) {
          return res.status(401).json({ error: 'Not allowed' });
        }

        const updatedNote = await Notes.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        return res.json(updatedNote);

      case 'DELETE':
        const note = await Notes.findById(id);
        if (!note || note.user.toString() !== user.id) {
          return res.status(401).json({ error: 'Not allowed' });
        }

        await Notes.findByIdAndDelete(id);
        return res.json({ success: true, message: 'Note deleted', note });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
