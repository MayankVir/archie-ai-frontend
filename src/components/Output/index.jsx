import React, { useEffect } from "react";
import useStore from "../../store/store";
import Code from "../Code";
import { instance } from "@viz-js/viz";

const index = () => {
  const { code, dot_file_contents, key_components, next_steps, prompt } =
    useStore((state) => state.data);

  useEffect(() => {
    if (dot_file_contents.length > 0)
      instance().then((viz) => {
        const svg = viz.renderSVGElement(dot_file_contents);

        document.getElementById("graph")?.replaceChildren(svg);
      });
  }, [dot_file_contents]);

  return (
    <div className="flex gap-3 -mt-10 md:flex-row flex-col w-full">
      {/* Left */}
      <div className="md:w-[50%] w-full bg-primary rounded-lg p-6">
        <div className="text-white text-sm">
          <h5 className="text-gray-400 text-sm">Prompt</h5>
          <span>{prompt}</span>
        </div>
        <div>
          <Code code={dot_file_contents} />
        </div>
      </div>

      {/* Right */}
      <div className="md:w-[50%] w-full bg-primary rounded-lg p-6">
        <div>
          <h5 className="text-gray-400 text-sm">Architecture Diagram</h5>
        </div>
        <div className="w-full flex flex-col  my-8 " id="graph"></div>

        <div className="text-white my-4">
          <div className="font-semibold underline">Key Components</div>
          <span className="text-sm">{key_components}</span>
        </div>
        <div className="text-white my-4">
          <div className="font-semibold underline">Next Steps</div>
          <span className="text-sm">{next_steps}</span>
        </div>
      </div>
    </div>
  );
};

export default index;
