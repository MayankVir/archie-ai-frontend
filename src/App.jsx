import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Summary from "./pages/Summary";

function App() {
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
