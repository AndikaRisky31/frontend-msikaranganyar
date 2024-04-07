// InterviewCard.js
import React from 'react';
import { CardFooter,Button } from '@material-tailwind/react';
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { useHistory } from 'react-router-dom';


const InterviewCard = ({ interview,handleDeleteInterview,showButton=false }) => {
  const history = useHistory()

  const toEditInterview = (id_schedule_interview) => {
    history.push(`/dashboard/wawancara/addUpdate/${id_schedule_interview}`)
  }
  const toInterviewPage = () =>{
    history.push(`/wawancara/${interview.id_schedule_interview}`)
  }

  return (
    <div className="snap-start mx-2 flex-shrink-0 w-52 cursor-pointer">
      <div onClick={() => toInterviewPage()}>
      <h1 className="font-bold text-xl">{interview.title}</h1>
      <h2 className="text-gray-500 text-justify">{interview.description}</h2>
      </div>
      <CardFooter className={`flex items-center justify-end mt-auto ${showButton ? '': 'hidden'}`}>
        <Button color="red" className="ml-2" onClick={() => handleDeleteInterview(interview.id_schedule_interview)}>
        <FaTrash size={8} />
        </Button>
        <Button color="green" className="ml-2" onClick={() => toEditInterview(interview.id_schedule_interview)}>
        <FaRegEdit size={8} />
        </Button>
      </CardFooter>
    </div>
  );
}

export default InterviewCard;
