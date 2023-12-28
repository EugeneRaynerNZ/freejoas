import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "../pages/Home";
import Play from "../pages/Play";

function Body() {
    return (
        <main>

            <Routes>
                <Route exact path='/' Component={Home}/>
                <Route path='/Home' Component={Home}/>
                <Route path='/Play' Component={Play}/>
            </Routes>

        </main>
    );
}

export default Body;