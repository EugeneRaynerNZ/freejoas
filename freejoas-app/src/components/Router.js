import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from "../pages/Home";
import Dashboard from "../pages/app/Dashboard";
import Play from "../pages/app/Play";
import Upload from "../pages/app/Upload";
import UpdateTree from "../pages/app/UpdateTree";

import Register from "../pages/start/Register";
import Login from "../pages/start/Login";

import UploadImage from "./UploadImage";
import { AuthContext } from './AuthContext'; // assuming you have AuthContext defined

function Body() {
    const authContext = useContext(AuthContext);

  return (
    <main className="flex flex-1 justify-center">
      <Routes>
        <Route path='/' element={authContext.token ? <Home /> : <Navigate to="/login" />} />
        <Route path='/dashboard' element={authContext.token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path='/play' element={authContext.token ? <Play /> : <Navigate to="/login" />} />
        <Route path='/upload' element={authContext.token ? <Upload /> : <Navigate to="/login" />} />
        <Route path='/update' element={authContext.token ? <UpdateTree /> : <Navigate to="/login" />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='/uploadimage' element={authContext.token ? <UploadImage /> : <Navigate to="/login" />} />
      </Routes>
    </main>
  );
}

export default Body;
