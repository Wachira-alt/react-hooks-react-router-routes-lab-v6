import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css"; // Ensure you have styles in the NavBar.css file

function NavBar() {
  return (
    <div className="navbar">
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/actors">Actors</NavLink>
      <NavLink to="/directors">Directors</NavLink>
    </div>
  );
}

export default NavBar;
