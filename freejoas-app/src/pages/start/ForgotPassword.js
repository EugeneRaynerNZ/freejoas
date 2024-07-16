import React from 'react';
import '../../App.scss';


function ForgetPassword() {
  return (

      <section className="home w-full">
        <h1 className="text-center mb-4">Forgot your password?</h1>
        <form className="flex flex-col gap-2 mb-16">
            <label>
                Email Address
                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label>
        </form>
      </section>

  );
}

export default ForgetPassword;
