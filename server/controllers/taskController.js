import Task from "../model/Task.js";
import {jwtDecode} from 'jwt-decode'

// ADD a new task to the user's existing task list
export const addTask = async (req, res) => {
  try {
    const { task } = req.body;
    const decoded = jwtDecode(req.cookies.authToken)
    const userEmail = decoded.email
    if (!userEmail || !task || !task.description || !task.dueDate || !task.status || !task.title) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    let taskDocument = await Task.findOne({ userEmail });

    if (taskDocument) {
      // Append the new task to the existing tasks array
      taskDocument.tasks.unshift(task);
      await taskDocument.save();
      return res.status(200).json({ message: "Task added successfully", data: taskDocument });
    } else {
      // If user does not exist, create a new document with the first task
      const newTask = new Task({ userEmail, tasks: [task] });
      await newTask.save();
      return res.status(201).json({ message: "Task list created with the first task", data: newTask });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllTask = async (req,res) => {
    try {
        const decoded = jwtDecode(req.cookies.authToken)
        const task = await Task.findOne({"userEmail":decoded.email})
        if (!task) {
            res.status(404).send({"status":"User not found"})
            return
        }
        res.status(200).send({"userTasks":task.tasks})
    } catch (error) {
        res.status(500).send({"error":error.message})
    }
}

export const updateUserTask = async(req,res) => {
  try {
    const decoded = jwtDecode(req.cookies.authToken)
    const userEmail = decoded.email
    const {_id} = req.body
    // console.log(req.body)
    const taskData = await Task.findOne({"userEmail":userEmail})
    //  console.log('&&&&&&&',taskData)
    if(!taskData ) {
      res.status(404).send("User is not found")
    }
    taskData.tasks.forEach((task,index)=> {
      if(task.id ===  _id) {
        taskData.tasks[index] = req.body
      }

    })
    // console.log('#########',taskData.tasks)
    await taskData.save()
    res.status(200).send({"status":"task updated successfully"})
  } catch (error) {
    res.status(500).send({"error":error.message})
  }
}

export const deleteTasks = async (req,res) => {
  try {
    console.log(req.body)
    const decoded = jwtDecode(req.cookies.authToken)
    const userEmail = decoded.email
    const taskIds = req.body.tasks
    const taskData = await Task.findOne({"userEmail":userEmail})
    if(!taskData ) {
      res.status(404).send("User is not found")
    }
    const remainingTasks = taskData.tasks.filter((task) => !taskIds.includes(task.id))
    taskData.tasks = remainingTasks
    const data = await taskData.save()
    console.log('%%%%5',taskData.tasks)

    res.status(201).send({tasks:data.tasks})
  } catch (error) {
    res.status(500).send({"error":error.message})
  }
}
