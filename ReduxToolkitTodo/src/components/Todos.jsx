import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo } from '../features/todo/todoSlice';

function Todos() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  return (
    <ul className="mt-6 list-none w-full max-w-md">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
        >
          <span className="text-white">{todo.text}</span>
          <button
            onClick={() => dispatch(removeTodo(todo.id))}
            className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Todos;
