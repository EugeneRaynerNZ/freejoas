import React from 'react';
import '../../App.css';
import { useState } from 'react';
import axios from '../../axios';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function Login() {

    const [inputs, setInputs] = useState({});
    const [user, setUser] = useState({});
    const handleChange = e => setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    const navigate = useNavigate();

    async function handleClick() {
        // axios.post('/user/login', {
        //     email: inputs.latitude,
        //     password: inputs.longitude,
        // })

        const response = await axios.post('/user/login', {
            email: inputs.email,
            password: inputs.password,
        }).then(function(response) {
            setUser(response.data.user)
            navigate("/dashboard");
        }).catch(function(error) {
            console.log(error);
        });

        console.log(response)

       
        // setInputs(response)
    }

    return (

        <section className="flex flex-col gap-8 login w-full px-8 items-center justify-center">
            
            <div className="flex flex-col gap-8 w-full">
                <NavLink className="back--button" to="/" ><ArrowBackIcon /><span>Go back</span></NavLink>
                <h1 className="text-center">Login</h1>
            </div>
            <form className="flex flex-col gap-2 mb-16">
                <label className="input--container">
                    <span>Email Address</span>
                    <input type="email" name="email" value={inputs.email || ''} onChange={handleChange} />
                </label>
                <label className="input--container">
                    <span>Password</span>
                    <input type="password" name="password" value={inputs.password || ''} onChange={handleChange} />
                </label>

                
            </form>

            <div className="flex w-full">
                <button className="bg-green-700 text-white rounded p-2 w-full cta--button" onClick={handleClick}>Login</button>
            </div>

            {console.log(user)}
        </section>


    );
}

export default Login;
