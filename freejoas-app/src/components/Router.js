import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useCookie } from './CookieContext';
//pages
import Home from "../pages/Home";
import Dashboard from "../pages/app/Dashboard";
import Play from "../pages/app/Play";
import Upload from "../pages/app/Upload";
import UpdateTree from "../pages/app/UpdateTree";
import Register from "../pages/start/Register";
import Login from "../pages/start/Login";
import UploadImage from "./UploadImage";
import PropTypes from 'prop-types';


function Body() {
  const { getCookie } = useCookie();
  const token = getCookie('token');
  
  const PrivateRoute = ({ element }) => {

    // If the token is not present, redirect to the login page
    return token ? element : <Navigate to="/login" />;
  };

  PrivateRoute.propTypes = {
    element: PropTypes.element.isRequired,
  };

  return (
    <main className="flex flex-1 justify-center">
      <Routes>
        <Route path='/' element={token ? <Navigate to="/dashboard" /> : <Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
        <Route path='/play' element={<PrivateRoute element={<Play />} />} />
        <Route path='/upload' element={<PrivateRoute element={<Upload />} />} />
        <Route path='/update' element={<PrivateRoute element={<UpdateTree />} />} />
        <Route path='/uploadimage' element={<PrivateRoute element={<UploadImage />} />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='*' element={<h1>Page Not Found</h1>} />

      </Routes>
    </main>
  );
};

export default Body;
