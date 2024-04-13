import React, { useState, useEffect } from "react";
import InputField from '../../../components/item/inputField'
import { createVacancy, getVacancyById,updateVacancy } from "../../../API/VacancyAPI";
import { useHistory, useParams } from "react-router-dom";
import { formatDateForInputDate,removeEmptyLines } from "../../../utils/helper";

const FormCreateVacancy = () => {
    const [title, setTitle] = useState('');
    const [qualification, setQualification] = useState('');
    const [recruitment, setRecruitment] = useState('');
    const [place, setPlace] = useState('');
    const [closing_date, setClosingDate] = useState('');
    const [kuota, setKuota] = useState('');
    const [apply_url, setApplyUrl] = useState('');
    const { id_vacancy } = useParams();
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Tambahkan waktu 23:59 pada closing_date sebelum disimpan
          const closingDateWithTime = new Date(closing_date + 'T23:59'); // Tambahkan waktu 23:59 pada tanggal penutupan
          const formattedClosingDate = closingDateWithTime.toISOString(); // Format tanggal penutupan menjadi ISO string
        
          const formData = new FormData();
          formData.append("title", title);
          formData.append("qualification", removeEmptyLines(qualification));
          formData.append("recruitment", removeEmptyLines(recruitment));
          formData.append("place", removeEmptyLines(place));
          formData.append("closing_date", formattedClosingDate); // Gunakan tanggal penutupan yang sudah diformat
          formData.append("kuota", kuota);
          formData.append("apply_url", apply_url);
      
          if (id_vacancy) {
            // Jika id_vacancy tersedia, maka lakukan pembaruan (update) lowongan
            await updateVacancy(id_vacancy, formData);
          } else {
            // Jika id_vacancy tidak tersedia, maka lakukan pembuatan (create) lowongan baru
            await createVacancy(formData);
          }
      
          // Navigasi ke halaman dashboard/Vacancy setelah berhasil membuat atau memperbarui lowongan
          history.push("/dashboard/lowongan");
        } catch (error) {
          console.error("Error:", error);
          // Handle error if needed
        }
      };      
  

  const fetchVacancy = async () => {
    try {
      const data = await getVacancyById(id_vacancy); // Panggil getVacancyById dengan id_vacancy
      setTitle(data.title); // Set nilai title dari lowongan
      setQualification(data.qualification); // Set nilai qualification dari lowongan
      setRecruitment(data.recruitment); // Set nilai recruitment dari lowongan
      setPlace(data.place); // Set nilai place dari lowongan
      setClosingDate(data.closing_date); // Set nilai closing_date dari lowongan
      setKuota(data.kuota); // Set nilai kuota dari lowongan
      setApplyUrl(data.apply_url); // Set nilai apply_url dari lowongan
      // Anda mungkin perlu menangani nilai image dari lowongan jika diperlukan
    } catch (error) {
      console.error("Gagal mengatur lowongan ", error);
    }
  };
  

  useEffect(() => {
    if (id_vacancy) {
      fetchVacancy();
    }
  }, [id_vacancy]);

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto grid grid-cols-2 gap-4">
      <div className="mb-4 col-span-2">
        <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-900">
          Posisi
        </label>
        <InputField
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukkan Judul"
          required={true}
        />
      </div>
      <div className="mb-4">
          <label htmlFor="place" className="block mb-1 text-sm font-medium text-gray-900">
              Penempatan
          </label>
          <textarea
              id="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Masukkan Tempat"
              required={true}
              rows={2} // Set jumlah baris menjadi 2
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
          ></textarea>
      </div>
  
      <div className="mb-4">
        <label htmlFor="kuota" className="block mb-1 text-sm font-medium text-gray-900">
          Kuota
        </label>
        <InputField
          type="number"
          id="kuota"
          value={kuota}
          onChange={(e) => {
            const inputValue = parseInt(e.target.value);
            // Memastikan nilai yang dimasukkan adalah angka positif dan minimal 1
            if (!isNaN(inputValue) && inputValue >= 1) {
              setKuota(inputValue);
            }
          }}
          placeholder="Masukkan Kuota"
          required={true}
        />
      </div>
      {/* Tambahan kode untuk kolom kedua */}
      <div className="mb-4">
        <label htmlFor="closing_date" className="block mb-1 text-sm font-medium text-gray-900">
          Tanggal Penutupan
        </label>
        <InputField
          type="date"
          id="closing_date"
          value={formatDateForInputDate(closing_date)}
          onChange={(e) => setClosingDate(e.target.value)}
          required={true}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="apply_url" className="block mb-1 text-sm font-medium text-gray-900">
          Link Gform
        </label>
        <InputField
          id="apply_url"
          value={apply_url}
          onChange={(e) => setApplyUrl(e.target.value)}
          placeholder="Masukkan Apply URL"
          required={true}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="qualification" className="block mb-1 text-sm font-medium text-gray-900">
          Kualifikasi
        </label>
        <textarea
          id="qualification"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          required={true}
          rows={5}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="recruitment" className="block mb-1 text-sm font-medium text-gray-900">
          Persyaratan
        </label>
        <textarea
          id="recruitment"
          value={recruitment}
          onChange={(e) => setRecruitment(e.target.value)}
          required={true}
          rows={5}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
        ></textarea>
      </div>
      <button type="submit" className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Submit
      </button>
    </form>
  );  
};

export default FormCreateVacancy;