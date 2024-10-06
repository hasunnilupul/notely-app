import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  // State variable to manage the input value for the tag input field
  const [inputValue, setInputValue] = useState("");

  // Handles the change event for the input field
  const handleOnChange = (e) => setInputValue(e.target.value);

  // Function to add a new tag if the input value is not empty
  const addnewTag = () => {
    if (inputValue.trim() !== "") {
      setTags((prevState) => [...prevState, inputValue.trim()]);
      setInputValue("");
    }
  };

  // Function to handle key down events, specifically for the Enter key
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      addnewTag();
    }
  };

  // Handles the removal of a specified tag from the tags state.
  const handleRemoveTag = (tagToRemove) => {
    setTags((prevState) => prevState.filter((t) => t !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag) => (
            <span key={tag} className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 rounded px-3 py-1">
              # {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)}>
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          name="tags"
          id="tags"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add Tags"
          value={inputValue}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
        />

        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700 text-blue-700 hover:text-white"
          onClick={() => addnewTag()}
        >
          <MdAdd className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
