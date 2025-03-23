import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import AccountProvider from "./context/AccoutProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";


createRoot(document.getElementById("root")).render(
  

  <GoogleOAuthProvider clientId={import.meta.env.VITE_SECRET}>
  <AccountProvider>
    <App />
  </AccountProvider>
  </GoogleOAuthProvider>

);
