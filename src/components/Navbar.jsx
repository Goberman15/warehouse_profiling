import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo_SPL.jpeg';
import LogoCKB from '../assets/Logo_CKB.png';
import '../styles/Navbar.css';
import { useDispatch } from 'react-redux';
import { setLoginStatus } from '../store/action';

const Navbar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    let location = useLocation();

    const logout = () => {
        localStorage.clear();
        dispatch(setLoginStatus({
            isLoggedIn: false
        }));
        history.push('/');
    }

    return (
        <>
            {location.pathname !== '/' &&
                <div className="navbar navbar-dark">
                    <span className="navbar-brand h1" onClick={() => history.push('/inquiries')}>
                        <img
                        className="logo"
                        src={ Logo }
                        alt="logo"
                        height="80"
                        />
                    </span>
                    <span className="navbar-brand h1" onClick={ logout }>
                        <img
                        className="logo"
                        src={ LogoCKB }
                        alt="logo"
                        height="80"
                        />
                    </span>
                </div>
            }
        </>
    );
}

export default Navbar;
