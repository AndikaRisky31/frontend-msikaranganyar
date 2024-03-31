import React, { useState, useEffect } from "react";
import axios from "axios";
import Heading from "../components/common/heading/Heading";
import { useHistory } from "react-router-dom/cjs/react-router-dom";



const Announcement = () => {
  const [pengumuman, setPengumuman] = useState([]);
  const [scheduleInterview, setScheduleInterview] = useState([]);
  const history = useHistory()
  
  const toAnnouncement = (id_announcement) =>{
    history.push(`/pengumuman/${id_announcement}`)
  }
  const toInterview = (id_scedule) =>{
    history.push(`/interview/${id_scedule}`)
  }

  const getPengumuman = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/announcement/?page=1&limit=5`;
      const response = await axios.get(url);
      setPengumuman(response.data.data);
    } catch (error) {
      console.error('Gagal mengambil data pengumuman:', error);
    }
  };

  const getScheduleInterview = async() =>{
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/interview/?page=1&limit=5`;
      const response = await axios.get(url)
      setScheduleInterview(response.data.data)
    } catch (error) {
      console.error("eror fetch schedule interview",error);
    }
  }

  useEffect(() => {
    getPengumuman();
    getScheduleInterview()
  }, []);
  
  return (
    <section className="Announcement w-5/6 sm:w-9/12 lg:w-3/6 mx-auto py-10">
      <Heading title="Jadwal Interview" subtitle="Apa yang baru?" link="#"/>
      <div className="flex justify-start overflow-x-auto snap-mandatory snap-x gap-5 h-48">
        {scheduleInterview && scheduleInterview.map((val) => (
          <div key={val.id_schedule_interview} className="snap-start mx-2 flex-shrink-0 w-52 cursor-pointer" onClick={() => toInterview(val.id_schedule_interview) }>
            <h1 className="font-bold text-xl">{val.title}</h1>
            <h2 className="text-neutral-500  text-justify">{val.description}</h2>
          </div>
        ))}
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold my-5 text-center">Pengumuman</h1>
      <div className="grid grid-cols-1 gap-10">
        {pengumuman && pengumuman.map((item) => (
          <div className="p-2 cursor-pointer flex" key={item.id_announcement} onClick={() => toAnnouncement(item.id_announcement)}>
            <img src={`${process.env.REACT_APP_IMAGE_URL}/${item.imageURL}`} className="mr-4 object-cover aspect-square" />
            <div className="flex flex-col">
              <h1 className="font-bold text-xl lg:text-2xl">{item.title}</h1>
              <h2 className="text-neutral-500 xl:w-1/2">{item.content}</h2>
            </div>
          </div>        
        ))} 
      </div>
    </section>
  );
};

export default Announcement;