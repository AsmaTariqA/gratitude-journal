import React, { useState } from 'react';
import NoteContext from './Notecontext';
import { v4 as uuidv4 } from 'uuid';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  // Get all notes
  const getNote = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }

  const [notes, setNotes] = useState(notesInitial);

  // Add a note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json();
    setNotes([...notes, note]);
  };

  // Delete a note
  const delNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json();
    console.log(json);
    console.log("deleting note with id " + id);
    const newNotes = notes.filter((note) => note._id.toLowerCase() !== id.toLowerCase());
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });

    const responseText = await response.text();
    console.log(responseText);
    const json = JSON.parse(responseText);
    console.log(json);
    
    // logic to edit in client
    let newNote = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    console.log(notes);
    setNotes(newNote);
    
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, delNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
