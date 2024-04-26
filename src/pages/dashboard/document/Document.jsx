import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputField from "../../../components/item/inputField";
import { axiosInstanceAuth } from "../../../API/axios";
import { useHistory } from "react-router-dom";
import TableHeader from "../../../components/item/TableHeader";
import { getDocumentByPage } from "../../../API/DocumentAPI";

const Document = () => {
    const [listDokumen, setlistDokumen] = useState([]);
    const [showForm, setshowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false); // Tambahkan state submitting

  // Skema validasi menggunakan yup
  const validationSchema = yup.object().shape({
    title: yup.string().required("Judul diperlukan"),
    documentType: yup.string().required("Jenis dokumen diperlukan"),
    year: yup.string().required("Tahun diperlukan"),
    file: yup
      .mixed()
      .required("File diperlukan")
      .test("fileFormat", "Mohon unggah file PDF", (value) => {
        return value && value.name.toLowerCase().endsWith(".pdf");
      }),
  });
  const fetchDokumen = async () => {
    try {
      const data = await getDocumentByPage("tbpedia", 1);
      setlistDokumen(data.dokumen);
    } catch (error) {
      console.error("gagal mengambil data dokumen");
    }
  };

  const handleShowForm = () => {
    setshowForm(!showForm);
  };

  const onSubmit = async (values) => {
    try {
      setSubmitting(true); // Set submitting menjadi true saat proses submit dimulai
      const formData = new FormData();
      formData.append("nama", values.title);
      formData.append("tipe_dokumen", values.documentType);
      formData.append("tahun", values.year);
      formData.append("dokumen", values.file);

      await axiosInstanceAuth.post("/document/create", formData);
      handleShowForm();
    } catch (error) {
      console.error("Gagal mengirim data:", error);
    } finally {
      setSubmitting(false); // Set submitting menjadi false setelah proses submit selesai, terlepas dari berhasil atau gagal
    }
  };

  useEffect(() => {
      fetchDokumen();
  }, []);

  // Menggunakan useFormik untuk manajemen formulir dan validasi
  const formik = useFormik({
    initialValues: {
      title: "",
      documentType: "",
      year: "",
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

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

  return (
    <div className="flex flex-col p-5">
      {!showForm ? (
        <button
          onClick={handleShowForm}
          type="button"
          className="inline-block max-w-[150px] rounded-md focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium text-sm px-3 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Tambah Berita
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
        <DaftarDokumen listDokumen={listDokumen}/>
      </div>
    </div>
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
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center"
        disabled={submitting} // Mengatur tombol menjadi tidak dapat diklik selama proses submitting
      >
        {submitting && ( // Kondisional rendering untuk menampilkan animasi putar saat submitting
          <svg
            className="animate-spin h-4 w-4 mr-3 border-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm10-9.082C19.4 6.346 20 8.159 20 10h4c0-3.308-1.113-6.348-2.982-8.8l-1.018 1.018z"
            ></path>
          </svg>
        )}
        {submitting ? "Processing..." : "Submit"}
      </button>
    </form>
  );
};

const DaftarDokumen = ({listDokumen}) => {

  return (
    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
      <thead className="bg-gray-50">
        <tr>
          <TableHeader title="Judul" />
          <TableHeader title="Jenis Dokumen" />
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
                  <img id="preview_img" className="h-16 w-16 object-cover rounded-full" src={process.env.REACT_APP_IMAGE_URL + dokumen.imageURL} alt={dokumen.nama} />
                  <div className="text-sm font-medium text-gray-900 ml-2">{dokumen.nama}</div>
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
              <button className="px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out">
                Edit
              </button>
              <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Document;