import './login.css';
import {Link} from 'react-router-dom';
import {useRef, useContext} from 'react'
import {Context} from '../context/Context.js';
import axios from 'axios';

 

export default function Login() {

    const userRef = useRef();
    const passwordRef = useRef();
    
    const { dispatch, isFetching} = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: 'LOGIN_START'});
        try{
            const res = await axios.post('/auth/login', {
                username: userRef.current.value,
                password: passwordRef.current.value,
            })
            dispatch({type:'LOGIN_SUCCESS', payload: res.data});

        }catch(err){
            console.log(err);
            dispatch({type: 'LOGIN_FAILURE'});
        }
    }
    return (
        <div className = 'login'>
            <span className='login-title'>Hey, Welcome back!</span>
            <form className = 'login-form' onSubmit={handleSubmit}>
                <label>Username</label>
                <input type='text' placeholder='Enter your username' ref={userRef}></input>
                <label>Password</label>
                <input type='password' placeholder='Enter password' ref={passwordRef}></input>
                <button className = 'login-button' type='submit' disabled={isFetching}>Login</button>
            </form>
            <button className='login-register-button'>
                <Link to='/register' className='react-link'> Sign Up </Link>
            </button>
        </div>
    )
}
