import React from 'react';
import Logo from '../assets/Logo_Warehouse_Project.png';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar navbar-dark">
            <span className="navbar-brand h1">
                <img
                className="logo"
                src={ Logo }
                alt="logo"
                height="80"
                />
            </span>
            {/* <div className="mx-auto">
                <h1>Warehouse Project</h1>
            </div>
            <div style={{width: '25px'}}>
                <span>{' '}</span>
            </div> */}
            {/* <div className="nav justify-content-end">
                <div className="nav-item">
                <span className="nav-link text-light" onClick={ toMovieList }>Movie List</span>
                </div>
                <div className="nav-item">
                <span className="nav-link text-light" onClick={ toWatchlist }>My Watchlist</span>
                </div>
            </div> */}
        </div>
    );
}

export default Navbar;
