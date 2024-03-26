import { useEffect } from "react";
import useStore from "../../store/store";

const AuthWrapper = ({ children }) => {
  const { handleUserLoginExternally } = useStore((state) => state.auth);

  useEffect(() => {
    if (localStorage) {
      const name = localStorage.getItem("name");
      const type = localStorage.getItem("type");
      const token = localStorage.getItem("token");
      if (name && type && token) {
        handleUserLoginExternally({ name, type, token });
      }
    }
  }, []);

  return children;
};

export default AuthWrapper;
