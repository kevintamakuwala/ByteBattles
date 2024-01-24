import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
// My imports

import "./Sidebar.css";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { TbLayoutSidebarLeftExpandFilled,TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { GrAdd } from "react-icons/gr";


const Sidebar = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <>
      {isActive ? (
        <div className="sidebar__container">
          <div className="sidebar">
            <div className="top__section">
              <Link to="/" style={{textDecoration:"none", color: "white", fontSize: "1.7rem" }}>
                ByteBattles
              </Link>
              <div className="bar__icon">
                <TbLayoutSidebarRightExpandFilled
                  onClick={() => setIsActive(!isActive)}
                  style={{
                    cursor: "pointer",
                    color: "white",
                  }}
                />
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
                <p className="sidebar_topic_title">Problems</p>
                <div className="sidebar_links">
                  <NavLink to={"/problems"}>
                    <AiOutlineUnorderedList />
                    &nbsp;&nbsp; Problems
                  </NavLink>
                  <NavLink to={"/addproblem"}>
                    <GrAdd />
                    &nbsp;&nbsp; Add Problem
                  </NavLink>
                </div>
              </div>

              <div className="sidebar__topic_box">
                <p className="sidebar_topic_title">Contests</p>
                <div className="sidebar_links">
                  <NavLink to={"/contests"}>
                    <AiOutlineUnorderedList />
                    &nbsp;&nbsp; Contests
                  </NavLink>
                  <NavLink to={"/addcontest"}>
                    <GrAdd />
                    &nbsp;&nbsp; Add Contest
                  </NavLink>
                </div>
              </div>

              <div className="sidebar__topic_box">
                <p className="sidebar_topic_title">Tags</p>
                <div className="sidebar_links">
                  <NavLink to={"/tags"}>
                    <AiOutlineUnorderedList />
                    &nbsp;&nbsp; Tags
                  </NavLink>
                  <NavLink to={"/addtag"}>
                    <GrAdd />
                    &nbsp;&nbsp; Add Tag
                  </NavLink>
                </div>
              </div>

              <div className="sidebar__topic_box">
                <p className="sidebar_topic_title">Testcases</p>
                <div className="sidebar_links">
                  <NavLink to={"/testcases"}>
                    <AiOutlineUnorderedList />
                    &nbsp;&nbsp; Testcases
                  </NavLink>
                  <NavLink to={"/addtestcase"}>
                    <GrAdd />
                    &nbsp;&nbsp; Add Testcase
                  </NavLink>
                </div>
              </div>
              <div className="sidebar__topic_box">
                <p className="sidebar_topic_title">Submissions</p>
                <div className="sidebar_links">
                  <NavLink to={"/submissions"}>
                    <AiOutlineUnorderedList />
                    &nbsp;&nbsp; Submissions
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
            width: "5%",
            minWidth: "unset",
          }}
        >
          <div className="top__section-closed">
          <div
            className="bar__icon"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TbLayoutSidebarLeftExpandFilled
              onClick={() => setIsActive(!isActive)}
              style={{
                cursor: "pointer",
                color: "white",
              }}
            />
          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
