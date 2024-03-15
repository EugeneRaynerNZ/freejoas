import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "../pages/Home";
import Dashboard from "../pages/app/Dashboard";
import Play from "../pages/app/Play";
import Upload from "../pages/app/Upload";
import UpdateTree from "../pages/app/UpdateTree";

import Register from "../pages/start/Register";
import Login from "../pages/start/Login";

import UploadImage from "./UploadImage";

function Body() {
    return (
        <main className="flex flex-1 justify-center">

            <Routes>
                <Route exact path='/' Component={Home}/>
                <Route path='/dashboard' Component={Dashboard}/>
                <Route path='/play' Component={Play}/>
                <Route path='/upload' Component={Upload}/>
                <Route path='/update' Component={UpdateTree}/>

                <Route path='/register' Component={Register}/>
                <Route path='/login' Component={Login}/>

                <Route path='/uploadimage' Component={UploadImage}/>
            </Routes>

        </main>
    );
}

export default Body;