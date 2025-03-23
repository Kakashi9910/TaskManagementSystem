import { GoogleLogin } from "@react-oauth/google";
import { AccountContext } from "../../context/AccoutProvider";
import { useContext } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { authUser } from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginDialog = () => {
  const { setAccount } = useContext(AccountContext);

  const handleSuccess = async (credentialsResponse) => {
    try {
      const decode = jwtDecode(credentialsResponse.credential);
      console.log(decode);
      const userData = {
        iss: decode.iss,
        sub: decode.sub,
        email: decode.email,
        name: decode.name,
      };
      const response = await authUser(credentialsResponse.credential);
      console.log("my response", response);
      setAccount(decode);
      Cookies.set("authToken", credentialsResponse.credential, {
        expires: 3, // ✅ Expires in 3 hours
        secure: true, // ✅ Required for HTTPS
        sameSite: "None", // ✅ Required for cross-origin requests
    });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center p-4 bg-white shadow rounded w-25">
        {/* Logo */}
        <div className="mb-3">
          <h2 className="text-primary fw-bold">
            <i className="bi bi-check2-circle"></i> TaskBuddy
          </h2>
        </div>

        {/* Description */}
        <p className="text-muted">
          Streamline your workflow and track progress effortlessly with our
          all-in-one task management app.
        </p>

        {/* Google Login Button */}
        <div className="mt-3">
          <GoogleLogin
            onSuccess={(credentialResponse) => handleSuccess(credentialResponse)}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
          />
        </div>
      </div>
    </div>
  );
};

export default LoginDialog;
