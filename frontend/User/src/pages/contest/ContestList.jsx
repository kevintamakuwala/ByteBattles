import React, { useState } from 'react'
import Problem from '../../problems/problem/Problem'
import ContestNav from './ContestNav'
import Contest from './Contest'
import { GoDotFill } from "react-icons/go";
import { IoMdAlarm } from "react-icons/io";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ContestList = () => {

    const onClickHandle = () =>{
        toast.info("Contest will be soon...")
    }


    return (
        <div className='mt-16 bg-slate-950 pt-8 px-6 md:px-16 mb-4 pb-4'>
            <div className='flex justify-between align-middle'>
                <div className='flex text-xl md:text-3xl lg:text-4xl  text-white ps-2 pt-4 items-center'>
                    <GoDotFill className='text-xl mr-2 text-green-500' />
                    {/* <span className='underline underline-offset-8 leading-4'>Live</span> Contest */}
                    Live Contests
                </div>
                
            </div>

            <div>
            <ContestNav />
            </div>
            

            <div className='problem-list h-[21.55rem] live border rounded-lg border-slate-600 px-2 py-2 overflow-y-scroll max-[493px]:mt-4'>
                <Contest />
                <Contest />
                <Contest />
                <Contest />
                <Contest />
                <Contest />
            </div>

            <div className='flex justify-between align-middle items-center max-[493px]:mt-4'>
                <div className='flex text-xl md:text-3xl lg:text-4xl text-white pt-8 ps-2 items-center'>
                    {/* <span className='underline underline-offset-8 leading-4'>Live</span> Contest */}
                    <IoMdAlarm className='text-3xl mr-2 text-yellow-600' />
                    Upcoming Contests
                </div>
                
            </div>

            <div>

            </div>
            <ContestNav />

            <div className='problem-list h-[21.55rem] upcoming border rounded-lg border-slate-600 mt-4 px-2 py-2 overflow-y-scroll max-[493px]:mt-4'>
                <Contest value="disable" onClick={() =>{
                    toast.error("error...");
                }} />
                <Contest value="disable" />
                <Contest value="disable" />
                <Contest value="disable" />
                <Contest value="disable" />
                <Contest value="disable" />
            </div>

            <div className='flex text-xl md:text-3xl lg:text-4xl text-white pt-8 ps-2 items-center max-[493px]:mt-4'>
                {/* <span className='underline underline-offset-8 leading-4'>Live</span> Contest */}
                <GoDotFill className='text-xl mr-2 text-red-600' />
                Past Contests
            </div>

            <ContestNav />

            <div className='problem-list h-[21.55rem] past border rounded-lg border-slate-600 mt-4 px-2 py-2 overflow-y-scroll max-[493px]:mt-4'>
                <Contest value="hidden" />
                <Contest value="hidden" />
                <Contest value="hidden" />
                <Contest value="hidden" />
                <Contest value="hidden" />
                <Contest value="hidden" />
            </div>

        </div>
    )
}

export default ContestList