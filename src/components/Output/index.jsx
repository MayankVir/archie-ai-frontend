import React from "react";
import useStore from "../../store/store";
import Output from "../../assets/icons/svg/output.png";
import Code from "../Code";

const index = () => {
  const { output, prompt } = useStore((state) => state.data);

  const { code, codeSummary } = output;

  return (
    <div className="flex gap-3 -mt-10 md:flex-row flex-col w-full">
      {/* Left */}
      <div className="md:w-[50%] w-full bg-primary rounded-lg p-6">
        <div className="text-white text-sm">
          <h5 className="text-gray-400 text-sm">Prompt</h5>
          <span>{prompt}</span>
        </div>
        <div>
          <Code code={code} />
        </div>
        <div className="text-white text-sm">{codeSummary}</div>
      </div>

      {/* Right */}
      <div className="md:w-[50%] w-full bg-primary rounded-lg p-6">
        <div>
          <h5 className="text-gray-400 text-sm">Architecture Diagram</h5>
        </div>
        <div className="w-full flex items-center justify-center my-8">
          <img
            src={Output}
            alt="output image"
            className="rounded-lg w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default index;
