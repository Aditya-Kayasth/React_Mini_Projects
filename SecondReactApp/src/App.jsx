import { useState } from 'react'

function App() {
  const [color, setColor] = useState("black")

  const buttonColors = ["red", "green", "yellow", "orange"]

  return (
    <div style={{
      minHeight: "97vh",
      backgroundColor: color,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: "20px"
    }}>
      <h1 style={{ background:"black",
        margin:0,
        padding:10,
        borderRadius:10,
        color: "white", textShadow: "1px 1px 3px #000" }}>
        Choose a Color 🎨
      </h1>
      

      <div style={{
        display: 'flex',
        gap: "15px",
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {buttonColors.map((clr) => (
          <button
            key={clr}
            onClick={() => setColor(clr)}
            style={{
              backgroundColor: clr,
              border: "none",
              color: clr === "yellow" ? "#333" : "white",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease-in-out"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {clr.charAt(0).toUpperCase() + clr.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
