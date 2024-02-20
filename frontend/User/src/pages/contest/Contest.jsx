import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showSuccessToast } from "../code-editor/components/CodeWindow";

const Contest = (props) => {
  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [registerButton, setRegisterButton] = useState("Register");
  const [contestId, setContestId] = useState("");
  const [userId, setUserId] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredContestTitles, setRegisteredContestTitles] = useState([]);

  const changeDate = (time) => {
    const date = new Date(time[0], time[1] - 1, time[2], time[3], time[4]);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return (
      <span>
        {day}/{month}/{year} {hours}:{minutes}:{seconds} IST
      </span>
    );
  };
  useEffect(() => {
    setBackgroundColor(props.backgroundColor);
  }, [props.backgroundColor]);

  useEffect(() => {
    if (
      localStorage.getItem("id") !== null &&
      localStorage.getItem("id") !== undefined
    ) {
      const storedContestId = props.data?.contestId;
      const storedUserId = localStorage.getItem("id");
      if (storedContestId && storedUserId) {
        setContestId(storedContestId);
        setUserId(storedUserId);
      }
    }
  }, []);

 


  const handleClick = () => {
    if (
      localStorage.getItem("id") !== null &&
      localStorage.getItem("id") !== undefined
    ) {
      const contestTitleSlug = props.data.title
        .replace(/\s+/g, "-")
        .toLowerCase();
      const contestUrl = `/contests/${contestTitleSlug}/`;
      navigate(contestUrl, { 
        state: { 
          url: props.data.title, 
          startTime: props.data.startTime, 
          endTime: props.data.endTime 
        } 
      });
    } else {
      navigate("/login");
    }
  };

  const handleClickRegister = async (e) => {
    try {
      if (
        localStorage.getItem("id") !== null &&
        localStorage.getItem("id") !== undefined
      ) {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/contests/${contestId}/users/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        if (response.ok) {
          setRegisteredContestTitles(props.data.title);
          setIsRegistered(true);
          setRegisterButton("Enter");
          showSuccessToast("Registered successfully...");
        } else {
          //   setRegistrationStatus('Failed');
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  // useEffect(() => {
  //   const currentDate = new Date();
  //   const start = props.data.startTime;
  //   const end = props.data.endTime;
  //   const liveStartTime = new Date(
  //     start[0],
  //     start[1] - 1,
  //     start[2],
  //     start[3],
  //     start[4]
  //   );
  //   const liveEndTime = new Date(end[0], end[1] - 1, end[2], end[3], end[4]);

  //   if (liveStartTime <= currentDate && liveEndTime >= currentDate) {
  //     const userSet = props.data.applicationUserSet;
  //     userSet.map((user, index) => {
  //       if(typeof user === "number"){
  //         if (user === Number(localStorage.getItem("id"))) {
  //           const newTitle = props.data?.title;
  //           setRegisteredContestTitles([...registeredContestTitles, newTitle]);
  //         }
  //       }
  //       else{
  //         if (user.userId === localStorage.getItem("id")) {
  //           const newTitle = props.data?.title;
  //           setRegisteredContestTitles([...registeredContestTitles, newTitle]);
  //         }
  //       }
  //     });
  //   }



  //   for (let i = 0; i < registeredContestTitles.length; i++) {
  //     if (props.data.title === registeredContestTitles[i]) {
  //       setIsRegistered(true);
  //       setRegisterButton("Enter");
  //     }
  //   }
  // }, [registeredContestTitles]);

  useEffect(() => {
    const currentDate = new Date();
    const start = props.data.startTime;
    const end = props.data.endTime;
    const liveStartTime = new Date(
      start[0],
      start[1] - 1,
      start[2],
      start[3],
      start[4]
    );
    const liveEndTime = new Date(end[0], end[1] - 1, end[2], end[3], end[4]);
  
    if (liveStartTime <= currentDate && liveEndTime >= currentDate) {
      const userSet = props.data.applicationUserSet;
      userSet.forEach(user => {
        if (typeof user === "number" && user === Number(localStorage.getItem("id"))) {
          const newTitle = props.data?.title;
          setRegisteredContestTitles(prevTitles => [...prevTitles, newTitle]);
        } else if (user.userId === localStorage.getItem("id")) {
          const newTitle = props.data?.title;
          setRegisteredContestTitles(prevTitles => [...prevTitles, newTitle]);
        }
      });
    }
  }, [props.data]);
  
  useEffect(() => {
    for (let i = 0; i < registeredContestTitles.length; i++) {
      if (props.data.title === registeredContestTitles[i]) {
        setIsRegistered(true);
        setRegisterButton("Enter");
        break; // Exit the loop once found
      }
    }
  }, [registeredContestTitles, props.data.title]);
  

  return (
    <div className="my-1">
      <div
        className={`grid grid-cols-6 h-[4rem] max-[590px]:w-full max-[590px]:m-auto max-[590px]:my-1 max-[590px]:px-5 max-[590px]:py-2 items-center max-[590px]:flex max-[590px]:flex-col max-[590px]:h-fit text-white lg:font-semibold min-[590px]:pl-[3%] min-[590px]:pr-[5%] md:px-[5%] overflow-hidden max-[590px]:items-center ${backgroundColor} ${
          props.value === "past" ? "cursor-pointer" : "cursor-auto"
        }`}
        onClick={props.value === "past" ? handleClick : null}
      >
        <div className="max-[590px]:grid max-[590px]:grid-cols-2 max-[590px]:w-full max-[590px]:my-1 ">
          {/* max-[493px]:flex max-[493px]:items-baseline max-[493px]:w-full max-[493px]:justify-center max-[493px]:pr-[30%] */}
          <p className="min-[590px]:hidden pr-4 text-md">Title: </p>
          <p className="max-[590px]:text-md text-base md:text-lg min-md:font-normal max-md:font-semibold w-[80%] truncate overflow-ellipsis">
            {props.data?.title}
          </p>
        </div>

        <div className="max-[590px]:grid max-[590px]:grid-cols-2 max-[590px]:w-full min-[590px]:w-[70%] md:w-[90%] max-[590px]:my-1 col-span-2 ">
          {/* max-[493px]:flex max-[493px]:items-baseline max-[493px]:justify-center max-[493px]:w-full */}
          <p className="min-[590px]:hidden pr-[4%] text-md">Start Time: </p>
          <p className="max-[590px]:text-md text-sm md:text-base ">
            {changeDate(props.data?.startTime)}
          </p>
        </div>

        <div className="max-[590px]:grid max-[590px]:grid-cols-2 max-[590px]:w-full min-[590px]:w-[70%] md:w-[90%] max-[590px]:my-1 col-span-2 ">
          {/* max-[493px]:flex max-[493px]:items-baseline max-[493px]:justify-center max-[493px]:w-full w-[20%] */}
          <p className="min-[590px]:hidden pr-[6%] text-md">End Time: </p>
          <p className="max-[590px]:text-md text-sm md:text-base">
            {changeDate(props.data?.endTime)}
          </p>
        </div>
        {/* DD/MM/YYYY hh:mm:ss IST */}

        <div>
          <button
            className={`${
              props.value === "hidden" || props.value === "past"
                ? "opacity-40 cursor-not-allowed max-[590px]:hidden pointer-events-none px-2 "
                : "px-3"
            } max-[590px]:mt-3 max-[590px]:mb-3 font-medium text-xl bg-slate-800 border border-slate-500 text-green-400 hover:bg-slate-900 hover:text-green-300  py-1 max-[590px]:text-base rounded-md transition duration-300 ease-in-out`}
            onClick={isRegistered ? handleClick : handleClickRegister}
          >
            {registerButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contest;