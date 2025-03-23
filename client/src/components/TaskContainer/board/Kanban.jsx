import { useState, useContext, useMemo, useEffect } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import { AccountContext } from "../../../context/AccoutProvider";
import { editTask } from "../../../services/api";

const Kanban = () => {
  const { tasks,setTasks } = useContext(AccountContext);

  
  // Compute columns using useMemo to prevent unnecessary recalculations
  const computedColumns = useMemo(() => {
    console.log(tasks)
    return {
      todo: {
        id: "Todo",
        list: tasks.filter((task) => task.status === "Todo"),
      },
      doing: {
        id: "Inprogress",
        list: tasks.filter((task) => task.status === "Inprogress"),
      },
      done: {
        id: "Completed",
        list: tasks.filter((task) => task.status === "Completed"),
      },
    };
  }, [tasks]); // Recompute when tasks change

  // Initialize state with computed columns
  const [columns, setColumns] = useState(computedColumns);

  // Sync columns state when tasks change
  useEffect(() => {
    setColumns(computedColumns);
  }, [computedColumns]);

  const styledColumns = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    margin: "10vh auto",
    width: "100%",
    height: "80vh",
    gap: "8px",
  };

  const editChangesInDb = async (Task) => {
    try {
        const response = await editTask(Task)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
  }

  const onDragEnd = (result) => {
    
    const { source, destination,draggableId } = result;
    // console.log('$$$$$$4',source,destination,draggableId)
    // console.log(tasks)
    let editTaskData = {}
    setTasks((prev)=> {
        prev.forEach((task)=>{
            if(task._id === draggableId) {
                task.status = destination.droppableId
                editTaskData = task
            }
        })
        return [...prev]
    })

    editChangesInDb(editTaskData)
    
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      const newList = [...start.list];
      const [movedItem] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, movedItem);

      const newCol = { id: start.id, list: newList };
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
    } else {
      const newStartList = [...start.list];
      const [movedItem] = newStartList.splice(source.index, 1);
      const newStartCol = { id: start.id, list: newStartList };

      const newEndList = [...end.list];
      newEndList.splice(destination.index, 0, movedItem);
      const newEndCol = { id: end.id, list: newEndList };

      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={styledColumns}>
        {Object.values(columns).map((col) => (
          <Column col={col} key={col.id} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Kanban;
