import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { getInitials } from "../../utils/helper";
import AuthContext from "../../context/AuthContext";

const ProfileInfo = () => {
  const navigate = useNavigate();
  const { authenticatedUser, clearUserData } = useContext(AuthContext); // to get access to the auth context

  const handleOnLogout = () => {
    clearUserData();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(authenticatedUser?.fullName)}
      </div>

      <div>
        <p className="text-sm font-medium">{authenticatedUser?.fullName}</p>
        <button
          type="button"
          className="text-sm text-slate-700 underline"
          onClick={handleOnLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
