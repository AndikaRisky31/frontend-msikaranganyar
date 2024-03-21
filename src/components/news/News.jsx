import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Back from '../common/back/Back';
import NewsCard from './NewsCard';

const fetchBlogs = async (page = 1, perPage = 6) => {
  const url = `${process.env.REACT_APP_BASE_URL}/news/?page=${page}&limit=${perPage}`;
  const response = await axios.get(url);
  return response.data;
};

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await fetchBlogs(currentPage);
        setBlogs(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        setIsError(true);
        console.error('Error fetching blogs:', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [currentPage]);

  const nextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching blogs</div>;

  return (
    <>
      <Back title='Blog Posts' />
      <section className='p-2'>
        <div className="flex flex-wrap justify-center gap-4">
          {blogs.map((blog) => (
            <NewsCard key={blog.id_news} blog={blog} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-300">Previous</button>
          <span className="text-lg font-bold">{currentPage} / {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 ml-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-300">Next</button>
        </div>
      </section>
    </>
  );
};

export default News;