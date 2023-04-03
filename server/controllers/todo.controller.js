const Todo = require("../model/todo.model");

const addTodos=async (req, res) => {
    const { name, subtasks } = req.body;
  const newTodo = new Todo({
        name: req.body.name,
         subtasks : req.body.subtasks,
         subtasks: subtasks.map((subtask) => {
             return {
                heading: subtask,
                 completed: false,
               };  
         }),
     });
  const savedTodo=await newTodo.save();
  res.status(201).json(savedTodo);
};

const getTodos= async (req, res) => {
    try {
      const todos = await Todo.find();
      res.send(todos)
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const updateSubtodoCompleted= async (req, res) => {
    try {
      const { todoId, subtaskId } = req.params;
      const { completed } = req.body;
      const todo = await Todo.findById(todoId);
      if (!todo) return res.status(404).send('Todo not found');
      const subtask = todo.subtasks.find((subtask) => subtask._id == subtaskId);
      if (!subtask) return res.status(404).send('Subtask not found');
      subtask.completed = completed;
      await todo.save();
      res.json(todo);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };

  const deleteSubtodo= async (req, res) => {
    const todoId = req.params.todoId;
    const subtaskId = req.params.subtaskId;
    try {
      const todo = await Todo.findById(todoId);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      const subtaskIndex = todo.subtasks.findIndex((subtask) => subtask._id == subtaskId);
      if (subtaskIndex === -1) {
        return res.status(404).json({ message: 'Subtask not found' });
      }
      todo.subtasks.splice(subtaskIndex, 1);
      const savedTodo = await todo.save();
      res.send(savedTodo)
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const deleteTodo= async (req, res) => {
    try {
      const todoId = req.params.todoId;
      const deletedTodo = await Todo.findByIdAndDelete(todoId);
      const todos = await Todo.find();
      const remainingTodos = todos.filter((todo) => todo.id !== todoId);
      res.send(remainingTodos)
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }
  };
  const getTodoById= async (req, res) => {
    try {
      const todoId = req.params.todos._id;
      console.log(todos._id)
      const todos = await Todo.findOne(todoId);
      
      res.send(todos)
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

module.exports = {
    addTodos,
    getTodos,
    updateSubtodoCompleted,
    deleteSubtodo,
    deleteTodo,
    getTodoById
  };