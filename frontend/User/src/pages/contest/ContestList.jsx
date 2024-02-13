import React, { useState, useEffect } from "react";
import Problem from "../../problems/problem/Problem";
import ContestNav from "./ContestNav";
import Contest from "./Contest";
import { GoDotFill } from "react-icons/go";
import { IoMdAlarm } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { SpinnerRoundFilled } from "spinners-react";

const ContestList = () => {
  const [perPage] = useState(4);

  const [liveOffset, setLiveOffset] = useState(0);
  const [liveCurrentPage, setLiveCurrentPage] = useState(0);
  const [livePageCount, setLivePageCount] = useState(0);
  const [livePostData, setLivePostData] = useState([]);

  const [upOffset, setUpOffset] = useState(0);
  const [upCurrentPage, setUpCurrentPage] = useState(0);
  const [upPageCount, setUpPageCount] = useState(0);
  const [upComingPostData, setUpComingPostData] = useState([]);

  const [pastOffset, setPastOffset] = useState(0);
  const [pastCurrentPage, setPastCurrentPage] = useState(0);
  const [pastPageCount, setPastPageCount] = useState(0);
  const [pastPostData, setPastPostData] = useState([]);

  const generateContests = (count, property) => {
    const contests = [];
    for (let i = 0; i < count; i++) {
      if (i % 2 === 0) {
        contests.push(
          <Contest key={i} value={property} backgroundColor="bg-gray-900" />
        );
      } else {
        contests.push(
          <Contest key={i} value={property} backgroundColor="bg-gray-800" />
        );
      }
    }
    return contests;
  };

  const liveContestCount = 7;
  const liveContests = generateContests(liveContestCount, "");

  const upContestCount = 10;
  const upContests = generateContests(upContestCount, "disable");

  const pastContestCount = 21;
  const pastContests = generateContests(pastContestCount, "hidden");

  useEffect(() => {
    // Define a common function to fetch data based on the given parameters
    const fetchData = (count, offset, setCount, setPostData, contests) => {
      // const contests = generateContests(count, "");
      const contestsSlice = contests.slice(offset, offset + perPage);
      const postData = contestsSlice.map((element, index) => (
        <p key={index}>{element}</p>
      ));
      setCount(Math.ceil(count / perPage));
      setPostData(postData);
    };

    fetchData(
      liveContestCount,
      liveOffset,
      setLivePageCount,
      setLivePostData,
      liveContests
    );
    fetchData(
      upContestCount,
      upOffset,
      setUpPageCount,
      setUpComingPostData,
      upContests
    );
    fetchData(
      pastContestCount,
      pastOffset,
      setPastPageCount,
      setPastPostData,
      pastContests
    );
  }, [liveOffset, upOffset, pastOffset]);

  const scrollToElement = (classname) => {
    const element = document.querySelector(`.${classname}`);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  const [contestsData, setContestsData] = useState([{}]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const contestsResponse = await fetch(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/contests`
        );
        const contestsData = await contestsResponse.json();
        setContestsData(contestsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mt-16 bg-gray-950 pt-8 px-6 md:px-16 mb-4 pb-4">
      <div>
        <div className="flex justify-between align-middle">
          <div className="live_contest flex text-xl md:text-3xl lg:text-4xl  text-white ps-2 pt-4 items-center">
            {/* <GoDotFill className='text-xl mr-2 text-green-500' /> */}
            <SpinnerRoundFilled
              size={60}
              thickness={100}
              speed={60}
              color="rgba(9, 255, 99, 0.82)"
            />
            {/* <span className='underline underline-offset-8 leading-4'>Live</span> Contest */}
            Live Contests
          </div>
        </div>

        <div>
          <ContestNav />
        </div>

        <div className="problem-list h-fit md:mt-4 border border-slate-900 live px-2 py-1 overflow-y-scroll max-[493px]:mt-4">
          {livePostData}
        </div>

        <div className="pagination w-fit flex justify-center m-auto mt-[4%]">
          <ReactPaginate
            previousLabel={
              <MdOutlineKeyboardDoubleArrowLeft className="inline-block" />
            }
            nextLabel={
              <MdOutlineKeyboardDoubleArrowRight className="inline-block" />
            }
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={livePageCount}
            marginPagesDisplayed={0}
            pageRangeDisplayed={0}
            onPageChange={(selectedPage) => {
              setLiveOffset(selectedPage.selected * perPage);
              setLiveCurrentPage(selectedPage.selected);
              scrollToElement("live_contest");
            }}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            previousLinkClassName={`border px-4 py-2 ${
              liveCurrentPage === 0 ? "pointer-events-none opacity-50" : ""
            }`}
            nextLinkClassName={`border px-4 py-2 ${
              liveCurrentPage === livePageCount - 1
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          />
        </div>
      </div>

      <div className="md:mt-6">
        <div className="up_contest flex justify-between align-middle items-center max-[493px]:mt-4">
          <div className="flex text-xl md:text-3xl lg:text-4xl text-white pt-8 ps-2 items-center">
            {/* <span className='underline underline-offset-8 leading-4'>Live</span> Contest */}
            <IoMdAlarm className="text-3xl mr-2 text-yellow-600" />
            Upcoming Contests
          </div>
        </div>

        <div></div>
        <ContestNav />

        <div className="problem-list h-fit upcoming border border-slate-900 mt-4 px-2 py-2 overflow-y-scroll max-[493px]:mt-4">
          {upComingPostData}
        </div>

        <div className="pagination w-fit flex justify-center m-auto mt-[4%]">
          <ReactPaginate
            previousLabel={
              <MdOutlineKeyboardDoubleArrowLeft className="inline-block" />
            }
            nextLabel={
              <MdOutlineKeyboardDoubleArrowRight className="inline-block" />
            }
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={upPageCount}
            marginPagesDisplayed={0}
            pageRangeDisplayed={0}
            onPageChange={(selectedPage) => {
              setUpOffset(selectedPage.selected * perPage);
              setUpCurrentPage(selectedPage.selected);
              scrollToElement("up_contest");
            }}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            previousLinkClassName={`border px-4 py-2 ${
              upCurrentPage === 0 ? "pointer-events-none opacity-50" : ""
            }`}
            nextLinkClassName={`border px-4 py-2 ${
              upCurrentPage === upPageCount - 1
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          />
        </div>
      </div>

      <div className="md:mt-6">
        <div className="past_contest flex text-xl md:text-3xl lg:text-4xl text-white pt-8 ps-2 items-center max-[493px]:mt-4">
          {/* <span className='underline underline-offset-8 leading-4'>Live</span> Contest */}
          <GoDotFill className="text-xl mr-2 text-red-600" />
          Past Contests
        </div>

        <ContestNav />

        <div className="problem-list h-fit past border border-slate-900 mt-4 px-2 py-2 overflow-y-scroll max-[493px]:mt-4">
          {pastPostData}
        </div>
        <div className="pagination w-fit flex justify-center m-auto mt-[4%]">
          <ReactPaginate
            previousLabel={
              <MdOutlineKeyboardDoubleArrowLeft className="inline-block" />
            }
            nextLabel={
              <MdOutlineKeyboardDoubleArrowRight className="inline-block" />
            }
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pastPageCount}
            marginPagesDisplayed={0}
            pageRangeDisplayed={0}
            onPageChange={(selectedPage) => {
              setPastOffset(selectedPage.selected * perPage);
              setPastCurrentPage(selectedPage.selected);
              scrollToElement("past_contest");
            }}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            previousLinkClassName={`border px-4 py-2 ${
              pastCurrentPage === 0 ? "pointer-events-none opacity-50" : ""
            }`}
            nextLinkClassName={`border px-4 py-2 ${
              pastCurrentPage === pastPageCount - 1
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default ContestList;
