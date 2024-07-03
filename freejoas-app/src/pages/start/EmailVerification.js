import React from 'react';
import '../../App.css';
import PaperPlane from '../../images/paper-plane.png';


function EmailVerification() {
  return (

      <section className="verify-your-email w-full">
        <h1 className="text-center mb-4">Check your email inbox</h1>
        <img className="text-center" src={PaperPlane} alt="Paper Plane" />
        <p className="text-center">Check your inbox for instructions from us on how to verify your account.</p>
        <p className="text-center">Didn't receive the email? <a href="#resend">Resend</a></p>
      </section>

  );
}

export default EmailVerification;
