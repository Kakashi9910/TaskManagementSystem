import React, { useEffect } from "react";
import { Table, Badge, Button, Form, Modal } from "react-bootstrap";
import { useContext } from "react";
import { AccountContext } from "../../context/AccoutProvider";
import { useState } from "react";
import { deleteUserTasks, editTask } from "../../services/api";

const TaskListTable = ({ tableType }) => {
  const { tasks,setTasks } = useContext(AccountContext);
  const [show, setShow] = useState(false);
  const [taskIds,setTaskIds] = useState([])
  const {account} = useContext(AccountContext)
  const [currentTask, setCurrentTask] = useState({
    _id: "",
    description: "",
    dueDate: "",
    status: "",
    title:"",
    userEmail: account.email,
    tag:""
  });

  // Open Modal & Set Current Task
  const handleEdit = (task) => {
    console.log(currentTask)
    task.dueDate=task.dueDate.split("T")[0]
    setCurrentTask({...task,"userEmail":account.email,"tag":`${task.tag? task.tag: ''}`});
    setShow(true);
  };
  const handleDelete = async() => {
    console.log(taskIds)
    const response = await deleteUserTasks({"tasks":taskIds})
    console.log(response)
    setTasks([...response.tasks])
    setTaskIds([])
  };

  const handleClose = () => setShow(false); 
  const handleCheck = (checked,id) => {
    console.log(id)
    const exist = taskIds.includes(id)
    if(checked) {
        if(!exist) {
            setTaskIds((prev)=> [...prev,id])
        }
    } else {
        if(exist) {
            setTaskIds((prev) => prev.filter((taskId)=>taskId !== id))
        }
    }
  }
  const handleSave = async () => {
    // console.log(currentTask)
    const response = await editTask(currentTask)
    console.log(response)
    setTasks(tasks.map((task) => (task._id === currentTask._id ? currentTask : task)));
    setShow(false);
  };
  return (
    <>
    <Button onClick={handleDelete} className={`${taskIds.length>0 ? 'd-inline':'d-none'}`}>Delete</Button>
    <Table hover responsive="sm" className="shadow-sm rounded mt-3">
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Due On</th>
          <th>Task Status</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {tasks
          .filter((task) => task.status === tableType)
          .map((task) => (
            <tr key={task._id} className="align-middle">
              <td data-toggle="tooltip" title = {task.description}>
                <input onChange={(e)=>handleCheck(e.target.checked,task._id)} type="checkbox" className="me-2" />
                {task.title}
              </td>
              <td>{task.dueDate.split("T")[0]}</td>
              <td>
                <Badge bg="secondary" className="px-3 py-2">
                  {task.status}
                </Badge>
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </Button>{" "}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
          <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group className="mb-3">
                <Form.Label>Task Title</Form.Label>
                <Form.Control
                  type="text"
                  value={currentTask.title}
                  onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Task Description</Form.Label>
                <Form.Control
                  type="text"
                  value={currentTask.description}
                  onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={currentTask.dueDate.split("T")[0]}
                  onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })}
                />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={currentTask.status}
                  onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })}
                >
                  <option value="Todo">Todo</option>
                  <option value="Inprogress">Inprogress</option>
                  <option value="Completed">Completed</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tag</Form.Label>
                <Form.Select
                  value={currentTask.tag}
                  onChange={(e) => setCurrentTask({ ...currentTask, tag: e.target.value })}
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Urgent">Urgent</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  );
};

export default TaskListTable;
