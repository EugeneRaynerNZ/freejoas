import React from 'react';
import '../../App.css';


function Register() {
  return (

      <section className="home w-full">
        <h1 className="text-center mb-4">Register now!</h1>
        <form className="flex flex-col gap-2 mb-16">
            <label>
                First Name
                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label>
            <label>
                Last Name
                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label>
            <label>
                Email Address
                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label>
            <label>
                Password Once
                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label>
            <label>
                Password Twice
                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label>
        </form>
      </section>

  );
}

export default Register;
