import React, { useContext } from "react";
import Notecontext from "../context/notes/Notecontext";

const Noteitem = ({ note, updateNote, showAlert, tagColors }) => {
  const { delNote } = useContext(Notecontext);

  const handleDeleteNote = () => {
    delNote(note._id);
    showAlert("Deleted successfully", "success");
  };
  const tagStyle = {
    backgroundColor: tagColors[note.tag] || "#e0e0e0", // Default color if tag color is not found
    padding: "5px 10px",
    borderRadius: "5px",
    color: "#fff",
  };

  return (
    <div className="col-md-4 mb-3 my-3">
      <div
        className="card"
        style={{
          backgroundColor: tagColors[note.tag] || "#f8f9fa", // Default color if tag is not in tagColors
          color: "#fff",
          
        }}
      >
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
              onClick={() => updateNote(note)}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
          <span  style={tagStyle}>{note.tag}</span>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;



