import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard.jsx";
import Problem from "./pages/Problem.jsx";
import ProblemForm from "./pages/forms/Problem.jsx";
import Therapy from "./pages/Therapy.jsx";
import TherapyForm from "./pages/forms/Therapy";
import Offer from "./pages/Offer.jsx";
import OffersForm from "./pages/forms/Offer";
import Services from "./pages/Services.jsx";
import ServicesForm from "./pages/forms/Services";
import TestcaseForm from "./pages/forms/TestcaseForm.jsx";
import Blog from "./pages/Blog.jsx";
import BlogForm from "./pages/forms/BlogForm";
import Faq from "./pages/Faq.jsx";
import Testcase from "./pages/Testcase.jsx";
import Submission from "./pages/Submission.jsx";
import Signin from "./pages/Signin";
import BookNow from "./pages/BookNow.jsx";
import CallNow from "./pages/CallNow";
import ProblemUpdate from "./pages/forms/updateForms/ProblemUpdate";

function App() {
  // if loginState is true then only display Admin content else display login form.
  const [loginState, setLoginState] = useState(true);
  return (
    <BrowserRouter>
      {!loginState ? (
        <Signin />
      ) : (
        <>
          <Sidebar />
          <div className="main__container">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/offers" element={<Offer />} />
              <Route path="/addoffer" element={<OffersForm />} />

              <Route path="/problems" element={<Problem />} />
              <Route path="/addproblem" element={<ProblemForm />} />

              <Route path="/contests" element={<Therapy />} />
              <Route path="/addcontest" element={<TherapyForm />} />

              <Route path="/testcases" element={<Testcase />} />
              <Route path="/addtestcase" element={<TestcaseForm />} />

              <Route path="/tags" element={<Services />} />
              <Route path="/addtags" element={<ServicesForm />} />

              <Route path="/submissions" element={<Submission />} />
              <Route path="/addsubmission" element={<ServicesForm />} />

              <Route path="/blogs" element={<Blog />} />
              <Route path="/addblog" element={<BlogForm />} />

              <Route path="/booknow" element={<BookNow />} />
              <Route path="/callnow" element={<CallNow />} />
              <Route path="/faqs" element={<Faq />} />
              <Route path="/signin" element={<Signin />} />

              {/* Update form routes */}
              <Route path="/updateProblem" element={<ProblemUpdate />} />

              <Route path="*" element={<Dashboard />} />
              {/* <Route path="/answer-faqs" element={<FaqForm />} />{" "} */}
            </Routes>
          </div>
        </>
      )}
    </BrowserRouter>
  );
}
export default App;
