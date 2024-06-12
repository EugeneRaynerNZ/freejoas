import React, { useState } from 'react';
import '../../App.css';
import axios from '../../axios';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CookieInstance } from '../../components/CookieContext';

function Login() {
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { setCookie, getCookie } = CookieInstance;

    const handleChange = e => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
        setErrors(prevErrors => ({ ...prevErrors, [e.target.name]: '' }));
        setErrorMessage('');
    };

    const handleClick = async () => {
        // check if the email and password fields are empty
        if (!inputs.email) {
            setErrors(prevErrors => ({ ...prevErrors, email: 'Please enter your email address.' }));
            return;
        }
        if (!inputs.password) {
            setErrors(prevErrors => ({ ...prevErrors, password: 'Please enter your password.' }));
            return;
        }

        try {
            // Send a POST request to the server
            await axios.post('/user/login', {
                email: inputs.email,
                password: inputs.password,
            }).then((response) => {
                console.log(response.data);
                setCookie('token', response.data.token);
                setCookie('user', response.data.data);
            }).then(() => {
                console.log("token: ", getCookie('token'));
                console.log("user: ", getCookie('user'));
                navigate('/dashboard');
            });

        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrorMessage('User not found.');
            } else if (error.response && error.response.status === 401) {
                setErrorMessage('Password is incorrect');
            } else if(error.response && error.response.status === 402){
                setErrorMessage('User Email is not verified');
            } 
            else {
                setErrorMessage(error.message);
                console.error(error);
            }
        }
    };

    return (
        <section className="flex flex-col gap-8 login w-full p-8 items-center justify-center">
            <div className="flex flex-col gap-8 w-full">
                <NavLink className="back--button" to="/"><ArrowBackIcon /><span>Go back</span></NavLink>
                <h1>Login</h1>
            </div>

            <form className="flex flex-col gap-4 mb-16">
                <label className="input--container">
                    <span>Email Address</span>
                    <input
                        type="email"
                        name="email"
                        value={inputs.email}
                        onChange={handleChange}
                        className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </label>
                <label className="input--container">
                    <span>Password</span>
                    <input
                        type="password"
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                        className={errors.password ? 'input-error' : ''}
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </label>
            </form>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div className="flex w-full">
                <button className="bg-green-700 text-white rounded p-2 w-full cta--button cta--button-primary" onClick={handleClick}>Login</button>
            </div>
        </section>
    );
}

export default Login;
