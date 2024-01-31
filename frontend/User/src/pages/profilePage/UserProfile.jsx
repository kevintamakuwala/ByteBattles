import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import Avatar, { ConfigProvider, Cache } from "react-avatar";

const generateRandomColor = () => {
  const colors = ["red", "cyan", "green"];
  const colorIndex = Math.floor(Math.random() * colors.length);
  return colors[colorIndex];
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
  const [avatarColor, setAvatarColor] = useState(() => {
    const storedColor = localStorage.getItem("avatarColor");
    return storedColor || generateRandomColor();
  });

  useEffect(() => {
    localStorage.setItem("avatarColor", avatarColor);
    const timeoutId = setTimeout(() => {
      setAvatarVisible(true);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [avatarColor]);

  const cache = new Cache({
    sourceTTL: 7 * 24 * 3600 * 1000,
    sourceSize: 20,
  });

  return (
    <ConfigProvider cache={cache}>
      <div className=" inline">
        <div className="flex flex-col bg-[#151b2d94] items-center rounded-lg justify-center w-[100%] pl-[1%] ml-[2%] mt-[5%] pb-[2%] shadow-lg shadow-[#14171e] ">
          <div className="flex align-middle justify-center items-center text-xl text-white my-[1%] mt-[5%] -ms-[22%] w-[81%] ">
            {/* <div className='text-4xl md:text-3xl lg:text-5xl py-2 px-4 border rounded-full mx-[4%] md:mx-[7%] '>
                        R
                    </div> */}
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

          <hr className="w-[90%] mt-[3%] -ml-[4%] border-red-500 " />

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
                  Email:{" "}
                </span>
              </div>
              <span className="font-normal ml-[7%] md:ml-[13%] xl:ml-[11%] md:text-base lg:text-lg lg:font-semibold">
                rsureja48@gmail.com
              </span>
            </div>
          </div>

          <hr className="w-[90%] mt-[3%] -ml-[4%] border-red-500 " />

          <div className="w-[100%] ms-[8%] md:ms-5 mt-[6%] ">
            <span className="text-2xl text-white font-medium ">Skills </span>

            <div className="flex flex-wrap mt-2">
              {/* <div className='inline-block text-md mr-[6%] '>
                            <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">Array</span>
                            <span className='text-[#7f7e7e] '>x20</span>
                        </div>

                        <div className='inline-block text-md mr-[6%] ext-lg'>
                            <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">Array</span>
                            <span className='text-[#7f7e7e] '>x20</span>
                        </div>

                        <div className='inline-block text-md mr-[6%] ext-lg'>
                            <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">Hash Table</span>
                            <span className='text-[#7f7e7e] '>x20</span>
                        </div>

                        <div className='inline-block text-md mr-[6%] '>
                            <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">Greedy</span>
                            <span className='text-[#7f7e7e] '>x20</span>
                        </div>

                        <div className='inline-block text-md mr-[6%] '>
                            <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">Dynamic Programming</span>
                            <span className='text-[#7f7e7e] '>x20</span>
                        </div>

                        <div className='inline-block text-md mr-[6%] ext-lg'>
                            <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">Sort</span>
                            <span className='text-[#7f7e7e] '>x20</span>
                        </div>

                        <div className='inline-block text-md mr-[6%] ext-lg'>
                            <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">Array</span>
                            <span className='text-[#7f7e7e] '>x20</span>
                        </div>

                        <div className='inline-block text-md mr-[6%] '>
                            <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">String</span>
                            <span className='text-[#7f7e7e] '>x20</span>
                        </div>

                        <div className='inline-block text-md mr-[6%] '>
                            <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">Array</span>
                            <span className='text-[#7f7e7e] '>x20</span>
                        </div> */}
              {renderedTags}
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default UserProfile;
