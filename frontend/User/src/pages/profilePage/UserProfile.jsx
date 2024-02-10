import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import Avatar, { ConfigProvider, Cache } from "react-avatar";

const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 100);
  const lightness = Math.floor(Math.random() * 100);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const username = "rushi_sureja";

const getUserColor = () => {
  return getCookie(username);
};

const setUserColor = (color) => {
  setCookie(username, color, 365);
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};

const UserProfile = () => {
  const tags = (tag) => {
    return (
      <div className="inline-block text-md mr-[6%] ext-lg">
        <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">
          {tag}
        </span>
        <span className="text-[#7f7e7e] ">x20</span>
      </div>
    );
  };

  const tagCount = 3;
  const renderedTags = [];
  const allTags = [
    "Array",
    "Dynamic Programming",
    "Greedy",
    "String",
    "Hash Table",
  ];

  for (let i = 0; i < tagCount; i++) {
    for (let j = 0; j < allTags.length; j++) {
      renderedTags.push(tags(allTags[j]));
    }
  }

  const [avatarVisible, setAvatarVisible] = useState(false);
  const [avatarColor, setAvatarColor] = useState(() => getUserColor());

  useEffect(() => {
    const storedColor = getUserColor();
    if (!storedColor) {
      const newColor = generateRandomColor();
      setAvatarColor(newColor);
      setUserColor(newColor);
    } else {
      setAvatarColor(storedColor);
    }
    setAvatarVisible(true);
  }, []);

  const cache = new Cache({
    sourceTTL: 7 * 24 * 3600 * 1000,
    sourceSize: 20,
  });

  return (
    <ConfigProvider cache={cache}>
      <div className=" inline">
        <div className="flex flex-col bg-[#151b2d94] items-center rounded-lg justify-center w-[100%] pl-[1%] ml-[2%] mt-[5%] pb-[2%] shadow-lg shadow-[#14171e] ">
          <div className="flex align-middle justify-center items-center text-xl text-white my-[1%] mt-[5%] -ms-[22%] w-[81%] ">
            <div className="mx-[4%] md:mx-[5%] ">
              <Avatar
                name="Rushi Sureja"
                size="60"
                textSizeRatio={2.75}
                round={true}
                color={`${avatarColor}`}
                className={`transition-opacity duration-[] ease-in-out ${
                  avatarVisible ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            <div className="flex font-bold text-3xl md:text-xl lg:text-2xl">
              <span>Rushi Sureja</span>
            </div>
          </div>

          <hr className="w-[90%] mt-[3%] -ml-[4%] border-red-300 " />

          <div className="flex flex-col justify-center max-md:ml-[15%] ms-[8%] text-md font-semibold text-white mt-[3%] w-[100%] pr-[2%] ">
            <div className="flex md:flex-col max-md:items-center xl:flex-row xl:items-center py-2">
              <div className="flex items-center py-2">
                <FaRegUser className="mr-2 text-xl" />
                <span className="lg:w-[31%] text-[#dbe0e1c4]">Username: </span>
              </div>
              <span className="font-normal ml-[2%] md:ml-[13%] xl:ml-[2%] md:text-base lg:text-lg lg:font-semibold">
                rushi_sureja
              </span>
            </div>
            <div className="flex md:flex-col max-md:items-center xl:flex-row xl:items-center py-2">
              <div className="flex items-center py-2">
                <MdOutlineAlternateEmail className="mr-2 text-xl" />
                <span className="lg:w-[31%] text-[#dbe0e1c4] md:text-lg ">
                  Email:
                </span>
              </div>
              <span className="font-normal ml-[7%] md:ml-[13%] xl:ml-[11%] md:text-base lg:text-lg lg:font-semibold">
                rsureja48@gmail.com
              </span>
            </div>
          </div>

          <hr className="w-[90%] mt-[3%] -ml-[4%] border-red-300 " />

          <div className="w-[100%] ms-[8%] md:ms-5 mt-[6%] ">
            <span className="text-2xl text-white font-medium ">Skills </span>

            <div className="flex flex-wrap mt-2">{renderedTags}</div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default UserProfile;
