import { useEffect, useState } from 'react';



function App() {
  const [todo, settodo] = useState([])
  const [task,settask] = useState("")


  //Fetch todo
  const fetch_todo = async ()=> {

    const data = await fetch("/api/todo")
    const res = await data.json()

    settodo(res)
  }

  //Add todo
  const add_todo = async () => {

    if (!task.trim()) return
    
    // Bhejne ka tarika thoda complex hai
    await fetch("/api/todo",{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({task})
    })

    settask("") // Clean the task variable
    fetch_todo() // Bring todo again with the new one added

  }

  const toggle = async (id,complete) => {

    await fetch(`/api/todo/${id}`,{
      method:'PUT',
      headers:{ 'Content-Type': 'application/json' },
      body: JSON.stringify({'complete': !complete}) // default false tha ye

    })

    fetch_todo()

  }

  const delete_todo = async (id) => {

    await fetch(`/api/todo/${id}`,{
      method:'DELETE'
    })

    fetch_todo()

  }

  useEffect(() => {
    fetch_todo()
  },[])

  return (
    <>
    <div className="p-6 max-w-xl mx-auto bg-slate-800 my-20">
      <h1 className="text-3xl font-bold mb-4 text-white ">Todo App</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-grow"
          value={task}
          onChange={(e) => settask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") add_todo()
        }}
          placeholder="Enter task"
        />
        <button 
        onClick={add_todo} 
        className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </div>

      <ul className="space-y-2">
        {todo.map(todo => (
          <li key={todo.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span
              onClick={() => toggle(todo.id, todo.complete)}
              className={`cursor-pointer ${todo.complete ? "line-through text-gray-400" : ""}`}
              >
              {todo.task}
            </span>
            <button onClick={() => delete_todo(todo.id)} className="text-red-600">🗑️</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default App
