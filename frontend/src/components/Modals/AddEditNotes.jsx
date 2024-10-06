import React, { useState } from "react";
import Modal from "react-modal";
import TagInput from "../Input/TagInput";
import { MdClose } from "react-icons/md";

const AddEditNotes = ({ isOpen, type, data, onClose }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
  }); // form values
  const [tags, setTags] = useState([]); // tags state
  const [errors, setErrors] = useState({}); // form errors

  // Handles the change event for form inputs
  // Updates the state of form values based on input name and value
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  // edit a note
  const editNote = () => {}

  // add a new note
  const addNewNote = () => {}

  const handleOnClick = () => {
    if (!formValues.title) {
        setErrors((prevState) => ({
          ...prevState,
          email: "Please enter the title",
        }));
        return;
      }
  
      if (!formValues.content) {
        setErrors((prevState) => ({
          ...prevState,
          password: "Please enter the content",
        }));
        return;
      }
  
      // If there are no errors, clear them
      setErrors({});
      
      if(type === "edit"){
        // If the type is edit, update the note with the new values
        editNote();
      } else {
        // else create a new note with the form values
        addNewNote();
      }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.2)",
        },
      }}
      contentLabel=""
      className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
    >
      <div className="relative">
        <button type="button" className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50" onClick={() => onClose()}>
            <MdClose className="text-xl text-slate-400"/>
        </button>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="input-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="text-2xl text-slate-950 outline-none"
            placeholder="Go To Gym at 6:30pm"
            value={formValues.title}
            onChange={handleOnChange}
          />
          {errors?.title && (
            <p className="text-red-500 text-xs -mt-3 mb-2">{errors.title}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="content" className="input-label">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            rows="10"
            className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
            placeholder="Content"
            value={formValues.content}
            onChange={handleOnChange}
          />
          {errors?.content && (
            <p className="text-red-500 text-xs -mt-3 mb-2">{errors.content}</p>
          )}
        </div>

        <div className="mt-3">
          <label htmlFor="tags" className="input-label">
            Tags
          </label>
          <TagInput
            tags={tags}
            setTags={setTags}
          />
        </div>

        <button type="button" className="btn-primary font-medium mt-5 p-3" onClick={handleOnClick}>
          Add
        </button>
      </div>
    </Modal>
  );
};

export default AddEditNotes;
