import './register.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();             // if we dont use preventDefault, everytime we submit the page will reload. We dont need that in react
        setError(false);
        try{
            const res = await axios.post('/auth/register', {
                username,
                email,
                password,
            });
            res.data && window.location.replace("/login");
        }
        catch(err){
            setError(true);
        }
        
    };
    return (
        <div className = 'register'>
            <span className='register-title'>Hi, Welcome!</span>
            <span className='register-subtitle'>Let's get started</span>
            <form className = 'register-form' onSubmit={handleSubmit}>
                <label>Username</label>
                <input type='text' placeholder='Enter your username' onChange={e=>setUsername(e.target.value)}></input>
                <label>Email</label>
                <input type='text' placeholder='Enter your mail' onChange={e=>setEmail(e.target.value)}></input>
                <label>Password</label>
                <input type='password' placeholder='Enter password' onChange={e=>setPassword(e.target.value)}></input>
                <button className = 'register-button'>Sign Up</button>
            </form>
            <button className='register-login-button'>
                <Link to='/login' className='react-link'> Login </Link>
            </button>
            {error &&  <span style={{color: 'red', marginTop: '10px' }}> Something went wrong</span>}
           
        </div>
    )
}