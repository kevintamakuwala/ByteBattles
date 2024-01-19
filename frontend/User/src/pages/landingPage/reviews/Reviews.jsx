// import React from 'react'
// import "./Reviews.css"
// import WorldMap from "../../../assets/worldMap.png"
// import Priyansh from "../../../assets/piyush.png"
// import Abhishek from "../../../assets/abhishek.png"
// import Striver from "../../../assets/striver.png"
// import Star from "../../../assets/star.png"
// import Netflix from "../../../assets/netflix.png"
// import Discord from "../../../assets/discord.png"
// import Spotify from "../../../assets/spotify.png"
// import Amazon from "../../../assets/amazon.png"

// const Review = () => {
//     return (
//         <div className='review-container'>
//             <div className='review-heading'>
//                 Trusted by Thousands of <br />
//                 Working Professionals and Students
//             </div>
//             <div className='world-map'>
//                 <img src={WorldMap} alt="" srcset="" draggable='false' />
//             </div>
//             <div className='user-reviews'>
//                 <div className='users'>
//                     <div className='user-info'>
//                         <img src={Priyansh} alt="" className='user-img' draggable='false' />
//                         <div className='user-workarea'>
//                             <h3>Priyansh Agarwal</h3>
//                             <p>Zomato, Gurgaon</p>
//                         </div>
//                         <img src={Star} alt="" className='star-img' draggable='false' />
//                         <p className='user-rating'>4.7</p>
//                     </div>
//                     <div className='review-description'>
//                         <p className='review-details'>
//                             “Wow... I am very happy to use ByteBattles, it turned out to be more than my expectations. Very good platform for acing CP and Interviews.”
//                         </p>
//                     </div>
//                 </div>

//                 <div className='users'>
//                     <div className='user-info'>
//                         <img src={Abhishek} alt="" className='user-img' draggable='false' />
//                         <div className='user-workarea'>
//                             <h3>Abhishek Saini</h3>
//                             <p>Google, Bangalore</p>
//                         </div>
//                         <img src={Star} alt="" className='star-img' draggable='false' />
//                         <p className='user-rating'>4.5</p>
//                     </div>
//                     <div className='review-description'>
//                         <p className='review-details'>
//                             “Wow... I am very happy to use ByteBattles, it turned out to be more than my expectations. Very good platform for acing CP and Interviews.”
//                         </p>
//                     </div>
//                 </div>

//                 <div className='users'>
//                     <div className='user-info'>
//                         <img src={Striver} alt="" className='user-img' draggable='false' />
//                         <div className='user-workarea'>
//                             <h3>Striver</h3>
//                             <p>Google, Warsaw</p>
//                         </div>
//                         <img src={Star} alt="" className='star-img' draggable='false' />
//                         <p className='user-rating'>4.6</p>
//                     </div>
//                     <div className='review-description'>
//                         <p className='review-details'>
//                             “Wow... I am very happy to use ByteBattles, it turned out to be more than my expectations. Very good platform for acing CP and Interviews.”
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <div className='company-reviews'>
//                 <img src={Netflix} alt="" className='netflix-img' draggable='false' />
//                 <img src={Amazon} alt="" className='amazon-img' draggable='false' />
//                 <img src={Discord} alt="" className='discord-img' draggable='false' />
//                 <img src={Spotify} alt="" className='spotify-img' draggable='false' />
//             </div>

//         </div>
//     )
// }

// export default Review   



import React from 'react';
import WorldMap from '../../../assets/worldMap.png';
import Priyansh from '../../../assets/piyush.png';
import Abhishek from '../../../assets/abhishek.png';
import Striver from '../../../assets/striver.png';
import Star from '../../../assets/star.png';
import Netflix from '../../../assets/netflix.png';
import Discord from '../../../assets/discord.png';
import Spotify from '../../../assets/spotify.png';
import Amazon from '../../../assets/amazon.png';

