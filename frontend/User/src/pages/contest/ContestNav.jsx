import React from 'react'

const ContestNav = () => {
  return (
    <div className='max-[493px]:hidden'>
      <div className='max-md:pl-[8%] flex justify-start bg-slate-400 rounded-lg md:justify-around font-medium md:pl-[2%]  mt-4 mb-2 py-2 max-md:pr-4 max-sm:text-sm'>
        {/* <p className='px-2 text-2xl'>Contest ID</p> */}
        <div className='max-md:w-[16%]'>
          {/* className='px-10 md:pl-[2.5rem] md:pr-[0.5rem] md:text-xl lg:text-2xl md:ml-0 lg:-ml-[1rem]' */}
          <p className='md:ml-4 max-[493px]:text-lg text-base md:text-xl'>Title</p>
        </div>
        {/* className='max-[596px]:pr-[5%] max-[596px]:-ml-[2%] md:px-2 lg:pr-2 md:text-xl lg:text-2xl md:ml-0 lg:-ml-[4rem]' */}
        {/* <p className='max-[493px]:text-lg max-[493px]:w-full max-[493px]:px-2 text-base w-[20%] h-[1.5rem] md:text-xl max[693]:w-[95%] max-[659px]:w-[11%] md:w-[30%] lg:w-[12rem] max-[493px]:h-[1.5rem] whitespace-nowrap overflow-ellipsis overflow-hidden'>Description</p> */}

        {/* className='max-[596px]:pl-[1.5rem] pl-10 md:px-2 lg:pr-2 md:text-xl lg:text-2xl lg:ml-12 md:pl-[2.5rem] md:pr-2' */}
        <p className='max-md:w-[30%] md:w-[20%] lg:w-[17%]  max-[493px]:text-base text-sm max-[493px]:pr-[7%] md:text-xl'>Start Time</p>
        {/* pl-10 */}

        {/* className='px-10 md:px-2 md:text-xl lg:text-2xl md:mr-[3rem] lg:mr-[4rem] md:pl-[2.5rem] md:pr-2' */}
        <p className='max-md:w-[22%] max-md:pr-[8%] md:w-[46%] lg:w-[43%] max-[493px]:text-base text-sm min-[493px]:w-[22%] min-[493px]:pr-[8%] md:text-xl'>End Time</p>
      </div>
    </div>
  )
}

export default ContestNav   