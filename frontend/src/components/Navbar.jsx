import React from "react";
import "../assets/style.css";

const Navbar = () => {
  return (
    <nav id="navbar" className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        <img
          src={"vite.svg"}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Logo"
        />
            Quiz via file
      </a>
    </nav>
  );
};

export default Navbar;
