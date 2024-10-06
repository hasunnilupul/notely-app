import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // search text state

  const handleOnSearch = () => {

  }

  const handleOnLogout = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notely</h2>

      {/* Search bar */}
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClear={() => setSearchQuery("")}
        onSearch={handleOnSearch}
      />

      <ProfileInfo onLogout={handleOnLogout} />
    </div>
  );
};

export default Navbar;
