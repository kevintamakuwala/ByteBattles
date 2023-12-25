import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard.jsx";
import Spa from "./pages/Spa.jsx";
import SpaForm from "./pages/forms/Spa.jsx";
import Therapy from "./pages/Therapy.jsx";
import TherapyForm from "./pages/forms/Therapy";
import Offer from "./pages/Offer.jsx";
import OffersForm from "./pages/forms/Offer";
import Services from "./pages/Services.jsx";
import ServicesForm from "./pages/forms/Services";
import Cities from "./pages/Cities";
import Areas from "./pages/Areas";
import Blog from "./pages/Blog.jsx";
import BlogForm from "./pages/forms/BlogForm";
import Faq from "./pages/Faq.jsx";
import Signin from "./pages/Signin";
import BookNow from "./pages/BookNow.jsx";
import CallNow from "./pages/CallNow";
import AreaForm from "./pages/forms/AreaForm";
import CityForm from "./pages/forms/CityForm";
import SpaUpdate from "./pages/forms/updateForms/SpaUpdate";

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

              <Route path="/spas" element={<Spa />} />
              <Route path="/addspa" element={<SpaForm />} />

              <Route path="/therapies" element={<Therapy />} />
              <Route path="/addtherapy" element={<TherapyForm />} />

              <Route path="/services" element={<Services />} />
              <Route path="/addservice" element={<ServicesForm />} />

              <Route path="/cities" element={<Cities />} />
              <Route path="/addcity" element={<CityForm />} />

              <Route path="/areas" element={<Areas />} />
              <Route path="/addarea" element={<AreaForm />} />

              <Route path="/blogs" element={<Blog />} />
              <Route path="/addblog" element={<BlogForm />} />

              <Route path="/booknow" element={<BookNow />} />
              <Route path="/callnow" element={<CallNow />} />
              <Route path="/faqs" element={<Faq />} />
              <Route path="/signin" element={<Signin />} />

              {/* Update form routes */}
              <Route path="/updateSpa" element={<SpaUpdate />} />

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
