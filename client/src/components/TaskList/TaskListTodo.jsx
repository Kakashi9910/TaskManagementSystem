import React, { useContext,useMemo } from "react";

import AddTask from "./AddTask";
import { AccountContext } from "../../context/AccoutProvider";
import TaskListTable from "./TaskListTable";

const TaskListTodo = () => {

      const { tasks } = useContext(AccountContext);
      const todoTasks = useMemo(
        () => tasks.filter((task) => task.status === "Todo"),
        [tasks]
      );
  return (
    <div className="container mt-4">
      <div className="p-3 bg-light rounded shadow">
        <h5 className="text-black p-2 rounded" >
          Todo ({todoTasks.length})
        </h5>
        <AddTask />
        <TaskListTable tableType="Todo"/>
      </div>
    </div>
  );
};

export default TaskListTodo;
