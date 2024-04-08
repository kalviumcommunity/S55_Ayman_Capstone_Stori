
import { useNavigate, Link } from 'react-router-dom';
import image from '../../assets/banner.png'
import './Login.css'

function Login() {
    const navigate = useNavigate();
    return (
        <div className="main">
            <div className="side-img">
                <img src={image} alt="image" />
            </div>
            <div className="second">
                <div className="Head">
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
                        <label>Password: </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="hello"
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