// Document component
import React, { useState, useEffect,useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputField from "../../../components/item/inputField";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import { axiosInstanceAuth } from "../../../API/axios";
import TableHeader from "../../../components/item/TableHeader";
import { deleteDocument, getDocumentById, getDocumentByPage, searchDocument } from "../../../API/DocumentAPI";
import PopupModal from "../../../components/modal/popup-modal";
import { MyContext } from "../component/DashboardLayout";
import EmptyState from "../../../components/modal/EmptyState";
import SubmitButton from "../../../components/button/SubmitButton";
import SpinnerOverlay from "../../../components/modal/SpinnerOverlay";
import { useHistory } from "react-router-dom";

const Document = () => {
  const [listDokumen, setlistDokumen] = useState([]);
  const [showForm, setshowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false); // Tambahkan state submitting
  const [formData, setFormData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State untuk menampilkan modal delete
  const [documentIdToDelete, setDocumentIdToDelete] = useState(null);
  const [tipeDokumen, setTipeDokumen] = useState('tbpedia');
  const [totalPages, settotalPages] = useState([]);
  const [page, setPage] = useState(1);
  const [showSpinner, setShowSpinner] = useState(false);
  const searchKeyword = useContext(MyContext);
  const history = useHistory();

  const fetchDokumen = async () => {
    setShowSpinner(true)
    try {
        const data = await getDocumentByPage(tipeDokumen, page,5);
        setlistDokumen(data.dokumen);
        settotalPages(data.totalPages)
    } catch (error) {
        console.error("gagal mengambil data dokumen", error);
    }finally{
        setShowSpinner(false)
    }
  };
  const fetchSearchDokumen = async()=>{
    setShowSpinner(true)
    try {
        const response = await searchDocument(searchKeyword)
        setlistDokumen(response.dokumen)
    } catch (error) {
     console.error("gagal mencari dokumen",error);   
    }finally{
        setShowSpinner(false)
    }
  }

  const fetchDokumenById = async (id) => {
      try {
          const data = await getDocumentById(id);
          if (!showForm) {
              handleShowForm();
          }
          setFormData(data.dokumen);
      } catch (error) {
          console.error("gagal mengambil dokumen by id", error);
      }
  };

  const fetchDelete = async () => {
    setShowDeleteModal(false); // Tutup modal setelah berhasil menghapus
    setShowSpinner(true)
    try {
        await deleteDocument(documentIdToDelete); // Menggunakan id
        console.log("Document deleted successfully");
        // Hapus pemanggilan fetchDokumen dari sini

        // Perbarui daftar dokumen secara lokal
        setlistDokumen(prevList => prevList.filter(dokumen => dokumen.id !== documentIdToDelete));

    } catch (error) {
        console.error("Gagal menghapus dokumen", error);
        // Tambahkan logika lain jika diperlukan untuk menangani kesalahan saat menghapus dokumen
    }finally{
        setShowSpinner(false)
    }
};


  const handleDelete = (id) => {
      setDocumentIdToDelete(id);
      setShowDeleteModal(true);
  };

  const handleShowForm = () => {
      setshowForm(!showForm);
      if(showForm){
        setFormData({})
      }
  };
  const next = () => {
    setPage(page + 1); // Menambahkan halaman satu untuk navigasi ke halaman berikutnya
  };

  const prev = () => {
    if (page === 1) return;
    setPage(page - 1); // Mengurangi satu halaman untuk navigasi ke halaman sebelumnya
  };

  const onSubmit = async (values) => {
      try {
          setSubmitting(true); // Set submitting menjadi true saat proses submit dimulai
          const formData = new FormData();
          formData.append("nama", values.title);
          formData.append("tipe_dokumen", values.documentType);
          formData.append("tahun", values.year);
          if (values.file) {
              formData.append("dokumen", values.file);
          }
          if (values.id) {
              await axiosInstanceAuth.put(`/document/${values.id}`, formData);
          } else {
              await axiosInstanceAuth.post("/document/create", formData);
          }
          
          fetchDokumen();
          handleShowForm();
      } catch (error) {
          console.error("Gagal mengirim data:", error);
      } finally {
          setSubmitting(false); // Set submitting menjadi false setelah proses submit selesai, terlepas dari berhasil atau gagal
      }
  };

  // Skema validasi menggunakan yup
  const validationSchema = yup.object().shape({
      isFormDataEmpty: yup.boolean(), // Tentukan tipe data untuk isFormDataEmpty
      title: yup.string()
        .required("Judul diperlukan")
        .max(80, "Judul tidak boleh lebih dari 50 karakter"),
      documentType: yup.string().required("Jenis dokumen diperlukan"),
      year: yup.string().required("Tahun diperlukan"),
      file: yup
          .mixed()
          .when("isFormDataEmpty", {
              is: false,
              then: (schema) => schema.notRequired(), // Field file menjadi opsional jika formData tidak kosong
              otherwise: (schema) => schema.required("File diperlukan"), // Field file menjadi wajib jika formData kosong
          }),
  });

  const formik = useFormik({
    initialValues: {
        id: formData ? formData.id : null,
        isFormDataEmpty: !formData,
        title: formData && formData.nama ? formData.nama : "",
        documentType: formData && formData.tipe_dokumen ? formData.tipe_dokumen : "", // Inisialisasi dengan string kosong jika tidak ada nilai awal yang tersedia
        year: formData && formData.tahun ? formData.tahun : "", // Inisialisasi dengan string kosong jika tidak ada nilai awal yang tersedia
        file: null,
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    fetchDokumen()
  }, [tipeDokumen,page]);

  useEffect(() => {
    searchKeyword ? fetchSearchDokumen() : fetchDokumen();
    }, [searchKeyword]);


  useEffect(() => {
      formik.setValues({
          ...formik.values,
          id: formData ? formData.id : null,
          title: formData && formData.nama ? formData.nama : "",
          documentType: formData && formData.tipe_dokumen ? formData.tipe_dokumen : "",
          year: formData && formData.tahun ? formData.tahun : "",
      });
  }, [formData]);

  // Fungsi untuk meng-handle perubahan pada input file
  const handleFileChange = (event) => {
      const file = event.currentTarget.files[0];
      if (file && !file.name.toLowerCase().endsWith(".pdf")) {
          formik.setFieldValue("file", null);
          event.target.value = null;
          alert("Mohon unggah file PDF.");
      } else {
          formik.setFieldValue("file", file);
      }
  };
  const toDocument = (link)=>{
    window.location.href = process.env.REACT_APP_IMAGE_URL+link
  }

  return (
      <div className="flex flex-col p-5">
          {!showForm ? (
              <button
                  onClick={handleShowForm}
                  type="button"
                  className="inline-block max-w-[150px] rounded-md focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium text-sm px-3 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                  Tambah Dokumen
              </button>
          ) : (
              <button
                  onClick={handleShowForm}
                  className="inline-block max-w-[150px] ml-2 px-3 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
              >
                  Cancel
              </button>
          )}
          {showForm && <FormInput formik={formik} handleFileChange={handleFileChange} submitting={submitting} />}
          <div className="tableDaftar">
              <DaftarDokumen 
                listDokumen={listDokumen} 
                fetchId={fetchDokumenById} 
                handleDelete={handleDelete} 
                tipeDokumen={tipeDokumen}
                setTipeDokumen={setTipeDokumen}
                onClick={toDocument}
                />
          </div>
          {listDokumen.length !== 0 ? (
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
            ):(
                searchKeyword ? (
                    <EmptyState dataName="data pencarian"/>
                ):(
                    <EmptyState dataName={tipeDokumen}/>
                )
            )}
          {/* Tambahkan komponen PopupModal di sini */}
          <PopupModal
              title="Apakah anda yakin menghapus dokumen ini?"
              trueChoice="Confirm"
              falseChoice="Batal"
              isOpen={showDeleteModal}
              toggleModal={() => setShowDeleteModal(!showDeleteModal)}
              handleConfirmDelete={() => fetchDelete()} // Mengirimkan parameter id ke handleDelete
          />
          {showSpinner && <SpinnerOverlay />}
      </div>
  );
};



const DaftarDokumen = ({ listDokumen, fetchId,handleDelete,tipeDokumen,setTipeDokumen,onClick}) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
      <thead className="bg-gray-50">
        <tr>
            <TableHeader title="Judul" />
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Jenis Dokumen
            <select
                className="block w-full p-1 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={tipeDokumen}
                onChange={(e) => setTipeDokumen(e.target.value)}
            >
                <option value="dokumen">Dokumen</option>
                <option value="tbpedia">Tbpedia</option>
                <option value="tahunan">Tahunan</option>
            </select>
        </th>
            <TableHeader title="Tahun" />
            <TableHeader title="Aksi" />
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {listDokumen.map((dokumen, index) => (
          <tr key={index}>
            <td className="px-3 py-2 whitespace-nowrap">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                        <img
                            id="preview_img"
                            className="h-16 w-16 object-cover rounded-full"
                            src={process.env.REACT_APP_IMAGE_URL + dokumen.imageURL}
                            alt={dokumen.nama}
                        />
                        <div onClick={() => onClick(dokumen.nama_file)} className="cursor-pointer text-sm font-medium text-gray-900 ml-2">{dokumen.nama}</div>
                    </div>
                </div>
            </td>
            <td className="px-3 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{dokumen.tipe_dokumen}</div>
            </td>
            <td className="px-3 py-4 whitespace-nowrap text-center">
                <div className="text-sm text-gray-900">{dokumen.tahun}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                    onClick={() => fetchId(dokumen.id)}
                    className="px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out"
                >
                    Edit
                </button>
                <button onClick={() => handleDelete(dokumen.id)} className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
              >
                  Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


const FormInput = ({ formik, handleFileChange, submitting }) => {
    return (
        <form onSubmit={formik.handleSubmit} className="pt-5">
            <div className="mb-4">
                <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-900">
                    Judul
                </label>
                <InputField
                    id="title"
                    name="title"
                    type="text"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    placeholder="Masukkan Judul"
                    error={formik.touched.title && formik.errors.title}
                />
            </div>
            <div className="flex mb-4 space-x-4">
                <div className="w-1/2">
                    <label htmlFor="documentType" className="block mb-1 text-sm font-medium text-gray-900">
                        Jenis Dokumen
                    </label>
                    <select
                        id="documentType"
                        name="documentType"
                        value={formik.values.documentType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-md p-2"
                    >
                        <option value="" disabled hidden>
                            Pilih Jenis Dokumen
                        </option>
                        <option value="dokumen">Dokumen</option>
                        <option value="tbpedia">Tbpedia</option>
                        <option value="tahunan">Tahunan</option>
                    </select>
                    {formik.touched.documentType && formik.errors.documentType && <div className="text-red-500">{formik.errors.documentType}</div>}
                </div>
                <div className="w-1/2">
                    <label htmlFor="year" className="block mb-1 text-sm font-medium text-gray-900">
                        Tahun
                    </label>
                    <InputField
                        id="year"
                        name="year"
                        type="text"
                        value={formik.values.year}
                        onChange={formik.handleChange}
                        placeholder="Masukkan Tahun"
                        error={formik.touched.year && formik.errors.year}
                    />
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="file" className="block mb-1 text-sm font-medium text-gray-900">
                    Unggah File
                </label>
                <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={handleFileChange}
                    error={formik.touched.file && formik.errors.file}
                />
                {formik.touched.file && formik.errors.file && <div className="text-red-500">{formik.errors.file}</div>}
            </div>
            <SubmitButton submitting={submitting} />
        </form>
    );
};

export default Document;