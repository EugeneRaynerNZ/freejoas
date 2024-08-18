import "../../App.scss";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation";
import { useUser } from "../../contexts/UserContext";
import ApiService from "../../services/ApiService";
import logger from "../../utils/Logger";

function Login() {
  //global state
  const { user, updateUser, updateToken } = useUser();
  const navigate = useNavigate();
  // local state
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
    setErrorMessage("");
  };

  const handleClick = async () => {
    // check if the email and password fields are empty
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

    setLoading(true);
    try {
      // Send a POST request to the server
      const response = await ApiService.login(inputs.email, inputs.password);
      // check response status
      if (response.status !== 200) {
        setErrorMessage(response.data.message);
        return;
      }

      // log in successful
      updateUser(response.data.data);
      updateToken(response.data.token);
      logger.debug("User logged in:", response.data.data);

    } catch (error) {
      logger.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
      navigate("/play");
    }
  }, [user, navigate]);

  // Handle the Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13 || event.which === 13) {
      handleClick();
    }
  };

  return (
    <section className="login flex flex-col gap-10 login w-full p-8 items-center justify-center">
      <h1>Login to your Freejoas account</h1>

      <form className="flex flex-col gap-2">
        <label className="input--container">
          <span>Email Address</span>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
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
            value={inputs.password}
            onChange={handleChange}
            className={errors.password ? "input-error" : ""}
            onKeyDown={handleKeyDown}
          />
          <NavLink className="forgot-password--button" to="/forgot-password">
            <span>Forgot password?</span>
          </NavLink>
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </label>
      </form>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="flex flex-col gap-4 w-full justify-center">
        <button
          className={`login--button cta--button-primary ${
            loading ? "login--button-loading" : ""
          }`}
          onClick={handleClick}
        >
          {loading && <LoadingAnimation />}
          <span>Login</span>
        </button>

        <div className="divider">
          <span>Or</span>
        </div>

        <NavLink className="text-center" to="/register">
          <span>Don't have an account? </span>
          <span style={{ textDecoration: "underline" }}>Register</span>
        </NavLink>
      </div>
    </section>
  );
}
export default Login;
