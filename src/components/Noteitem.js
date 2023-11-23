import React, { useContext } from "react";
import Notecontext from "../context/notes/Notecontext";

const Noteitem = ({ note, updateNote, showAlert }) => {
  const { delNote } = useContext(Notecontext);

  const handleDeleteNote = () => {
    delNote(note._id);
    showAlert("Deleted successfully", "success");
  };

  return (
    <div className='col-md-4 mb-3 my-3'>
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fas fa-trash-alt mx-2"
              onClick={handleDeleteNote}
            ></i>
            <i
              className="far fa-edit mx-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={updateNote}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;



