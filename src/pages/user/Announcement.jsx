import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Heading from "../../components/common/heading/Heading";
import InterviewCard from "../../components/card/InterviewCard";
import AnnouncementCard from "../../components/card/AnnouncementCard";



const Announcement = () => {
  const [pengumuman, setPengumuman] = useState([]);
  const [scheduleInterview, setScheduleInterview] = useState([]);
  const history = useHistory()
  
  const toAnnouncement = (id_announcement) =>{
    history.push(`/pengumuman/${id_announcement}`)
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
      <Heading title="Jadwal Interview" subtitle="Apa yang baru?"/>
      <div className="flex justify-start overflow-x-auto snap-mandatory snap-x gap-5 h-48">
      {scheduleInterview && scheduleInterview.map((interview) => (
        <InterviewCard 
          key={interview.id_schedule_interview} 
          interview={interview} 
          
        />
      ))}
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold my-5 text-center">Pengumuman</h1>
      <div className="grid grid-cols-1 gap-10">
        {pengumuman && pengumuman.map((announcement) => (
          <AnnouncementCard
            key={announcement.id_announcement}
            announcement={announcement}
            onClick={() => toAnnouncement(announcement.id_announcement)}
          />
        ))}
      </div>
    </section>
  );
};

export default Announcement;