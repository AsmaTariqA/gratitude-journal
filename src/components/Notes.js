import React, { useContext, useEffect, useRef, useState } from 'react';
import Notecontext from "../context/notes/Notecontext";
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(Notecontext);
  let navigate = useNavigate();
  const { notes, getNote, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote()
    }
    else{
      navigate('/login')
    }
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
       
  };

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const handleOnClick = (e) => {
    console.log('updating the note...', note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated successfully", "success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote showAlert={props.showAlert} />
      <div>
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Edit notes
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text" minLength={5} required>We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" minLength={5} required value={note.edescription} name="edescription" onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag" minLength={5} required onChange={onChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button
                  disabled={!note || note.etitle.length < 5 || note.edescription.length < 5}
                  onClick={handleOnClick}
                  type="button"
                  className="btn btn-primary"
                >
                  Update Notes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className='container my-3'>
            <h1>Your notes</h1>
            <div className='row'>
              <div className="container">
                {notes.length === 0 && "No notes to display"}
              </div>
              {notes.map((note) => (
                <Noteitem key={note._id} updateNote={() => updateNote(note)} note={note} showAlert={props.showAlert} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
