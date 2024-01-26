import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/lists/Dashboard.jsx";

import Problem from "./pages/lists/Problem.jsx";
import AddProblem from "./pages/forms/addForms/AddProblem.jsx";
// import ProblemUpdate from "./pages/forms/updateForms/ProblemUpdate";

import AddTestcase from "./pages/forms/addForms/AddTestcase.jsx";
import Testcase from "./pages/lists/Testcase.jsx";
import AddContest from "./pages/forms/addForms/AddContest.jsx";
import Contest from "./pages/lists/Contest.jsx";

import Submission from "./pages/lists/Submission.jsx";

import Signin from "./pages/forms/Signin";

import Tag from "./pages/lists/Tag.jsx";
import AddTag from "./pages/forms/addForms/AddTag.jsx";
import AdminContext from "./context/AdminContext.jsx";
import { successNotification } from "./utils.js";
import { ToastContainer } from "react-toastify";

function App() {
  // if loginState is true then only display Admin content else display login form.
  const [loginState, setLoginState] = useState(
    localStorage.length > 0 && localStorage.getItem("jwt") !== ""
  );
  const handleLogin = () => {
    setLoginState(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoginState(false);
  };
  return (
    <BrowserRouter>
      <AdminContext.Provider value={{ loginState, setLoginState }}>
        {!loginState ? (
          <Signin onLogin={handleLogin} onLogout={handleLogout} />
        ) : (
          <>
            <Sidebar />
            <div className="main__container">
              <Navbar onLogout={handleLogout} />
              <Routes>
                <Route
                  path="/"
                  element={loginState ? <Dashboard /> : <Signin />}
                />

                <Route
                  path="/problems"
                  element={loginState ? <Problem /> : <Signin />}
                />
                <Route
                  path="/addproblem"
                  element={loginState ? <AddProblem /> : <Signin />}
                />

                <Route
                  path="/contests"
                  element={loginState ? <Contest /> : <Signin />}
                />
                <Route
                  path="/addcontest"
                  element={loginState ? <AddContest /> : <Signin />}
                />

                <Route
                  path="/testcases"
                  element={loginState ? <Testcase /> : <Signin />}
                />
                <Route
                  path="/addtestcase"
                  element={loginState ? <AddTestcase /> : <Signin />}
                />

                <Route
                  path="/tags"
                  element={loginState ? <Tag /> : <Signin />}
                />
                <Route
                  path="/addtag"
                  element={loginState ? <AddTag /> : <Signin />}
                />

                <Route
                  path="/submissions"
                  element={loginState ? <Submission /> : <Signin />}
                />

                <Route
                  path="*"
                  element={loginState ? <Dashboard /> : <Signin />}
                />
              </Routes>
            </div>
          </>
        )}
      </AdminContext.Provider>
    </BrowserRouter>
  );
}
export default App;
