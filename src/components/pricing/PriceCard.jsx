import React from "react";
import { price } from "../../dummydata";

const PriceCard = ({ data }) => {
  const handleClick = () => {
    // Mengarahkan pengguna ke URL tertentu saat tombol diklik
    window.location.href = `${data.applyUrl}`;
  };
  return (
    <>
      <div className='items shadow'>
        <h4>{data.title}</h4>
        <h1>
          {data.VacancyPositions[0].availability}
          <span>Orang</span>
        </h1>
        <p>{data.qualification}</p>
        <button onClick={handleClick} className='outline-btn'>APPLY</button>
      </div>
    </>
  );
};

export default PriceCard;
