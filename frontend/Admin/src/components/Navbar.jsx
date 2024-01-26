import React from "react";
import "./components.css";

const Navbar = ({ onLogout }) => {

  return (
    <div className="navbar__container">
      <h1>ByteBattles Admin</h1>
      <button className="logout__button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
