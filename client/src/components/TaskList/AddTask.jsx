import React, { useContext, useState } from "react";
import { FaPlus, FaCalendarAlt } from "react-icons/fa";
import { Button, Form, Dropdown, InputGroup } from "react-bootstrap";
import { AccountContext } from "../../context/AccoutProvider";
import { addNewTask } from "../../services/api";

const AddTask = () => {
  const {setTasks} = useContext(AccountContext)
  const [showInput, setShowInput] = useState(false);
  const [newTask, setNewTask] = useState({ description: "",title:"",dueDate: "", status: "Todo",tag:"Work" });

  const addTask = async() => {
    if (newTask.description && newTask.dueDate) {
        console.log(newTask)
        const response = await addNewTask({"task":newTask})
        console.log(response)
      setTasks((prev)=>[newTask,...prev]);
      setNewTask({ description: "",title:"", dueDate: "", status: "Todo", tag:`${newTask.tag} || 'Work'`});
    }
  };
  return (
    <>
      <Button
        variant="link"
        className="text-dark fw-bold"
        onClick={() => setShowInput(!showInput)}
      >
        <FaPlus /> ADD TASK
      </Button>

      {showInput && (
        <div className="p-3 border rounded bg-white">
          <Form.Group className="py-1">
            <Form.Control
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
          <Form.Control
              className="py-1"
              type="text"
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
          </Form.Group>
          <InputGroup className="mt-2">
            <InputGroup.Text>
              <FaCalendarAlt />
            </InputGroup.Text>
            <Form.Control
              type="date"
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
            />
          </InputGroup>
          <Dropdown className="mt-2">
            <Dropdown.Toggle variant="light" className="border">
              {newTask.status}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {["Todo", "Inprogress", "Completed"].map((status) => (
                <Dropdown.Item
                  key={status}
                  onClick={() => setNewTask({ ...newTask, status })}
                >
                  {status}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2">
            <Dropdown.Toggle variant="light" className="border">
              {newTask.tag}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {["Work", "Urgent", "Personal"].map((tag) => (
                <Dropdown.Item
                  key={tag}
                  onClick={() => setNewTask({ ...newTask, tag })}
                >
                  {tag}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div className="mt-3">
            <Button variant="primary" onClick={addTask}>
              ADD
            </Button>
            <Button
              variant="light"
              className="ms-2"
              onClick={() => setShowInput(false)}
            >
              CANCEL
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTask;
