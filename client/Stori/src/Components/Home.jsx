import React from "react";
import '../App.css';
import storiLogo from '../assets/Stori.png'

function Home() {

    return (
        <div className="bg">
            <img src={storiLogo} alt="Stori-logo" id='stori-logo' />
            <h1 className="stori-headline">Uniting Voices, Crafting Tales</h1>
            <div className="content">
                <p>A platform  not only for the writers of the world , but for the thinkers and fighters of the daily circus of society. Welcome to safe-space every shrink tries to boast about!</p>
                <p>Join the journey , share your Stori.</p>
            </div>
            <div className="buttons">
                <button id="cred">Sign up</button>
                <button id="cred">Login</button>
            </div>
        </div>
    )
}

export default Home