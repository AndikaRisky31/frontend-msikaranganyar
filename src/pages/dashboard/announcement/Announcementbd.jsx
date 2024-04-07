import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import AnnouncementCard from "../../../components/card/AnnouncementCard";
import { deleteAnnouncement, getAnnouncementByPage } from "../../../API/AnnouncementAPI";
import PopupModal from "../../../components/modal/popup-modal";
import { useHistory } from "react-router-dom";

const Announcementdb = () => {
  const [dataAnnouncement, setDataAnnouncement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null); // Menyimpan ID announcement yang akan dihapus
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Menyimpan status tampilan modal konfirmasi
  const [totalPages, settotalPages] = useState([]);
  const history = useHistory()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const AnnouncementData = await getAnnouncementByPage(page); // Mengambil data announcement dari halaman saat ini
        setDataAnnouncement(AnnouncementData.data);
        settotalPages(AnnouncementData.totalPages)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Announcement:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const toCreate =()=>{
    history.push('/dashboard/pengumuman/addUpdate')
  }

  const handleDeleteAnnouncement = async () => {
    try {
      const success = await deleteAnnouncement(deleteId); // Menghapus announcement dengan ID yang disimpan
      if (success) {
        console.log(`announcement dengan ID ${deleteId} berhasil dihapus`);
        // Memuat ulang data setelah berhasil menghapus announcement
        const AnnouncementData = await getAnnouncementByPage(page);
        console.log(AnnouncementData);
        setDataAnnouncement(AnnouncementData.data);
        settotalPages(AnnouncementData.totalPages)
      } else {
        console.log(`Gagal menghapus announcement dengan ID ${deleteId}`);
      }
    } catch (error) {
      console.error(`Gagal menghapus announcement dengan ID ${deleteId}:`, error);
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
      <button type="button" onClick={toCreate} className="rounded-md focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Tambah announcement</button>      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {loading ? (
          <Button variant="text" loading={true}>
            Loading
          </Button>
        ) : (
          dataAnnouncement.map((Announcement) => (
            <AnnouncementCard
              key={Announcement.id_announcement}
              announcement={Announcement}
              showButton={true}
              // Saat tombol delete di-klik, simpan ID announcement dan tampilkan modal konfirmasi
              handleDeleteAnnouncement={() => {
                setDeleteId(Announcement.id_announcement);
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
          disabled={page === totalPages} // Menonaktifkan tombol "Next" jika tidak ada data announcement
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>

      {/* Tambahkan komponen PopupModal di sini */}
      <PopupModal
        title="Apakah anda yakin menghapus pengumuman ini?"
        trueChoice ="Confirm"
        falseChoice = "Batal"
        isOpen={showDeleteModal}
        toggleModal={() => setShowDeleteModal(!showDeleteModal)}
        handleConfirmDelete={handleDeleteAnnouncement}
      />
    </div>
  );
};

export default Announcementdb;