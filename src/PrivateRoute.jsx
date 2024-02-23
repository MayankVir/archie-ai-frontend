import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useStore from "./store/store";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, handleUserLoginExternally } = useStore(
    (state) => state.auth
  );

  if (isLoggedIn) return children;
  else return <Navigate to={"/login"} />;
};

export default PrivateRoute;
