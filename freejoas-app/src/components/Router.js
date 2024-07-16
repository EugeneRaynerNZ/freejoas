import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useCookie, KEY_TOKEN } from '../utils/CookieContext';
//pages
import Landing from '../pages/Landing'
import Home from "../pages/Home";
// import Dashboard from "../pages/app/Dashboard";
import Play from "../pages/app/Play";
import Upload from "../pages/app/Upload";
import UpdateTree from "../pages/app/UpdateTree";
import Register from "../pages/start/Register";
import Login from "../pages/start/Login";
import UploadImage from "./UploadImage";
import PropTypes from 'prop-types';
import VerifyEmail from '../pages/start/EmailVerification';
import PageNotFound from '../pages/404';
import PlayWithMap from '../pages/app/PlayWithMap';

function Body() {
  const { getCookie } = useCookie();
  let token = getCookie(KEY_TOKEN);
  
  const PrivateRoute = ({ element }) => {

    //update the token value
    token = getCookie(KEY_TOKEN);

    // If the token is not present, redirect to the login page
    return token ? element : <Navigate to="/login" />;
  };

  PrivateRoute.propTypes = {
    element: PropTypes.element.isRequired, 
  };

  return (
    <main className="flex flex-1 justify-center">
      <Routes>
        
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        {/* <Route path='/landing' element={<Landing />} /> */}
        {/* <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} /> */}
        <Route path='/play' element={<PrivateRoute element={<Play />} />} />
        <Route path='/playwithmap' element={<PrivateRoute element={<PlayWithMap />} />} />
        <Route path='/upload' element={<PrivateRoute element={<Upload />} />} />
        <Route path='/update' element={<PrivateRoute element={<UpdateTree />} />} />
        <Route path='/uploadimage' element={<PrivateRoute element={<UploadImage />} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify-your-email' element={<VerifyEmail />} />
        <Route path='/login' element={token? <Navigate to='/play' /> :<Login />} />
        <Route path='*' element={<PageNotFound />} />

      </Routes>
    </main>
  );
};

export default Body;
