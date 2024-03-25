import React from "react";

const TeamCard = (val) => {
  const data = val.val
  return (
    <>
      <div className="shadow-md overflow-hidden h-[390px] max-w-[270px] min-w-[170px]">
        <img 
          src={process.env.REACT_APP_IMAGE_URL + data.imageURL} 
          alt="" 
          className="object-cover object-top w-full h-[75%]" 
        />
        <div className="p-4 text-center ">
          <h2 className="font-semibold text-lg">{data.name}</h2>
          <p className="text-sm text-gray-500">{data.job_title}</p>
        </div>
      </div>
    </>
  );
};

export default TeamCard;