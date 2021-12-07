import './single.css';
import Sidebar from '../components/sidebar/Sidebar.js';
import SinglePost from './SinglePost.js';

export default function Single() {
    return (
        <div className = 'single'>
            <SinglePost/>
            <Sidebar/>
        </div>
    )
}
