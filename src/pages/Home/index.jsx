import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Title from "../../components/Title";
import useStore from "../../store/store";
import Back from "../../assets/icons/svg/back.svg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { errorToast } from "../../utils/toast";
import Loader from "../../components/Loader";
import FadingText from "../../components/Typewriter/FadeAway";
import SubmittedData from "../../assets/lottie/submit.json";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: SubmittedData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useStore((state) => state.auth);
  const { submitQuery, toggleSidebar } = useStore((state) => state.data);

  const [prompt, setPrompt] = useState("");
  const [isSubmttingQuery, setIsSubmittingQuery] = useState(false);
  const [isQuerySubmitted, setIsQuerySubmitted] = useState(false);

  useEffect(() => {
    const queryPrompt = searchParams.get("prompt");
    if (queryPrompt?.length === 0) return;
    else setPrompt(queryPrompt);
  }, [searchParams]);

  const handleSubmitQuery = async () => {
    if (prompt.length === 0) return;

    if (!isLoggedIn) return navigate("/login?prompt=" + prompt);
    try {
      setIsSubmittingQuery(true);
      const queryResponse = await submitQuery({ prompt });
      setIsQuerySubmitted(true);
      setTimeout(() => {
        navigate(`/summary/${queryResponse._id}`);
        setIsQuerySubmitted(false);
      }, 2800);
    } catch (err) {
      errorToast({ message: err });
    } finally {
      setIsSubmittingQuery(false);
    }
  };

  if (isSubmttingQuery || isQuerySubmitted) {
    return (
      <div className="m-8 md:mx-32 sm:mx-16 mx-8">
        <div className="flex flex-col items-center  gap-10">
          {isSubmttingQuery ? (
            <div className="mt-72 flex flex-col items-center  gap-10">
              <Loader />
              <div className="text-gray-300 -ml-72 ">
                <FadingText
                  textArray={["Sit back and Relax", "Submitting your prompt."]}
                />
              </div>
            </div>
          ) : isQuerySubmitted ? (
            <div className="mt-36">
              <div>
                <Lottie options={defaultOptions} height={300} width={300} />
              </div>
              <span
                className="text-gray-300 text-sm "
                style={{
                  marginTop: "-50px",
                }}
              >
                Prompt submitted. Redirecting you to summary page...
              </span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="m-8 md:mx-32 sm:mx-16 mx-8">
      <Navbar
        style={{
          justifyContent: "end",
        }}
        showMenu={false}
      />
      <div className="flex flex-col items-center mt-36 gap-10">
        <Title fontSize={"72px"} />
        <div className="relative rounded-2xl bg-gradient lg:w-[75%] w-full h-[125px]">
          <textarea
            className="text-white p-2 px-3 m-1 text-sm w-full h-full rounded-2xl bg-primary focus:outline-none"
            style={{
              width: "calc(100% - 8px)",
              height: "calc(100% - 8px)",
              resize: "none",
              overflow: "auto",
            }}
            value={prompt ?? ""}
            placeholder="Ask anything related to architecture..."
            onChange={(e) => setPrompt(e.target.value)}
          />
          <span
            src={Back}
            alt="back arrow"
            className="text-center absolute right-4 bottom-3 w-[32px] h-[24px] bg-black text-white rounded-md cursor-pointer increase-scale-1"
            onClick={handleSubmitQuery}
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
            <Link
              to={"/login"}
              className="text-gray-400 text-xs bg-primary p-3 py-1 rounded-md cursor-pointer hover:text-white transition-all"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default index;

export const Suggestions = ({ list, setPrompt }) => (
  <div className="md:w-[75%] w-full flex items-center justify-center flex-wrap gap-2 my-4">
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
