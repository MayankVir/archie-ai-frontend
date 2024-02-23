import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Summary from "./pages/Summary";
import { useEffect } from "react";
import useStore from "./store/store";

function App() {
  const { handleUserLoginExternally } = useStore((state) => state.auth);

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/summary"
          element={
            <PrivateRoute>
              <Summary />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
