import React, { useState, useEffect } from 'react';

const Timer = () => {
    const initialTime = 3 * 60 * 60;
    const [remainingTime, setRemainingTime] = useState(initialTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return { hours, minutes, seconds };
    };

    return (
        <div className='mt-4 md:mt-24  pt-2 md:mr-[13%] border lg:w-fit border-slate-600 md:pb-4 lg:py-12 px-20 md:ml:[1rem] lg:ml-16 lg:mr-16 rounded-lg bg-slate-500'>
            <h1 className='md:text-xl lg:text-2xl md:w-[141%] lg:w-[126%] text-slate-100 font-semibold text-center md:text-left md:-ml-[20%] lg:ml-0'>Contest Ends in:</h1>
            <div className='flex justify-center max-md:ml-[18%] max-md:pb-2 mr-4 pr-4 mt-4 md:mt-8 md:text-base lg:text-xl lg:w-[115%]'>
                <p className='max-md:pt-[2%] bg-slate-100 border border-slate-800 lg:p-[4.5%] lg:w-12 lg:mx-[3%] text-slate-900 font-bold md:h-[1.9rem] lg:h-[48px] px-[5%]'>{formatTime(remainingTime).hours}</p>
                <p className='p-[2%] md:py-[3%] md:ps-[3%] text-slate-900 font-semibold max-md:pr-2'>:</p>
                <p className='max-md:pt-[2%] bg-slate-100 border border-slate-800 lg:p-[4.5%] lg:w-12 lg:mx-[3%] text-slate-900 font-bold md:h-[1.9rem] lg:h-[48px] px-[5%]'>{formatTime(remainingTime).minutes}</p>
                <p className='max-md:p-[2%] py-[3%] text-slate-900 font-semibold max-md:pr-2'>:</p>
                <p className='max-md:pt-[2%] bg-slate-100 border border-slate-800 lg:p-[4.5%] lg:w-12 lg:mx-[3%] text-slate-900 font-bold md:h-[1.9rem] lg:h-[48px] px-[5%]'>{formatTime(remainingTime).seconds}</p>
            </div>

        </div>
    );
};

export default Timer;
