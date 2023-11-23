import React, { useState, useContext } from 'react'
import Notecontext from "../context/notes/Notecontext";

const Addnote = (props) => {
    const context = useContext(Notecontext);
    const { addNote } = context;
    const [notes, setNotes] = useState({ title: "", description: "", tag: "" })

    const handleOnClick = (e) => {
        e.preventDefault();
        addNote(notes.title, notes.description, notes.tag);
        setNotes({ title: "", description: "", tag: "" });
        props.showAlert("Added successfully", "success")
    }
    const onChange = (e) => {
        setNotes({ ...notes, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <div className='container my-3'>
                <h2>Add a note </h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="title" className="form-control" minLength={5} required id="title" name="title"value={notes.title} aria-describedby="emailHelp" onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control"minLength={5} required id="description" name="description" value={notes.description}onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" minLength={5} required id="tag" name="tag"value={notes.tag} onChange={onChange} />
                    </div>
                    <button disabled={!notes || notes.title.length < 5 || notes.description.length < 5}  onClick={handleOnClick}type="button"className="btn btn-primary"> Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote
