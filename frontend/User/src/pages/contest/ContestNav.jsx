import React from "react";

const ContestNav = () => {
  return (
    <div className="max-[590px]:hidden">
      <div className=" grid grid-cols-6 min-[493px]:px-[6%] md:px-[5%] justify-start bg-slate-400 rounded-lg md:justify-around font-medium  mt-4 mb-2 py-2 max-md:pr-[4%] max-sm:text-sm ">
        <div className="max-md:w-[16%] flex-1 ">
          <p className="md:ml-4 max-[493px]:text-lg text-base md:text-xl">
            Title
          </p>
        </div>
        <p className="  max-[493px]:text-lg text-base md:text-xl max-[493px]:pr-[7%] col-span-2 ">
          Start Time
        </p>
        <p className=" max-md:pr-[8%]  max-[493px]:text-lg text-base md:text-xl  col-span-2  ">
          End Time
        </p>
      </div>
    </div>
  );
};

export default ContestNav;
