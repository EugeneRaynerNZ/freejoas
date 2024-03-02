import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "../pages/Home";
import Play from "../pages/Play";
import Upload from "../pages/Upload";
import UpdateTree from "../pages/UpdateTree";

function Body() {
    return (
        <main className="flex flex-1 justify-center">

            <Routes>
                <Route exact path='/' Component={Home}/>
                <Route path='/home' Component={Home}/>
                <Route path='/play' Component={Play}/>
                <Route path='/upload' Component={Upload}/>
                <Route path='/update' Component={UpdateTree}/>
            </Routes>

        </main>
    );
}

export default Body;