
import React from "react";
import WorldMap from "../../../assets/worldMap.png";
import Priyansh from "../../../assets/piyush.png";
import Star from "../../../assets/star.png";
import Netflix from "../../../assets/netflix.png";
import Discord from "../../../assets/discord.png";
import Spotify from "../../../assets/spotify.png";
import Amazon from "../../../assets/amazon.png";

const Review = () => {
  return (
    <div className="review-container bg-gray-950 my-6 lg:my-8 pt-3 lg:pt-6 px-4 md:px-4 w-screen">
      <div className="review-heading text-center justify-center mx-auto pt-5 text-xl md:text-3xl lg:text-5xl font-semibold text-white">
        Trusted by Thousands of <br /> Working Professionals and Students
      </div>
      <div className="world-map w-full mt-10 flex justify-center">
        <img
          src={WorldMap}
          alt=""
          draggable="false"
          className="w-[94.666667%] object-cover py-6"
        />
      </div>
      <div className="user-reviews flex flex-col lg:flex-row items-center justify-evenly mt-8 py-1 md:px-7 pb-4">
        <section class="text-gray-600 body-font">
          <div class="container px-5  mx-auto">
            <div class="flex flex-wrap -m-4">
              <div class="lg:w-1/3 lg:mb-0 mb-6 p-3">
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
                  <span class="inline-block h-1 w-10 rounded bg-gray-700 mt-6 mb-4"></span>
                  <h2 class="text-gray-900 font-medium title-font tracking-wider text-base">
                    PRIYANSH AGARWAL
                  </h2>
                  <p class="text-gray-700">Software Engineer @Google</p>
                </div>
              </div>
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
                  <span class="inline-block h-1 w-10 rounded bg-gray-700 mt-6 mb-4"></span>
                  <h2 class="text-gray-900 font-medium title-font tracking-wider text-base">
                    ABHISHEK SAINI
                  </h2>
                  <p class="text-gray-700">SWE @google</p>
                </div>
              </div>
              <div class="lg:w-1/3 lg:mb-0 p-4">
                <div class="h-full text-center bg-white px-2 py-2 rounded-xl shadow-lg shadow-[#2b3241]">
                  <img
                    alt="testimonial"
                    class="w-20 h-20 mb-5 mt-2 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100 ring-2 ring-zinc-800"
                    src={Priyansh}
                  />
                  <p class="leading-relaxed text-gray-900 font-semibold">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Aperiam, maiores vitae adipisci, a iusto cumque voluptas ab
                    iure voluptates sint possimus dolorem ipsa qui quibusdam
                    error odit reiciendis alias voluptatem?
                  </p>
                  <span class="inline-block h-1 w-10 rounded bg-gray-700 mt-6 mb-4"></span>
                  <h2 class="text-gray-900 font-medium title-font tracking-wider text-base">
                    STRIVER
                  </h2>
                  <p class="text-gray-700">SWE @Google</p>
                </div>
              </div>
            </div>
          </div>
        </section>
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
