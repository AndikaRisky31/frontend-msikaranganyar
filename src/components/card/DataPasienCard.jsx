import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatIntegerWithCommas } from '../../utils/helper';

const DataPasien = () => {
  const [dataPasien, setDataPasien] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchDataPasien = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/announcement/tbc`);
        setDataPasien(response.data.totalAllYears);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data pasien:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchDataPasien();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data pasien</div>;

  return (
    <section className='bg-cover bg-right bg-no-repeat h-30vh text-white' style={{ backgroundImage: "url('/images/awrapper.webp')"}}>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='flex flex-col items-center justify-center p-3'>
          <div className='img'>
            <img src='https://img.icons8.com/ios/80/ffffff/groups.png' alt='' className='w-16 h-16' />
          </div>
          <div className='text text-center'>
            <h1 className='text-4xl font-bold'>{formatIntegerWithCommas(dataPasien.total_suspect)}</h1>
            <h3 className='text-lg font-semibold'>DIAGNOSED</h3>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center p-3'>
          <div className='img'>
            <img src='https://img.icons8.com/ios/80/ffffff/user--v1.png' alt='' className='w-16 h-16' />
          </div>
          <div className='text text-center'>
            <h1 className='text-4xl font-bold'>{formatIntegerWithCommas(dataPasien.total_detect)}</h1>
            <h3 className='text-lg font-semibold'>DETECTED</h3>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center p-3'>
          <div className='img'>
            <img src='https://img.icons8.com/ios/80/ffffff/capsule.png' alt='' className='w-16 h-16' />
          </div>
          <div className='text text-center'>
            <h1 className='text-4xl font-bold'>{formatIntegerWithCommas(dataPasien.total_treatment)}</h1>
            <h3 className='text-lg font-semibold'>UNDER TREATMENT</h3>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center p-3'>
          <div className=''>
            <img src='https://img.icons8.com/ios/80/ffffff/health-insurance.png' alt='' className='w-16 h-16' />
          </div>
          <div className='text text-center'>
            <h1 className='text-4xl font-bold'>{formatIntegerWithCommas(dataPasien.total_recovery)}</h1>
            <h3 className='text-lg font-semibold'>RECOVERED</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataPasien;