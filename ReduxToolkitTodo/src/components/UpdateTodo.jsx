import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTodo } from '../features/todo/todoSlice';

function UpdateTodo() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [selectedId, setSelectedId] = useState('');
  const [updatedText, setUpdatedText] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!selectedId || !updatedText.trim()) return;

    dispatch(editTodo({ id: selectedId, newText: updatedText }));
    setSelectedId('');
    setUpdatedText('');
  };

  return (
    <form onSubmit={handleUpdate} className="mt-10 flex flex-col items-center space-y-3">
      <h2 className="text-xl text-white font-semibold">Update Todo</h2>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="bg-gray-800 text-white p-2 rounded"
      >
        <option value="">Select Todo</option>
        {todos.map((todo) => (
          <option key={todo.id} value={todo.id}>
            {todo.text}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Enter new text"
        value={updatedText}
        onChange={(e) => setUpdatedText(e.target.value)}
        className="bg-gray-800 text-white p-2 rounded w-64"
      />

      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Update Todo
      </button>
    </form>
  );
}

export default UpdateTodo;
