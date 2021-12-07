import './topbar.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {Context} from '../../context/Context';

export default function Topbar(){
    const PF = "http://localhost:5050/images/";
    const {user, dispatch} = useContext(Context);
    //const [dp, setDp] = useState("");
    const handleLogout = () => {
        dispatch({type: "LOGOUT"});
    }
    console.log(user);
    

    if(user){
        var dp = user.profilePic ? PF+user.profilePic : PF+'user.png';
    }
    

    
    return(
        <div className = 'top'>
            <div className = "top-left"> 
                <Link to='/' className='react-link'> 
                    <img className = 'topbar-icon' src={PF + 'web-icon.jpg'} alt='...' />
                </Link>
            </div>
            <div className = "top-center">
                <ul className='top-list'>
                    <li className = 'top-list-item'> 
                        <Link to='/' className='react-link'> Home </Link> 
                    </li>
                    <li className = 'top-list-item'> 
                    <Link to='/write' className='react-link'> Write </Link>
                    </li>
                </ul>
            </div>
            <div className = "top-right">
                { user && 
                    <Link to='/userinfo'>
                        <img 
                        className = 'topbar-img'
                        src = {dp}
                        alt = '...'
                        />
                    </Link>
                }
                {user ? 
                    <ul className = 'top-list'>
                        <li className = 'top-list-item' onClick={handleLogout}> Log Out </li>
                    </ul>
                        : 
                    <ul className = 'top-list'>
                        <li className = 'top-list-item'> 
                        <Link to='/login' className='react-link'> Login </Link>
                        </li>
                        <li className = 'top-list-item'> 
                        <Link to='/register' className='react-link'> Sign Up </Link>
                        </li>
                    </ul>
                }
            </div>
        </div>
    )
}