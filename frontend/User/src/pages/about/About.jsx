
import React from "react";
import { Link } from "react-router-dom";
import Kevin from "../../assets/kevin_img.jpg";
import Rushi from "../../assets/rushi_image.jpg";
import { TbWorld } from "react-icons/tb";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const About = () => {
  return (
    <div className="md:my-12">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-3xl font-medium title-font my-1 text-white">
              OUR TEAM
            </h1>
          </div>
          <div className="flex flex-wrap justify-center -mt-12">
            <div className="p-4 bg-[#c5c5c5bd] md:mx-6 md:w-[40%] my-3 rounded-md shadow-lg shadow-[#6a7185] ">
              <div className="h-full flex flex-col items-center text-center">
              <div className="max-[360px]:w-40 max-[360px]:h-40 w-60 h-60 lg:w-80 lg:h-80 md:w-60 md:h-60 rounded-full overflow-hidden mb-4 ring-1 ring-gray-600">
                  <img
                    alt="team"
                    className="w-full h-full object-cover object-center backdrop-blur-lg"
                    src={Kevin}
                  />
                </div>
                <div className="w-[70%] ">
                  <h2 className="title-font font-medium text-2xl md:text-xl lg:text-2xl text-gray-900">
                    Kevin Tamakuwala
                  </h2>
                  <h3 className="text-gray-800 font-semibold mb-3">
                     Software Engineer
                  </h3>
                  <p className="mb-4 text-gray-900 text-md ">
                    Specialist @Codeforces | 4 stars @Codechef | Knight @Leetcode | Ex - SDE Intern @Trakky | React Js | Java | Spring Boot | AWS
                  </p>
                  <span className="inline-flex mt-4">
                    <Link
                      to="https://kevintamakuwala.netlify.app/"
                      className="text-gray-800 text-3xl"
                      target="_blank"
                    >
                      <TbWorld />
                    </Link>
                    <Link
                      to="https://www.linkedin.com/in/kevintamakuwala/"
                      className="ml-2 text-blue-800 text-3xl"
                      target="_blank"
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      to="https://github.com/kevintamakuwala/"
                      className="ml-2 text-black text-3xl"
                      target="_blank"
                    >
                      <FaGithub />
                    </Link>
                    <a
                      href="mailto:kevintamakuwala16@gmail.com"
                      className="ml-2 text-red-700 text-3xl"
                      target="_blank"
                    >
                      <SiGmail />
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#c5c5c5bd] md:mx-6 md:w-[40%] my-3 rounded-md shadow-lg shadow-[#6a7185] ">
              <div className="h-full flex flex-col items-center text-center">
                {/* <img
                  alt="team"
                  className="flex-shrink-0 w-60 h-60 lg:w-80 lg:h-80 md:w-80 md:h-64 rounded-full object-cover object-center mb-4 ring-1 ring-gray-600"
                  src={Rushi}
                /> */}
                <div className="max-[360px]:w-40 max-[360px]:h-40 w-60 h-60 lg:w-80 lg:h-80 md:w-60 md:h-60 rounded-full overflow-hidden mb-4 ring-1 ring-gray-600">
                  <img
                    alt="team"
                    className="w-full h-full object-cover object-center backdrop-blur-lg"
                    src={Rushi}
                  />
                </div>
                <div className="w-[70%]">
                  <h2 className="title-font font-medium text-2xl md:text-xl lg:text-2xl text-gray-900">
                    Rushi Sureja
                  </h2>
                  <h3 className="text-gray-800 font-semibold mb-3">
                    Software Developer
                  </h3>
                  <p className="mb-4 text-gray-900 text-md">
                    4 star @Hackerrank (C++) | 5 star @Hackerrank (Problem
                    Solving) | Python | React Js | Java | Spring Boot | C++
                  </p>
                  <span className="inline-flex mt-4">
                    <Link
                      to="https://www.linkedin.com/in/rushi-sureja-26484a23a/"
                      className="ml-2 text-blue-800 text-3xl"
                      target="_blank"
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      to="https://github.com/Sureja-Rushi/"
                      className="ml-2 text-black text-3xl"
                      target="_blank"
                    >
                      <FaGithub />
                    </Link>
                    <a
                      href="mailto:rushisureja48@gmail.com"
                      className="ml-2 text-red-700 text-3xl"
                      target="_blank"
                    >
                      <SiGmail />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
