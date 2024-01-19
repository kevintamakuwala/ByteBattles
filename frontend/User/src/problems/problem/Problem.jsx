import React from 'react';

const Problem = () => {
  return (
    <div className='problem__container flex flex-col md:flex-row text-center justify-between items-center rounded-lg px-3 md:px-5 py-5 md:py-3 sm:text-base font-sans bg-slate-600 mb-4 text-white md:items-center md:text-center md:align-middle md:justify-between md:min-w-840px md:max-w-999px md:text-sm lg:text-xl'>
      <div className='problem-heading flex justify-start pl-3 align-middle'>
        <span className='pt-1'>100.</span>
        <span className='pt-1 pl-2'>Add Two Numbers</span>
      </div>
      <div className='problem-difficulty font-sans pt-1 md:pt-0 md:pl-3'>
        Easy
      </div>
      <div className='problem-status font-sans pt-1 md:pt-0 md:pl-3'>
        Incomplete
      </div>
      <div className='mt-2 md:mt-0'>
        <button className='start-problem bg-red-600 rounded-3xl px-6 py-1 font-semibold font-system-ui transition duration-300 hover:bg-red-800 md:w-full ml-2'>
          Solve
        </button>
      </div>
    </div>
  );
}

export default Problem;

