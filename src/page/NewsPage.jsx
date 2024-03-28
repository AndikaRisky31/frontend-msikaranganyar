import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { sliceContent, formatDate } from '../utils/helper';
import { useParams, useHistory } from 'react-router-dom';
import ListParagraf from '../components/news/ItemParagraf';

const NewsPage = () => {
  const { id_news } = useParams();
  const history = useHistory();
  const [newsContent, setNewsContent] = useState(null);
  const [lastNews, setLastNews] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigateToNews = (id) =>{
    history.push(`/news/${id}`)
  }

  const getNewsById = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/news/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching news by id:', error);
    }
  };

  const getNewsByPage = async (page) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/news/?page=${page}&limit=5`);
      setTotalPages(response.data.totalPages);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching last news:', error);
    }
  };

  const loadContent = async () => {
    let newsData = null;
    
    // Load news content by ID if available
    if (id_news) {
      const content = await getNewsById(id_news);
      newsData = await getNewsByPage(currentPage);
      setNewsContent(content);
    } else if (lastNews && lastNews.length > 0) {
      // If lastNews is available, load the first news item from lastNews
      setNewsContent(lastNews[0]);
    } else {
      // If neither id_news nor lastNews is available, load news content by current page
      newsData = await getNewsByPage(currentPage);
      if (newsData && newsData.length > 0) {
        setNewsContent(newsData[0]);
      }
    }
  
    // Set lastNews with the newly fetched news data, regardless of condition
    if (!lastNews && newsData) {
      setLastNews(newsData);
    }
  };  

  const nextPage = async () => {
    const nextPageNumber = Math.min(currentPage + 1, totalPages);
    setCurrentPage(nextPageNumber);
    const newsData = await getNewsByPage(nextPageNumber);
    setLastNews(newsData);
  };

  const prevPage = async () => {
    const prevPageNumber = Math.max(currentPage - 1, 1);
    setCurrentPage(prevPageNumber);
    const newsData = await getNewsByPage(prevPageNumber);
    setLastNews(newsData);
  };

  useEffect(() => {
    loadContent();
  }, [id_news, currentPage]);

  return (
    <>
      {newsContent ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          <div className="col-span-2 h-full order-1">
          {newsContent.imageURLs && newsContent.imageURLs[0] && newsContent.imageURLs[0].imageURL ? (
            <img src={process.env.REACT_APP_IMAGE_URL+newsContent.imageURLs[0].imageURL} alt="Large News" className="w-full object-cover aspect-video" />
          ) : (
            <img src="/images/imagenotfound.jpg" alt="Large News" className="w-full object-cover aspect-video" />
          )}
          </div>
          <div className="col-span-2 md:col-span-1 md:row-span-2 order-3 md:order-2 overflow-y-auto">
          {lastNews ? (
            lastNews.map(item => (
              <div key={item.id_news} className="flex mb-2 snap-start">
                <div className="aspect-square max-w-[25%]">
                {item.imageURLs && item.imageURLs[0] && newsContent.imageURLs[0].imageURL ? (
                  <img src={process.env.REACT_APP_IMAGE_URL+newsContent.imageURLs[0].imageURL} alt="Large News" className="w-full object-cover aspect-video" />
                ) : (
                  <img src="/images/imagenotfound.jpg" alt="Large News" className="w-full object-cover aspect-video" />
                )}
                </div>
                <div className="flex flex-col p-2">
                  <div>
                    <h2 className="text-base lg:text-lg font-semibold cursor-pointer" onClick={() => navigateToNews(item.id_news)}>{sliceContent(item.title, 11)}</h2>
                  </div>
                  <div className="my-1">
                    <p className="text-xs lg:text-sm text-gray-500">{formatDate(item.created_at)} <i className="fas fa-circle fa-xs"></i> By, {item.admin_name} </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No news found.</p>
          )}
          <div className="flex justify-center mt-6">
            <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-300">Previous</button>
            <span className="text-lg font-bold">{currentPage} / {totalPages}</span>
            <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 ml-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-300">Next</button>
          </div>
          </div>
          <div className="px-5 sm:px-10 md:px-16 lg:px-32 col-span-2 row-span-2 text-gray-500 order-2 md:order-3">
            <div className="py-5 text-justify">
              <p className="text-sm text-gray-500">{formatDate(newsContent.created_at,true)} <i className="fas fa-circle fa-xs"></i> By, {newsContent.admin_name} </p>
              <h2 className="text-xl font-semibold pt-1">{newsContent.title}</h2>
            </div>
            <div className="pb-10">
              <ListParagraf content={newsContent.content}/>
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