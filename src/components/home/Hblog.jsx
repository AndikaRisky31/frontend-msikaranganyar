import React from "react"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import "../blog/blog.css"
import BlogCard from "../blog/BlogCard";
import Heading from "../common/heading/Heading"

// copy code of blog => blogCard

const queryClient = new QueryClient();

const fetchBlogs = async () => {
  const url = `${process.env.REACT_APP_BASE_URL}/news/?page=1&limit=3`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return response.json();
};

const Hblog = () => {
  const { data, isLoading, isError } = useQuery('blogs', fetchBlogs);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching blogs</div>;
  return (
    <>
      <section className='blog'>
        <div className='container'>
          <Heading subtitle='Berita' title='Yang baru dari MSI Karanganyar' />
          <div className='grid2'>
          {data.data.map((blog) => (
            <BlogCard key={blog.id_news} blog={blog} />
          ))}
          </div>
        </div>
      </section>
    </>
  )
}
const HNews = () => (
  <QueryClientProvider client={queryClient}>
    <Hblog />
  </QueryClientProvider>
);
export default HNews;
