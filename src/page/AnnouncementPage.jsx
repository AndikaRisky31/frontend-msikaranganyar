import React from "react";
import Heading from "../components/common/heading/Heading";
import { coursesCard } from "../dummydata";

const AnnouncementPage = () => {
  return (
    <section className="Announcement mx-auto pt-5 px-4 sm:px-10 md:px-20 lg:px-40">
      <Heading title="Pengumuman" subtitle="Apa yang baru?" link="#"/>
      <div className="grid grid-cols-1 gap-2">
        {coursesCard.map((item, index) => (
          <div className={`flex flex-row w-3/4 md:w-2/3 md:min-h-32  ${(index + 1) % 2 === 1 ? "mr-[25%] bg-sky-200 text-black" : "ml-auto bg-teal-600 text-white"}`}>
            <div className="p-2">
              <h1 className="font-bold">{item.coursesName}</h1>
              <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea accusamus, atque consectetur sapiente tenetur omnis?</h2>
            </div>
          </div>
        ))} 
      </div>
    </section>
  );
};

export default AnnouncementPage;