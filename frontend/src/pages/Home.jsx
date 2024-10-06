import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";

import Navbar from "../components/Navbar/Navbar";
import NoteCard from "../components/Cards/NoteCard";
import AddEditNotes from "../components/Modals/AddEditNotes";
import axiosInstance from "../utils/axiosInstance";

const Home = () => {
  const [notes, setNotes] = useState([]); // state to hold all notes
  const [error, setError] = useState(""); // state to hold error message
  const [openAddEditModal, setOpenAddEditModal] = useState({
    show: false,
    type: "add",
    data: null,
  }); // state to open Add/Edit modal

  // Fetches notes from the server
  const fetchNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes");

      if (response.data && response.data?.notes) {
        // updates the application state with the fetched notes.
        setNotes(response.data.notes);
      }
    } catch (error) {
      // Handles any errors that occur during the fetch operation.
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.message
      ) {
        setError((prevState) => error.response.data.message);
      } else {
        setError((prevState) => "An unexpected error occurred.");
      }
    }
  };

  // Handles the pinning and unpinning of a note
  const hanldeNoteOnPin = async (noteId, isPinned) => {
    try {
      const response = await axiosInstance.patch(`/notes/${noteId}/pin`, {
        isPinned: !isPinned,
      });

      if (response.data && response.data?.note) {
        // Updates the state of notes with the updated note.
        setNotes((prevState) =>
          prevState.map((note) =>
            note._id === noteId ? response.data.note : note
          )
        );
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.message
      ) {
        setError((prevState) => error.response.data.message);
      } else {
        setError((prevState) => "An unexpected error occurred.");
      }
    }
  };

  // Handles the deletion of a note
  const handleNoteOnDelete = async (noteId, title) => {
    // Confirmation dialog to prevent accidental deletion
    window.confirm(`Are you sure you want to delete "${title}"?`) &&
      (async () => {
        try {
          const response = await axiosInstance.delete(`/notes/${noteId}`);

          if (response.data && response.data.message) {
            // removes the deleted note from the state of notes.
            setNotes((prevState) =>
              prevState.filter((note) => note._id !== noteId)
            );
          }
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error &&
            error.response.data.message
          ) {
            setError((prevState) => error.response.data.message);
          } else {
            setError((prevState) => "An unexpected error occurred.");
          }
        }
      })();
  };

  // init
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {notes.map(({ _id, ...noteRest }) => (
            <NoteCard
              key={_id}
              {...noteRest}
              onPinNote={() => hanldeNoteOnPin(_id, noteRest.isPinned)}
              onEdit={() =>
                setOpenAddEditModal({
                  show: true,
                  type: "edit",
                  data: { _id, ...noteRest },
                })
              }
              onDelete={() => handleNoteOnDelete(_id, noteRest.title)}
            />
          ))}
        </div>
      </div>

      {/* Create new Note button */}
      <button
        type="button"
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() =>
          setOpenAddEditModal({
            show: true,
            type: "add",
            data: null,
          })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      {openAddEditModal.show && (
        <AddEditNotes
          isOpen={openAddEditModal.show}
          type={openAddEditModal.type}
          data={openAddEditModal.data}
          setNotes={setNotes}
          onClose={() =>
            setOpenAddEditModal({ show: false, type: "add", data: null })
          }
        />
      )}
    </>
  );
};

export default Home;
