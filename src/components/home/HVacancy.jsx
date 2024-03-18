import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Heading from "../common/heading/Heading";
import PriceCard from "../pricing/PriceCard";
import '../pricing/price.css'

const queryClient = new QueryClient();

const fetchVacancyData = async () => {
  const url = `${process.env.REACT_APP_BASE_URL}/vacancy/?page=1&limit=4`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch vacancy data");
  }
  return response.json();
};

const Vacancy = () => {
  const { data, isLoading, isError } = useQuery("vacancyData", fetchVacancyData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching vacancy data</div>;

  return (
    <>
      <section className='hprice padding'>
        <Heading subtitle='LOWONGAN' title='Bergabunglah dengan Tim Kami!' />
        <div className='price container grid'>
          {data && data.data.map((vacancy) => (
            <PriceCard key={vacancy.id_vacancy} data={vacancy} />
          ))}
        </div>
      </section>
    </>
  );
};

const HVacancy = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Vacancy />
    </QueryClientProvider>
  );
};

export default HVacancy;
