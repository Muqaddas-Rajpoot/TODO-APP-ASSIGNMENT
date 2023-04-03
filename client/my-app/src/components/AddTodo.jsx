import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddTodo = () => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [subtasks, setSubtasks] = useState([""]);

  const handleSubtaskChange = (index, event) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = event.target.value;
    setSubtasks(newSubtasks);
  };
  const addSubtask = () => {
    setSubtasks([...subtasks, ""]);
    console.log(subtasks);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: taskName,
      subtasks: subtasks.filter((subtask) => subtask.trim() !== ""),
    };
    axios
      .post("http://localhost:4000/addTodo", data)
      .then((response) => {
        console.log(response.data);
        setTaskName("");
        setSubtasks([""]);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>
            Task Name:
            <input
              type="text"
              value={taskName}
              onChange={(event) => setTaskName(event.target.value)}
            />
          </label>
          {subtasks.map((subtask, index) => (
            <div key={index}>
              <label>
                Subtask #{index + 1}:
                <input
                  type="text"
                  value={subtask}
                  onChange={(event) => handleSubtaskChange(index, event)}
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={addSubtask}>
            Add Subtask
          </button>
          <button type="submit">Create Task</button>
        </form>
      </div>
    </>
  );
};
