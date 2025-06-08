import { useState } from 'react'


import './App.css'

function App() {
  let [num, setnum] = useState(0)

  function add() {

    if (num >= 20) {
    alert("Cannot go above 20")
    }else{
    setnum(num+1);}
  };

  function remove(){

    if (num > 0){
    setnum(num-1)}
    else{
      alert('Cannot go below 0 !!!')
    }
  };

  return (
    <>

      <h1>Hello Friend 👋</h1>
      <hr />
      <h2>Counter : {num}</h2>

      <div className="btn">
        <button
        
        onClick={add}>Add</button>

        <button 
        onClick={remove}
        >Remove</button>
      </div>

      <br />
      <hr />
    </>
  )
}

export default App
