import { Router } from "express"
// import { authController } from "../controllers/authControllers.js"
import { addTask,getAllTask,updateUserTask,deleteTasks } from "../controllers/taskController.js"


const taskRoutes = Router()
taskRoutes.post('/add-task',addTask)
taskRoutes.get('/get-tasks',getAllTask)
taskRoutes.put('/edit-task',updateUserTask)
taskRoutes.patch('/delete-task',deleteTasks)

export default taskRoutes