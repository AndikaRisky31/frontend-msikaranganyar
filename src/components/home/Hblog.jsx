import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "../card/NewsCard";
import Heading from "../common/heading/Heading";

const HNews = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const url = `${process.env.REACT_APP_BASE_URL}/news/?page=1&limit=5`;
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
      {blogs.length > 0 ? ( // Memeriksa apakah array blogs memiliki elemen
        <section>
          <div className="m-auto max-w-[90%] mt-10">
            <Heading subtitle="Berita" title="Yang baru dari MSI Karanganyar" link="/news" />
            <div className="mx-auto">
              <div className="flex overflow-x-auto snap-mandatory snap-x justify-start">
                {blogs.map((blog) => (
                  <div key={blog.id_news} className="snap-start mx-2">
                    <NewsCard blog={blog} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null} {/* Jangan gunakan string kosong, gunakan null untuk tidak menampilkan apa pun */}
    </>
  );
};

export default HNews;