import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext); // to get access to the auth context
  const [searchQuery, setSearchQuery] = useState(""); // search text state

  const handleOnSearch = () => {};

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <Link to="/">
        <h2 className="text-xl font-medium text-black py-2">Notely</h2>
      </Link>

      {/* Search bar */}
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClear={() => setSearchQuery("")}
        onSearch={handleOnSearch}
      />

      {/* Profile Info */}
      {isAuthenticated && <ProfileInfo />}
    </div>
  );
};

export default Navbar;
