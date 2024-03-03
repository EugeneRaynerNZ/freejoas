import React from 'react';
import '../../App.css';
import { useState } from 'react';
import axios from '../../axios';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


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

        <section className="home w-full">
            
            <NavLink to="/" >Go back</NavLink>
            <h1 className="text-center mb-4">Login</h1>
            <form className="flex flex-col gap-2 mb-16">
                <label>
                    Email Address
                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" value={inputs.email || ''} onChange={handleChange} />
                </label>
                <label>
                    Password
                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" value={inputs.password || ''} onChange={handleChange} />
                </label>

                
            </form>

            <button className="bg-green-700 text-white rounded p-2 w-full cta--button" onClick={handleClick}>Login</button>

            wsking233@gmail.com
            123456abc

            {console.log(user)}
        </section>


    );
}

export default Login;
