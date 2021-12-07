import { useEffect, useState } from 'react';
import Header from '../header/Header.js';
import Sidebar from '../sidebar/Sidebar.js';
import Posts from '../posts/Posts.js';
import './home.css';
import axios from 'axios'; 
import { useLocation } from 'react-router';


export default function Home (){
    const [posts, setPosts] = useState([]);     // this empty arrays suggests the initial state
    const { search } = useLocation();

    useEffect(() => {
        const fetchPosts = async() => {
            const res = await axios.get('/posts'+search);
            setPosts(res.data);
        }
        fetchPosts();
    }, [search])          // this [] denotes that this hook will be called once the component is rendered.


    return (
        <div className='home-wrapper'>
            <Header/>
            <div className = 'home'>
                <Posts posts = {posts}/>
                <Sidebar/>
            </div>
        </div>
    );
}
