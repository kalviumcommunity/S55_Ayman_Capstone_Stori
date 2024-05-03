import React, { useEffect, useState } from "react";
import '../Home/Home.css';
import storiLogo from '../../assets/Stori.png';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Home() {
    const [userCount, setUserCount] = useState(0);
    const navigate = useNavigate();

    const handleUsers = async () => {
        try {
            const users = await axios.get(`http://localhost:3000/users`);
            setUserCount(users.data.length);
            console.log(users);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleUsers();
    }, []);

    return (
        <div className="main-div">
            <div className="bg">
                <div id="count">"Discover what {userCount} other users are currently exploring on our website!"</div>
                <img src={storiLogo} alt="Stori-logo" id="stori-logo" />
                <h1 className="stori-headline">Uniting Voices, Crafting Tales</h1>
                <div className="content">
                    <p>A platform not only for the writers of the world, but for the thinkers and fighters of the daily circus of society. Welcome to safe-space every shrink tries to boast about!</p>
                    <p>Join the journey, share your Stori.</p>
                </div>
                <div className="buttons">
                    <button id="cred" onClick={() => { navigate('/signup') }}>Sign up</button>
                    <button id="cred" onClick={() => { navigate('/login') }}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
