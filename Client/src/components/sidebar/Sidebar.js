import './sidebar.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async() => {
            const res = await axios.get('/categories');
            setCats(res.data);
        }
        getCats();
    },[])
    return (
        <div className = 'sidebar'>
            <div className='sidebar-item'>
                <span className='sidebar-title'>Welcome Note</span>
                <p className = 'sidebar-desc'>
                    Hello! are you also someone born with itchy feet? 
                    Welcome, this is a travel-blog website, a place for the crazy nomads. Here
                    you can read others' experiences of touring around the world, as well as
                    you can also write stories of your own adventures, too. So what are you waiting for? 
                    Let's start happy blogging and reading. Cheers.
                </p>
                <span className='sidebar-title'>Categories</span>
                <ul className = 'sidebar-list'>
                    {cats.map((c, i) => (
                        <Link to={`/?cat=${c.name}`} className='react-link'>
                            <li className = 'sidebar-list-item' key={Math.random()}> {c.name} </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}
