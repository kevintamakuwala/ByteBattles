import React from "react";
import "./Footer.css";
import Logo from "../../assets/standard-collection-27.svg";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-main">
      <Link to="/"
      style={{
        textDecoration: "none",
        color: "#000",
      }}
      >
        <div className="footer-logo">
          <img src={Logo} alt="" draggable="false" />
          <p>
            Byte<span>Battles</span>
          </p>
        </div>
      </Link>
      <div className="footer-description">
        <span>Byte</span>
        <b>Battles </b>
        <span>
          is a competitive programming and interview preparation website trusted
          by thousands of students across the world.
        </span>
      </div>
      <div className="social-media-icon">
        <a
          href="https://www.facebook.com"
          className="facebook-link"
          target="_blank"
        >
          <FaFacebook />
        </a>

        <a
          href="https://www.twitter.com"
          className="twitter-link"
          target="_blank"
        >
          <FaXTwitter />
        </a>

        <a
          href="https://www.instagram.com"
          className="instagram-link"
          target="_blank"
        >
          <FaInstagram />
        </a>
      </div>
      <div className="copyright">
        <span>©2023Byte</span>
        <b>Battles</b>
      </div>
    </div>
  );
};

export default Footer;
