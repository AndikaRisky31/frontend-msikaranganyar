import React, { useState, useEffect } from "react";
import axios from "axios";
import Back from "../../components/common/back/Back";
import VacancyCard from "../../components/card/VacancyCard";

const Vacancy = () => {
  const [vacancies, setVacancies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchVacancyData = async (page = 1, limit = 10) => {
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
      <section className="px-4 md:px-8 lg:px-12 pt-[75%] sm:pt-[10%]">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center'>
          {vacancies.map((vacancy) => (
            <div key={vacancy.id_vacancy} className="mx-auto">
              <VacancyCard VacancyData={vacancy} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-6">
          <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-300">Previous</button>
          <span className="text-lg font-bold">{currentPage} / {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 ml-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-300">Next</button>
        </div>
      </section>
    </>
  );
};
export default Vacancy;