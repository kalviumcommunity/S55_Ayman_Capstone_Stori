import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import image from '../../assets/banner.png'
import './Login.css'
import { useState } from 'react';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const setCookie = (name, value, days) => {
        const expire = new Date();
        expire.setTime(expire.getTime() + days * 24 * 60 * 60 * 1000)
        document.cookie = name + '=' + value + ' ' + expire.toUTCString();
    }

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            if (!username || !password) {
                if (!username) {
                    alert("Please enter your username");
                }
                if (!password) {
                    alert("Please enter your password");
                }
            } else if (password.length < 6) {
                alert("Password should contain at least 6 characters");
            } else {

                const response = await axios.post(`https://s55-ayman-capstone-stori.onrender.com/login`, { username, password });
                if (response.status === 200) {
                    try {
                        const res = axios.post('https://s55-ayman-capstone-stori.onrender.com/auth', { username, password })
                            .then(res => {
                                console.log(res.data)
                                document.cookie = 'ACCESS_TOKEN=' + res.data
                            })
                    }
                    catch (err) {
                        console.log(err)
                    }
                    setCookie('username', username, 365)
                    setCookie('password', password, 365)
                    sessionStorage.setItem('login', true)
                    sessionStorage.setItem('username', username)
                    alert('login succesful')
                    navigate("/");
                }
                else if (response.status === 401) {
                    alert('Invalid user credentials')
                    console.log(Error)
                }
            }
        }
        catch (err) {
            console.error(err);
        }

    }

    return (
        <div className="main">
            <div className="side-img">
                <img src={image} alt="image" />
            </div>
            <div className="second">
                <div className="Head">
                    <h1>Welcome Back</h1>
                    <p>Enter your username and password to access your account</p>
                </div>

                <form className="userForm" onSubmit={() => handleLogin(event)}>
                    <div className="input-field">
                        <label>Username </label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            className="hello"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-field">
                        <label>Password: </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="hello"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" id="btn">
                        LOGIN
                    </button>
                    <p>Don't have an account?
                        <Link to='/signup'>
                            <a>Sign-up</a>
                        </Link>
                    </p>
                </form>

            </div>
        </div>
    )



}
export default Login