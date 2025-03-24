
import Cookies from "js-cookie";
import { useContext } from "react";
import { AccountContext } from "../../context/AccoutProvider";

const TaskHeader = () => {
    const {setAccount} = useContext(AccountContext)
    console.log(account)
    return <div className="d-flex justify-content-between">
         <h2>TaskBuddy</h2>
         <div>
         <button type="button" class="btn btn-danger" onClick={()=>{Cookies.remove('authToken'); setAccount('')}}>Log Out</button>
         </div>
    </div>

}

export default TaskHeader