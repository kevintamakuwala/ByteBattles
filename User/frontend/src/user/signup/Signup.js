import React, { useContext, useEffect, useState } from "react";
import { signup } from "../../util/APIUtils";
import "./Signup.css";
// import { notification } from "antd";
import { ACCESS_TOKEN } from "../../constants";

import { Redirect } from "react-router-dom";
import Verify from "../verify/Verify";
const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [registered, setRegistered] = useState(false);

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
      try {
        await signup({
          name: name,
          email: email,
          username: username,
          password: password,
        });

        alert(
          "Thank you! You're successfully registered. Please Login to continue!"
        );
        props.updateStates(username,password);
        setRegistered(true);
      } catch (error) {
        alert("Sorry! Something went wrong. Please try again!");
      }
    } else {
      alert("Please fix the validation errors before submitting.");
    }
  };

  if (registered) return <Verify />;

  return !(
    localStorage.length > 0 && localStorage.getItem(ACCESS_TOKEN) !== ""
  ) ? (
    <div id="loginform">
      <Form
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
    <Redirect to="/" />
  );
};

const Form = (props) => (
  <div>
    <FormInput
      description="Name"
      placeholder="Enter your name"
      type="text"
      value={props.name}
      onChange={(e) => props.setName(e.target.value)}
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
        padding: "0 2.6rem",
        marginBottom: "10px",
        fontSize: "12px",
        color: "grey",
      }}
    >
      Password should have at least one uppercase letter, one digit, and one
      special character (!@#$%^&*).
    </div>
    <div id="button" className="row">
      <button
        type="button"
        onClick={props.handleSignup}
      >
        Signup
      </button>
    </div>
  </div>
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

// import React, { Component } from "react";
// import "./Signup.css";
// import { Link } from "react-router-dom";

// const FormItem = Form.Item;

// class Signup extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: {
//         value: "",
//       },
//       email: {
//         value: "",
//       },
//       username: {
//         value: "",
//       },
//       password: {
//         value: "",
//       },
//     };
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleInputChange(event, validationFun) {
//     const target = event.target;
//     const inputName = target.name;
//     const inputValue = target.value;

//     this.setState({
//       [inputName]: {
//         value: inputValue,
//       },
//     });
//   }

//   handleSubmit(event) {
//     event.preventDefault();

//     const signupRequest = {
//       name: this.state.name.value,
//       email: this.state.email.value,
//       username: this.state.username.value,
//       password: this.state.password.value,
//     };
//     signup(signupRequest)
//       .then((response) => {
//         notification.success({
//           message: "ByteBattles",
//           description:
//             "Thank you! You're successfully registered. Please Login to continue!",
//         });
//         this.props.history.push("/login");
//       })
//       .catch((error) => {
//         notification.error({
//           message: "ByteBattles",
//           description:
//             error.message || "Sorry! Something went wrong. Please try again!",
//         });
//       });
//   }
//   render() {
//     const { getFieldDecorator } = this.props.form;
//     return (
//       <div className="signup-container">
//         <h1 className="page-title">Sign Up</h1>
//         <div className="signup-content">
//           <Form onSubmit={this.handleSubmit} className="signup-form">
//             <FormItem>
//               {getFieldDecorator("name", {
//                 rules: [
//                   {
//                     required: true,
//                     message: "Please enter your name!",
//                   },
//                 ],
//               })(
//                 <Input
//                   prefix={<Icon type="user" />}
//                   size="large"
//                   name="name"
//                   autoComplete="off"
//                   placeholder="Enter your name"
//                   value={this.state.email.value}
//                   onChange={(event) =>
//                     this.handleInputChange(event, this.validateName)
//                   }
//                 />
//               )}
//             </FormItem>
//             <FormItem>
//               {getFieldDecorator("email", {
//                 rules: [
//                   {
//                     required: true,
//                     message: "Please input your email!",
//                   },
//                   {
//                     pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                     message: "Please enter a valid email address!",
//                   },
//                 ],
//               })(
//                 <Input
//                   prefix={<Icon type="mail" />}
//                   size="large"
//                   name="email"
//                   autoComplete="off"
//                   placeholder="Enter a valid email"
//                   value={this.state.email.value}
//                   onChange={(event) =>
//                     this.handleInputChange(event, this.validateEmail)
//                   }
//                 />
//               )}
//             </FormItem>
//             <FormItem label="Username" hasFeedback>
//               <Input
//                 size="large"
//                 name="username"
//                 autoComplete="off"
//                 placeholder="A unique username"
//                 value={this.state.username.value}
//                 onChange={(event) =>
//                   this.handleInputChange(event, this.validateUsername)
//                 }
//               />
//             </FormItem>

//             <FormItem label="Password">
//               <Input
//                 size="large"
//                 name="password"
//                 type="password"
//                 autoComplete="off"
//                 placeholder="A password between 6 to 20 characters"
//                 value={this.state.password.value}
//                 onChange={(event) =>
//                   this.handleInputChange(event, this.validatePassword)
//                 }
//               />
//             </FormItem>
//             <FormItem>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 size="large"
//                 className="signup-form-button"
//               >
//                 Sign up
//               </Button>
//               Already registed? <Link to="/login">Login now!</Link>
//             </FormItem>
//           </Form>
//         </div>
//       </div>
//     );
//   }
// }

// export default Form.create()(Signup);
