import React, { useState,useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputField from '../../../components/item/inputField';
import { createVacancy, getVacancyById, updateVacancy } from "../../../API/VacancyAPI";
import { useHistory, useParams } from "react-router-dom";
import {formatDateForInputDate, removeEmptyLines } from "../../../utils/helper";
import SubmitButton from "../../../components/button/SubmitButton";

const FormCreateVacancy = () => {
  const { id_vacancy } = useParams();
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);

  // Skema validasi menggunakan yup
  const validationSchema = yup.object().shape({
    title: yup.string().required('Posisi diperlukan'),
    qualification: yup.string().required('Kualifikasi diperlukan'),
    recruitment: yup.string().required('Persyaratan diperlukan'),
    place: yup.string().required('Penempatan diperlukan'),
    closing_date: yup.date().required('Tanggal penutupan diperlukan'),
    kuota: yup.number().required('Kuota diperlukan').positive('Kuota harus positif').integer('Kuota harus bilangan bulat'),
    apply_url: yup.string().required('Link Gform diperlukan'),
  });

  // Fungsi onSubmit untuk menangani pengiriman formulir
  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const closingDateWithTime = new Date(values.closing_date + 'T23:59');
      const formattedClosingDate = closingDateWithTime.toISOString();
  
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("qualification", removeEmptyLines(values.qualification));
      formData.append("recruitment", removeEmptyLines(values.recruitment));
      formData.append("place", removeEmptyLines(values.place));
      formData.append("closing_date", formattedClosingDate);
      formData.append("kuota", values.kuota);
      formData.append("apply_url", values.apply_url);
  
      if (id_vacancy) {
        await updateVacancy(id_vacancy, formData);
      } else {
        await createVacancy(formData);
      }
  
      history.push("/dashboard/lowongan");
    } catch (error) {
      console.error("Error:", error);
      // Handle error if needed
    }finally{
      setSubmitting(false)
    }
  };

  // Menggunakan useFormik untuk manajemen formulir dan validasi
  const formik = useFormik({
    initialValues: {
      title: '',
      qualification: '',
      recruitment: '',
      place: '',
      closing_date: '',
      kuota: '',
      apply_url: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });
  const fetchVacancy = async ()=>{
    try {
      const response = await getVacancyById(id_vacancy)
      formik.setValues({
        title: response.title,
        qualification: response.qualification,
        recruitment: response.recruitment,
        place: response.place,
        closing_date: formatDateForInputDate(response.closing_date),
        kuota: response.kuota,
        apply_url: response.apply_url,
      });
    } catch (error) {
      console.error('Gagal mengambil data lowongan pekerjaan:', error);
    }
  }
  useEffect(() => {
    if(id_vacancy){
      fetchVacancy()
    }
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto grid grid-cols-2 gap-4">
      <div className="mb-4 col-span-2">
        <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-900">
          Posisi
        </label>
        <InputField
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          placeholder="Masukkan Judul"
          required={true}
          error={formik.touched.title && formik.errors.title}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="place" className="block mb-1 text-sm font-medium text-gray-900">
          Penempatan
        </label>
        <InputField
          id="place"
          name="place"
          value={formik.values.place}
          onChange={formik.handleChange}
          placeholder="Masukkan Tempat"
          required={true}
          error={formik.touched.place && formik.errors.place}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="kuota" className="block mb-1 text-sm font-medium text-gray-900">
          Kuota
        </label>
        <InputField
          type="number"
          id="kuota"
          name="kuota"
          value={formik.values.kuota}
          onChange={formik.handleChange}
          placeholder="Masukkan Kuota"
          required={true}
          error={formik.touched.kuota && formik.errors.kuota}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="closing_date" className="block mb-1 text-sm font-medium text-gray-900">
          Tanggal Penutupan
        </label>
        <InputField
          type="date"
          id="closing_date"
          name="closing_date"
          value={formik.values.closing_date}
          onChange={formik.handleChange}
          required={true}
          error={formik.touched.closing_date && formik.errors.closing_date}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="apply_url" className="block mb-1 text-sm font-medium text-gray-900">
          Link Gform
        </label>
        <InputField
          id="apply_url"
          name="apply_url"
          value={formik.values.apply_url}
          onChange={formik.handleChange}
          placeholder="Masukkan Apply URL"
          required={true}
          error={formik.touched.apply_url && formik.errors.apply_url}
        />
      </div>
      <div className="mb-4 col-span-2">
        <label htmlFor="qualification" className="block mb-1 text-sm font-medium text-gray-900">
          Kualifikasi
        </label>
        <textarea
          id="qualification"
          name="qualification"
          value={formik.values.qualification}
          onChange={formik.handleChange}
          required={true}
          rows={5}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
        ></textarea>
      </div>
      <div className="mb-4 col-span-2">
        <label htmlFor="recruitment" className="block mb-1 text-sm font-medium text-gray-900">
          Persyaratan
        </label>
        <textarea
          id="recruitment"
          name="recruitment"
          value={formik.values.recruitment}
          onChange={formik.handleChange}
          required={true}
          rows={5}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
        ></textarea>
      </div>
      <SubmitButton submitting={submitting} />
    </form>
  );
};

export default FormCreateVacancy;