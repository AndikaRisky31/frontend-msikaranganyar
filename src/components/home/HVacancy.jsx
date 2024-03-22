import React, { useState, useEffect } from "react";
import axios from "axios";
import Heading from "../common/heading/Heading";
import VacancyCard from "../vacancy/VacancyCard";
import '../vacancy/vacancy.css'

const HVacancy = () => {
  const [vacancies, setVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchVacancyData = async () => {
      try {
        const url = `${process.env.REACT_APP_BASE_URL}/vacancy/?page=1&limit=4`;
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching vacancy data</div>;

  return (
    <>
      <section className='m-auto max-w-[85%] my-10'>
        <Heading subtitle='LOWONGAN' title='Bergabunglah dengan Tim Kami!' link="/lowongan"/>
        <div className="flex overflow-x-auto snap-mandatory snap-x gap-5 pb-3">
            {vacancies.map((vacancy) => (
              <div key={vacancy.id_vacancy} className="snap-start">
                <VacancyCard key={vacancy.id_vacancy} data={vacancy} />
              </div>
            ))}
          </div>
      </section>
    </>
  );
};

export default HVacancy;