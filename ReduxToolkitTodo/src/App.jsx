import React from 'react';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';
import UpdateTodo from './components/UpdateTodo';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center px-4">
      <h1 className="text-3xl text-white font-bold mt-10">Redux Todo App 🚀</h1>
      <AddTodo />
      <Todos />
      <UpdateTodo />
    </div>
  );
}

export default App;
