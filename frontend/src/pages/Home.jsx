import React, { useState } from "react";
import { MdAdd } from "react-icons/md";

import Navbar from "../components/Navbar/Navbar";
import NoteCard from "../components/Cards/NoteCard";
import AddEditNotes from "../components/Modals/AddEditNotes";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    show: false,
    type: "add",
    data: null,
  }); // State to open Add/Edit modal

  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Meeting on 7th April"
            date="3rd April 2024"
            content="Meeting on 7th April Meeting on 7th April"
            tags="#meeting"
            isPinned={true}
            onPinNote={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
          />
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

      <AddEditNotes
        isOpen={openAddEditModal.show}
        type={openAddEditModal.type}
        data={openAddEditModal.data}
        onClose={() =>
          setOpenAddEditModal({ show: false, type: "add", data: null })
        }
      />
    </>
  );
};

export default Home;
