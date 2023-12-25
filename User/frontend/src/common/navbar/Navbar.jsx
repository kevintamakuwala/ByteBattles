import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/standard-collection-27.svg";

const Navbar = ({ isAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`navbar${isMenuOpen ? " mobile-menu-open" : ""}`}>
      <div className="navbar-container">
        <div className="logo">
          <img
            className="standard-collection-27"
            alt=""
            src={Logo}
            draggable={false}
          />
          <span className="bytebattles">ByteBattles</span>
        </div>
        <div className={`links${isMenuOpen ? " mobile-links" : ""}`}>
          <Link to="/problem" onClick={toggleMenu}>
            Problems
          </Link>
          <Link to="/contests" onClick={toggleMenu}>
            Contests
          </Link>
          <Link to="/about" onClick={toggleMenu}>
            About
          </Link>
          <Link to="/profile" onClick={toggleMenu}>
            Profile
          </Link>
          <button className="LoginButton">
            <Link to="/signup">
              {isAuthenticated ? <span> Log Out</span> : <span>Sign up</span>}
            </Link>
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
