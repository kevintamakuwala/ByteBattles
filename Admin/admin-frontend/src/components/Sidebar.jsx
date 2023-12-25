import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
// My imports
import "./Sidebar.css";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";

import trakkyLogo from "../assets/Trakky logo white.png";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <>
      {isActive ? (
        <div className="sidebar__container">
          <div className="sidebar">
            <div className="top__section">
              <div className="bar__icon">
                <AiOutlineMenu
                  onClick={() => setIsActive(!isActive)}
                  style={{
                    cursor: "pointer",
                    color: "white",
                  }}
                />
              </div>
              <div className="trakky__logo">
                <Link to="/">
                  <img src={trakkyLogo} alt="" className="trakky__logo_img" />
                </Link>
              </div>
            </div>

            <div className="sidebar_link__container">
              <div className="sidebar__topic_box">
                <p className="sidebar_topic_title">Dashboard</p>
                <div className="sidebar_links">
                  <NavLink to={"/"}>Dashboard</NavLink>
                </div>
              </div>

              <div className="sidebar__topic_box">
                <p className="sidebar_topic_title">Spas</p>
                <div className="sidebar_links">
                  <NavLink to={"/Spas"}>
                    <AiOutlineUnorderedList />
                    &nbsp;&nbsp; List Spa
                  </NavLink>
                  <NavLink to={"/addspa"}>
                    <GrAdd />
                    &nbsp;&nbsp; Add Spa
                  </NavLink>
                </div>
              </div>

              <div className="sidebar__topic_box">
                <p className="sidebar_topic_title">Therapies</p>
                <div className="sidebar_links">
                  <NavLink to={"/therapies"}>
                    <AiOutlineUnorderedList />
                    &nbsp;&nbsp; List Therapies
                  </NavLink>
                  <NavLink to={"/addtherapy"}>
                    <GrAdd />
                    &nbsp;&nbsp; Add Therapy
                  </NavLink>
                </div>
              </div>

              <div className="sidebar__topic_box">
                <p className="sidebar_topic_title">Offers</p>
                <div className="sidebar_links">
                  <NavLink to={"/offers"}>
                    <AiOutlineUnorderedList />
                    &nbsp;&nbsp; List Offers
                  </NavLink>
                  <NavLink to={"/addoffer"}>
                    <GrAdd />
                    &nbsp;&nbsp; Add Offer
                  </NavLink>
                </div>
              </div>

              <div className="sidebar__topic_box">
                <p className="sidebar_topic_title">Services</p>
                <div className="sidebar_links">
                  <NavLink to={"/services"}>
                    <AiOutlineUnorderedList />
                    &nbsp;&nbsp; List Services
                  </NavLink>
                  <NavLink to={"/addservice"}>
                    <GrAdd />
                    &nbsp;&nbsp; Add Service
                  </NavLink>
                </div>
              </div>

              <div className="sidebar__topic_box">
                <p className="sidebar_topic_title">Cities</p>
                <div className="sidebar_links">
                  <NavLink to={"/cities"}>
                    <AiOutlineUnorderedList />
                    &nbsp;&nbsp; List Cities
                  </NavLink>
                  <NavLink to={"/addcity"}>
                    <GrAdd />
                    &nbsp;&nbsp; Add City
                  </NavLink>

                  <NavLink to={"/areas"}>
                    <AiOutlineUnorderedList />
                    &nbsp;&nbsp; List Areas
                  </NavLink>
                  <NavLink to={"/addarea"}>
                    <GrAdd />
                    &nbsp;&nbsp; Add Area
                  </NavLink>
                </div>
              </div>

              <div className="sidebar__topic_box">
                <p className="sidebar_topic_title">Inquiries</p>
                <div className="sidebar_links">
                  <NavLink to={"/booknow"}>
                    <AiOutlineUnorderedList />
                    &nbsp;&nbsp; Book Now
                  </NavLink>
                  <NavLink to={"/callnow"}>
                    <AiOutlineUnorderedList />
                    &nbsp;&nbsp; Call Now
                  </NavLink>
                </div>
              </div>

              <div className="sidebar__topic_box">
                <p className="sidebar_topic_title">Blogs</p>
                <div className="sidebar_links">
                  <NavLink to={"/blogs"}>
                    <AiOutlineUnorderedList />
                    &nbsp;&nbsp; List Blogs
                  </NavLink>
                  <NavLink to={"/addblog"}>
                    <GrAdd />
                    &nbsp;&nbsp; Add Blog
                  </NavLink>
                </div>
              </div>

              <div className="sidebar__topic_box">
                <p className="sidebar_topic_title">FAQ's</p>
                <div className="sidebar_links">
                  <NavLink to={"/faqs"}>
                    <AiOutlineUnorderedList />
                    &nbsp;&nbsp; List FAQs
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="sidebar__container"
          style={{
            width: "2rem",
            minWidth: "unset",
          }}
        >
          <div
            className="bar__icon"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AiOutlineMenu
              onClick={() => setIsActive(!isActive)}
              style={{
                cursor: "pointer",
                color: "white",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
