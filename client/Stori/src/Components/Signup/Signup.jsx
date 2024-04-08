import { useNavigate, Link } from 'react-router-dom';
import image from '../../assets/banner2.png'
import './Signup.css'

function Signup(){
    const navigate = useNavigate();

    return(
        <div className='page'>
            <div className="side-img">
                <img src={image} alt="image" />
            </div>

            <div className="second-page">
                <div className="head">
                    <h1>Welcome Back</h1>
                    <p>Enter your email and password to access your account</p>
                </div>

                <form className="userForm">
                    <div className="input-field">
                        <label htmlFor="">Email </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="hello"
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="">Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            className="hello"
                        />
                    </div>

                    <div className="input-field">
                        <label>Password: </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="hello"
                        />
                    </div>

                    <div className="input-field">
                        <label>Confirm Password: </label>
                        <input
                            type="password"
                            placeholder="Re-enter your password"
                            className="hello"
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