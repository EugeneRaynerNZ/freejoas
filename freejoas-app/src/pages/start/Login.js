import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import '../../App.css';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Login() {
    const { login } = useContext(AuthContext);
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
        setErrors(prevErrors => ({ ...prevErrors, [e.target.name]: '' }));
        setErrorMessage('');
    };

    const handleClick = async () => {
        if (!inputs.email) {
            setErrors(prevErrors => ({ ...prevErrors, email: 'Please enter your email address.' }));
            return;
        }
        if (!inputs.password) {
            setErrors(prevErrors => ({ ...prevErrors, password: 'Please enter your password.' }));
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/v1/user/login', {
                email: inputs.email,
                password: inputs.password,
            });

            const userToken = response.data.token;
            login(userToken);
            navigate("/dashboard");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrorMessage('User not found.');
            } else if (error.response && error.response.status === 401) {
                setErrorMessage('Password is incorrect');
            } else {
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

            <form className="flex flex-col gap-2 mb-16">
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
                <button className="bg-green-700 text-white rounded p-2 w-full cta--button" onClick={handleClick}>Login</button>
            </div>
        </section>
    );
}

export default Login;
