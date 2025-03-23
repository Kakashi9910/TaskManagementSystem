import axios from 'axios'


const URL = import.meta.env.VITE_BACKEND_URL

export const authUser = async(userData) => {
    try {
        const response = await axios.post(`${URL}/api/auth/signin`,{"token":userData},{withCredentials:true})
        return response.data
    } catch (error) {
        console.log(error)
    }
}



export const getUserTask = async() => {
    const token = Cookies.get("authToken"); // ✅ Get token from cookies
    try {
        const response = await axios.get(`${URL}/api/task/get-tasks`,{withCredentials:true,            headers: {
            Authorization: {token}, // ✅ Manually send token
        },
        headers: {
            Authorization: `Bearer ${token}`, // ✅ Manually send token
        },
})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const addNewTask = async (userTask) => {
    try {
        const response = await axios.post(`${URL}/api/task/add-task`,userTask,{withCredentials:true})
        return response.data
    } catch (error) {
        
    }
}

export const editTask = async (userTask) => {
    try {
        console.log('####',userTask)
        const response = await axios.put(`${URL}/api/task/edit-task`,userTask,{withCredentials:true})
        return response.data
    } catch (error) {
        
    }
}

export const deleteUserTasks = async (tasksIds) => {
    try {
        console.log('########',tasksIds)
        const response = await axios.patch(`${URL}/api/task/delete-task`,tasksIds,{withCredentials:true})
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}