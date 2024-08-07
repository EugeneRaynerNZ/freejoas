import React from 'react';
import '../../App.scss';
import PaperPlane from '../../images/paper-plane.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import ApiService from '../../services/ApiService';


function EmailVerification() {

  const location = useLocation();
  const navigate = useNavigate();
  const { email, username } = location.state || {};

  const handleEmailVerification = async (email, username) => {
    try {
      await ApiService.sendVerificationEmail(email, username);

      console.log('Verification email sent');

    } catch (error) {
      console.error(error);
    }
  };

  const handleResend = () => {
    console.log('Resend verification email');
    handleEmailVerification(email, username);
    navigate('/verify-your-email', { state: { email: email, username: username } });
  };

  return (

    <section className="verify-your-email w-full">
      <NavLink className="back--button" to="/login"><ArrowBackIcon /><span>Login</span></NavLink>

      <div className="verify-your-email w-full">
        <h1 className="text-center mb-4">Hi, {username}. Please check your email.</h1>
        <img className="text-center" src={PaperPlane} alt="Paper Plane" />
        <p className="text-center">Check your email inbox at {email} for instructions from us on how to verify your account.</p>
        <p className="text-center">Didn't receive the email? Please check your Spam or Junk Mail folder, or <button onClick={handleResend}>Resend</button>
        </p>
      </div>
    </section>

  );
}

export default EmailVerification;
