import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
//pages
import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Play from "../pages/app/Play";
import Upload from "../pages/app/Upload";
import UpdateTree from "../pages/app/UpdateTree";
import Register from "../pages/start/Register";
import Login from "../pages/start/Login";
import UploadImage from "./UploadImage";
import PropTypes from "prop-types";
import VerifyEmail from "../pages/start/EmailVerification";
import PageNotFound from "../pages/404";
import ForgotPassword from "../pages/start/ForgotPassword";
import ResetPassword from "../pages/start/ResetPassword";
// import PlayWithMap from '../pages/app/PlayWithMap';

const PrivateRoute = ({ element, user }) => {
  // If the token is not present, redirect to the login page
  return user ? element : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
  user: PropTypes.object,
};

function Body() {
  const { user } = useUser();

  return (
    <main className="flex flex-1 justify-center">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/play" element={<PrivateRoute element={<Play />} user={user} />} />
        <Route path="/upload" element={<PrivateRoute element={<Upload />} user={user} />} />
        <Route
          path="/update"
          element={<PrivateRoute element={<UpdateTree />} user={user} />}
        />
        <Route
          path="/uploadimage"
          element={<PrivateRoute element={<UploadImage />} user={user} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-your-email" element={<VerifyEmail />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/play" /> : <Login />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}

export default Body;
