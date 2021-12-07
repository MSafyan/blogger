import './posts.css';
import Post from '../post/Post.js';

export default function Posts({posts}) {
    return (
        <div className = 'posts'>
            {posts.map( (p)=> (
                <Post key={Math.random()} post={p}/>
            ))}
        </div>
    )
}
