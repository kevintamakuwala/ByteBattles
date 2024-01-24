import React from 'react'
import { useLocation } from 'react-router-dom'
import Problem from '../../problems/problem/Problem'
import Timer from './Timer'

const ContestPage = () => {

    const location = useLocation();
    const attribute = location.state;


    return (
        <div className={`flex flex-col-reverse md:flex-row mt-16 justify-around ps-6 md:ps-16 bg-slate-950 mb-4`}>
            <div className='w-[100%] md:w-[60%] lg:w-[50%]'>
                <div className='pt-10 text-xl md:text-2xl lg:text-3xl text-gray-300 underline underline-offset-[12px]'>
                    Problems:
                </div>

                <div className='mr-[5%] md:mr-[2%] mt-8 md:mt-6 border border-slate-600 rounded-lg bg-slate-800 pt-4 px-2'>
                    <Problem value="hidden"/>
                    <Problem value="hidden"/>
                    <Problem value="hidden"/>
                    <Problem value="hidden"/>
                    <Problem value="hidden"/>
                </div>
            </div>

            <div className={`${attribute} max-md:mr-[5%] max-md:mt-4 md:w-fit text-center`}>
                <Timer />
            </div>

        </div>
    )
}

export default ContestPage