import React from "react";
import SadPng from "../../assets/icons/png/sad.png";

const FailedOutput = () => {
  return (
    <div className="text-gray-300 text-lg my-32 flex flex-col items-center justify-center">
      <img src={SadPng} alt="sad png" height={"75px"} width="75px" />
      <span className="my-6 text-center text-xl">
        Sorry. We could not generate the summary. <br /> It is on us and we will
        look into it.
      </span>
    </div>
  );
};

export default FailedOutput;
