import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/common/heading/Heading";
import InterviewCard from "../../components/card/InterviewCard";
import AnnouncementCard from "../../components/card/AnnouncementCard";
import VacancyCard from "../../components/card/VacancyCard";
import EmptyState from "../../components/modal/EmptyState";
import LoadingState from "../../components/modal/LoadingState";


const Announcement = () => {
  const [pengumuman, setPengumuman] = useState([]);
  const [scheduleInterview, setScheduleInterview] = useState([]);
  const navigate = useNavigate()
  const [vacancies, setVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  const toAnnouncement = (id_announcement) =>{
    navigate(`/pengumuman/${id_announcement}`)
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

  useEffect(() => {
    const fetchVacancyData = async (page = 1, limit = 10) => {
      try {
        const url = `${process.env.REACT_APP_BASE_URL}/vacancy/?page=${page}&limit=${limit}`;
        const response = await axios.get(url);
        setVacancies(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching vacancy data:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchVacancyData();
  }, []);

  if (isLoading) return <LoadingState/>;
  if (isError) return <div className="error">Error fetching vacancy data</div>;

  return (
    <>
      {((!vacancies || vacancies.length === 0) && 
        (!scheduleInterview || scheduleInterview.length === 0) &&
        (!pengumuman || pengumuman.length === 0)) ? (
        <EmptyState dataName="Pengumuman"/>
      ) : (
        <section className="Announcement w-5/6 sm:w-9/12 lg:w-3/6 mx-auto py-10">
          {/* Bagian Lowongan */}
          {vacancies && vacancies.length > 0 && (
            <div>
              <Heading title="Lowongan" subtitle="Apa yang baru?" />
              <div className='flex justify-start overflow-x-auto snap-mandatory snap-x gap-5 h-56'>
                {vacancies.map((vacancy) => (
                  <div key={vacancy.id_vacancy} className="mx-auto">
                    <VacancyCard VacancyData={vacancy} />
                  </div>
                ))}
              </div>
            </div>
          )}
  
          {/* Bagian Jadwal Interview */}
          {scheduleInterview && scheduleInterview.length > 0 && (
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold my-5 text-center">Jadwal Interview</h1>
              <div className="flex justify-start overflow-x-auto snap-mandatory snap-x gap-5 h-48">
                {scheduleInterview.map((interview) => (
                  <InterviewCard 
                    key={interview.id_schedule_interview} 
                    interview={interview} 
                  />
                ))}
              </div>
            </div>
          )}
  
          {/* Bagian Pengumuman */}
          {pengumuman && pengumuman.length > 0 && (
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold my-5 text-center">Pengumuman</h1>
              <div className="grid grid-cols-1 gap-10">
                {pengumuman.map((announcement) => (
                  <AnnouncementCard
                    key={announcement.id_announcement}
                    announcement={announcement}
                    onClick={() => toAnnouncement(announcement.id_announcement)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Announcement;