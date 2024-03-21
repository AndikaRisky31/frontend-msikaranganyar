import React, { useState, useEffect } from "react";
import axios from "axios";
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
      <section>
        <div className="m-auto max-w-[85%] mt-10">
          <Heading subtitle="Berita" title="Yang baru dari MSI Karanganyar" link="/news" />
          <div className="flex overflow-x-auto snap-mandatory snap-x">
            {blogs.map((blog) => (
              <div key={blog.id_news} className="snap-start mx-2">
                <NewsCard blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HNews;
