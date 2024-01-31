import React, { useState, useEffect } from 'react'
import UserProfile from './UserProfile'
import Problem from '../../problems/problem/Problem';
import Submission from './Submission';
import { BsCodeSlash } from "react-icons/bs";
import ReactPaginate from 'react-paginate';
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

const ProfilePage = () => {

    

    const [offset, setOffset] = useState(0);

    // Number of items per page
    const [perPage] = useState(10);

    // current page number
    const [currentPage, setCurrentPage] = useState(0);

    // number of items per page
    const [pageCount, setPageCount] = useState(0);

    // posting data
    const [postData, setPostData] = useState([]);
    const renderedSubmission = [];

    const receivedData = () => {
        
    const totalSubmission = 15;

        for (let i = 1; i <= totalSubmission; i++) {
                if (i % 2 === 0) {
                    renderedSubmission.push(<Submission key={i} background="bg-gray-800" />);
                    // renderedProblems.push(<hr />);
                } else {
                    renderedSubmission.push(<Submission key={i} background="bg-gray-700" />);
                    // renderedProblems.push(<hr />);
                }
            }

        const slice = renderedSubmission.slice(offset, offset + perPage);
        const postData = slice.map((element, index) => (
            <p key={index}>{element}</p>
        ));
        setPageCount(Math.ceil(renderedSubmission.length / perPage));
        setPostData(postData);
    };

    const handlePageClick = (selectedPage) => {
        const newOffset = selectedPage * perPage;
        setCurrentPage(selectedPage);
        setOffset(newOffset);
        scrollToElement("submission-list");
    };
    const scrollToElement = (classname) => {
        const element = document.querySelector(`.${classname}`);

        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        receivedData();
    }, [offset]);



    // const renderedSubmission = [];
    // const totalSubmission = 5;

    // for (let i = 1; i <= totalSubmission; i++) {
    //     if (i % 2 === 0) {
    //         renderedSubmission.push(<Submission key={i} background="bg-gray-800" />);
    //         // renderedProblems.push(<hr />);
    //     } else {
    //         renderedSubmission.push(<Submission key={i} background="bg-gray-700" />);
    //         // renderedProblems.push(<hr />);
    //     }
    // }


    return (
        // 2d2e35
        <div className='mt-16 mb-10 bg-[gray-950] flex flex-col md:flex-row md:ml-[2%] '>
            <div className='w-[95%] md:w-[27%] ml-[1%] md:ml-6 mt-2'>
                <UserProfile />
            </div>
            <div className='w-[95%] md:w-[64%] flex flex-col  ml-[3%] '>
                <div className='h-fit mt-[1%] grid grid-cols-1 lg:grid-cols-2 gap-[2%]  py-4 '>
                    <div className='w-full lg:w-auto bg-[#151b2d94] border-[#151b2d94]  p-3 text-white rounded-md shadow-lg shadow-[#14171e]'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit in enim error nesciunt sit minus, aliquam reprehenderit itaque quo explicabo quos quas sequi, repudiandae quis at ab maxime. Nostrum pariatur nulla, earum dolorum at iusto ullam placeat expedita inventore omnis autem libero atque doloremque, commodi reiciendis sed distinctio? Qui, ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque error illo deserunt quisquam? Corporis unde quam molestias ex similique in? Lorem
                    </div>
                    <div className='w-full lg:w-auto bg-[#151b2d94] border border-[#151b2d94] p-3 text-white rounded-md shadow-lg shadow-[#14171e]'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit in enim error nesciunt sit minus, aliquam reprehenderit itaque quo explicabo quos quas sequi, repudiandae quis at ab maxime. Nostrum pariatur nulla, earum dolorum at iusto ullam placeat expedita inventore omnis autem libero atque doloremque, commodi reiciendis sed distinctio? Qui, ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque error illo deserunt quisquam? Corporis unde quam molestias ex similique in? Lorem
                    </div>
                </div>
                <div className='mt-2 w-full border border-[#151b2d94] p-1 bg-[#151b2d94] rounded-md shadow-lg shadow-[#14171e]'>
                    <div className='border border-transparent rounded-md my-[1%] text-xl px-3 py-1 bg-[#181f29] shadow-sm shadow-[#31343b] inline-flex items-center mb-4 ml-2'>
                        <BsCodeSlash className='pr-1 text-2xl text-green-400' />
                        <span className='pl-1 text-gray-300'>Submissions</span>
                    </div>
                    <div className='mx-[1%] submission-list '>
                        {/* <Submission />
                        <Submission />
                        <Submission />
                        <Submission /> */}
                        {postData}
                    </div>
                    <div className="pagination w-fit flex justify-center m-auto my-[2%]">

                        <ReactPaginate
                            // Double click on Prev and Next Buttons will move to first and last page respectively.
                            previousLabel={<MdOutlineKeyboardDoubleArrowLeft className="inline-block" />}
                            nextLabel={<MdOutlineKeyboardDoubleArrowRight className="inline-block" />}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            marginPagesDisplayed={0}
                            pageRangeDisplayed={0}
                            onPageChange={(selectedPage) => handlePageClick(selectedPage.selected)}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                            previousLinkClassName={`border px-4 py-2 ${currentPage === 0 ? 'pointer-events-none opacity-50' : ''}`}
                            nextLinkClassName={`border px-4 py-2 ${currentPage === pageCount - 1 ? 'pointer-events-none opacity-50' : ''}`}
                        />
                    </div>
                </div>
            </div>

        </div>

    )
}

export default ProfilePage