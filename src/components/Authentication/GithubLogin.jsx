import React from "react";
import Github from "../../assets/icons/svg/github.svg";

const GithubLoginButton = () => {
  const loginWithGithub = () => {
    const client_id = "937cff3ca226d0552dce";
    const client_secret = "cc01806fa58358af21ad7c65917735570b790c87";
    // Construct the URL for GitHub OAuth authorization
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${client_secret}&scope=user`;

    // Redirect the user to the GitHub authorization page
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={() => loginWithGithub()}
      className="rounded-md p-3 w-full bg-black text-white flex justify-center items-center gap-4 hover-box-shadow"
    >
      <img src={Github} alt="github icon" />
      <span className="text-lg">Sign in with Github</span>
    </button>
  );
};

export default GithubLoginButton;
