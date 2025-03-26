import LoginDialog from "./components/account/LoginDialog";
import { useEffect } from "react";
import { useContext } from "react";
import { AccountContext } from "./context/AccoutProvider";
import Cookies from "js-cookie"; // Import js-cookie
import jwtDecode from 'jwt-decode'
import TaskComponent from "./components/TaskContainer/TaskComponent";
import "./App.css"


function App() {
  const { account, setAccount } = useContext(AccountContext);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      const decode = jwtDecode(token);
      console.log(decode);
      setAccount(decode);
    }
  }, []);
  return <>{account ? <TaskComponent/> : <LoginDialog />}</>;
}

export default App;
