import './singlePost.css';
import {useEffect, useContext} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import {Context} from '../context/Context.js';
const path = require('path');



export default function SinglePost() {
    const PF = 'http://localhost:5050/images/';
    const location = useLocation();
    const path =(location.pathname.split('/')[2]);
    const [post, setPost] = useState({});
    const {user} = useContext(Context);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const [updatefail, setUpdatefail] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get('/posts/'+path);
            setPost(res.data);
            setTitle(res.data.title);
            setDescription(res.data.description);
        };
        getPost();
    }, [path])

    const handleDelete = async () => {
        try{
            await axios.delete("/posts/" + path, {data: {username: user.username}});
            window.location = '/';
        }catch(err){

        }
    };
    
    const handleUpdate = async () => {
        setUpdatefail(false);
        
        try{
            if (title === "" || description === ""){
                throw "Error occured";
            }
            await axios.put(`/posts/${post._id}`, {
                username: user.username, title, description
            });
            setUpdateMode(false);
        }catch(err){
            setUpdatefail(true);
        }
    }

    return (

        <div className = 'single-post'>
            <div className = 'single-post-wrapper'>
                {post.photo && 
                    <img
                    className = 'single-post-img'
                    src={PF + post.photo}
                    alt = '...'
                />
                }
                
                <div className = 'single-post-info'> 
                    <div className='single-post-categories'>
                        { post.categories &&
                        post.categories.map((c,i)=>(
                            <Link to={`/?cat=${c}`} className = 'react-link'>
                                <span className='single-post-category'>{c}</span>
                            </Link>
                        ))
                        }
                    </div>
                
                {
                    updateMode ? <input type='text' value={title} className = 'singlepost-edit-title' 
                    onChange={(e) => setTitle(e.target.value)}/> :
                    <h1 className = 'single-post-title'> {title}</h1>
                }
                    <h3 className = 'single-post-author'>
                        Author: 
                        <Link to={`/?user=${post.username}`} className = 'react-link author-name'>
                            <b>{post.username}</b>
                        </Link>
                    </h3>
                    <span className = 'single-post-date'>{new Date(post.updatedAt).toDateString()}</span>
                    {
                        updateMode ? <textarea value={description} className = 'singlepost-edit-desc' onChange={(e) => setDescription(e.target.value)}/> :
                        <p className = 'single-post-desc'>
                            {description}
                        </p>
                    }
                    {updateMode && <button className='single-post-button' onClick={handleUpdate}>Update</button>}
                    {updatefail && <span className='error-msg'>Title or Description cannot be empty</span>}
                </div>
                {post.username === user?.username && 
                    <div className="single-post-edit"> 
                        <i className="single-post-icon far fa-edit fa-lg" onClick={() => setUpdateMode(true)}></i>
                        <i className="single-post-icon fas fa-trash-alt fa-lg" onClick={handleDelete}></i>
                    </div>
                }
                
            </div>
        </div>
    )
}
