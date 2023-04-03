import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const TaskList = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/getTodo")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(todos);

  //handleCheck will update complete checkkbox value
const handleCheck = (todoId, subtaskId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo._id === todoId) {
        const updatedSubtasks = todo.subtasks.map((subtask) => {
          if (subtask._id === subtaskId) {
            const updatedSubtask = { ...subtask, completed: !subtask.completed, };
            axios.put(`http://localhost:4000/updateTodo/${todoId}/${subtaskId}`, { completed: updatedSubtask.completed,})
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
            return updatedSubtask;
          } else { return subtask; }
        });
        return {...todo,  subtasks: updatedSubtasks,};
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
};


  const handleAddBtn = (e) => {
    e.preventDefault();
    navigate("/AddTodo");
  };

  //delete subtask item
  const handleDelete = (todoId, subtaskId) => {
    axios
      .delete(`http://localhost:4000/deleteTodoItem/${todoId}/${ subtaskId}`)
      .then((response) => {
        setTodos((prevTodos) => {
          const updatedTodos = [...prevTodos];
          const todoIndex = updatedTodos.findIndex(
            (todo) => todo._id === todoId
          );
          const subtaskIndex = updatedTodos[todoIndex].subtasks.findIndex(
            (subtask) => subtask._id ===  subtaskId
          );
          updatedTodos[todoIndex].subtasks.splice(subtaskIndex, 1);
          return updatedTodos;
        });
      })
      .catch((error) => console.log(error));
  };

  //delete main task item
  const handleDeleteTodo = (todoId) => {
    axios
      .delete(`http://localhost:4000/deleteTodo/${todoId}`)
      .then((response) => {
        setTodos((prevTodos) => {
          const updatedTodos = prevTodos.filter((todo) => todo.id !== todoId);
          return updatedTodos;
        });
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const handleEditTodo = (todo) => {
    navigate("/EditTodo", { state: { todos: todo } });
  };

  return (
    <>
      <div className="container">
        <h1>Todos</h1>
        <button onClick={handleAddBtn}>Add todo </button>
        {todos.map((todo) => (
          <div key={todo._id}>
            <h2>{todo.name}</h2>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            <button onClick={() => handleEditTodo(todo)}>Edit</button>
            <ul>
              {todo.subtasks.map((subtask) => (
                <li key={subtask._id}>
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => handleCheck(todo._id, subtask._id)}
                  />
                  {subtask.heading}
                  <button onClick={() => handleDelete(todo._id, subtask._id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};
