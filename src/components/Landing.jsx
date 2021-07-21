import React, { useState } from 'react';
import Logo from '../assets/Logo_SPL.jpeg';
import server from '../api';
import Loader from 'react-loader-spinner';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setLoadingStatus, setLoginStatus } from '../store/action';
import '../styles/Landing.css';

const Landing = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isLoading = useSelector(state => state.isLoading);
    const dispatch = useDispatch();
    let location = useLocation();
    let history = useHistory();

    const inputChangeHandler = event => {
        const { value, name } = event.target;

        switch(name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    const login = event => {
        event.preventDefault();
        dispatch(setLoadingStatus({isLoading: true}));
        server.post('/login', {
            username, password
        })
        .then(({ data }) => {
            console.log(data);
            const { token } = data;
            localStorage.setItem('token', token);
            dispatch(setLoginStatus({
                isLoggedIn: true
            }));
            toast.success(`Login Success!`);
            history.push('/inquiries');
        })
        .catch(err => {
            console.error(err.response);
            toast.error(err.response.data.error);
        })
        .finally(() => {
            dispatch(setLoadingStatus({isLoading: false}));
        })
    }

    return (
        <div className="row landing-page">
            <div className="col logo-container">
                <img src={Logo} alt="SPL Logo"/>
            </div>
            <div className="col d-flex flex-column align-items-center justify-content-center form-container">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <p className="form-text-head">LOGIN</p>
                    <label className="form-text">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={inputChangeHandler}
                        placeholder="Your Username"
                    />
                    <label className="form-text">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={inputChangeHandler}
                        placeholder="Your Password"
                    />
                    {!isLoading &&
                        <button
                            className="btn btn-success btn-block"
                            onClick={ login }
                        >Login</button>
                    }
                    {!!isLoading &&
                        <Loader
                            type="ThreeDots"
                            color="#005F41"
                            height={80}
                            width={80}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default Landing;
