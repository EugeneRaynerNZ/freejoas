import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "../pages/Home";
import Play from "../pages/Play";
import Upload from "../pages/Upload";

function Body() {
    return (
        <main className="flex flex-1 justify-center">

            <Routes>
                <Route exact path='/' Component={Home}/>
                <Route path='/Home' Component={Home}/>
                <Route path='/Play' Component={Play}/>
                <Route path='/Upload' Component={Upload}/>
            </Routes>

        </main>
    );
}

export default Body;