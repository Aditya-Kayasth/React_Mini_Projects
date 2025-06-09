import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ username, password });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setusername(e.target.value)}
        placeholder="Username"
        style={styles.input}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder="Password"
        style={styles.input}
      />
      <button onClick={handleSubmit} style={styles.button}>
        Submit
      </button>
    </div>
  );
}

const styles = {
  container: {
    width: "300px",
    margin: "10px auto",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    marginLeft: "0px",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    display: "block",
    width: "92%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Login;
