import React, { useContext, useRef } from 'react'
import "./login.scss"
import { Link } from 'react-router-dom'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
    }

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-l">
                </div>
                <div className="login-r">
                    <h1>Sign In</h1>
                    <form className="login-form" onSubmit={handleClick}>
                        <input ref={email} className="login-input" placeholder="Email" type="email" required />
                        <input ref={password} className="login-input" placeholder="password" type="password" minLength="4" required />
                        <button className="login-submit" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px"/> : "Sign In"}</button>
                        <span>Not registered yet?
                            <Link to={`/register`} className='login-link'>
                                <span> Create an Account</span>
                            </Link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    )
}
