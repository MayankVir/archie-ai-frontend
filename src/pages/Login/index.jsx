import React, { useState } from "react";
import Title from "../../components/Title";
import OrSeparator from "../../components/Separator/OrSeparator";
import GoogleLoginButton from "../../components/Authentication/GoogleLogin";
import GithubLoginButton from "../../components/Authentication/GithubLogin";

const index = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const handleAuthentication = () => {};

  return (
    <div className="flex justify-center items-center flex-col h-[100vh] w-[100vw]">
      <Title />
      <div className="flex gap-4 flex-col p-8 m-2 rounded-lg w-[450px] bg-primary">
        <input
          type="email"
          className="p-4 text-sm rounded-md text-black placeholder:text-black focus:outline-black"
          placeholder="Enter your email address"
          style={{
            backgroundColor: "#C9C9C9",
          }}
        />
        <input
          type="password"
          className="p-4 text-sm rounded-md text-black placeholder:text-black focus:outline-black"
          placeholder="Enter your password"
          style={{
            backgroundColor: "#C9C9C9",
          }}
        />
        {!isLoggingIn && (
          <input
            type="password"
            className="p-4 text-sm rounded-md text-black placeholder:text-black focus:outline-black"
            placeholder="Confirm your password"
            style={{
              backgroundColor: "#C9C9C9",
            }}
          />
        )}
        <div>
          <div className="rounded-lg bg-gradient">
            <button
              type="submit"
              className="bg-black  text-white  text-2xl py-4 m-1 rounded-md"
              style={{
                width: "calc(100% - 10px)",
              }}
              onClick={handleAuthentication}
            >
              {isLoggingIn ? "Sign In" : "Sign Up"}
            </button>
          </div>
          <div
            className="text-white text-left  text-sm my-2 opacity-70 ml-1 "
            onClick={() => setIsLoggingIn((p) => !p)}
          >
            <span className="hover:underline cursor-pointer">
              {isLoggingIn
                ? "Don't have account ? Create now."
                : "Already have account ? SignIn here."}
            </span>
          </div>
        </div>

        <OrSeparator />
        <div className="flex flex-col gap-3">
          <GoogleLoginButton />
          <GithubLoginButton />
        </div>
      </div>
    </div>
  );
};

export default index;
