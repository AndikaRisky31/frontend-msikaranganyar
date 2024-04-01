import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatDate, getTime } from '../../utils/helper'
import ListPlace from "../../components/ListPlace";
import Heading from "../../components/common/heading/Heading";

const InterviewPage = () => {
  const { id_schedule } = useParams();
  const [content, setContent] = useState(null);

  const getScheduleById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/interview/${id_schedule}`
      );
      const data = response.data.data;
      setContent(data);
    } catch (error) {
      console.error('Failed to fetch vacancy', error);
    }
  };

  useEffect(() => {
    getScheduleById();
  }, [id_schedule]);

  return (
    <>
        {content && (
          <div className="mx-auto py-10 px-4 sm:px-6 md:px-20">
            <Heading title={content.title} subtitle="Jadwal Interview"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 mx-5 lg:mx-24">
              <div className="w-full sm:col-span-2 mb-5">
                <div className="flex">
                  <div className="min-w-[30%] md:w-1/4">
                    <p className="text-lg font-bold">Hari</p>
                  </div>
                  <div className="mr-3">
                    <p>:</p>
                  </div>
                  <div className="">
                    <p className="">{getTime(content.time_schedule,true,true)}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="min-w-[30%] md:w-1/4">
                    <p className="text-lg font-bold">Pukul</p>
                  </div>
                  <div className="mr-3">
                    <p>:</p>
                  </div>
                  <div className="">
                    <p className="">{formatDate(content.time_schedule,true,true)}</p>
                  </div>
                </div>
                <div className="flex mb-2">
                  <div className="min-w-[30%] md:w-1/4">
                    <p className="text-lg font-bold">Tempat</p>
                  </div>
                  <div className="mr-3">
                    <p>:</p>
                  </div>
                  <div className="">
                    <ListPlace dataListPlace={content.place}/>
                  </div>
                </div>
              </div>
              <div className="row-span-2">
                <h2 className="text-xl font-bold text-center m-3">Persyaratan</h2>
                <p className="text-lg whitespace-pre-line text-gray-500">{content.description}</p>
              </div>
              <div className="mt-10 sm:mt-0">
                <h2 className="text-xl font-bold text-center m-3">Daftar Peserta</h2>
                <div className="border border-black p-3">
                {content.Participants.map((item,index) => (
                  <div key={item.id_participant}>
                    <h4 className="text-lg whitespace-pre-line pb-3" >{index+1}. {item.participant_name}</h4>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default InterviewPage;