import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
  useLocation,
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Summary from "./pages/Summary";
import { useEffect } from "react";
import useStore from "./store/store";
import NotFound from "./pages/NotFound";

function App() {
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/summary/:conversation_id"
          element={
            <PrivateRoute>
              <Summary />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
