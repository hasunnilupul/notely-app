import React, { useEffect, useMemo } from "react";
import { LuCheck, LuAlertTriangle, LuInfo } from "react-icons/lu";

const Toast = ({ isShow, message, type, onClose }) => {

  const typeSettings = useMemo(() => {
    let bgStyles = "";
    let iconStyles = "";
    let icon = null;
    switch (type) {
      case "success":
        bgStyles = "after:bg-green-500";
        iconStyles = "bg-green-50 text-green-500";
        icon = <LuCheck className="text-xl text-inherit" />;
        break;
      case "error":
        bgStyles = "after:bg-red-500";
        iconStyles = "bg-red-50 text-red-500";
        icon = <LuAlertTriangle className="text-xl text-inherit" />;
        break;
      default:
        bgStyles = "after:bg-blue-500";
        iconStyles = "bg-blue-50 text-blue-500";
        icon = <LuInfo className="text-xl text-inherit" />;
    }
    return { bgStyles, iconStyles, icon };
  }, [type]);

  // init
  useEffect(() => {
    const timeoutId = setTimeout(() => onClose(), 3000);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [onClose]);

  return (
    <div
      className={`absolute top-20 right-6 transition-all duration-400 ${
        isShow ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full after:absolute after:left-0 after:top-0 after:rounded-l-lg ${typeSettings.bgStyles}`}
      >
        <div className="flex items-center gap-3 py-2 px-4 ">
          <div
            className={`size-10 flex items-center justify-center rounded-full ${typeSettings.iconStyles}`}
          >
            {typeSettings.icon}
          </div>

          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
