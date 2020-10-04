import React from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

const Navbar = () => {
  return (
    <>
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to ="/"><h2 className ="navbar-brand">Diet Manager</h2></Link>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <Link to="/about" className ="nav-link">About</Link>
                <Link to="/calculator" className ="nav-link">Calculator</Link>
            </div>
        </div>
    </nav>
    </>
  );
};
export default Navbar;