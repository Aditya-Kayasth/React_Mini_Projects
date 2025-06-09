import React, { useContext } from "react";
import UserContext from "../context/UserContext";

function Profile() {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div style={styles.container}>
        <h1 style={styles.message}>Please login to view your profile</h1>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>👤 User Profile</h2>
      <p style={styles.info}>
        <strong>Username:</strong> {user.username}
      </p>
      <p style={styles.info}>
        <strong>Password:</strong> {user.password}
      </p>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "100px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    color: "#555",
  },
  card: {
    width: "350px",
    margin: "100px auto",
    padding: "25px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
    textAlign: "left",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  info: {
    fontSize: "16px",
    textAlign: "center",
    marginBottom: "10px",
    color: "#444",
  },
  message: {
    color: "#888",
  },
};

export default Profile;
