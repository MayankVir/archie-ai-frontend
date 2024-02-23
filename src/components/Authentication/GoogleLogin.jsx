import React, { useEffect } from "react";
import Google from "../../assets/icons/svg/google.svg";
import { useGoogleLogin } from "@react-oauth/google";
import useStore from "../../store/store";
import axios from "axios";
import { successToast, errorToast } from "../../utils/toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoogleLoginButton = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleUserLoginExternally } = useStore((state) => state.auth);

  const login = useGoogleLogin({
    onSuccess: (response) =>
      handleUserLoginSuccess(
        response,
        handleUserLoginExternally,
        searchParams.get("prompt") ?? "",
        navigate
      ),
  });

  return (
    <button
      onClick={() => login()}
      className="rounded-md p-3 w-full bg-white text-black flex justify-center items-center gap-4 hover-box-shadow"
    >
      <img src={Google} alt="google icon" />
      <span className="text-lg">Sign in with Google</span>
    </button>
  );
};

export default GoogleLoginButton;

const handleUserLoginSuccess = async (
  response,
  handleUserLoginExternally,
  prompt,
  navigate
) => {
  try {
    const profile = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      }
    );
    const { name, email } = profile.data;
    handleUserLoginExternally({ name, email });
    successToast({ message: "Signed in successfully" });
    navigate(`/${prompt !== "" ? `?prompt=${prompt}` : ""}`);
  } catch (error) {
    console.log({ error });
    errorToast({ message: error?.message || "Something went wrong" });
  }
};
