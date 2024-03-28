import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Heading from '../components/common/heading/Heading';
import { formatDate } from "../components/helper";
import ListPlace from "../components/ListPlace";

const VacancyPage = () => {
  const { id_vacancy } = useParams();
  const [content, setContent] = useState(null);

  const toGform = (link) =>{
    window.open(link, '_blank');
  }

  const addLineNumbers = (text) => {
    const lines = text.split('\n');
    const numberedLines = lines.map((line, index) => `${index + 1}. ${line}`);
    return numberedLines.join('<br>');
  };

  const getVacancyById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/vacancy/${id_vacancy}`
      );
      const data = response.data.data;
      data.qualification = addLineNumbers(data.qualification); // Add line numbers to qualification
      setContent(data);
    } catch (error) {
      console.error('Failed to fetch vacancy', error);
    }
  };

  useEffect(() => {
    getVacancyById();
  }, [id_vacancy]);

  return (
    <>
        {content && (
          <div className="mx-auto py-10 px-4 sm:px-6 md:px-20">
            <Heading title={content.title} subtitle="Lowongan Kerja"/>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="w-full sm:col-span-2 mb-5">
                <div className="flex mb-2">
                  <div className="w-1/2 sm:w-1/3 md:w-1/4">
                    <p className="text-lg font-bold">Penempatan</p>
                  </div>
                  <div className="mr-3">
                    <p>:</p>
                  </div>
                  <div className="">
                    <ListPlace dataListPlace={content.place}/>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/2 sm:w-1/3 md:w-1/4">
                    <p className="text-lg font-bold">Tanggal Penutupan</p>
                  </div>
                  <div className="mr-3">
                    <p>:</p>
                  </div>
                  <div className="">
                    <p className="">{formatDate(content.closing_date,true)}</p>
                  </div>
                </div>
              </div>
              <div className="row-span-2">
                <h2 className="text-xl font-bold text-center m-3">Kualifikasi</h2>
                <p className="text-lg whitespace-pre-line text-gray-500" dangerouslySetInnerHTML={{ __html: content.qualification }}></p>
              </div>
              <div className="mt-10 sm:mt-0">
                <h2 className="text-xl font-bold text-center m-3">Persyaratan</h2>
                <p className="text-lg whitespace-pre-line text-gray-500">{content.recruitment}</p>
              </div>
              <div className="flex justify-center items-center">
              <button 
                onClick={() => toGform(content.apply_url)} 
                disabled={content.apply_url === null} 
                className={`bg-teal-500 px-24 py-3 my-10 text-white hover:bg-teal-600 hover:shadow-md ${content.apply_url === null ? 'cursor-not-allowed' : ''}`}
              >
                Apply
              </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default VacancyPage;