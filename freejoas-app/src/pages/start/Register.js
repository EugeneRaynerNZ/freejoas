import React, { useState } from "react";
import "../../App.scss";
import { NavLink, useNavigate } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation";
import ApiService from "../../services/ApiService";
import logger from "../../utils/Logger";

function Register() {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const handleEmailVerification = async (email) => {
    try {
      await ApiService.sendVerificationEmail(email);

      logger.info("Verification email sent");
      setNotification("Verification email sent. Please check your inbox.");
      navigate("/verify-your-email", { state: { email: email } });
    } catch (error) {
      logger.warn(error);
    }
  };

  async function handleClick() {
    if (!inputs.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter your email address.",
      }));
      return;
    }
    if (!inputs.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Please enter your password.",
      }));
      return;
    }
    if (!inputs.passwordConfirm) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordConfirm: "Please confirm your password.",
      }));
      return;
    }
    if (inputs.password !== inputs.passwordConfirm) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordConfirm: "Passwords do not match.",
      }));
      return;
    }
    // email validation, must contain @ and .
    const emailPattern = /.+@.+\..+/;
    if (!emailPattern.test(inputs.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
      return;
    }

    // password validation, must be at least 6 characters long
    if (inputs.password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long.",
      }));
      return;
    }

    setLoading(true);

    try {
      const response = await ApiService.register(inputs.email, inputs.password);
      if (response.status !== 200) {
        setNotification(response.data.message);
        return;
      }
      // send verification email
      handleEmailVerification(inputs.email);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="register flex flex-col gap-8 login w-full p-8 items-center justify-center">
      <h1>Register for a Freejoas account</h1>
      <form className="flex flex-col gap-4">
        <label className="input--container">
          <span>Email Address</span>
          <input
            type="email"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </label>
        <label className="input--container">
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </label>
        <label className="input--container">
          <span>Confirm Password</span>
          <input
            type="password"
            name="passwordConfirm"
            value={inputs.passwordConfirm || ""}
            onChange={handleChange}
          />
          {errors.passwordConfirm && (
            <span className="error-message">{errors.passwordConfirm}</span>
          )}
        </label>
      </form>
      {/* <div className="flex w-full">
                <button className="bg-green-700 text-white rounded p-2 w-full cta--button" onClick={handleClick}>Register</button>
            </div> */}
        {notification && <div className="error-message">{notification}</div>}
     
      <div className="flex flex-col gap-4 w-full justify-center">
        <div
          className={`login--button cta--button-primary ${
            loading ? "login--button-loading" : ""
          }`}
          onClick={handleClick}
        >
          {loading && <LoadingAnimation />}
          <span>Register</span>
        </div>

        <div className="divider">
          <span>Or</span>
        </div>

        <NavLink className="text-center" to="/login">
          <span>Already have an account? </span>
          <span style={{ textDecoration: "underline" }}>Login</span>
        </NavLink>
      </div>
    </section>
  );
}

export default Register;
