import React from "react";
import "../assets/style.css";

const Navbar = () => {
  return (
    <nav id="navbar" className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        <img
          src={"icon.png"}
          width="30"
          height="30"
          className="d-inline-block align-top mr-2"
          alt="Logo"
        />
        <span style={{fontFamily: "Berkshire Swash", fontWeight: "400"}}>Quiz via file</span>
      </a>
    </nav>
  );
};

export default Navbar;
