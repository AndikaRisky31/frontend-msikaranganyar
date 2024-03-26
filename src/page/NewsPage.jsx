import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { sliceContent, formatDate } from '../components/helper';

const NewsPage = () => {
  let { id_news } = useParams();
  const [newsContent, setNewsContent] = useState(null);
  const [lastNews, setLastNews] = useState(null);
  const history = useHistory(); // Dapatkan objek history

  const getNewsById = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/news/${id_news}`);
      setNewsContent(response.data.data);
    } catch (error) {
      console.error('Error fetching news content:', error);
    }
  }, [id_news]);

  const getNewsByPage = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/news/?page=1&limit=6`);
      setLastNews(response.data.data);
    } catch (error) {
      console.error('Error fetching last news', error);
    }
  }, []);

  useEffect(() => {
    getNewsById();
    getNewsByPage();
  }, [getNewsById, getNewsByPage]);

  const loadNewsContent = async (id) => {
    try {
      await getNewsById(id); // Panggil getNewsById dengan id yang baru
      history.push(`/news/${id}`); // Update URL dengan id berita yang baru dimuat
    } catch (error) {
      console.error('Error loading news content:', error);
    }
  };

  return (
    <>
      {newsContent ? (
        <div className="grid grid-cols-3 gap-1">
          <div className=" col-span-2 h-full order-1">
            <img src={process.env.REACT_APP_IMAGE_URL+newsContent.imageURLs[0].imageURL} alt="Large News" className="w-full object-cover aspect-video" />
          </div>
          <div className="col-span-2 md:col-span-1 md:row-span-2 order-3 md:order-2 overflow-y-auto  md:max-h-[70%]">
            {lastNews ? lastNews.map(item => (
              <div key={item.id_news} className="flex mb-2 snap-start">
                <div className="aspect-square max-w-[25%]">
                  <img src="/images/ab.webp" alt="" className="h-full object-cover" />
                </div>
                <div className="flex flex-col p-2">
                  <div>
                    {/* Tambahkan onClick di bawah */}
                    <h2 className="text-base lg:text-lg font-semibold cursor-pointer" onClick={() => loadNewsContent(item.id_news)}>{sliceContent(item.title, 11)}</h2>
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
    </>
  );
};

export default NewsPage;