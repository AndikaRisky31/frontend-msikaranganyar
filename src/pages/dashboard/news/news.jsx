import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import CardNews from "../../../components/card/card";
import { getNewsByPage, deleteNews } from "../../../API/NewsAPI";

const News = () => {
  const [dataNews, setDataNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isPreviousData, setIsPreviousData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await getNewsByPage(page); // Mengambil data berita dari halaman saat ini
        setDataNews(newsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleDeleteNews = async (id) => {
    try {
      const success = await deleteNews(id); // Menghapus berita
      if (success) {
        console.log(`Berita dengan ID ${id} berhasil dihapus`);
        // Memuat ulang data setelah berhasil menghapus berita
        const newsData = await getNewsByPage(page);
        setDataNews(newsData);
      } else {
        console.log(`Gagal menghapus berita dengan ID ${id}`);
      }
    } catch (error) {
      console.error(`Gagal menghapus berita dengan ID ${id}:`, error);
    }
  };

  const next = () => {
    setPage(page + 1); // Menambahkan halaman satu untuk navigasi ke halaman berikutnya
  };

  const prev = () => {
    if (page === 1) return;
    setPage(page - 1); // Mengurangi satu halaman untuk navigasi ke halaman sebelumnya
  };

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between">
        <Typography variant="h3" color="gray" className="mb-4">
          News List
        </Typography>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {loading ? (
          <Button variant="text" loading={true}>
            Loading
          </Button>
        ) : (
          dataNews.map((news) => (
            <CardNews
              key={news.id_news}
              {...news}
              handleDeleteNews={() => handleDeleteNews(news.id_news)}
            />
          ))
        )}
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outlined"
          color="white"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={page === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>
        <Button
          variant="text"
          color="white"
          className="flex items-center gap-2"
          onClick={next}
          disabled={isPreviousData || !dataNews?.length} // Menonaktifkan tombol "Next" jika tidak ada data berita
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default News;