import "../../App.scss";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingAnimation from "../../components/LoadingAnimation";
import { useUser } from "../../contexts/UserContext";
import ApiService from "../../services/ApiService";

function ForgotPassword() {
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
      updateUser(response.data.data);
      updateToken(response.data.token);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.error(error);
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
  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter" || event.keyCode === 13 || event.which === 13) {
  //     handleClick();
  //   }
  // };

  return (
    <section className="login flex flex-col gap-8 login w-full p-8 items-center justify-center">
      <div className="flex flex-col gap-8 w-full">
        <NavLink className="back--button" to="/login">
          <ArrowBackIcon />
          <span>Go back</span>
        </NavLink>
        <h1>Oops, I Forgot my password</h1>
      </div>

      {/* START: Show from here until next comment when resetPassword conditions have not been met */}

      <form className="flex flex-col gap-4">
        <label className="input--container">
          <span>What is your Email Address?</span>
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
        
      </form>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      

      <div className="flex w-full justify-center">
        <button
          className={`login--button cta--button-primary ${
            loading ? "login--button-loading" : ""
          }`}
          onClick={handleClick}
        >
          {loading && <LoadingAnimation />}
          <span>Send me email to reset my password</span>
        </button>
      </div>

      {/* END: Show from here until next comment when resetPassword conditions have not been met */}

      {/* START: Replace with this once user has successfully sent email to their email address requesting new password */}
      <p className="text-center">We have sent you an email with a link to reset your password.<br /> You can now close this window.</p>
      {/* END: Replace with this once user has successfully sent email to their email address requesting new password */}

    </section>
  );
}
export default ForgotPassword;
