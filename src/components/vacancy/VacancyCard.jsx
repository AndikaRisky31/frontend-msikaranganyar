import React from "react";

const VacancyCard = ({ data }) => {
  const handleClick = () => {
    // Membuka URL di tab baru saat tombol diklik
    window.open(data.apply_url, '_blank');
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

export default VacancyCard;
