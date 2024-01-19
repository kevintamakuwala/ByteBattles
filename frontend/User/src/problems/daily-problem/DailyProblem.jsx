import React from 'react';
import { FaCalendarCheck } from "react-icons/fa6";

const DailyProblem = () => {
    return (
        <div className='dailyProblem__main bg-slate-800 rounded-2xl p-4 md:p-8 flex flex-col items-center text-center text-white'>
            <div className='today-problem flex items-center gap-3 md:gap-4 m-4 w-full justify-center'>
                <FaCalendarCheck className='text-green-500 text-2xl md:text-3xl' />
                <h2 className='sm:text-xl md:text-xl font-bold font-sans'>Today's Problem</h2>
            </div>

            <div className='dailyProblem-heading flex justify-center mt-2 md:mt-4 mx-2 md:mx-10 text-sm md:text-lg'>
                <p className='mr-2'>100.</p>
                <p>Add Two Numbers</p>
            </div>

            <div className='dailyProblem-details flex flex-col md:items-center md:justify-center pb-2 mt-2 md:mt-4 mx-2 md:mx-20 text-sm md:text-lg'>
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

