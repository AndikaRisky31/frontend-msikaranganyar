import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Back from "../common/back/Back";
import PriceCard from "./PriceCard";
import Faq from "./Faq";
import "./price.css";

const queryClient = new QueryClient();

const fetchVacancyData = async (page = 1, limit = 8) => {
  const url = `${process.env.REACT_APP_BASE_URL}/vacancy/?page=${page}&limit=${limit}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch vacancy data");
  }
  return response.json();
};

const VacancyComp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data, isLoading, isError } = useQuery(["vacancyData", currentPage], () => fetchVacancyData(currentPage));

  useEffect(() => {
    if (data && data.totalPages) {
      setTotalPages(data.totalPages);
    }
  }, [data]);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">Error fetching vacancy data</div>;

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Back title='Choose The Right Plan' />
      <section className='price padding'>
        <div className='container grid'>
          {data && data.data.map((vacancy) => (
            <PriceCard key={vacancy.id_vacancy} data={vacancy} />
          ))}
        </div>
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <span>{currentPage} / {totalPages}</span> {/* Menampilkan halaman saat ini dan total halaman */}
          <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button> {/* Menonaktifkan tombol Next jika sudah mencapai halaman terakhir */}
        </div>
      </section>
      <Faq />
    </>
  );
};

const Vacancy = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <VacancyComp />
    </QueryClientProvider>
  );
};

export default Vacancy;