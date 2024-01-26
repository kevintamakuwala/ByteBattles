import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";

const UserProfile = () => {
  const color = ["#932a9a8a", ""];

  return (
    <div className="mt-20 inline">
      <div className="flex flex-col bg-[#151b2d94] rounded-lg justify-center w-[100%] items-center pl-[1%] ml-[2%] mt-[3%] pb-[2%] shadow-lg shadow-[#14171e] ">
        <div className="flex align-middle justify-center items-center text-xl text-white my-[1%] mt-[5%] -ms-[22%] w-[81%] ">
          <div className="md:text-3xl lg:text-5xl py-2 px-4 border rounded-full mx-[7%] ">
            R
          </div>

          <div className="flex font-bold md:text-2xl lg:text-2xl">
            <span>Rushi Sureja</span>
          </div>
        </div>

        <hr className="w-[90%] mt-[3%] -ml-[4%] border-red-500 " />

        <div className="flex flex-col justify-center ms-5 text-md font-semibold text-white mt-[3%] w-[100%] pr-[2%] ">
          <div className="flex items-center py-2">
            <FaRegUser className="mr-2 text-xl" />
            <span className="w-[31%]">Username: </span>
            <span className="font-normal">rushi_sureja</span>
          </div>
          <div className="flex items-center py-2">
            <MdOutlineAlternateEmail className="mr-2 text-xl" />
            <span className="w-[31%]">Email: </span>
            <span className="font-normal">rsureja48@gmail.com</span>
          </div>
        </div>

        <hr className="w-[90%] mt-[3%] -ml-[4%] border-red-500 " />

        <div className="w-[100%] ms-5 mt-[6%] ">
          <span className="text-2xl text-white font-medium ">Skills </span>
          {/* <div className="flex flex-wrap row-span-6">
                        <div className="bg-red-800 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-4 py-1">
                            <span className="mr-8">Array</span>
                            <span>x20</span>
                        </div>
                        <div className="bg-red-800 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-4 py-1">
                            <span className="mr-8">String</span>
                            <span>x20</span>
                        </div>
                        <div className="bg-red-800 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-4 py-1">
                            <span className="mr-8">Dynamic Programming</span>
                            <span>x20</span>
                        </div>
                        <div className="bg-red-800 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-4 py-1">
                            <span className="mr-8">Array</span>
                            <span>x20</span>
                        </div>

                        <div className="bg-red-800 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-4 py-1">
                            <span className="mr-8">Greedy</span>
                            <span>x20</span>
                        </div>
                        <div className="bg-red-800 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-4 py-1">
                            <span className="mr-8">Array</span>
                            <span>x20</span>
                        </div>
                        <div className="bg-red-800 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-4 py-1 ">
                            <span className="mr-8">Dynamic Programming</span>
                            <span>x20</span>
                        </div>
                    </div> */}

          <div className="flex flex-wrap mt-2">
            <div className="inline-block text-md mr-[6%] ">
              <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">
                Array
              </span>
              <span className="text-[#7f7e7e] ">x20</span>
            </div>

            <div className="inline-block text-md mr-[6%] ext-lg">
              <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">
                Array
              </span>
              <span className="text-[#7f7e7e] ">x20</span>
            </div>

            <div className="inline-block text-md mr-[6%] ext-lg">
              <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">
                Hash Table
              </span>
              <span className="text-[#7f7e7e] ">x20</span>
            </div>

            <div className="inline-block text-md mr-[6%] ">
              <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">
                Greedy
              </span>
              <span className="text-[#7f7e7e] ">x20</span>
            </div>

            <div className="inline-block text-md mr-[6%] ">
              <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">
                Dynamic Programming
              </span>
              <span className="text-[#7f7e7e] ">x20</span>
            </div>

            <div className="inline-block text-md mr-[6%] ext-lg">
              <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">
                Sort
              </span>
              <span className="text-[#7f7e7e] ">x20</span>
            </div>

            <div className="inline-block text-md mr-[6%] ext-lg">
              <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">
                Array
              </span>
              <span className="text-[#7f7e7e] ">x20</span>
            </div>

            <div className="inline-block text-md mr-[6%] ">
              <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">
                String
              </span>
              <span className="text-[#7f7e7e] ">x20</span>
            </div>

            <div className="inline-block text-md mr-[6%] ">
              <span className="mr-2 my-2 inline-flex px-[10px] border border-gray-500 rounded-full text-[#ffffff9e] bg-[#1c2743b0] ">
                Array
              </span>
              <span className="text-[#7f7e7e] ">x20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
