import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Main.css';
import storiLogo from '../../assets/Stori-black.png';
import { useState, useEffect } from 'react';
import search from '../../assets/Search.png';


function MainPage() {
    const navigate = useNavigate();

    const [content, setContent] = useState('');
    const login = sessionStorage.getItem('login')

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

    const [editingPostId, setEditingPostId] = useState(null); // To track which post is being edited
    const [editedContent, setEditedContent] = useState('');  // Content for the post being edited

    const handleEditPost = async (postId) => {
        try {
            const response = await axios.put(`https://s55-ayman-capstone-stori.onrender.com/posts/${postId}`, { content: editedContent });
            setPosts(posts.map(post => post._id === postId ? response.data : post)); // Update the post in the state
            setEditingPostId(null); // Exit edit mode
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
    
                if (status === 404) {
                    console.error('Error: Post not found.');
                } else if (status === 400) {
                    console.error(`Error: ${data.error || 'Invalid content'}`);
                } else {
                    console.error(`Error: ${data.error || 'Failed to update post'}`);
                }
            } else {
                console.error('Error updating post:', error.message);
            }
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`https://s55-ayman-capstone-stori.onrender.com/posts/${postId}`);
            setPosts(posts.filter(post => post._id !== postId)); // Remove the post from the state
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


    const handleLogout = async () => {
        sessionStorage.setItem('login', false)
        sessionStorage.removeItem('username')

    }

    return (
        <>
            <nav>
                <img src={storiLogo} alt="logo" className='logo-main' />
                <div>
                    <input type="text" placeholder="Search" />
                    <img src={search} alt="" className='search-btn' />
                </div>

            </nav>
            <div className="mega-container">
                <div className="sidebar">
                    <Link to='/'><button onClick={handleLogout}>Logout</button></Link>
                </div>
                <div className="main-content-container">
                    <form onSubmit={handlePost} className='create-post' onPostCreated={handlePostCreated}>
                        <textarea className='text-area'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What's happening?"
                        />
                        <div className='line'></div>
                        <button id='post-btn' type="submit">Post</button>
                    </form>
                    <div className="main-content">
                        {posts.map((post) => (
                            <div key={post._id} className="post">
                                {/* If editing this post, show a textarea, otherwise show the content */}
                                {editingPostId === post._id ? (
                                    <textarea
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                    />
                                ) : (
                                    <p>{post.content}</p>
                                )}
                                <small>{new Date(post.createdAt).toLocaleString()}</small>

                                {/* Edit button */}
                                {editingPostId === post._id ? (
                                    <button onClick={() => handleEditPost(post._id)}>Save</button>
                                ) : (
                                    <button onClick={() => { setEditingPostId(post._id); setEditedContent(post.content); }}>Edit</button>
                                )}

                                {/* Delete button */}
                                <button onClick={() => handleDeletePost(post._id)}>Delete</button>
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
