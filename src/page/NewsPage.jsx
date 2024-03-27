import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { sliceContent, formatDate } from '../components/helper';
import { useParams } from 'react-router-dom';

const NewsPage = () => {
  const { id_news } = useParams;
  const [newsContent, setNewsContent] = useState(null);
  const [lastNews, setLastNews] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const getNewsByPage = useCallback(async (page = 1,limit = 6) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/news/?page=${page}&limit=${limit}`);
      setTotalPages(response.data.totalPages);
      setNewsContent(response.data.data[0])
      setLastNews(response.data.data.slice(1,6));
    } catch (error) {
      console.error('Error fetching last news', error);
    }
  }, []);

  useEffect(() => {
    getNewsByPage();
  }, [getNewsByPage]);

  const loadContent = useCallback((id) => {
    const selectedNews = lastNews.filter(item => item.id_news === id);
    if (selectedNews.length > 0) {
      setNewsContent(selectedNews[0]); // Memperbarui newsContent dengan berita yang sesuai
    }
  }, [lastNews]);

  const nextPage = () => {
    const nextPageNumber = Math.min(currentPage + 1, totalPages);
    setCurrentPage(nextPageNumber);
    getNewsByPage(nextPageNumber); // Misalnya 10 adalah jumlah berita per halaman
  };
  
  const prevPage = () => {
    const prevPageNumber = Math.max(currentPage - 1, 1);
    setCurrentPage(prevPageNumber);
    getNewsByPage(prevPageNumber); // Misalnya 10 adalah jumlah berita per halaman
  };
  


  return (
    <>
      {newsContent ? (
        <div className="grid grid-cols-3 gap-1">
          <div className=" col-span-2 h-full order-1">
            <img src={process.env.REACT_APP_IMAGE_URL+newsContent.imageURLs[0].imageURL} alt="Large News" className="w-full object-cover aspect-video" />
          </div>
          <div className="col-span-2 md:col-span-1 md:row-span-2 order-3 md:order-2 overflow-y-auto">
            {lastNews ? lastNews.map(item => (
              <div key={item.id_news} className="flex mb-2 snap-start">
                <div className="aspect-square max-w-[25%]">
                  <img src="/images/ab.webp" alt="" className="h-full object-cover" />
                </div>
                <div className="flex flex-col p-2">
                  <div>
                    <h2 className="text-base lg:text-lg font-semibold cursor-pointer" onClick={()=> loadContent(item.id_news)}>{sliceContent(item.title, 11)}</h2>
                  </div>
                  <div className="my-1">
                    <p className="text-xs lg:text-sm text-gray-500">{formatDate(item.created_at)} <FontAwesomeIcon icon={faCircle} size="xs" className="pl-2" /> By, {item.admin_name} </p>
                  </div>
                </div>
              </div>
            )) : "Loading...."}
          </div>
          <div className="px-5 sm:px-10 md:px-16 lg:px-32 col-span-2 text-gray-500 order-2 md:order-3">
            <div className="py-5 text-justify">
              <p className="text-sm text-gray-500">{formatDate(newsContent.created_at)}<FontAwesomeIcon icon={faCircle} size="xs" className="pl-2" /> By, {newsContent.admin_name} </p>
              <h2 className="text-xl font-semibold pt-1">{newsContent.title}</h2>
            </div>
            <div className="pb-10">
              <p className="text-justify py-4">{newsContent.content}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="flex justify-center mt-6">
          <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-300">Previous</button>
          <span className="text-lg font-bold">{currentPage} / {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 ml-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-300">Next</button>
        </div>
    </>
    
  );
};

export default NewsPage;