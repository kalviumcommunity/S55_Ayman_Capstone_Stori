import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Main.css';
import storiLogo from '../../assets/Stori-black.png';
import { useState, useEffect } from 'react';


function MainPage() {
    const navigate = useNavigate();

    const [content, setContent] = useState('');

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://s55-ayman-capstone-stori.onrender.com/posts', { content });
            onPostCreated(response.data);
            setContent('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }


    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('https://s55-ayman-capstone-stori.onrender.com/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <>
            <nav>
                <img src={storiLogo} alt="logo" className='logo-main' />
                <div>
                    <input type="text" placeholder="Search" />
                </div>

            </nav>
            <div className="mega-container">
                <div className="sidebar">Sidebar</div>
                <div className="main-content-container">
                    <form onSubmit={handlePost} className='create-post' onPostCreated={handlePostCreated}>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What's on your mind?"
                        />
                        <button type="submit">Post</button>
                    </form>
                    <div className="main-content">
                        {posts.map((post) => (
                            <div key={post._id} className="post">
                                <p>{post.content}</p>
                                <small>{new Date(post.createdAt).toLocaleString()}</small>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="extra-sidebar-container">
                    <div className="extra-sidebar">Extra Sidebar</div>
                    <div className="about-section">About Section</div>
                </div>
            </div>
        </>
    );
}

export default MainPage;
