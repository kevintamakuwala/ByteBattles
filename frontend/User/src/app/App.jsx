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
import FooterComponent from "../common/footerComponent/FooterComponent";
// import Verify from "../user/verify/Verify";
import MailValidation from "../user/verify/MailValidation";
import ProblemPage from "../problems/ProblemPage";
import CodeWindow from "../pages/code-editor/components/CodeWindow";
import "./App.css";
import ContestPage from "../pages/contest/ContestPage";
import ContestList from "../pages/contest/ContestList";
import Contest from "../pages/contest/Contest";
import ProfilePage from "../pages/profilePage/ProfilePage";

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

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem("id");
    setIsAuthenticated(false);
    navigate("/");
    window.scrollTo(0, 0);
  };

  const handleLogin = () => {
    // navigate("/");
    setIsAuthenticated(true);
    navigate(-1);
    window.scrollTo(0, 0);
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

  const shouldRenderNavbarAndFooter = !location.pathname.includes("/problems/");

  return (
    <div className="overflow-x-hidden bg-slate-950">
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      {shouldRenderNavbarAndFooter && (
        <>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <LandingPage />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <LandingPage />
                ) : (
                  <Signup
                    updateStates={updateStates}
                    handleAuthenticated={setIsAuthenticated}
                  />
                )
              }
            />
            <Route
              path="/verify"
              element={
                <MailValidation
                  onLogin={handleLogin}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
            <Route path="/problemset/" element={<ProblemPage />} />
            <Route path="/contests" element={<ContestList />} />
            <Route path="/contests/*" element={<ContestPage />} />
            <Route path="/problems/*" element={<CodeWindow />} />
            <Route
              path="/profile/"
              element={!isAuthenticated ? <Login onLogin={handleLogin}/> : <ProfilePage />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>

          <FooterComponent />
        </>
      )}

      {!shouldRenderNavbarAndFooter && (
        <Routes>
          <Route path="/problems/*" element={<CodeWindow />} />
        </Routes>
      )}
    </div>
  );
};
export default App;
