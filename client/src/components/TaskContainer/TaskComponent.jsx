import TaskNavbar from "./TaskNavbar";
import Kanban from "./board/Kanban";
import TaskHeader from "./TaskHeader";
import TaskListTodo from "../TaskList/TaskListTodo";
import { useContext, useEffect, useState } from "react";
import { getUserTask } from "../../services/api";
import { AccountContext } from "../../context/AccoutProvider";
import TaskListProgress from "../TaskList/TaskListProgress";
import TaskListComplete from "../TaskList/TaskListCompleted";
import FilterSearch from "./FilterSearch";

const TaskComponent = () => {
  const [filter, setFilter] = useState("");

  const [activeView, setActiveView] = useState("list");

  const { setTasks } = useContext(AccountContext);
  useEffect(() => {
    const getTask = async () => {
      const response = await getUserTask();
      if (filter) {
        setTasks(response.userTasks.filter((Task)=> Task.tag!= filter))
      } else {
        setTasks([...response.userTasks]);
      }
    };
    getTask();
  }, [filter]);

  return (
    <div className="m-4">
      <TaskHeader />
      <TaskNavbar activeView={activeView} setActiveView={setActiveView} />
      <FilterSearch filter={filter} setFilter={setFilter} />
      {activeView === "list" ? (
        <>
          <TaskListTodo />
          <TaskListProgress />
          <TaskListComplete />
        </>
      ) : (
        <Kanban />
      )}
    </div>
  );
};

export default TaskComponent;
