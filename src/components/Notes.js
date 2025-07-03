import React, { useContext, useEffect, useRef, useState } from 'react';
import Notecontext from "../context/notes/Notecontext";
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
import { FiEdit3, FiX, FiCheckCircle, FiBookOpen } from 'react-icons/fi';

const Notes = (props) => {
  const context = useContext(Notecontext);
  let navigate = useNavigate();
  const { notes, getNote, editNote } = context;

  // Enhanced tag configuration with icons
  const availableTags = [
    { name: "Work", color: "#6A9C89", icon: "💼" },
    { name: "Personal", color: "#A87676", icon: "👤" },
    { name: "Urgent", color: "#CA8787", icon: "⚠️" },
    { name: "Gratitude", color: "#76ABAE", icon: "🙏" },
    { name: "To-do-list", color: "#E1ACAC", icon: "✅" },
    { name: "General", color: "#8E7DBE", icon: "📝" },
  ];

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNote();
    } else {
      navigate('/login');
    }
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: availableTags[0].name });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleOnClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen  font-poppins py-8 px-4 md:px-8">
      <Addnote showAlert={props.showAlert} />
      
      {/* Edit Modal */}
      <button ref={ref} type="button" className="hidden" data-bs-toggle="modal" data-bs-target="#editModal">
        Edit notes
      </button>

      <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-[#F4F8D3] rounded-3xl border-2 border-[#8E7DBE]/30 shadow-lg">
            <div className="modal-header border-b border-[#8E7DBE]/20 p-6 flex items-center">
              <FiBookOpen className="text-[#8E7DBE] mr-2 text-2xl" />
              <h1 className="modal-title text-2xl font-bold text-[#5e548e]">Edit Your Note</h1>
              <button type="button" className="ml-auto text-[#8E7DBE] hover:text-[#6a5d8e] transition-colors" data-bs-dismiss="modal" aria-label="Close">
                <FiX size={24} />
              </button>
            </div>
            <div className="modal-body p-6">
              <form className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="etitle" className="block text-lg font-medium text-[#5e548e]">Title</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-2xl border-2 border-[#8E7DBE]/30 bg-white/80 focus:ring-2 focus:ring-[#8E7DBE] focus:border-transparent text-[#5e548e] placeholder-[#8E7DBE]/60"
                    id="etitle" 
                    name="etitle" 
                    value={note.etitle} 
                    onChange={onChange} 
                    minLength={5} 
                    required 
                    placeholder="Note title..."
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edescription" className="block text-lg font-medium text-[#5e548e]">Description</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-2xl border-2 border-[#8E7DBE]/30 bg-white/80 focus:ring-2 focus:ring-[#8E7DBE] focus:border-transparent text-[#5e548e] min-h-[120px] placeholder-[#8E7DBE]/60"
                    id="edescription" 
                    name="edescription" 
                    value={note.edescription} 
                    onChange={onChange} 
                    minLength={5} 
                    required 
                    placeholder="Write your thoughts here..."
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="etag" className="block text-lg font-medium text-[#5e548e]">Category</label>
                  <select 
                    className="w-full px-4 py-3 rounded-2xl border-2 border-[#8E7DBE]/30 bg-white/80 focus:ring-2 focus:ring-[#8E7DBE] focus:border-transparent text-[#5e548e]"
                    id="etag" 
                    name="etag" 
                    value={note.etag} 
                    onChange={onChange}
                  >
                    {availableTags.map((tag) => (
                      <option key={tag.name} value={tag.name} style={{ color: tag.color }}>
                        {tag.icon} {tag.name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer border-t border-[#8E7DBE]/20 p-6 flex justify-end space-x-4">
              <button 
                ref={refClose} 
                type="button" 
                className="px-6 py-3 rounded-xl text-[#8E7DBE] hover:bg-[#8E7DBE]/10 transition-colors flex items-center font-medium border-2 border-[#8E7DBE]"
                data-bs-dismiss="modal"
              >
                <FiX className="mr-2" /> Cancel
              </button>
              <button
                disabled={!note || note.etitle.length < 5 || note.edescription.length < 5}
                onClick={handleOnClick}
                type="button"
                className={`px-6 py-3 rounded-xl text-white bg-gradient-to-r from-[#8E7DBE] to-[#A6D6D6] hover:from-[#7a6ba8] hover:to-[#8fc2c2] transition-all flex items-center font-medium ${
                  !note || note.etitle.length < 5 || note.edescription.length < 5 ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.02]'
                }`}
              >
                <FiCheckCircle className="mr-2" /> Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5e548e] mb-3">Your Gratitude Journal</h1>
          <p className="text-[#8E7DBE] text-lg md:text-xl max-w-2xl mx-auto">
            Reflect on your blessings and moments of gratitude
          </p>
        </div>
        
        {notes.length === 0 ? (
          <div className="text-center bg-[#F4F8D3]/70 rounded-3xl p-12 border-2 border-[#8E7DBE]/20">
            <FiBookOpen className="mx-auto text-[#8E7DBE] text-5xl mb-4" />
            <h2 className="text-2xl font-medium text-[#5e548e] mb-2">Your journal is empty</h2>
            <p className="text-[#8E7DBE] mb-4">Start by adding your first note of gratitude</p>
            <div className="w-16 h-1 bg-[#8E7DBE]/30 rounded-full mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div 
                key={note._id} 
                className="bg-[#F4F8D3]/90 backdrop-blur-sm rounded-3xl p-6 border-2 border-[#8E7DBE]/20 shadow-md hover:shadow-lg transition-all hover:translate-y-[-4px]"
              >
                <div className="flex justify-between items-start mb-4">
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: `${availableTags.find(t => t.name === note.tag)?.color}20`,
                      color: availableTags.find(t => t.name === note.tag)?.color
                    }}
                  >
                    {availableTags.find(t => t.name === note.tag)?.icon} {note.tag}
                  </span>
                  <button 
                    onClick={() => updateNote(note)}
                    className="text-[#8E7DBE] hover:text-[#6a5d8e] transition-colors"
                  >
                    <FiEdit3 size={20} />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-[#5e548e] mb-2">{note.title}</h3>
                <p className="text-[#5e548e]/90 mb-4">{note.description}</p>
                <div className="text-xs text-[#8E7DBE]/70">
                  {new Date(note.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;