import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import Login from "../user/login/Login";
import Signup from "../user/signup/Signup";
import NotFound from "../common/notfound/NotFound";
import LoadingIndicator from "../common/LoadingIndicator";
// import PrivateRoute from "../common/PrivateRoute";
// import ProblemList from "../common/ProblemList";
import LandingPage from "../pages/landingPage/LandingPage";
import Navbar from "../common/navbar/Navbar";
import Footer from "../common/Footer/Footer";
// import Verify from "../user/verify/Verify";
import MailValidation from "../user/verify/MailValidation";
import ProblemPage from "../problems/ProblemPage";
import "./App.css";

const App = () => {
  const navigate = useNavigate();
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
    navigate(redirectTo);
    // notification[notificationType]({
    //   message: "ByteBattles",
    //   description: description,
    // });
  };

  const handleLogin = () => {
    navigate("/");
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
    <>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/signup"
          element={<Signup updateStates={updateStates} />}
        />
        <Route
          path="/verify"
          element={<MailValidation onLogin={handleLogin} />}
        />
        <Route path="/problems" element={<ProblemPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};
export default App;
