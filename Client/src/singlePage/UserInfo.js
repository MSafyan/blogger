import './userInfo.css'
import {Context} from '../context/Context';
import {useState, useContext, useEffect} from 'react';
import axios from 'axios';


export default function UserInfo() {
    const PF = 'http://localhost:5050/images/';
    const {user, dispatch} = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [userinfo, setUserinfo] = useState(user); 
    if (user){
        var dp = user.profilePic ? PF+user.profilePic : PF+'user.png';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: 'UPDATE_START'});
        const oldImage = user.profilePic;
        console.log(oldImage);
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };
        if (updatedUser.username === "") updatedUser.username = user.username;
        if (updatedUser.email === "") updatedUser.email = user.email;
        if (updatedUser.password === "") updatedUser.password = user.password;
        if (file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;

            try{
                const res = await axios.post('/upload', data);
            }catch(err){
                console.log("error1: " + err);
            }
            try{
                const res = await axios.post('/deleteOldImage', {oldImage});
            }catch(err){
                console.log(err);
            }
            try{
                const res = await axios.put('/users/' + user._id, updatedUser);
                console.log(res);
                setSuccess(true);
                console.log('success set');
                dispatch({type: 'UPDATE_SUCCESS', payload: res.data});
                console.log('dispatched');
                window.location.replace('/');
            }catch(err){
                console.log("error2: " + err);
                dispatch({type: 'UPDATE_FAILURE'});
            }
        }
        
    } 

    useEffect(() => {
        setUserinfo(user);
    }, [user])

    return (
        <div className = 'user-info'>
            <div className = 'user-info-wrapper'> 
                <div className = 'user-info-title'> Update Your Account </div>
                <form className = 'user-info-form' onSubmit={handleSubmit}>
                    {userinfo && 
                    (<>
                        <label>Profile picture</label>
                        <div className = 'user-profile-img'>
                            <img
                                src = {file ? URL.createObjectURL(file) : dp}
                                alt = ''
                            />
                            <label htmlFor = "fileInput">
                                <i className="user-profile-icon fas fa-user"></i>
                            </label>
                            <input type='file' id='fileInput' style={{display: 'none'}} onChange={(e) => setFile(e.target.files[0])}></input>
                        </div>
                        <label>Username</label>
                        <input type='text' placeholder={userinfo.username} onChange = {(e) => setUsername(e.target.value)}></input>
                        <label>Email</label>
                        <input type='email' placeholder={userinfo.email} onChange = {(e) => setEmail(e.target.value)}></input>
                        <label>Password</label>
                        <input type='password' placeholder='********' onChange = {(e) => setPassword(e.target.value)}></input>
                        <button className = 'user-profile-update' type='submit'>Update</button>

                    </>)}
                    {success && <span>Profile has been updated</span>}
                </form>
            </div>
        </div>
    )
}
