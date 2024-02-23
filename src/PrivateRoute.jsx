import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useStore from "./store/store";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, handleUserLoginExternally } = useStore(
    (state) => state.auth
  );

  useEffect(() => {
    if (localStorage) {
      const name = localStorage.getItem("name");
      const email = localStorage.getItem("email");
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      console.log({ name, email, isLoggedIn });
      if (name && email && isLoggedIn) {
        handleUserLoginExternally({ name, email });
      }
    }
  }, []);

  if (isLoggedIn) return children;
  else return <Navigate to={"/login"} />;
};

export default PrivateRoute;
