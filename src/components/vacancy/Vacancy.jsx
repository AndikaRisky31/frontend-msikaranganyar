import React, { useState, useEffect } from "react";
import axios from "axios";
import Back from "../common/back/Back";
import VacancyCard from "./VacancyCard";
import Faq from "./Faq";
import "./vacancy.css";

const Vacancy = () => {
  const [vacancies, setVacancies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchVacancyData = async (page = 1, limit = 8) => {
      try {
        const url = `${process.env.REACT_APP_BASE_URL}/vacancy/?page=${page}&limit=${limit}`;
        const response = await axios.get(url);
        setVacancies(response.data.data);
        setTotalPages(response.data.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching vacancy data:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchVacancyData(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">Error fetching vacancy data</div>;

  return (
    <>
      <Back title='Choose The Right Plan' />
      <section className='price padding'>
        <div className='container grid'>
          {vacancies.map((vacancy) => (
            <VacancyCard key={vacancy.id_vacancy} data={vacancy} />
          ))}
        </div>
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </section>
      <Faq />
    </>
  );
};
export default Vacancy;
