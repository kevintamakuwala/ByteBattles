import React from 'react'
import Home from './home/HomeSection'
import Purpose from './purpose/Purpose'
import Review from './reviews/Reviews';
import Footer from '../../common/footerComponent/FooterComponent';
import Navbar from '../../common/navbar/Navbar';

const LandingPage = () => {
    return (
        <div className='overflow-x-hidden bg-slate-950 overflow-y-scroll w-[100vw]'>
            <Home />
            <Purpose />
            <Review />
        </div>
    )
}

export default LandingPage