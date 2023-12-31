import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../util/APIUtils";
import "./Login.css";
import { ACCESS_TOKEN } from "../../constants";
import LoadingIndicator from "../../common/LoadingIndicator";

const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

const Login = (props) => {
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
          await login({
            username: username,
            password: password,
          })
            .then((response) => {
              if (response.jwt === "") {
                alert(
                  "Your Username or Password is incorrect. Please try again!"
                );
                setLoading(false);
                return;
              }
              localStorage.setItem(ACCESS_TOKEN, response.jwt);
              props.onLogin();
              window.location.reload();
            })
            .catch((error) => {
              if (error.status === 401) {
                alert(
                  "Your Username or Password is incorrect. Please try again!"
                );
              } else {
                alert(error.message);
              }
            });
        } catch (error) {
          alert("Sorry! Something went wrong. Please try again!");
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
    localStorage.getItem(ACCESS_TOKEN) !== null ||
    localStorage.getItem(ACCESS_TOKEN) === ""
  ) ? (
    <div id="loginform">
      <FormHeader title="Login" />

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
    <Redirect to="/" />
  );
};

const Form = (props) => (
  <form>
    <div>
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
          const newPassword = e.target.value;
          props.setPassword(newPassword);
          props.validatePassword(newPassword);
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
        <button type="button" onClick={props.handleLogin}>
          Login
        </button>
      </div>
    </div>

    {props.loading ? <LoadingIndicator /> : <div></div>}
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
        border: `1px solid ${
          props.description === "Password" &&
          props.value !== "" &&
          !props.isValid
            ? "red"
            : "#ccc"
        }`,
        boxShadow:
          props.description === "Password" &&
          props.value !== "" &&
          !props.isValid
            ? "0 0 5px rgba(255, 0, 0, 0.5)"
            : "none",
        boxSizing: "border-box",
        marginBottom: "15px",
        fontSize: "14px",
      }}
    />
  </div>
);

export default Login;

// const FormItem = Form.Item;

// class Login extends Component {
//   render() {
//     const AntWrappedLoginForm = Form.create()(LoginForm);
//     return (
//       <div className="login-container">
//         <h1 className="page-title">Login</h1>
//         <div className="login-content">
//           <AntWrappedLoginForm onLogin={this.props.onLogin} />
//         </div>
//       </div>
//     );
//   }
// }

// export default Login;

// class LoginForm extends Component {
//   constructor(props) {
//     super(props);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         const loginRequest = Object.assign({}, values);
//
//       }
//     });
//   }

//   render() {
//     const { getFieldDecorator } = this.props.form;
//     return (
//       <Form onSubmit={this.handleSubmit} className="login-form">
//         <FormItem>
//           {getFieldDecorator("username", {
//             rules: [
//               {
//                 required: true,
//                 message: "Please input your username!",
//               },
//             ],
//           })(
//             <Input
//               prefix={<Icon type="user" />}
//               size="large"
//               name="username"
//               placeholder="Username"
//             />
//           )}
//         </FormItem>
//         <FormItem>
//           {getFieldDecorator("password", {
//             rules: [{ required: true, message: "Please input your Password!" }],
//           })(
//             <Input
//               prefix={<Icon type="lock" />}
//               size="large"
//               name="password"
//               type="password"
//               placeholder="Password"
//             />
//           )}
//         </FormItem>
//         <FormItem>
//           <Button
//             type="primary"
//             htmlType="submit"
//             size="large"
//             className="login-form-button"
//           >
//             Login
//           </Button>
//           Or <Link to="/signup">register now!</Link>
//         </FormItem>
//       </Form>
//     );
//   }
// }
