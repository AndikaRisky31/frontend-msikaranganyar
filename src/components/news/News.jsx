import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Back from '../common/back/Back';
import BlogCard from './NewsCard';
import './news.css';

const fetchBlogs = async (page = 1, perPage = 6) => {
  const url = `${process.env.REACT_APP_BASE_URL}/news/?page=${page}&limit=${perPage}`;
  console.log(url);
  const response = await axios.get(url); // Menggunakan Axios untuk melakukan permintaan HTTP
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
      <section className='blog padding'>
        <div className='container grid2'>
          {blogs.map((blog) => (
            <BlogCard key={blog.id_news} blog={blog} />
          ))}
        </div>
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </section>
    </>
  );
};

export default News;