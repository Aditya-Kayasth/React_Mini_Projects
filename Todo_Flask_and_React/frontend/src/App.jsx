import { useEffect, useState, useRef } from 'react';

function App() {
  const [todo, settodo] = useState([]);
  const [task, settask] = useState("");
  const [editId, setEditId] = useState(null); // 🆕 for editing
  const [editTask, setEditTask] = useState(""); // 🆕 editing value

  // Fetch todo
  const fetch_todo = async () => {
    const data = await fetch("/api/todo");
    const res = await data.json();
    settodo(res);
  };

  // Add todo
  const add_todo = async () => {
    if (!task.trim()) return;

    await fetch("/api/todo", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task })
    });

    settask("");
    fetch_todo();
  };

  // Toggle complete
  const toggle = async (id, complete) => {
    await fetch(`/api/todo/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ complete: !complete })
    });

    fetch_todo();
  };

  // Delete todo
  const delete_todo = async (id) => {
    await fetch(`/api/todo/${id}`, {
      method: 'DELETE'
    });

    fetch_todo();
  };

  // Save edited todo
  const save_edit = async () => {
    await fetch(`/api/todo/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: editTask })
    });

    setEditId(null);
    setEditTask("");
    fetch_todo();
  };

  useEffect(() => {
    fetch_todo();
  }, []);


  const focus_pointer = useRef(null)

  useEffect(() => {

      if(editId !== null && focus_pointer.current){
        focus_pointer.current.focus()
      }
  },[editId])
  return (
    <div className="p-6 max-w-xl mx-auto bg-slate-800 my-20 rounded-xl">
      <h1 className="text-3xl font-bold mb-4 text-white">📝 Todo App</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-grow rounded"
          value={task}
          onChange={(e) => settask(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") add_todo() }}
          placeholder="Enter task"
        />
        <button
          onClick={add_todo}
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todo.map(item => (
          <li key={item.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <div className="flex-grow">
              {editId === item.id ? (
                <input
                  onKeyDown={(e) => {if (e.key === "Enter") save_edit()}}
                  ref={focus_pointer}
                  className="border p-1 w-full rounded"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
              ) : (
                <span
                  onClick={() => toggle(item.id, item.complete)}
                  className={`cursor-pointer ${item.complete ? "line-through text-gray-400" : ""}`}
                >
                  {item.task}
                </span>
              )}
            </div>
            <div className="flex gap-2 ml-2">
              {editId === item.id ? (
                <>
                  <button
                    onClick={save_edit}
                    className="text-green-600 font-semibold"
                  >
                    ✅
                  </button>
                  <button
                    onClick={() => {
                      setEditId(null);
                      setEditTask("");
                    }}
                    className="text-yellow-600 font-semibold"
                  >
                    ❌
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditId(item.id);
                      setEditTask(item.task);

                    }}
                
                    className="text-blue-600"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => delete_todo(item.id)}
                    className="text-red-600"
                  >
                    🗑️
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
