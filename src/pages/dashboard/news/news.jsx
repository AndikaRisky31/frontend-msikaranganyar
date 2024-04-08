import React, { useState, useEffect,useContext } from "react";
import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import CardNews from "../../../components/card/card";
import { getNewsByPage, deleteNews,getSearchNews } from "../../../API/NewsAPI";
import PopupModal from "../../../components/modal/popup-modal";
import { useHistory } from "react-router-dom";
import { MyContext } from "../component/DashboardLayout";

const News = () => {
  const [dataNews, setDataNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null); // Menyimpan ID berita yang akan dihapus
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Menyimpan status tampilan modal konfirmasi
  const [totalPages, settotalPages] = useState([]);
  const history = useHistory();
  const searchKeyword = useContext(MyContext);

  const fetchNews = async () => {
    try {
      const newsData = await getNewsByPage(page); // Mengambil data berita dari halaman saat ini
      setDataNews(newsData.data);
      settotalPages(newsData.totalPages)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };
  const searchNews = async ()=>{
    try {
      const newsData = await getSearchNews(searchKeyword); // Mengambil data berita dari halaman saat ini
      setDataNews(newsData.data);
      setLoading(false);
    } catch (error) {
      console.error("error search news",error);
      setLoading(false)
    }
  }

  useEffect(() => {
    if(searchKeyword){
      searchNews()
    }else{
      fetchNews();
    }
  }, [page,searchKeyword]);

  const toCreate =()=>{
    history.push('/dashboard/news/addUpdate')
  }

  const handleDeleteNews = async () => {
    try {
      const success = await deleteNews(deleteId); // Menghapus berita dengan ID yang disimpan
      if (success) {
        console.log(`Berita dengan ID ${deleteId} berhasil dihapus`);
        // Memuat ulang data setelah berhasil menghapus berita
        const newsData = await getNewsByPage(page);
        setDataNews(newsData.data);
        settotalPages(newsData.totalPages)
      } else {
        console.log(`Gagal menghapus berita dengan ID ${deleteId}`);
      }
    } catch (error) {
      console.error(`Gagal menghapus berita dengan ID ${deleteId}:`, error);
    } finally {
      setShowDeleteModal(false); // Sembunyikan modal konfirmasi setelah penghapusan selesai
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
      <button type="button" onClick={toCreate} className="rounded-md focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Tambah Berita</button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading ? (
          <Button variant="text" loading={true}>
            Loading
          </Button>
        ) : (
          dataNews.map((news) => (
            <CardNews
              key={news.id_news}
              {...news}
              // Saat tombol delete di-klik, simpan ID berita dan tampilkan modal konfirmasi
              handleDeleteNews={() => {
                setDeleteId(news.id_news);
                setShowDeleteModal(true);
              }}
            />
          ))
        )}
      </div>
      <div className="flex items-center justify-center gap-4 mt-5">
        <Button
          variant="outlined"
          color="gray"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={page === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>
        <Button
          variant="outlined"
          color="gray"
          className="flex items-center gap-2"
          onClick={next}
          disabled={page === totalPages} // Menonaktifkan tombol "Next" jika tidak ada data berita
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>

      {/* Tambahkan komponen PopupModal di sini */}
      <PopupModal
        title="Apakah anda yakin menghapus berita ini?"
        trueChoice ="Confirm"
        falseChoice = "Batal"
        isOpen={showDeleteModal}
        toggleModal={() => setShowDeleteModal(!showDeleteModal)}
        handleConfirmDelete={handleDeleteNews}
      />
    </div>
  );
};

export default News;