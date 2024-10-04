import React from "react";
import "./Header.css";

const Header = ({ logout }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="app-header">
      <h1>ICKK Video zdroje</h1>
      <div className="user-info">
        <span>Welcome, {user?.username || "Guest"}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
