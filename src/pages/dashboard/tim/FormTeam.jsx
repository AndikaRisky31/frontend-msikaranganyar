import React from "react";
import { useHistory } from "react-router-dom";
import { axiosInstanceAuth } from "../../../API/axios";
import InputField from "../../../components/item/inputField";
import { useFormik } from "formik";
import * as yup from "yup";

const FormTeam = () => {
  const history = useHistory();

  const validationSchema = yup.object().shape({
    name: yup.string().required('Nama diperlukan'),
    job_title: yup.string().required('Jabatan diperlukan'),
    penempatan: yup.string().required('Penempatan diperlukan'),
    tingkat: yup.number().required('Level diperlukan'),
    whatsapp: yup.string().required('Nomor WhatsApp diperlukan'),
  });

  const formik = useFormik({
    initialValues: {
      images: null,
      name: "",
      job_title: "",
      penempatan: "",
      tingkat: 1,
      whatsapp: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', values.name);
        formDataToSend.append('job_title', values.job_title);
        formDataToSend.append('penempatan', values.penempatan);
        formDataToSend.append('tingkat', values.tingkat);
        formDataToSend.append('whatsapp', values.whatsapp);
        formDataToSend.append('images', values.images);

        await axiosInstanceAuth.post('/management/create', formDataToSend);
        history.push('/dashboard/tim');
      } catch (error) {
        console.error("gagal menambahkan tim ke server", error.response.message);
      }
    },
  });

  return (
    <div className="container mx-auto mt-10 px-4">
      <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <InputField
          id="name"
          label="Nama"
          name="name"
          type="text"
          placeholder="Masukkan Nama"
          value={formik.values.name}
          onChange={formik.handleChange}
          required
          error={formik.touched.name && formik.errors.name}
        />
        <InputField
          id="position"
          label="Jabatan"
          type="text"
          name="position"
          placeholder="Masukkan Jabatan"
          value={formik.values.position}
          onChange={formik.handleChange}
          required
          error={formik.touched.position && formik.errors.position}
        />
        <InputField
          id="placement"
          label="Penempatan"
          type="text"
          placeholder="Masukkan Penempatan"
          value={formik.values.placement}
          onChange={formik.handleChange}
          required
          error={formik.touched.placement && formik.errors.placement}
        />
        <div className="mb-3">
          <label htmlFor="level" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Level
          </label>
          <select
            id="level"
            name="level"
            value={formik.values.level}
            onChange={formik.handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          {formik.touched.level && formik.errors.level ? (
            <div className="text-red-500">{formik.errors.level}</div>
          ) : null}
        </div>
        <InputField
          id="whatsapp"
          label="WhatsApp"
          type="text"
          placeholder="Masukkan Nomor WhatsApp"
          value={formik.values.whatsapp}
          onChange={formik.handleChange}
          required
          error={formik.touched.whatsapp && formik.errors.whatsapp}
        />
        <div className="flex items-center space-x-6 mt-4">
          <div className="shrink-0">
            <img id="preview_img" className="h-16 w-16 object-cover rounded-full" src={formik.values.images ? URL.createObjectURL(formik.values.images) : "https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c"} alt="" />
          </div>
          <label htmlFor="profile_photo" className="block">
            <span className="sr-only">Choose profile photo</span>
            <input type="file" id="profile_photo" onChange={(event) => formik.setFieldValue('images', event.target.files[0])} className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
            />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
          Submit
        </button>
      </form>
    </div>
  );

};

export default FormTeam;