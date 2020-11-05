import React from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../assets/Logo_Warehouse_Project.png';
import '../styles/Navbar.css';

const Navbar = () => {
    const history = useHistory();
    return (
        <div className="navbar navbar-dark">
            <span className="navbar-brand h1" onClick={() => history.push('/')}>
                <img
                className="logo"
                src={ Logo }
                alt="logo"
                height="80"
                />
            </span>
        </div>
    );
}

export default Navbar;
