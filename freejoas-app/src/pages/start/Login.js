import React , { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import '../../App.css';
import { useState } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function Login() {
    const { login } = useContext(AuthContext);
    const [inputs, setInputs] = useState({});
    const handleChange = e => setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    const navigate = useNavigate();

    async function handleClick() {

        await axios.post('http://localhost:4000/api/v1/user/login', {
            email: inputs.email,
            password: inputs.password,
        }).then(function(response) {
            // const token = response.data.token; // Replace with actual token
            const userToken = response.data.token;
            login(userToken);
            navigate("/dashboard");
        }).catch(function(error) {
            console.log(error);
        });
    }

    return (

        <section className="flex flex-col gap-8 login w-full p-8 items-center justify-center">
            
            <div className="flex flex-col gap-8 w-full">
                <NavLink className="back--button" to="/" ><ArrowBackIcon /><span>Go back</span></NavLink>
                <h1>Login</h1>
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

        </section>


    );
}

export default Login;
