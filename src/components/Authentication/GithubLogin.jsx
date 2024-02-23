import React from "react";
import Github from "../../assets/icons/svg/github.svg";

const GithubLoginButton = () => {
  return (
    <button
      onClick={() => login()}
      className="rounded-md p-3 w-full bg-black text-white flex justify-center items-center gap-4 hover-box-shadow"
    >
      <img src={Github} alt="github icon" />
      <span className="text-lg">Sign in with Github</span>
    </button>
  );
};

export default GithubLoginButton;
