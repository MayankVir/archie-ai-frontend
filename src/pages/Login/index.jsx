import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import OrSeparator from "../../components/Separator/OrSeparator";
import GoogleLoginButton from "../../components/Authentication/GoogleLogin";
import GithubLoginButton from "../../components/Authentication/GithubLogin";
import useStore from "../../store/store";
import { successToast } from "../../utils/toast";
import {
  Navigate,
  redirect,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const index = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { handleAuthentication, isLoggedIn } = useStore((state) => state.auth);

  const handleFormDataChange = (e) => {
    setFormError((prev) => ({ ...prev, [e.target.name]: "" }));
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateUserFormData = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!isLoggingIn) {
    //   if (formData.name.length === 0) {
    //     setFormError((prev) => ({
    //       ...prev,
    //       name: "Enter a valid name",
    //     }));
    //     return false;
    //   }
    // }
    if (formData.email.length === 0) {
      setFormError((prev) => ({
        ...prev,
        email: "Email cannot be empty",
      }));
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      setFormError((prev) => ({
        ...prev,
        email: "Please enter a valid email",
      }));
      return false;
    }

    if (formData.password.length < 8) {
      setFormError((prev) => ({
        ...prev,
        password: "Please enter atleast 6 characters password",
      }));
      return false;
    }
    if (!isLoggingIn) {
      if (formData.password !== formData.confirmPassword) {
        setFormError((prev) => ({
          ...prev,
          confirmPassword: "Password and Confirm Password must be same",
        }));
        return false;
      }
    }

    return true;
  };

  const handleUserAuthentication = async () => {
    const isUserDataValidated = validateUserFormData();

    if (isUserDataValidated === false) return;

    const { status } = await handleAuthentication({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      isLoggingIn,
    });
    if (status) {
      const prompt = searchParams.get("prompt") ?? "";
      successToast({ message: "Logged in successfully" });
      navigate(`/${prompt !== "" ? `?prompt=${prompt}` : ""}`);
    }
  };

  if (pathname === "/login" && isLoggedIn) return <Navigate to={"/"} />;

  return (
    <div className="flex justify-center items-center flex-col h-[100vh] w-[100vw]">
      <Title />
      <div className="flex gap-4 flex-col p-8 m-2 rounded-lg w-[450px] bg-primary">
        {!isLoggingIn && (
          <div>
            <input
              type="text"
              name="name"
              className={
                "w-full p-4 text-sm rounded-md text-black placeholder:text-black focus:outline-black " +
                (!!formError.name.length &&
                  "focus:outline-red-500 border border-red-400")
              }
              placeholder="Enter your name"
              style={{
                backgroundColor: "#C9C9C9",
              }}
              value={formData.name}
              onChange={handleFormDataChange}
            />
            {!!formError.name.length && (
              <span className="text-sm text-red-500">{formError.name}</span>
            )}
          </div>
        )}
        <div>
          <input
            type="email"
            name="email"
            className={
              "w-full p-4 text-sm rounded-md text-black placeholder:text-black focus:outline-black " +
              (!!formError.email.length &&
                "focus:outline-red-500 border border-red-400")
            }
            placeholder="Enter your email address"
            style={{
              backgroundColor: "#C9C9C9",
            }}
            value={formData.email}
            onChange={handleFormDataChange}
          />
          {!!formError.email.length && (
            <span className="text-sm text-red-500">{formError.email}</span>
          )}
        </div>
        <div>
          <input
            type="password"
            name="password"
            className={
              "w-full p-4 text-sm rounded-md text-black placeholder:text-black focus:outline-black " +
              (!!formError.password.length &&
                "focus:outline-red-500 border border-red-400")
            }
            placeholder="Enter your password"
            style={{
              backgroundColor: "#C9C9C9",
            }}
            value={formData.password}
            onChange={handleFormDataChange}
          />{" "}
          {!!formError.password.length && (
            <span className="text-sm text-red-500">{formError.password}</span>
          )}
        </div>

        {!isLoggingIn && (
          <div>
            <input
              type="password"
              name="confirmPassword"
              className={
                "w-full p-4 text-sm rounded-md text-black placeholder:text-black focus:outline-black " +
                (!!formError.confirmPassword.length &&
                  "focus:outline-red-500 border border-red-400")
              }
              placeholder="Confirm your password"
              style={{
                backgroundColor: "#C9C9C9",
              }}
              value={formData.confirmPassword}
              onChange={handleFormDataChange}
            />
            {!!formError.confirmPassword.length && (
              <span className="text-sm text-red-500">
                {formError.confirmPassword}
              </span>
            )}
          </div>
        )}
        <div>
          <div className="rounded-lg bg-gradient">
            <button
              type="submit"
              className="bg-black  text-white  text-2xl py-4 m-1 rounded-md"
              style={{
                width: "calc(100% - 10px)",
              }}
              onClick={handleUserAuthentication}
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