const Review = () => {
    return (
        <div className='review-container bg-slate-950 my-6 lg:my-8 pt-3 lg:pt-6 px-4 w-screen'>
            <div className='review-heading text-center justify-center mx-auto pt-5 text-xl md:text-3xl lg:text-5xl font-semibold text-white'>
                Trusted by Thousands of <br /> Working Professionals and Students
            </div>
            <div className='world-map w-full mt-10 flex justify-center'>
                <img src={WorldMap} alt='' draggable='false' className='w-11/12 object-cover py-6'/>
            </div>
            <div className='user-reviews flex flex-col lg:flex-row items-center justify-evenly mt-8 py-1 px-7 pb-4'>
                <div className='users flex flex-col items-center w-fit lg:w-fit bg-white rounded-2xl border-2 border-red-500 px-4 align-baseline'>
                    <div className='user-info flex justify-center text-start pt-8 px-4 '>
                        <img src={Priyansh} alt='' className='user-img w-12 h-12 mr-4' draggable='false' />
                        <div className='user-workarea'>
                            <h3 className='m-0 font-bold'>Priyansh Agarwal</h3>
                            <p>Zomato, Gurgaon</p>
                        </div>
                        <img src={Star} alt='' className='star-img w-6 h-6 mt-2 ml-4 mr-2' draggable='false' />
                        <p className='user-rating m-0 font-medium mt-2 text-base lg:text-lg'>4.7</p>
                    </div>
                    <div className='review-description w-80 flex text-start justify-center m-auto'>
                        <p className='review-details text-sm lg:text-[1.1rem] ps-4 leading-1.5 mt-4 mb-4 font-semibold'>
                            “Wow... I am very happy to use ByteBattles, it turned out to be more than my expectations. Very good
                            platform for acing CP and Interviews.”
                        </p>
                    </div>
                </div>

                <div className='users flex flex-col items-center w-fit md:w-1/3 lg:w-fit bg-white rounded-2xl border-2 border-red-500 px-4 align-baseline'>
                    <div className='user-info flex justify-center text-start pt-8 px-4 '>
                        <img src={Priyansh} alt='' className='user-img w-12 h-12 mr-4' draggable='false' />
                        <div className='user-workarea'>
                            <h3 className='m-0 font-bold'>Priyansh Agarwal</h3>
                            <p>Zomato, Gurgaon</p>
                        </div>
                        <img src={Star} alt='' className='star-img w-6 h-6 mt-2 ml-4 mr-2' draggable='false' />
                        <p className='user-rating m-0 font-medium mt-2 text-base lg:text-lg'>4.7</p>
                    </div>
                    <div className='review-description w-80 flex text-start justify-center m-auto'>
                        <p className='review-details text-sm lg:text-[1.1rem] ps-4 leading-1.5 mt-4 mb-4 font-semibold'>
                            “Wow... I am very happy to use ByteBattles, it turned out to be more than my expectations. Very good
                            platform for acing CP and Interviews.”
                        </p>
                    </div>
                </div>
                
                <div className='users flex flex-col items-center w-fit md:w-1/3 lg:w-fit bg-white rounded-2xl border-2 border-red-500 px-4 align-baseline'>
                    <div className='user-info flex justify-center text-start pt-8 px-4 '>
                        <img src={Priyansh} alt='' className='user-img w-12 h-12 mr-4' draggable='false' />
                        <div className='user-workarea'>
                            <h3 className='m-0 font-bold'>Priyansh Agarwal</h3>
                            <p>Zomato, Gurgaon</p>
                        </div>
                        <img src={Star} alt='' className='star-img w-6 h-6 mt-2 ml-4 mr-2' draggable='false' />
                        <p className='user-rating m-0 font-medium mt-2 text-base lg:text-lg'>4.7</p>
                    </div>
                    <div className='review-description w-80 flex text-start justify-center m-auto'>
                        <p className='review-details text-sm lg:text-[1.1rem] ps-4 leading-1.5 mt-4 mb-4 font-semibold'>
                            “Wow... I am very happy to use ByteBattles, it turned out to be more than my expectations. Very good
                            platform for acing CP and Interviews.”
                        </p>
                    </div>
                </div>
                
            </div>

            <div className='company-reviews flex justify-evenly py-8 px-5'>
                <img src={Netflix} alt='' className='netflix-img w-[20%] h-[4%] md:w-[15%] md:h-[2%] pt-4' draggable='false' />
                <img src={Amazon} alt='' className='amazon-img w-[20%] h-[4%] md:w-[15%] md:h-[2%]' draggable='false' />
                <img src={Discord} alt='' className='discord-img w-[20%] h-[4%] md:w-[15%] md:h-[2%] pt-4' draggable='false' />
                <img src={Spotify} alt='' className='spotify-img w-[20%] h-[4%] md:w-[15%] md:h-[2%] pt-4' draggable='false' />
            </div>
        </div>
    );
};

export default Review;
