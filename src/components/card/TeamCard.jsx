import React from "react";

const TeamCard = (val) => {
  const data = val.val
  return (
    <>
      <div className="shadow-md overflow-hidden h-[425px] aspect-[9/16]">
        <div className="h-3/4">
          <img 
            src={process.env.REACT_APP_IMAGE_URL + data.imageURL} 
            alt="" 
            className="w-full object-cover object-top h-full" 
          />
        </div>
        <div className="text-center h-1/4 py-2">
          <h2 className="font-semibold text-lg">{data.name}</h2>
          <p className="text-sm text-gray-700">{data.job_title}</p>
          <p className="text-sm text-gray-500">{data.penempatan}</p>
        </div>
      </div>
    </>
  );
};

export default TeamCard;