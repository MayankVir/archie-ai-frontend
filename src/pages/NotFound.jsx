import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="text-white h-[100vh] w-full flex items-center justify-center flex-col gap-4">
      <span>404 Page Not found</span>

      <button
        className="text-white bg-neutral-600 p-2 px-4 text-md rounded-md"
        onClick={() => navigate("/")}
      >
        Go to homepage
      </button>
    </div>
  );
};

export default NotFound;
