import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Title from "../../components/Title";
import useStore from "../../store/store";
import Back from "../../assets/icons/svg/back.svg";
import { redirect, useNavigate, useSearchParams } from "react-router-dom";

const index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useStore((state) => state.auth);
  const { handleSetPrompt } = useStore((state) => state.data);

  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const queryPrompt = searchParams.get("prompt");
    if (queryPrompt?.length === 0) return;
    else setPrompt(queryPrompt);
  }, [searchParams]);

  return (
    <div className="m-8 md:mx-32 sm:mx-16 mx-8">
      <Navbar />
      <div className="flex flex-col items-center mt-36 gap-10">
        <Title fontSize={"72px"} />
        <div className="relative rounded-2xl bg-gradient w-[75%] h-[125px]">
          <textarea
            className="text-white p-2 px-3 m-1 text-sm w-full h-full rounded-2xl bg-primary focus:outline-none"
            style={{
              width: "calc(100% - 8px)",
              height: "calc(100% - 8px)",
              resize: "none",
              overflow: "auto",
            }}
            value={prompt}
            placeholder="Ask anything related to architecture..."
            onChange={(e) => setPrompt(e.target.value)}
          />
          <span
            src={Back}
            alt="back arrow"
            className="text-center absolute right-4 bottom-3 w-[32px] h-[24px] bg-black text-white rounded-md cursor-pointer increase-scale-1"
            onClick={() => {
              if (prompt.length === 0) return;

              if (!isLoggedIn) return navigate("/login?prompt=" + prompt);

              handleSetPrompt({ prompt });
              navigate("/summary");
            }}
          >
            &#x2192;
          </span>
        </div>
        <Suggestions
          setPrompt={setPrompt}
          list={[
            "Discuss microservices vs. monolithic architecture pros/cons.",
            "Explore event-driven architecture in IoT applications.",
            "Comparison: RESTful API vs. GraphQL architecture benefits.",
            "Impact of containerization on cloud-native architecture design.",
            "Implementing serverless architecture for scalable web applications.",
          ]}
        />
        {!isLoggedIn && (
          <div className="my-12">
            <span className="text-xs text-white">
              Sign in to keep your answer history .
            </span>{" "}
            <span className="text-gray-400 text-xs bg-primary p-3 py-1 rounded-md cursor-pointer hover:text-white transition-all">
              Sign in
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default index;

export const Suggestions = ({ list, setPrompt }) => (
  <div className="w-[75%] flex items-center justify-center flex-wrap gap-2 my-4">
    {list.map((suggestion, idx) => (
      <span
        key={`${suggestion}-${idx}`}
        onClick={() => setPrompt(suggestion)}
        className="text-gray-400 text-xs bg-primary p-3 py-1 rounded-md cursor-pointer hover:text-white transition-all"
      >
        {suggestion}
      </span>
    ))}
  </div>
);
