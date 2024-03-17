import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Back from '../common/back/Back';
import BlogCard from './BlogCard';
import './blog.css';

const queryClient = new QueryClient();

const fetchBlogs = async (page = 1, perPage = 6) => {
  const url = `${process.env.REACT_APP_BASE_URL}/news/?page=${page}&limit=${perPage}`;
  console.log(url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return response.json();
};

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // State untuk menyimpan total halaman
  const { data, isLoading, isError } = useQuery(['blogs', currentPage], () => fetchBlogs(currentPage), {
    keepPreviousData: true,
    onSuccess: (data) => {
      setTotalPages(data.totalPages); // Mengatur total halaman ketika data berhasil diambil
    },
  });

  const nextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages)); // Membatasi nextPage agar tidak melebihi totalPages
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching blogs</div>;

  return (
    <>
      <Back title='Blog Posts' />
      <section className='blog padding'>
        <div className='container grid2'>
          {data.data.map((blog) => (
            <BlogCard key={blog.id_news} blog={blog} />
          ))}
        </div>
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <span>{currentPage} / {totalPages}</span> {/* Menampilkan halaman saat ini dan total halaman */}
          <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button> {/* Menonaktifkan tombol Next jika sudah mencapai halaman terakhir */}
        </div>
      </section>
    </>
  );
};

const NewsPage = () => (
  <QueryClientProvider client={queryClient}>
    <News />
  </QueryClientProvider>
);
export default NewsPage;