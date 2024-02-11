import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../util/APIUtils";
import "./Login.css";
import { ACCESS_TOKEN } from "../../constants";
import LoadingIndicator from "../../common/LoadingIndicator";
import { MdLock } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import Logo from "../../assets/standard-collection-27.svg";
const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

const Login = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    validatePassword();
    setTimeout(async () => {
      if (validPassword) {
        setLoading(true);
        try {
          const response = await fetch(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: username,
                password: password,
              }),
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();

          if (responseData.jwt === "") {
            alert("Your Username or Password is incorrect. Please try again!");
            setLoading(false);
            return;
          }
          localStorage.setItem(ACCESS_TOKEN, responseData.jwt);
          localStorage.setItem("id", responseData.user.userId);
          props.onLogin();
          navigate("/");
          // window.location.reload();
        } catch (error) {
          alert(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        alert("Please fix the validation errors before submitting.");
      }
    }, 0);
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
    setValidPassword(passwordRegex.test(password));
  };

  return !(
    localStorage.getItem(ACCESS_TOKEN) !== null &&
    localStorage.getItem(ACCESS_TOKEN) !== undefined
  ) ? (
    <div id="loginform">
      {/* <FormHeader title="Login" /> */}
      <div className="signup-heading">
        <img
          className="w-7 h-7 md:w-100 md:h-10 mr-2"
          alt="logo"
          src={Logo}
          draggable={false}
        />
        <span>Login</span>
      </div>

      <Form
        username={username}
        password={password}
        validPassword={validPassword}
        setUsername={setUsername}
        setPassword={setPassword}
        validatePassword={validatePassword}
        handleLogin={handleLogin}
        loading={loading}
      />
    </div>
  ) : (
    () => {
      navigate.replace("/");
      window.scrollTo(0, 0);
      return null;
    }
  );
};

const Form = (props) => (
  <form>
    {props.loading ? (
      <LoadingIndicator />
    ) : (
      <div>
        <div className="input-field">
          <div className="icon">
            <BiSolidUser />
          </div>
          <FormInput
            description="Username"
            placeholder="Enter your username"
            type="text"
            value={props.username}
            onChange={(e) => props.setUsername(e.target.value)}
          />
        </div>

        <div className="input-field">
          <div className="icon">
            <MdLock />
          </div>
          <FormInput
            description="Password"
            placeholder="Enter your password"
            type="password"
            value={props.password}
            onChange={(e) => {
              const newPassword = e.target.value;
              props.setPassword(newPassword);
              props.validatePassword(newPassword);
            }}
            isValid={props.validPassword}
          />
        </div>

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
          <button type="button" onClick={props.handleLogin}>
            Login
          </button>
        </div>
      </div>
    )}
  </form>
);

const FormInput = (props) => (
  <div
    className={`row ${
      props.description === "Password" && props.value !== "" && !props.isValid
        ? "error"
        : ""
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
        marginBottom: "15px",
        fontSize: "14px",
      }}
      className={`${
        props.description === "Password" && props.value !== "" && !props.isValid
          ? "focus:border-none focus:outline focus:outline-red-700 shadow-[0px_0px_5px_rgba(255, 0, 0, 0.5)]"
          : "focus:border-none focus:outline focus:outline-blue-800 focus:ring-1 focus:ring-blue-600"
      }  border border-[#ccc]`}
    />
  </div>
);

export default Login;
