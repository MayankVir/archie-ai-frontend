import React from "react";
import useStore from "../../store/store";

const index = () => {
  const { summary } = useStore((state) => state.data);

  return (
    <div className="flex flex-col gap-4 text-white mt-16">
      <span className="text-lg text-center">Summary</span>
      <div className="text-sm">{summary}</div>
    </div>
  );
};

export default index;
