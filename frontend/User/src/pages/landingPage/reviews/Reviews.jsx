import React from "react";
import WorldMap from "../../../assets/worldMap.png";
import Priyansh from "../../../assets/piyush.png";
import Abhishek from "../../../assets/abhishek.png";
import Striver from "../../../assets/striver.png";
import Netflix from "../../../assets/netflix.png";
import Discord from "../../../assets/discord.png";
import Spotify from "../../../assets/spotify.png";
import Amazon from "../../../assets/amazon.png";

const Review = () => {
  return (
    <div className="review-container bg-slate-950 my-6 lg:my-8 pt-3 lg:pt-6 px-4 w-screen">
      <div className="review-heading text-center justify-center mx-auto pt-5 text-xl md:text-3xl lg:text-5xl font-semibold text-white">
        Trusted by Thousands of <br /> Working Professionals and Students
      </div>
      <div className="world-map w-full mt-10 flex justify-center">
        <img
          src={WorldMap}
          alt=""
          draggable="false"
          className="w-11/12 object-cover py-6"
        />
      </div>
      <div className="user-reviews flex flex-col lg:flex-row items-center justify-evenly mt-8 py-1 px-7 pb-4">
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-4">
              <div class="lg:w-1/3 lg:mb-0 mb-6 p-4">
                <div class="h-full text-center bg-white px-2 py-2 rounded-xl shadow-lg shadow-[#2b3241]">
                  <img
                    alt="testimonial"
                    class="w-20 h-20 mb-5 mt-2 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100 ring-2 ring-zinc-800"
                    src={Priyansh}
                  />
                  <p class="leading-relaxed text-gray-900 font-semibold">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Earum corporis ad vitae quas eos. Maxime incidunt, officia,
                    distinctio dolor maiores autem reiciendis quae voluptatum,
                    inventore accusantium rem quas facilis facere!
                  </p>
                  <span class="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                  <h2 class="text-gray-900 font-medium title-font tracking-wider text-base">
                    PRIYANSH AGGARWAL
                  </h2>
                  <p class="text-gray-700">Senior Product Designer</p>
                </div>
              </div>
              <div class="lg:w-1/3 lg:mb-0 mb-6 p-4">
                <div class="h-full text-center bg-white px-2 py-2 rounded-xl shadow-lg shadow-[#2b3241]">
                  <img
                    alt="testimonial"
                    class="w-20 h-20 mb-5 mt-2 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100 ring-2 ring-zinc-800"
                    src={Abhishek}
                  />
                  <p class="leading-relaxed text-gray-900 font-semibold">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Earum corporis ad vitae quas eos. Maxime incidunt, officia,
                    distinctio dolor maiores autem reiciendis quae voluptatum,
                    inventore accusantium rem quas facilis facere!
                  </p>
                  <span class="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                  <h2 class="text-gray-900 font-medium title-font tracking-wider text-base">
                    ABHISHEK SAINI
                  </h2>
                  <p class="text-gray-700">UI Develeoper</p>
                </div>
              </div>
              <div class="lg:w-1/3 lg:mb-0 p-4">
                <div class="h-full text-center bg-white px-2 py-2 rounded-xl shadow-lg shadow-[#2b3241]">
                  <img
                    alt="testimonial"
                    class="w-20 h-20 mb-5 mt-2 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100 ring-2 ring-zinc-800"
                    src={Striver}
                  />
                  <p class="leading-relaxed text-gray-900 font-semibold">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Aperiam, maiores vitae adipisci, a iusto cumque voluptas ab
                    iure voluptates sint possimus dolorem ipsa qui quibusdam
                    error odit reiciendis alias voluptatem?
                  </p>
                  <span class="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                  <h2 class="text-gray-900 font-medium title-font tracking-wider text-base">
                    STRIVER
                  </h2>
                  <p class="text-gray-700">CTO</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <div className='users flex flex-col items-center w-fit lg:w-fit bg-white rounded-2xl border-2 border-red-500 px-4 align-baseline'>
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
                </div> */}

        {/* <div className='users flex flex-col items-center w-fit md:w-1/3 lg:w-fit bg-white rounded-2xl border-2 border-red-500 px-4 align-baseline'>
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
                </div> */}
      </div>

      <div className="company-reviews flex justify-evenly py-8 px-5">
        <img
          src={Netflix}
          alt=""
          className="netflix-img w-[20%] h-[4%] md:w-[15%] md:h-[2%] pt-4"
          draggable="false"
        />
        <img
          src={Amazon}
          alt=""
          className="amazon-img w-[20%] h-[4%] md:w-[15%] md:h-[2%]"
          draggable="false"
        />
        <img
          src={Discord}
          alt=""
          className="discord-img w-[20%] h-[4%] md:w-[15%] md:h-[2%] pt-4"
          draggable="false"
        />
        <img
          src={Spotify}
          alt=""
          className="spotify-img w-[20%] h-[4%] md:w-[15%] md:h-[2%] pt-4"
          draggable="false"
        />
      </div>
    </div>
  );
};

export default Review;