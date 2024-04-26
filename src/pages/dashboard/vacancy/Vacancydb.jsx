import React, { useState, useEffect,useContext } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import VacancyCard from "../../../components/card/VacancyCard";
import { deleteVacancy, getVacancyByPage,getSearchVacancy } from "../../../API/VacancyAPI";
import PopupModal from "../../../components/modal/popup-modal";
import { useHistory } from "react-router-dom";
import { MyContext } from "../component/DashboardLayout";
import EmptyState from "../../../components/modal/EmptyState";

const Vacancydb = () => {
  const [dataVacancy, setDataVacancy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null); // Menyimpan ID Vacancy yang akan dihapus
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Menyimpan status tampilan modal konfirmasi
  const [totalPages, settotalPages] = useState([]);
  const history = useHistory()
  const keyword = useContext(MyContext)
  
  const fetchByPage = async () => {
    try {
      const VacancyData = await getVacancyByPage(page); // Mengambil data Vacancy dari halaman saat ini
      setDataVacancy(VacancyData.data);
      settotalPages(VacancyData.totalPages)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Vacancy:", error);
      setLoading(false);
    }
  };
  const fetchBySearch= async () => {
    try {
      const VacancyData = await getSearchVacancy(keyword);
      setDataVacancy(VacancyData.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Vacancy:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if(keyword){
      fetchBySearch()
    }else{
      fetchByPage();
    }
  }, [page,keyword]);

  const toCreate =()=>{
    history.push('/dashboard/lowongan/addUpdate')
  }

  const handleDeleteVacancy = async () => {
    try {
      const success = await deleteVacancy(deleteId); // Menghapus Vacancy dengan ID yang disimpan
      if (success) {
        console.log(`Vacancy dengan ID ${deleteId} berhasil dihapus`);
        // Memuat ulang data setelah berhasil menghapus Vacancy
        const VacancyData = await getVacancyByPage(page);
        console.log(VacancyData);
        setDataVacancy(VacancyData.data);
        settotalPages(VacancyData.totalPages)
      } else {
        console.log(`Gagal menghapus Vacancy dengan ID ${deleteId}`);
      }
    } catch (error) {
      console.error(`Gagal menghapus Vacancy dengan ID ${deleteId}:`, error);
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
      {dataVacancy.length > 0 ? (
        <>
      <button type="button" onClick={toCreate} className="rounded-md focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Tambah Vacancy</button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center">
        {loading ? (
          <Button variant="text" loading={true}>
            Loading
          </Button>
        ) : (
          dataVacancy.map((Vacancy) => (
            <VacancyCard
              key={Vacancy.id_vacancy}
              VacancyData={Vacancy}
              showButton={true}
              // Saat tombol delete di-klik, simpan ID Vacancy dan tampilkan modal konfirmasi
              handleDeleteVacancy={() => {
                setDeleteId(Vacancy.id_vacancy);
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
          color="teal"
          className="flex items-center gap-2"
          onClick={next}
          disabled={page === totalPages} // Menonaktifkan tombol "Next" jika tidak ada data Vacancy
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
      </>
      ) : (
        <EmptyState dataName="Lowongan" create={toCreate} />
    )}

      {/* Tambahkan komponen PopupModal di sini */}
      <PopupModal
        title="Apakah anda yakin menghapus pengumuman ini?"
        trueChoice ="Confirm"
        falseChoice = "Batal"
        isOpen={showDeleteModal}
        toggleModal={() => setShowDeleteModal(!showDeleteModal)}
        handleConfirmDelete={handleDeleteVacancy}
      />
    </div>
  );
};

export default Vacancydb;