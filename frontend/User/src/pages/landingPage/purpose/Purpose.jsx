import React from 'react';
import MAANG from '../../../assets/maang.png';
import Contests from '../../../assets/contests.png';
import Problems from '../../../assets/problems.png';
import PurposeImg from '../../../assets/purpose.png';
import CheckMark from '../../../assets/checkmark.png';

const Purpose = () => {
  return (
    <div className='wrapper__container flex flex-col w-screen bg-gray-950 lg:mt-8'>
      <div className='work_container flex bg-gray-950  md:mx-0 '>
        <div className='work-box flex items-center justify-evenly bg-white rounded-2xl w-full mx-[6%] md:mx-16 md:w-screen ml:4 my-12'>
          <div className='maang-div flex items-center w-fit'>
            <img src={MAANG} alt='maang' draggable={false} className='maang-img w-7 h-7 md:w-10 md:h-10 outline outline-offset-2 outline-1 rounded-full ' />
            <div className='work-description flex flex-col items-start justify-center ml-2 md:ml-4'>
              <h1 className='text-sm md:text-xl lg:text-2xl font-bold'>MAANG</h1>
              <p className='text-xs md:text-lg'>interviews</p>
            </div>
          </div>
          <div className='vertical-line border-l-2 border-gray-400 h-16 my-4'></div>
          <div className='maang-div flex items-center'>
            <img src={Contests} alt='maang' draggable={false} className='maang-img w-7 h-7 md:w-10 md:h-10 outline outline-offset-2 outline-1 rounded-full' />
            <div className='work-description flex flex-col items-start justify-center ml-2 md:ml-4'>
              <h1 className='text-sm md:text-xl lg:text-2xl font-bold'>Weekly</h1>
              <p className='text-xs md:text-lg'>Contests</p>
            </div>
          </div>
          <div className='vertical-line border-l-2 border-gray-400 h-16 my-2'></div>
          <div className='maang-div flex items-center'>
            <img src={Problems} alt='maang' draggable={false} className='problems-img w-[1.9rem] h-[1.9rem] md:w-[2.5rem] md:h-10 mr-2 md:mr-4 outline outline-offset-2 outline-1 rounded-full' />
            <div className='work-description flex flex-col items-start justify-center'>
              <h1 className='text-sm md:text-xl lg:text-2xl font-bold'>2000+</h1>
              <p className='text-xs md:text-lg'>Problems</p>
            </div>
          </div>
        </div>
      </div>
      <div className='purpose_container flex w-full md:p-2 pt-3 mx-8 my-2'>
        <div className='left-div bg-gray-950 hidden md:block w-full ms-10 pt-6'>
          <img src={PurposeImg} alt='' draggable='false' className='object-cover w-3/4' />
        </div>
        <div className='right-div bg-gray-950 w-screen md:w-screen lg:w-3/4 flex flex-col items-center justify-center lg:pl-2 mr-12 lg:me-20'>
          <h1 className='purpose-heading text-white font-bold text-2xl md:text-3xl lg:text-4xl m-autos mb-2 lg:mb-4'>Why Us?</h1>
          <div className='purpose-points flex flex-col text-base md:text-lg lg:text-xl'>
            <div className='purposes flex items-start lg:py-2'>
              <img src={CheckMark} alt='' draggable={false} className='w-5 md:w-6 pt-1' />
              <p className='purpose-description pl-2 text-white'>Interview focused problems.</p>
            </div>
            <div className='purposes flex items-start py-2'>
              <img src={CheckMark} alt='' draggable={false} className='w-5 md:w-6 pt-1' />
              <p className='purpose-description pl-2 text-white'>Join Live Contest and Hone Your Skill.</p>
            </div>
            <div className='purposes flex items-start py-2'>
              <img src={CheckMark} alt='' draggable={false} className='w-5 md:w-6 pt-1 ' />
              <p className='purpose-description pl-2 text-white'>Track your Progress and Compete Globally.</p>
            </div>
            <div className='purposes flex items-start py-2'>
              <img src={CheckMark} alt='' draggable={false} className='w-5 md:w-6 pt-1' />
              <p className='purpose-description pl-2 text-white'>Solve Problems in a time Frame.</p>
            </div>
            <div className='purposes flex items-start py-2'>
              <img src={CheckMark} alt='' draggable={false} className='w-5 md:w-6 pt-1' />
              <p className='purpose-description pl-2 text-white'>Progress Analysis done by Our Software.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purpose;
