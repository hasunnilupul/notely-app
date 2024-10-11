import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import TagInput from "../Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({ isOpen, type, data, onClose, setNotes }) => {
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
  const editNote = async () => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.put(`/notes/${noteId}`, {
        title: formValues.title,
        content: formValues.content,
        tags,
      });

      if (response.data && response.data?.note) {
        // Updates the state of notes with the updated note.
        setNotes((prevState) =>
          prevState.map((item) =>
            item._id === noteId ? response.data.note : item
          )
        );
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.message
      ) {
        setErrors((prevState) => ({
          ...prevState,
          server: error.response.data.message,
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          server: "An unexpected error occurred.",
        }));
      }
    }
  };

  // add a new note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/notes", {
        title: formValues.title,
        content: formValues.content,
        tags,
      });

      if (response.data && response.data?.note) {
        // added the new note to the note.
        setNotes((prevState) => [...prevState, response.data.note]);
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.message
      ) {
        setErrors((prevState) => ({
          ...prevState,
          server: error.response.data.message,
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          server: "An unexpected error occurred.",
        }));
      }
    }
  };

  // submit button click event handler
  const handleOnClick = () => {
    if (!formValues.title) {
      setErrors((prevState) => ({
        ...prevState,
        title: "Please enter the title",
      }));
      return;
    }

    if (!formValues.content) {
      setErrors((prevState) => ({
        ...prevState,
        content: "Please enter the content",
      }));
      return;
    }

    // If there are no errors, clear them
    setErrors({});

    if (type === "edit") {
      // If the type is edit, update the note with the new values
      editNote();
    } else {
      // else create a new note with the form values
      addNewNote();
    }
  };

  // init
  useEffect(() => {
    if (type === "edit" && data) {
      setFormValues((prevState) => ({
        ...prevState,
        title: data.title,
        content: data.content,
      }));
      setTags((prevState) => data.tags);
    }
  }, []);

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
      className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
    >
      <div className="relative">
        <button
          type="button"
          className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
          onClick={() => onClose()}
        >
          <MdClose className="text-xl text-slate-400" />
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
            <p className="text-red-500 text-xs -mt-2 mb-2">{errors.title}</p>
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
            <p className="text-red-500 text-xs -mt-2 mb-2">{errors.content}</p>
          )}
        </div>

        <div className="mt-3">
          <label htmlFor="tags" className="input-label">
            Tags
          </label>
          <TagInput tags={tags} setTags={setTags} />
        </div>

        {errors?.server && (
          <p className="text-red-500 text-xs mt-1 mb-2">{errors.server}</p>
        )}

        <button
          type="button"
          className="btn-primary font-medium mt-5 p-3"
          onClick={handleOnClick}
        >
          {type === "edit" ? "Update Note" : "Add Note"}
        </button>
      </div>
    </Modal>
  );
};

export default AddEditNotes;
