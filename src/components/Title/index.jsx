import React from "react";

const index = ({ fontSize }) => {
  return (
    <div
      className="text-5xl font-semibold text-white"
      style={{
        ...(fontSize && {
          fontSize,
        }),
      }}
    >
      ARCHIE.AI
    </div>
  );
};

export default index;
