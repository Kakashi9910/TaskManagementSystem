import React, { useContext,useMemo } from "react";
import AddTask from "./AddTask";
import { AccountContext } from "../../context/AccoutProvider";
import TaskListTable from "./TaskListTable";

const TaskListProgress = () => {
      const { tasks } = useContext(AccountContext);
      const inProgressTasks = useMemo(
        () => tasks.filter((task) => task.status === "Inprogress"),
        [tasks]
      );
    
  return (
        <div className="container mt-4">
          <div className="p-3 bg-light rounded shadow">
            <h5 className="text-black p-2 rounded" >
              In Progress ({inProgressTasks.length})
            </h5>
            <AddTask />
            <TaskListTable tableType="Inprogress"/>
          </div>
        </div>
  )
}

export default TaskListProgress