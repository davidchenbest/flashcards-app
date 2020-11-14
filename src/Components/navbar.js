import React from 'react';
import { Link } from 'react-router-dom';
import './css/navbar.css';

const Navbar =()=>{
    return(
        <nav className="navbar navbar-expand-sm  navbar-dark sticky-top">
            <h1 id='logo'>Flashcards</h1>
            <button id='dark-mode' className="btn btn-primary btn-xs">Dark Mode</button>
            <ul className="navbar-nav">
            <li className="nav-item">
                <span className="nav-link" ><Link to='/input' >Input</Link></span>
            </li>
            <li className="nav-item">
                <span className="nav-link" ><Link to='/study'>Study</Link></span>
            </li>
            </ul>
        </nav>




    )
}

export default Navbar;
