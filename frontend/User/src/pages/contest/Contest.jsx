import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Contest = (props) => {
  const navigate = useNavigate();
	
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    setBackgroundColor(props.backgroundColor);
  }, [props.backgroundColor]);

  const handleClick = (e) => {
    if (props.value === "disable") {
      e.preventDefault();
    } else {
      navigate("/contestproblems", { state: props.value });
    }
  };

  return (
    <div className="my-1">
      {/* <Link to={{pathname:"/contestproblems",state:{value : props}}} > */}

      {/* () =>{
            navigate('/contestproblems' ,{state : props.value});
        } */}
      {/* <Link to="/contestproblems" onClick={handleClick}> */}
      <div
        className={`h-[4rem] max-[493px]:w-full max-[493px]:m-auto max-[493px]:my-1 max-[493px]:px-3 items-center flex max-[493px]:flex-col max-[493px]:h-fit text-white lg:font-semibold justify-evenly overflow-hidden py-2  max-[493px]:items-center ${backgroundColor}`}
      >
        {/* <p className='max-[493px]:text-lg text-base md:text-xl'>Id</p> */}
        <div className="max-[493px]:flex max-[493px]:items-baseline max-[493px]:w-full max-[493px]:justify-center max-[493px]:pr-[30%]">
          <p className="min-[493px]:hidden pr-4 text-md">Title: </p>
          <p className="max-[493px]:text-md text-base md:text-xl">Name</p>
        </div>

        {/* <div className='max-[493px]:flex max-[493px]:w-full max-[493px]:items-baseline max-[493px]:px-2 w-[20%]'> */}
        {/* <p className='min-[493px]:hidden'>Description:</p> */}
        {/* <p className='max-[493px]:text-lg max-[493px]:w-full max-[493px]:px-2 text-base h-[1.5rem] md:text-xl max[693]:w-[95%] w-[11%] md:w-[30%] lg:w-[12rem] max-[493px]:h-[1.5rem] whitespace-nowrap overflow-ellipsis overflow-hidden'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus sit at ipsum iusto iste magni porro vitae quaerat impedit exercitationem! Modi tempore et rem consectetur veritatis quisquam neque praesentium optio.</p> */}
        {/* </div> */}

        <div className="max-[493px]:flex max-[493px]:items-baseline max-[493px]:justify-center max-[493px]:w-full w-[20%]">
          <p className="min-[493px]:hidden pr-[4%] text-md">Start Time: </p>
          <p className="max-[493px]:text-md text-sm md:text-base ">
            DD/MM/YYYY hh:mm:ss IST
          </p>
        </div>

        <div className="max-[493px]:flex max-[493px]:items-baseline max-[493px]:justify-center max-[493px]:w-full w-[20%]">
          <p className="min-[493px]:hidden pr-[6%] text-md">End Time: </p>
          <p className="max-[493px]:text-md text-sm md:text-base">
            DD/MM/YYYY hh:mm:ss IST
          </p>
        </div>

        <div>
          <Link disabled={props.value === "hidden"}>
            <button
              onClick={handleClick}
              className={`${
                props.value === "hidden"
                  ? "opacity-40 cursor-not-allowed max-[493px]:hidden"
                  : ""
              } max-[493px]:mt-3 font-medium text-xl bg-slate-800 border border-slate-500 text-green-400 hover:bg-slate-900 hover:text-green-300 px-3 py-1 rounded-md transition duration-300 ease-in-out`}
            >
              Register
            </button>
          </Link>
        </div>
      </div>

      {/* </Link> */}
    </div>
  );
};

export default Contest;
