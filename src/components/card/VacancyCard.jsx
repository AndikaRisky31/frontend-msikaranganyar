import React from "react";
import { CardFooter,Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaRegEdit } from "react-icons/fa";
import ListPlace from "../item/ListPlace";
import { formatDate, getTime } from "../../utils/helper";

const VacancyCard = ({ VacancyData,showButton = false ,handleDeleteVacancy}) => {
  const navigate = useNavigate();
  const toDetailVacancy = () => {
    navigate(`/lowongan/${VacancyData.id_vacancy}`)
  };  
  const toEditVacancy = (id_announcement)=>{
    navigate(`/dashboard/lowongan/addUpdate/${id_announcement}`)
  }
  return (
    <>
      <div className={`shadow-lg p-10 text-center flex flex-col justify-between w-[270px] bg-white ${showButton ? 'h-[300px]': 'h-[200px]'}`} >
        <div onClick={toDetailVacancy} className="cursor-pointer">
          <div>
            <h4 className="font-semibold">{VacancyData.title}</h4>         
          </div>
          <div className="text-center flex items-end justify-center">
            <h1 className="text-5xl text-teal-500">
              {VacancyData.kuota}
            </h1>
            <span className="font-medium text-xl">Orang</span>
          </div>
          <div className="text-start pt-2">
            <ListPlace dataListPlace={VacancyData.place}/>
          </div>
        </div>
        {showButton ? (
          <div>
            <h1 className="text-gray-500 text-start">{getTime(VacancyData.closing_date)}</h1>
            <h1 className="text-gray-500 text-start">{formatDate(VacancyData.closing_date,true)}</h1>
          <CardFooter className="flex items-center justify-end mt-auto">
            <Button color="red" className="ml-2" onClick={() => handleDeleteVacancy(VacancyData.id_vacancy)}>
              <FaTrash size={8} />
            </Button>
            <Button color="green" className="ml-2" onClick={() => toEditVacancy(VacancyData.id_vacancy)}>
              <FaRegEdit size={8} />
            </Button>
          </CardFooter>
          </div>
        ) : (
          <></>
        )}

        </div>
    </>
  );
};

export default VacancyCard;
