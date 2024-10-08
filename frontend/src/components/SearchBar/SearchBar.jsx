import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, onSearch, onClear }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      {/* Search input */}
      <input
        type="text"
        name="search"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />

      {/* Clear button */}
      {value && (<IoMdClose
        className="text-slate-400 cursor-pointer hover:text-black mr-3"
        onClick={onClear}
      />)}

      {/* Search button */}
      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={onSearch}
      />
    </div>
  );
};

export default SearchBar;
