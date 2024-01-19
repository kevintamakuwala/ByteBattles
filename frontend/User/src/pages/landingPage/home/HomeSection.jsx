import React from 'react';
import CodingPerson from "../../../assets/coding-person1.png";
import { Link } from "react-router-dom";

const HomeSection = () => {
  return (
    <div className='flex justify-between items-start bg-slate-950 pb-2 pt-8 font-sans w-screen px-4 md:px-0'>
      <div className=' flex flex-col text-start md:ml-10 justify-center w-4/5 m-auto md:pl-6 pb-6 md:p-5 md:justify-center md:w-3/4 md:items-start md:mt-0'>
        <p className='text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-0 font-bold text-white lg:leading-[1.2]'>Start your coding journey today.</p>
        <p className='text-lg md:text-xl lg:text-2xl md:mt-8 lg:mt-12 leading-[175%] text-gray-300 font-sans'>Practice Competitive Programming and Data Structures & Algorithms with our diversified problemset and weekly contests.</p>
        <button className='bg-[#F53838] px-10 rounded-lg py-2 mt-6 text-2xl font-bold text-white focus:outline-none focus:shadow-outline hover:bg-[#a72727] transition duration-400 ease-in-out w-fit m-auto md:m-0 md:mt-6' style={{boxShadow:'0 8px 20px -8px rgba(220, 20, 60, 0.6)'}}> 
          <Link to="/problems">Get Started</Link>
        </button>
      </div>
      <div className='w-4/5 lg:w-full md:w-11/12 pt-5 pr-3 overflow-hidden md:pt-5 md:p-0 hidden md:block'>
        <img className='pt-4 object-cover w-11/12 h-auto block' alt='coding' loading='lazy' src={CodingPerson} draggable='false' />
      </div>
    </div>
  );
};

export default HomeSection;
