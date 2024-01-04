import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/standard-collection-27.svg";

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`navbar${isMenuOpen ? " mobile-menu-open" : ""}`}>
      <div className="navbar-container">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#fff",
          }}
        >
          <div className="logo">
            <img
              className="standard-collection-27"
              alt="logo"
              src={Logo}
              draggable={false}
            />
            <span className="bytebattles">ByteBattles</span>
          </div>
        </Link>
        <div className={`links${isMenuOpen ? " mobile-links" : ""}`}>
          <Link to="/problems" onClick={toggleMenu}>
            Problems
          </Link>
          <Link to="/contest" onClick={toggleMenu}>
            Contests
          </Link>
          <Link to="/about" onClick={toggleMenu}>
            About
          </Link>
          <Link to="/profile" onClick={toggleMenu}>
            Profile
          </Link>
          <button
            className="LoginButton"
            onClick={`${isAuthenticated}` ? handleLogout : null}
          >
            {!isAuthenticated ? (
              <Link to="/signup">Sign up</Link>
            ) : (
              <span>Log out</span>
            )}
          </button>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          &#9776;
        </div>
      </div>
    </div>
  );
};

export default Navbar;
