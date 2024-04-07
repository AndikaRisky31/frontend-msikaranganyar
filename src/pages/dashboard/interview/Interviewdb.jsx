import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { getInterviewByPage, deleteInterview } from "../../../API/InterviewAPI.js";
import PopupModal from "../../../components/modal/popup-modal";
import { useHistory } from "react-router-dom";
import InterviewCard from "../../../components/card/InterviewCard";

const Interviewdb = () => {
  const [dataInterview, setDataInterview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null); // Menyimpan ID wawancara yang akan dihapus
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Menyimpan status tampilan modal konfirmasi
  const [totalPages, settotalPages] = useState([]);
  const history = useHistory()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const InterviewData = await getInterviewByPage(page);
        setDataInterview(InterviewData.data);
        settotalPages(InterviewData.totalPages)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Interview:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const toCreate =()=>{
    history.push('/dashboard/wawancara/addUpdate')
  }

  const handleDeleteInterview = async () => {
    try {
      const success = await deleteInterview(deleteId); // Menghapus wawancara dengan ID yang disimpan
      if (success) {
        console.log(`wawancara dengan ID ${deleteId} berhasil dihapus`);
        // Memuat ulang data setelah berhasil menghapus wawancara
        const InterviewData = await getInterviewByPage(page);
        setDataInterview(InterviewData.data);
        settotalPages(InterviewData.totalPages)
      } else {
        console.log(`Gagal menghapus wawancara dengan ID ${deleteId}`);
      }
    } catch (error) {
      console.error(`Gagal menghapus wawancara dengan ID ${deleteId}:`, error);
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
      <button type="button" onClick={toCreate} className="rounded-md focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Tambah wawancara</button>
      <div className="flex items-center justify-between">
        <Typography variant="h3" color="gray" className="mb-4">
          Interview List
        </Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <Button variant="text" loading={true}>
            Loading
          </Button>
        ) : (
          dataInterview.map((Interview) => (
            <InterviewCard
              key={Interview.id_schedule_interview}
              interview={Interview}
              showButton={true}
              // Saat tombol delete di-klik, simpan ID wawancara dan tampilkan modal konfirmasi
              handleDeleteInterview={() => {
                setDeleteId(Interview.id_schedule_interview);
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
          disabled={page === totalPages} // Menonaktifkan tombol "Next" jika tidak ada data wawancara
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>

      {/* Tambahkan komponen PopupModal di sini */}
      <PopupModal
        title="Apakah anda yakin menghapus wawancara ini?"
        trueChoice ="Confirm"
        falseChoice = "Batal"
        isOpen={showDeleteModal}
        toggleModal={() => setShowDeleteModal(!showDeleteModal)}
        handleConfirmDelete={handleDeleteInterview}
      />
    </div>
  );
};

export default Interviewdb;