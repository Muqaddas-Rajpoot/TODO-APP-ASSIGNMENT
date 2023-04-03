
import './App.css';
import { Routes,Route } from 'react-router-dom';
import { TaskList } from './components/TaskList';
import { AddTodo } from './components/AddTodo';
import { EditTodo } from './components/EditTodo';

function App() {
  return (
    <div className="App">
       <Routes>
       <Route path="/" element={<TaskList/>} />
        <Route path="/AddTodo" element={<AddTodo />} />
        <Route path="/EditTodo" element={<EditTodo />} />
      </Routes>
    </div>
  );
}

export default App;
