import React from 'react';
import '../../App.scss';
import PaperPlane from '../../images/paper-plane.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import ApiService from '../../services/ApiService';


function EmailVerification() {

  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  const handleEmailVerification = async (email) => {
    try {
      await ApiService.sendVerificationEmail(email);

      console.log('Verification email sent');

    } catch (error) {
      console.error(error);
    }
  };

  const handleResend = () => {
    console.log('Resend verification email');
    handleEmailVerification(email);
    navigate('/verify-your-email', { state: { email: email } });
  };

  return (

    <section className="verify-your-email w-full">
      <NavLink className="back--button" to="/login"><ArrowBackIcon /><span>Login</span></NavLink>

      <div className="verify-your-email w-full">
        <h1 className="text-center mb-4">Welcome to register at Freejoas.</h1>
        <img className="text-center" src={PaperPlane} alt="Paper Plane" />
        <p className="text-center">Please Check your email inbox for instructions from us on how to verify your account.</p>
        <p className="text-center">Didn't receive the email? Please check your Spam or Junk Mail folder, or <button onClick={handleResend}>Resend</button>
        </p>
      </div>
    </section>

  );
}

export default EmailVerification;
