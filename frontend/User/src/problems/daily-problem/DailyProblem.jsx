import React from 'react';
import { FaCalendarCheck } from "react-icons/fa6";

const DailyProblem = () => {
    return (
        <div className='dailyProblem__main bg-slate-800 mr-[0.5rem] md:mr-0 rounded-2xl p-4 md:p-8 flex flex-col items-center text-center text-white lg:h-[21.5rem] mb-2'>
            <div className='today-problem flex items-center gap-3 lg:gap-4 md:p-0 my-2 md:m-4 w-full justify-center'>
                <FaCalendarCheck className='text-green-500 text-2xl  lg:text-3xl' />
                <h2 className='text-2xl md:text-xl font-bold font-sans pb-2 md:pb-0'>Problem for You!!!</h2>
            </div>

            <div className=' md:mt-4 mx-2 md:mx-10 text-lg md:text-base lg:text-lg '>
                {/* <p className='mr-2'>100.</p> */}
                <p className='md:w-[200px]'>100. Add Two Numbers</p>
            </div>

            <div className='dailyProblem-details flex justify-around flex-col md:items-center md:justify-center md:pb-2 md:mt-4 lg:mx-20 text-lg md:text-lg'>
                <p>Array</p>
                <p>Easy</p>
            </div>

            <div>
                <button className='daily-solveBtn border-2 border-red-600 rounded-2xl py-2 px-8 font-semibold transition duration-300 ease
                mt-5 hover:bg-red-700 hover:text-white text-lg md:text-xl'>
                    Solve Now
                </button>
            </div>
        </div>
    );
}

export default DailyProblem;

