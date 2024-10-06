import React, { useState } from "react";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, placeholder, onChange, error, ...props }) => {
  const [isShowPassword, setIsShowPassword] = useState(false); // password visibility state
  // toggle password visibility
  const toggleShowPassword = () => setIsShowPassword(!isShowPassword);

  return (
    <>
      <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
        <input
          type={isShowPassword ? "text" : "password"}
          value={value}
          placeholder={placeholder || "Password"}
          onChange={onChange}
          className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
          {...props}
        />

        {isShowPassword ? (
          <FaRegEye
            size={22}
            onClick={() => toggleShowPassword()}
            className="text-slate-400 cursor-pointer"
          />
        ) : (
          <FaRegEyeSlash
            size={22}
            onClick={() => toggleShowPassword()}
            className="text-slate-400 cursor-pointer"
          />
        )}
      </div>
      {error && <p className="text-red-500 text-xs -mt-2 mb-2">{error}</p>}
    </>
  );
};

export default PasswordInput;
