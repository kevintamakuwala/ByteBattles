import React, { useState, useEffect } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import Login from "../user/login/Login";
import Signup from "../user/signup/Signup";
import Profile from "../user/profile/Profile";
import NotFound from "../common/notfound/NotFound";
import LoadingIndicator from "../common/LoadingIndicator";
import PrivateRoute from "../common/PrivateRoute";
import { Layout, notification } from "antd";
import ProblemList from "../common/ProblemList";
import LandingPage from "../pages/landingPage/LandingPage";
import Navbar from "../common/navbar/Navbar";
import Footer from "../common/footer/Footer";
import Verify from "../user/verify/Verify";
import MailValidation from "../user/verify/MailValidation";

const App = ({ history }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jwtToken, setJwtToken] = useState(localStorage.getItem(ACCESS_TOKEN));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState(password);

  const handleLogout = (
    redirectTo = "/",
    notificationType = "success",
    description = "You're successfully logged out."
  ) => {
    console.log("logout");
    localStorage.removeItem(ACCESS_TOKEN);
    setIsAuthenticated(false);
    history.push(redirectTo);
    notification[notificationType]({
      message: "ByteBattles",
      description: description,
    });
  };

  const handleLogin = () => {
    notification.success({
      message: "ByteBattles",
      description: "You're successfully logged in.",
    });
    history.push("/");
  };

  const loadCurrentUser = () => {
    if (localStorage.length > 0 && localStorage.getItem("accessToken")) {
      setIsAuthenticated(true);
      setIsLoading(false);
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }
  const updateStates = (us, pwd) => {
    setUsername(us);
    setPassword(pwd);
    localStorage.setItem("username", us);
    localStorage.setItem("password", pwd);
  };

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated}/>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) =>
             
              <LandingPage/>
          }
        ></Route>
        <Route
        path="/login" render=
        {(props) => <Login onLogin={handleLogin} {...props} />}
        />
        <Route
          path="/signup"
          render={(props) => <Signup {...props} updateStates={updateStates} />}
        />
        <Route
          path="/verify"
          render={(props) => (
            <MailValidation onLogin={handleLogin} {...props} />
          )}
        />
        {/* <Route path="/problem" element={<Problem />} /> */}
        {/* <Route path="/contest" element={<Contest />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} /> */}
        <Redirect from="/" to="/login" />
        <Route component={NotFound}></Route>
        <PrivateRoute
          authenticated={isAuthenticated}
          path="/problems"
          component={ProblemList}
          handleLogout={handleLogout}
        ></PrivateRoute>
      </Switch>
      <Footer />
    </div>
  );
};

export default withRouter(App);
