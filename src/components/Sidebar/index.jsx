import React from "react";

const index = () => {
  return (
    <div className="h-[100vh] w-[20%] bg-primary text-white p-8 px-4 flex flex-col gap-2">
      <div className="bg-gray-600 rounded-md p-2 px-3 text-sm cursor-pointer">
        First Prompt{" "}
      </div>
      <div className="bg-gray-600 rounded-md p-2 px-3 text-sm cursor-pointer">
        Second Prompt{" "}
      </div>
      <div className="bg-gray-600 rounded-md p-2 px-3 text-sm cursor-pointer">
        Third Prompt{" "}
      </div>
    </div>
  );
};

export default index;
