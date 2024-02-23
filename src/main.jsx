import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="804436694887-5k63bbovlbq3vg1lrun2cje82oh0tk7k.apps.googleusercontent.com">
      <App />
      <Toaster />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
