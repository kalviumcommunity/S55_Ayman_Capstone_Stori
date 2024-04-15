import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import image from '../../assets/banner2.png'
import './Signup.css'
import { useState } from 'react';

function Signup(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async (e) => { 
        try {
          e.preventDefault(); 
          if (!username || !password || !email || !confirmPassword) {
            if (!username) {
              alert("Please enter your username");
            }
            if (!password) {
              alert("Please enter your password");
            }
            if(!email){
                alert("PLease enter your email");
            }
            if(!confirmPassword){
                alert("Please re-enter your password");
            }
          } else if (password.length < 6) {
            alert("Password should contain at least 6 characters");
          } else if(password!==confirmPassword){
            alert("Passwords did not match!")
          }          
          else {
            await axios.post(`https://s55-ayman-capstone-stori.onrender.com/signup`, { email, username, password, confirmPassword });
            navigate("/");
          }
        } catch (err) {
          console.error(err);
        }
      };


    return(
        <div className='page'>
            <div className="side-img">
                <img src={image} alt="image" />
            </div>

            <div className="second-page">
                <div className="head">
                    <h1>Join Us Today!</h1>
                    <p>Enter your details to create your own account</p>
                </div>

                <form className="userForm" onSubmit={handleSignup}>
                    <div className="input-field">
                        <label htmlFor="">Email </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="hello"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="">Username</label>
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

                    <div className="input-field">
                        <label>Confirm Password: </label>
                        <input
                            type="password"
                            placeholder="Re-enter your password"
                            className="hello"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" id="btn">
                        Sign up
                    </button>
                        <p>Already have an account?
                        <Link to='/login'>
                            <a>Login</a>
                        </Link>
                        </p>
                </form>

            </div>
        </div>
    )
}

export default Signup;