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
      console.log(props.data.startTime);
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
      console.log(userSet);
      console.log(props.data);
      userSet.map((user, index) => {
        console.log(user);
        if(typeof user === "number"){
          if (user === Number(localStorage.getItem("id"))) {
            console.log("hello");
            const newTitle = props.data?.title;
            setRegisteredContestTitles([...registeredContestTitles, newTitle]);
          }
        }
        else{
          if (user.userId === localStorage.getItem("id")) {
            console.log("first");
            const newTitle = props.data?.title;
            setRegisteredContestTitles([...registeredContestTitles, newTitle]);
          }
        }
        console.log(registeredContestTitles);
      });
    }


    console.log("registeredContestTitles");

    for (let i = 0; i < registeredContestTitles.length; i++) {
      if (props.data.title === registeredContestTitles[i]) {
        setIsRegistered(true);
        setRegisterButton("Enter");
      }
    }
  }, [registeredContestTitles]);
  //

  return (
    <div className="my-1">
      <div
        className={`h-[4rem] max-[493px]:w-full max-[493px]:m-auto max-[493px]:my-1 max-[493px]:px-3 max-[493px]:py-2 items-center flex max-[493px]:flex-col max-[493px]:h-fit text-white lg:font-semibold justify-evenly overflow-hidden max-[493px]:items-center ${backgroundColor} ${
          props.value === "past" ? "cursor-pointer" : "cursor-auto"
        }`}
        onClick={props.value === "past" ? handleClick : null}
      >
        <div className="max-[493px]:grid max-[493px]:grid-cols-2 max-[493px]:w-full max-[493px]:my-1 ">
          {/* max-[493px]:flex max-[493px]:items-baseline max-[493px]:w-full max-[493px]:justify-center max-[493px]:pr-[30%] */}
          <p className="min-[493px]:hidden pr-4 text-md">Title: </p>
          <p className="max-[493px]:text-md text-base md:text-xl">
            {props.data?.title}
          </p>
        </div>

        <div className="max-[493px]:grid max-[493px]:grid-cols-2 max-[493px]:w-full min-[493px]:w-[20%] max-[493px]:my-1 ">
          {/* max-[493px]:flex max-[493px]:items-baseline max-[493px]:justify-center max-[493px]:w-full */}
          <p className="min-[493px]:hidden pr-[4%] text-md">Start Time: </p>
          <p className="max-[493px]:text-md text-sm md:text-base ">
            {changeDate(props.data?.startTime)}
          </p>
        </div>

        <div className="max-[493px]:grid max-[493px]:grid-cols-2 max-[493px]:w-full min-[493px]:w-[20%] max-[493px]:my-1">
          {/* max-[493px]:flex max-[493px]:items-baseline max-[493px]:justify-center max-[493px]:w-full w-[20%] */}
          <p className="min-[493px]:hidden pr-[6%] text-md">End Time: </p>
          <p className="max-[493px]:text-md text-sm md:text-base">
            {changeDate(props.data?.endTime)}
          </p>
        </div>
        {/* DD/MM/YYYY hh:mm:ss IST */}

        <div>
          <button
            className={`${
              props.value === "hidden" || props.value === "past"
                ? "opacity-40 cursor-not-allowed max-[493px]:hidden"
                : ""
            } max-[493px]:mt-3 max-[493px]:mb-3 font-medium text-xl bg-slate-800 border border-slate-500 text-green-400 hover:bg-slate-900 hover:text-green-300 px-3 py-1 max-[493px]:text-base rounded-md transition duration-300 ease-in-out`}
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