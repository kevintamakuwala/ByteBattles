import React, { useState } from "react";
import { signup } from "../../util/APIUtils";
import { MdLock } from "react-icons/md";
import { ACCESS_TOKEN } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import Verify from "../verify/Verify";
import LoadingIndicator from "../../common/LoadingIndicator";
import { errorNotification, successNotification } from "../../util/Helpers";
import { ToastContainer } from "react-toastify";

const Signup = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setValidEmail(isValid);
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
    setValidPassword(passwordRegex.test(password));
  };

  const handleSignup = async () => {
    validateEmail();
    validatePassword();

    if (validEmail && validPassword) {
      setLoading(true);

      try {
        await signup({
          name: name,
          email: email,
          username: username,
          password: password,
        });

        successNotification(
          "Thank you! You're successfully registered. Please Login to continue!"
        );
        props.updateStates(username, password);
        setRegistered(true);
      } catch (error) {
        errorNotification("Sorry! Something went wrong. Please try again!");
      } finally {
        setLoading(false);
      }
    } else {
      errorNotification("Please fix the validation errors before submitting.");
    }
  };

  if (registered) return <Verify />;

  return !(
    localStorage.getItem(ACCESS_TOKEN) !== null &&
    localStorage.getItem(ACCESS_TOKEN) !== undefined
  ) ? (
    <div id="loginform">
      <ToastContainer />
      <div className="signup-heading">
        <MdLock className="signup-icon" />
        <span>Sign up</span>
      </div>
      <Form
        loading={loading}
        updateContext={props.updateContext}
        name={name}
        email={email}
        username={username}
        password={password}
        validEmail={validEmail}
        validPassword={validPassword}
        setName={setName}
        setEmail={setEmail}
        setUsername={setUsername}
        setPassword={setPassword}
        validateEmail={validateEmail}
        validatePassword={validatePassword}
        handleSignup={handleSignup}
      />
    </div>
  ) : (
    () => {
      navigate.replace("/");
      return null;
    }
  );
};

const Form = (props) => (
  <form>
    {props.loading ? (
      <>
        <LoadingIndicator />
      </>
    ) : (
      <></>
    )}

    <div>
      <FormInput
        description="Name"
        placeholder="Enter your name"
        type="text"
        value={props.name}
        onChange={(e) => props.setName(e.target.value)}
        className="name-label"
      />
      <FormInput
        description="Email"
        placeholder="Enter your Email"
        type="text"
        value={props.email}
        onChange={(e) => {
          props.setEmail(e.target.value);
          props.validateEmail();
        }}
        isValid={props.validEmail}
      />
      <FormInput
        description="Username"
        placeholder="Enter your username"
        type="text"
        value={props.username}
        onChange={(e) => props.setUsername(e.target.value)}
      />
      <FormInput
        description="Password"
        placeholder="Enter your password"
        type="password"
        value={props.password}
        onChange={(e) => {
          props.setPassword(e.target.value);
          props.validatePassword();
        }}
        isValid={props.validPassword}
      />
      <div
        style={{
          padding: "0px 2.6rem",
          marginBottom: "1%",
          fontSize: "0.85rem",
          color: "#131212",
        }}
      >
        Password should have at least one uppercase letter, one digit, and one
        special character (!@#$%^&*).
      </div>
      <div id="button" className="row">
        <button type="button" onClick={props.handleSignup}>
          SIGN UP
        </button>
        <span className="login-here">
          Already have an account? <Link to="/login">Login here</Link>
        </span>
      </div>
    </div>
  </form>
);

const FormInput = (props) => {
  const isEmailOrPassword =
    props.description === "Email" || props.description === "Password";

  return (
    <div
      className={`row ${
        isEmailOrPassword && props.value !== "" && !props.isValid ? "error" : ""
      }`}
    >
      <label
        style={{ fontWeight: "bold", marginBottom: "8px", display: "block" }}
      >
        {props.description}
      </label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: `1px solid ${
            isEmailOrPassword && props.value !== "" && !props.isValid
              ? "red"
              : "#ccc"
          }`,
          boxShadow:
            isEmailOrPassword && props.value !== "" && !props.isValid
              ? "0 0 5px rgba(255, 0, 0, 0.5)"
              : "none",
          boxSizing: "border-box",
          marginBottom: "15px",
          fontSize: "14px",
        }}
      />
    </div>
  );
};

export default Signup;
