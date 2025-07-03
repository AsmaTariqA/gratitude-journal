import React, { useState, useContext } from 'react';
import Notecontext from "../context/notes/Notecontext";
import { FiPlusCircle, FiTag, FiEdit2, FiAlignLeft } from 'react-icons/fi';

const Addnote = (props) => {
    const context = useContext(Notecontext);
    const { addNote } = context;
    const [notes, setNotes] = useState({ title: "", description: "", tag: "" });

    const tags = [
        { label: "Work", color: "#6A9C89" },
        { label: "Personal", color: "#A87676" },
        { label: "Urgent", color: "#CA8787" },
        { label: "General", color: "#8E7DBE" },
        { label: "Gratitude", color: "#76ABAE" },
        { label: "To-do-list", color: "#E1ACAC" },
    ];

    const handleOnClick = (e) => {
        e.preventDefault();
        addNote(notes.title, notes.description, notes.tag);
        setNotes({ title: "", description: "", tag: "" });
        props.showAlert("Added successfully", "success");
    };

    const onChange = (e) => {
        setNotes({ ...notes, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b  font-poppins py-12 px-6">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-8">
                    <FiPlusCircle className="text-[#8E7DBE] text-4xl mr-3" />
                    <h1 className='text-4xl font-bold text-[#5e548e] font-sans'>
                        Add a New Note
                    </h1>
                </div>
                
                <div className="bg-[#F4F8D3] rounded-3xl shadow-xl p-8 border-2 border-[#8E7DBE]/20">
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="title" className="flex items-center text-lg font-medium text-[#5e548e] font-caveat">
                                <FiEdit2 className="mr-2 text-[#8E7DBE]" /> Title
                            </label>
                            <input
                                type="text"
                                className="block w-full px-4 py-3 rounded-2xl border-2 border-[#8E7DBE]/30 bg-white/80 text-[#5e548e] focus:ring-2 focus:ring-[#8E7DBE] focus:border-transparent placeholder-[#8E7DBE]/60"
                                minLength={5}
                                required
                                id="title"
                                name="title"
                                value={notes.title}
                                onChange={onChange}
                                placeholder="Note title..."
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="description" className="flex items-center text-lg font-medium text-[#5e548e] font-caveat">
                                <FiAlignLeft className="mr-2 text-[#8E7DBE]" /> Description
                            </label>
                            <textarea
                                className="block w-full px-4 py-3 rounded-2xl border-2 border-[#8E7DBE]/30 bg-white/80 text-[#5e548e] focus:ring-2 focus:ring-[#8E7DBE] focus:border-transparent placeholder-[#8E7DBE]/60 min-h-[120px]"
                                minLength={5}
                                required
                                id="description"
                                name="description"
                                value={notes.description}
                                onChange={onChange}
                                placeholder="Write your thoughts here..."
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="tag" className="flex items-center text-lg font-medium text-[#5e548e] font-caveat">
                                <FiTag className="mr-2 text-[#8E7DBE]" /> Tag
                            </label>
                            <select
                                className="block w-full px-4 py-3 rounded-2xl border-2 border-[#8E7DBE]/30 bg-white/80 text-[#5e548e] focus:ring-2 focus:ring-[#8E7DBE] focus:border-transparent"
                                id="tag"
                                name="tag"
                                value={notes.tag}
                                onChange={onChange}
                                required
                            >
                                <option value="">Select a tag</option>
                                {tags.map((tag, index) => (
                                    <option key={index} value={tag.label} style={{ color: tag.color }}>
                                        {tag.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <button
                            disabled={!notes || notes.title.length < 5 || notes.description.length < 5 || !notes.tag}
                            onClick={handleOnClick}
                            type="button"
                            className={`w-full py-4 px-6 rounded-2xl shadow-md text-xl font-bold text-white bg-gradient-to-r from-[#8E7DBE] to-[#A6D6D6] hover:from-[#7a6ba8] hover:to-[#8fc2c2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8E7DBE] transition-all duration-300 ${
                                (!notes || notes.title.length < 5 || notes.description.length < 5 || !notes.tag) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
                            }`}
                        >
                            Add Note
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Addnote;