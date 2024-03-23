import React from "react";

const TeamCard = (val) => {
  return (
    <>
      <div className="relative shadow-md group overflow-hidden h-[350px] w-[250px]">
        <img 
          src={process.env.REACT_APP_IMAGE_URL + val.val.imageURL} 
          alt="" 
          className="object-cover transition duration-500 transform group-hover:scale-105 w-full h-[75%]" 
        />
        <div className="absolute px-3 gap-3 inset-0 flex flex-col items-start justify-end bg-black bg-opacity-40 transition duration-500 opacity-0 group-hover:opacity-100">
          <i className="fab fa-facebook-f icon text-teal-500 my-1 transition duration-500 transform group-hover:scale-125"></i>
          <i className="fab fa-twitter icon text-teal-500 my-1 transition duration-500 transform group-hover:scale-125"></i>
          <i className="fab fa-instagram icon text-teal-500 my-1 transition duration-500 transform group-hover:scale-125"></i>
          <i className="fab fa-tiktok icon text-teal-500 my-1 transition duration-500 transform group-hover:scale-125"></i>
        </div>
        <div className="p-4 text-center transition duration-500">
          <h2 className=" font-semibold text-lg transition duration-500 group-hover:text-white">{val.val.name}</h2>
          <p className="text-sm text-gray-500 transition duration-500 group-hover:text-white">{val.val.job_title}</p>
        </div>
      </div>
    </>
  );
};

export default TeamCard;