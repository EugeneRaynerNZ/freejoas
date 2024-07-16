import React, { useState } from 'react';
import '../../App.scss';
import axios from '../../axios';
import { NavLink, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingAnimation from '../../components/LoadingAnimation';


function Register() {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const handleChange = e => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
        setErrors(prevErrors => ({ ...prevErrors, [e.target.name]: '' }));
    };

    const sendVerificationEmail = async (email, username) => {
        try{
            await axios.post('/verification/send', {
                email: inputs.email,
                username: inputs.first,
            });

            console.log('Verification email sent');

            navigate('/verify-your-email', { state: { email: email, username: username} });

        }catch(error){
            console.error(error);
        }
    };

    async function handleClick() {
        if (!inputs.first) {
            setErrors(prevErrors => ({ ...prevErrors, first: 'Please enter your first name.' }));
            return;
        }
        if (!inputs.last) {
            setErrors(prevErrors => ({ ...prevErrors, last: 'Please enter your last name.' }));
            return;
        }
        if (!inputs.email) {
            setErrors(prevErrors => ({ ...prevErrors, email: 'Please enter your email address.' }));
            return;
        }
        if (!inputs.password) {
            setErrors(prevErrors => ({ ...prevErrors, password: 'Please enter your password.' }));
            return;
        }
        if (!inputs.passwordConfirm) {
            setErrors(prevErrors => ({ ...prevErrors, passwordConfirm: 'Please confirm your password.' }));
            return;
        }
        if (inputs.password !== inputs.passwordConfirm) {
            setErrors(prevErrors => ({ ...prevErrors, passwordConfirm: 'Passwords do not match.' }));
            return;
        }

        setLoading(true);

        try {
            await axios.post('/user/create', {
                firstname: inputs.first,
                lastname: inputs.last,
                email: inputs.email,
                password: inputs.password,
            }).then(response => {
                // if the status is 201, the user is created
                if (response.status === 201) {
                    // send verification email
                    sendVerificationEmail(inputs.email, inputs.first);
                }
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrors(prevErrors => ({ ...prevErrors, email: 'Email address already exists.' }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, email: 'An error occurred. Please try again later.' }));
            }
            console.error(error);
        }finally{
            setLoading(false);
        }
    }

    return (
        <section className="flex flex-col gap-8 login w-full p-8 items-center justify-center">
            <div className="flex flex-col gap-8 w-full">
                <NavLink className="back--button" to="/"><ArrowBackIcon /><span>Go back</span></NavLink>
                <h1>Register</h1>
            </div>
            <form className="flex flex-col gap-4">
                <label className="input--container">
                    <span>First Name</span>
                    <input type="text" name="first" value={inputs.first || ''} onChange={handleChange} />
                    {errors.first && <span className="error-message">{errors.first}</span>}
                </label>
                <label className="input--container">
                    <span>Last Name</span>
                    <input type="text" name="last" value={inputs.last || ''} onChange={handleChange} />
                    {errors.last && <span className="error-message">{errors.last}</span>}
                </label>
                <label className="input--container">
                    <span>Email Address</span>
                    <input type="email" name="email" value={inputs.email || ''} onChange={handleChange} />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </label>
                <label className="input--container">
                    <span>Password</span>
                    <input type="password" name="password" value={inputs.password || ''} onChange={handleChange} />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </label>
                <label className="input--container">
                    <span>Confirm Password</span>
                    <input type="password" name="passwordConfirm" value={inputs.passwordConfirm || ''} onChange={handleChange} />
                    {errors.passwordConfirm && <span className="error-message">{errors.passwordConfirm}</span>}
                </label>
            </form>
            {/* <div className="flex w-full">
                <button className="bg-green-700 text-white rounded p-2 w-full cta--button" onClick={handleClick}>Register</button>
            </div> */}
            <div className="flex w-full justify-center">
                <div className={`login--button cta--button-primary ${loading ? "login--button-loading" : ""}`} onClick={handleClick}>
                    {loading && <LoadingAnimation />}
                    <span>Register</span>
                </div>
            </div>
        </section>
    );
}

export default Register;
