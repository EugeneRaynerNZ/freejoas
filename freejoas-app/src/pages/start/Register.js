import React from 'react';
import '../../App.css';
import { useState } from 'react';
import axios from '../../axios';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function Register() {

    const [inputs, setInputs] = useState({});
    const handleChange = e => setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    const navigate = useNavigate();

    async function handleClick() {

        await axios.post('/user/create', {
            firstname: inputs.first,
            lastname: inputs.last,
            email: inputs.email,
            password: inputs.password,
        }).then(function(response) {
            console.log(response.data)
            // navigate("/login");
        }).catch(function(error) {
            console.log(error);
        });

        console.log(inputs)
    }

    return (

        <section className="flex flex-col gap-8 login w-full p-8 items-center justify-center">
                
            <div className="flex flex-col gap-8 w-full">
                <NavLink className="back--button" to="/" ><ArrowBackIcon /><span>Go back</span></NavLink>
                <h1>Register</h1>
            </div>
            <form className="flex flex-col gap-4">
                <label className="input--container">
                    <span>First Name</span>
                    <input type="text" name="first" value={inputs.first || ''} onChange={handleChange} />
                </label>
                <label className="input--container">
                    <span>last Name</span>
                    <input type="text" name="last" value={inputs.last || ''} onChange={handleChange} />
                </label>
                <label className="input--container">
                    <span>Email Address</span>
                    <input type="email" name="email" value={inputs.email || ''} onChange={handleChange} />
                </label>
                <label className="input--container">
                    <span>Password</span>
                    <input type="password" name="password" value={inputs.password || ''} onChange={handleChange} />
                </label>
                <label className="input--container">
                    <span>Confirm Password</span>
                    <input type="password" name="passwordConfirm" value={inputs.passwordConfirm || ''} onChange={handleChange} />
                </label>
            </form>

            <div className="flex w-full">
                <button className="bg-green-700 text-white rounded p-2 w-full cta--button" onClick={handleClick}>Register</button>
            </div>

        </section>

    );
}

export default Register;
