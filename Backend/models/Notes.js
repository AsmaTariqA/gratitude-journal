const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    enum: ["Work", "Personal", "Urgent", "General", "Gratitude", "To-do-ist"],
    default: 'General',
    required: true
  },
  
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('notes', notesSchema);
