import React from "react";

const VacancyCard = ({ data }) => {
  const handleClick = () => {
    // Membuka URL di tab baru saat tombol diklik
    window.open(data.apply_url, '_blank');
  };  
  return (
    <>
      <div className='shadow-lg p-10 text-center flex flex-col justify-between w-[270px] h-[400px] '>
        <div>
          <h4 className="font-semibold">{data.title}</h4>         
        </div>
        <div className="text-center flex items-end justify-center">
          <h1 className="text-5xl text-teal-500">
            {data.VacancyPositions[0].availability}
          </h1>
          <span className="font-medium text-xl">Orang</span>
        </div>
        <div>
          <p>{data.qualification}</p>
        </div>
        <button onClick={handleClick} className='bg-teal-500 px-10 py-3 text-white hover:bg-teal-600 hover:shadow-md'>DETAIL</button>
      </div>
    </>
  );
};

export default VacancyCard;
