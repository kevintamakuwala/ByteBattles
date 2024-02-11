import React from "react";
import Logo from "../../assets/standard-collection-27.svg";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <div className="flex flex-col pl-[6%] pt-[3%] bg-white w-screen">
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#000",
        }}
      >
        <div className="flex items-end">
          <img src={Logo} alt="" draggable="false" className="w-6 mr-4" />
          <p className="text-2xl font-bold font-rubik">
            Byte<span className="font-semibold">Battles</span>
          </p>
        </div>
      </Link>
      <div className="text-lg font-medium w-2/5 mt-8 text-gray-800 py-2">
        <span className="font-semibold">Byte</span>
        <b>Battles </b>
        <span>
          is a competitive programming and interview preparation website trusted
          by thousands of students across the world.
        </span>
      </div>
      <div className="flex py-4">
        <Link
          to="https://www.facebook.com"
          className="facebook-link text-blue-700 hover:text-blue-900 pr-2"
          target="_blank"
        >
          <FaFacebook className="text-3xl mx-1" />
        </Link>
        <Link
          to="https://www.twitter.com"
          className="twitter-link text-black hover:text-gray-90000 pr-2"
          target="_blank"
        >
          <FaXTwitter className="text-3xl mx-1" />
        </Link>
        <Link
          to="https://www.instagram.com"
          className="instagram-link text-pink-700 hover:text-pink-800 pr-2"
          target="_blank"
        >
          <FaInstagram className="text-3xl mx-1" />
        </Link>
      </div>
      <div className="text-sm mt-2 text-gray-600 pb-3">
        <span>©2023Byte</span>
        <b>Battles</b>
      </div>
    </div>
  );
};

export default FooterComponent;
