import React, { useState } from "react";
import UserProfile from "./UserProfile";
import Problem from "../../problems/problem/Problem";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("problem");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderedProblems = [];
  const totalProblems = 5;

  for (let i = 1; i <= totalProblems; i++) {
    if (i % 2 === 0) {
      renderedProblems.push(<Problem key={i} value="bg-gray-900" />);
      // renderedProblems.push(<hr />);
    } else {
      renderedProblems.push(<Problem key={i} value="bg-gray-800" />);
      // renderedProblems.push(<hr />);
    }
  }

  return (
    // 2d2e35
    <div className="mb-10 bg-[gray-950] flex">
      <div className="w-[30%] ml-6">
        <UserProfile />
      </div>
      <div className="w-[50%] flex flex-col mt-4">
        <div className="bg-red-500 h-[50%] ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
          corrupti aut consequuntur, aliquam illum nemo itaque culpa voluptatum
          enim ex iste sapiente cumque ab. Aut sint ex non. Veniam incidunt
          numquam reprehenderit ea impedit, nisi voluptatem mollitia tenetur
          excepturi facilis ab, modi assumenda qui fugit omnis eos quo hic odio
          nesciunt? Veritatis at facilis quidem, repudiandae molestias quaerat
          sequi quo ex provident dolorem temporibus quia aut inventore
          exercitationem necessitatibus quas error ducimus suscipit voluptatum
          possimus deleniti corporis recusandae ea hic? Maiores impedit sequi,
          reprehenderit eligendi repellat perspiciatis saepe atque a obcaecati?
          Necessitatibus earum nam, aut quo dignissimos commodi laudantium
          fugiat molestiae perferendis nihil, ea, praesentium in esse
          repudiandae eum dolore? Aspernatur a similique animi magni cupiditate
          repudiandae voluptatibus, delectus voluptatum aliquid est nulla ut
          iusto labore dolor dolorem eveniet corporis voluptate! Eveniet,
          voluptatibus cupiditate odit tempore minus cum! Numquam quas velit
          nesciunt. Incidunt minima labore voluptates nesciunt soluta! Corrupti
          quibusdam consequuntur quas nostrum nobis minus, accusamus eligendi
          voluptate, cum placeat consequatur temporibus ab culpa quidem debitis
          ad natus dolore ipsa iste tempore, atque vero provident facere
          numquam. Obcaecati veritatis ea accusantium amet enim dolor doloribus
          distinctio atque cupiditate tenetur commodi necessitatibus, voluptas
          minus corrupti ullam, eius totam nisi laborum doloremque iste rerum
          sequi pariatur. Esse quod reiciendis reprehenderit voluptates, ipsum
          nesciunt illo cumque dolore dolorem laboriosam maiores ratione quos
          praesentium est vel? Enim tempora odio totam quae explicabo eius optio
          libero dicta repudiandae. Praesentium sequi blanditiis aperiam dicta
          ipsam nobis suscipit laborum fugiat debitis, odio deleniti itaque
          maxime id commodi corrupti officia, totam repellat provident dolorem.
          Soluta odio laboriosam inventore beatae consectetur ex odit
          necessitatibus voluptatem perferendis. Culpa id impedit, iste
          voluptatem accusamus dolor quo. Ratione, nostrum cum dignissimos ab,
          corporis asperiores id tempore voluptate ipsa, magni fugit nam!
          Quaerat tempora modi rerum beatae obcaecati eius similique ratione qui
          dicta.
        </div>
        <div className="mt-16 w-full">
          <div className="flex">
            <button onClick={() => handleTabClick("problem")}>Problem</button>
            <button onClick={() => handleTabClick("submission")}>
              Submission
            </button>
          </div>

          {activeTab === "problem" && <div>{renderedProblems}</div>}

          {activeTab === "submission" && (
            <div>
              {/* Content for Submission tab */}
              <ul>
                <li>Submission 1</li>
                <li>Submission 2</li>
                {/* Add more submissions as needed */}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
