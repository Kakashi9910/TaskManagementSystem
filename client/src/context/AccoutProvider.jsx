import { createContext,useState } from "react"


export const AccountContext = createContext(null)
const AccountProvider = ({children}) => {
    const [account,setAccount] = useState()
    const [tasks,setTasks] = useState([])

    return (
    <AccountContext.Provider  value ={{
        account,
        setAccount,
        tasks,setTasks
    }}
    >
        {children}
    </AccountContext.Provider>
    )

}

export default AccountProvider
