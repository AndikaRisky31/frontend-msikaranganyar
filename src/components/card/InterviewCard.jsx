// InterviewCard.js
import React from 'react';

const InterviewCard = ({ interview, onClick }) => {
  return (
    <div className="snap-start mx-2 flex-shrink-0 w-52 cursor-pointer" onClick={onClick}>
      <h1 className="font-bold text-xl">{interview.title}</h1>
      <h2 className="text-gray-500 text-justify">{interview.description}</h2>
    </div>
  );
}

export default InterviewCard;
