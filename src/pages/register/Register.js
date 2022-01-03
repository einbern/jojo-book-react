import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const repassword = useRef();
    const navigate = useNavigate();
    const [isFetching, setIsFetching] = useState(false);


    const handleClick = async (e) => {
        e.preventDefault();
        setIsFetching(true);
        if (repassword.current.value !== password.current.value) {
            password.current.setCustomValidity("Passwords don't match!")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post("/auth/register", user);
                navigate("/login");
            } catch (err) {
                console.log(err)
            }
        }
        setIsFetching(false);
    }

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-l">
                </div>
                <div className="login-r">
                    <h1>Sign Up</h1>
                    <form className="login-form" onSubmit={handleClick}>
                        <input ref={username} className="login-input" placeholder="Username" type="text" required />
                        <input ref={email} className="login-input" placeholder="Email" type="email" required />
                        <input ref={password} className="login-input" placeholder="password" type="password" minLength="4" required />
                        <input ref={repassword} className="login-input" placeholder="re-password" type="password" minLength="4" required />
                        <button className="login-submit" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px"/> : "Sign Up"}</button>
                        <span>Already a member?
                            <Link to={`/login`} className='login-link'>
                                <span> Sign in</span>
                            </Link>
                        </span>
                    </form>

                </div>
            </div>
        </div>
    )
}
