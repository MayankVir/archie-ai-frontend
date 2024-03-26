import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useStore from "./store/store";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useStore((state) => state.auth);

  if (isLoggedIn === null) return;

  if (isLoggedIn) return children;
  else return <Navigate to={"/login"} />;
};

export default PrivateRoute;
