import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getNewsByPage } from "../../API/NewsAPI";
import ButtonPagination from "../../components/item/ButtonPagination";
import { formatDate, scrollToTop, sliceContent } from "../../utils/helper";
import LoadingState from "../../components/modal/LoadingState";
import EmptyState from "../../components/modal/EmptyState";
import ListParagraf from "../../components/item/ItemParagraf";
import Heading from "../../components/common/heading/Heading";

const NewsMenu = () => {
  const [listNews, setListNews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // State untuk mengontrol tampilan loading
  const history = useHistory();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const fetchNews = async (limit = 5) => {
    setIsLoading(true); // Menandai bahwa data sedang dimuat
    try {
      const response = await getNewsByPage(page, limit);
      setTotalPages(response.totalPages);
      setListNews(response.data);
    } catch (error) {
      console.error("Error fetching last news:", error);
    } finally {
      setIsLoading(false); // Menandai bahwa proses pengambilan data telah selesai
    }
  };

  const navigateToNews = (id) => {
    history.push(`/news/${id}`);
  };

  useEffect(() => {
    fetchNews();
  }, [page]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="m-4 sm:m-8 md:m-12 lg:m-16">
      {/* Menampilkan LoadingState saat data sedang dimuat */}
      {isLoading && <LoadingState />}
      <Heading subtitle="Berita" title="Yang baru dari MSI Karanganyar" link="/news" />
      {/* Menampilkan daftar berita */}
      {listNews.length > 0 ? (
        listNews.map((item) => (
          <div key={item.id_news} className="flex mb-2 md:mb-3 snap-start">
            <div className="aspect-square w-1/4 flex justify-center items-center">
                {item.imageURL ? (
                    <img
                    src={process.env.REACT_APP_IMAGE_URL + item.imageURL}
                    alt="Large News"
                    className="h-full object-cover"
                    />
                ) : (
                    <img
                    src="/images/imagenotfound.jpg"
                    alt="Large News"
                    className="h-full object-cover"
                    />
                )}
            </div>
            <div className="flex flex-col w-3/4 px-2 md:px-4 py-3">
              <div>
                <h2
                  className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold cursor-pointer order-2"
                  onClick={() => {
                    navigateToNews(item.id_news);
                    scrollToTop();
                  }}
                >
                  {sliceContent(item.title, 11)}
                </h2>
              </div>
              <div className="my-1">
                <p className="text-xs lg:text-sm text-gray-500 order-1">
                  {formatDate(item.created_at)}{" "}
                  <i className="fas fa-circle fa-xs"></i> By, {item.admin_name}{" "}
                </p>
              </div>
                <div className="hidden sm:block" style={{ fontFamily: 'PT Serif, serif' }}>
                {screenWidth >= 1280 ? (
                        <p className="py-2 md:py-3"> {sliceContent(item.content, 60)}</p>
                    ) : screenWidth > 1024 ? (
                        <p className="py-2 md:py-3"> {sliceContent(item.content, 35)}</p>
                    ) : screenWidth > 841 ? (
                        <p className="py-2 md:py-3"> {sliceContent(item.content, 25)}</p>
                    ):(
                        <p className="py-2 md:py-3"> {sliceContent(item.content, 15)}</p>
                    )}
                    <p onClick={() => {
                        navigateToNews(item.id_news);
                        scrollToTop();
                    }} 
                        className="font-bold text-base text-teal-600 md:text-xl font-serif cursor-pointer hover:tracking-widest duration-500">Selengkapnya <i className="fas fa-arrow-right fa-xs"></i>
                    </p>
                </div>
            </div>
          </div>
        ))
      ) : (
        // Menampilkan EmptyState jika tidak ada berita yang ditemukan
        <EmptyState />
      )}

      {/* Menampilkan ButtonPagination */}
      <ButtonPagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default NewsMenu;