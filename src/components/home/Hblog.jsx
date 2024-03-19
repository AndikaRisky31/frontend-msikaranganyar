import React, { useState, useEffect } from "react";
import axios from "axios";
import "../news/news.css";
import NewsCard from "../news/NewsCard";
import Heading from "../common/heading/Heading";

const HNews = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const url = `${process.env.REACT_APP_BASE_URL}/news/?page=1&limit=3`;
        const response = await axios.get(url);
        setBlogs(response.data.data);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching blogs:", error);
      }
      setIsLoading(false);
    };

    fetchBlogs();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching blogs</div>;

  return (
    <>
      <section className="blog">
        <div className="container">
          <Heading subtitle="Berita" title="Yang baru dari MSI Karanganyar" />
          <div className="grid2">
            {blogs.map((blog) => (
              <NewsCard key={blog.id_news} blog={blog} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HNews;
