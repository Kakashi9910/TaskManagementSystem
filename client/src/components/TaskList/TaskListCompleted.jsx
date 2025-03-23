import React, { useContext,useMemo } from "react";
import AddTask from "./AddTask";
import { AccountContext } from "../../context/AccoutProvider";
import TaskListTable from "./TaskListTable";

const TaskListComplete = () => {
      const { tasks } = useContext(AccountContext);
      const completedTasks = useMemo(
        () => tasks.filter((task) => task.status === "Completed"),
        [tasks]
      );
    
  return (
        <div className="container mt-4">
          <div className="p-3 bg-light rounded shadow">
            <h5 className="text-black p-2 rounded" >
              Completed ({completedTasks.length})
            </h5>
            <AddTask />
            <TaskListTable tableType="Completed"/>
          </div>
        </div>
  )
}

export default TaskListComplete