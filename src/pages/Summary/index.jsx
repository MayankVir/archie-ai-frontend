import React from "react";
import Navbar from "../../components/Navbar";
import Output from "../../components/Output";
import Summary from "../../components/Summary";
import Sidebar from "../../components/Sidebar";

const index = () => {
  return (
    <div className="flex h-[100vh]">
      <Sidebar />
      <div className="flex flex-col p-8 md:px-16 px-8 w-full overflow-auto ">
        <div className="w-full">
          <Navbar showTitle={true} showBackBtn={true} />
          <Output />
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default index;
