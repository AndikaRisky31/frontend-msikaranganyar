import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputField from '../../../components/item/inputField'
import { createAnnouncement, getAnnouncementById, updateAnnouncement } from "../../../API/AnnouncementAPI";
import { useNavigate, useParams } from "react-router-dom";
import SubmitButton from "../../../components/button/SubmitButton";

const FormCreateAnnouncement = () => {
  const [pengumuman, setpengumuman] = useState([]);
  const { id_announcement } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate()

  const initialValues = {
    title: "",
    content: "",
    image: null
  };

  const validationSchema = yup.object().shape({
    title: yup.string()
      .required("Judul diperlukan")
      .max(50, "Judul tidak boleh lebih dari 50 karakter"),
    content: yup.string().required("Konten diperlukan"),
    image: id_announcement ? yup.mixed().notRequired() : yup.mixed()
      .required("Gambar diperlukan")
      .test("fileFormat", "Mohon upload gambar jpg/png/jpeg", (value) => {
        return value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
      }),
  });

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);

      if (values.image) {
        formData.append("image", values.image);
      }

      if (id_announcement) {
        await updateAnnouncement(id_announcement, formData);
      } else {
        await createAnnouncement(formData);
      }

      navigate("/dashboard/pengumuman")
    } catch (error) {
      console.error("Error:", error);
    }finally{
      setSubmitting(false)
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  const { values, handleChange, handleSubmit, setFieldValue, errors, touched } = formik;

  const fetchAnnouncement = async () => {
    try {
      const data = await getAnnouncementById(id_announcement);
      setpengumuman(data);
      setFieldValue("title", data.title);
      setFieldValue("content", data.content);
    } catch (error) {
      console.error("gagal set pengumuman ", error);
    }
  };

  useEffect(() => {
    if (id_announcement) {
      fetchAnnouncement();
    }
  }, [id_announcement]);

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-900">
          Judul
        </label>
        <InputField
          id="title"
          name="title" // Tambahkan name
          value={values.title}
          maxLength={50}
          onChange={handleChange}
          placeholder="Masukan Judul"
          required={true}
        />
        {touched.title && errors.title ? <div className="text-red-500">{errors.title}</div> : null}
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block mb-1 text-sm font-medium text-gray-900">
          Konten
        </label>
        <textarea
          id="content"
          name="content" // Tambahkan name
          value={values.content}
          onChange={handleChange}
          rows={5}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
          required={true}
        ></textarea>
        {touched.content && errors.content ? <div className="text-red-500">{errors.content}</div> : null}
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block mb-1 text-sm font-medium text-gray-900">
          Gambar
        </label>
        {pengumuman.imageURL ? (
          <div>
            <img className="w-1/2" src={`${process.env.REACT_APP_IMAGE_URL}${pengumuman.imageURL}`} alt="" />
            <h2 className="text-gray-700 text-sm">Biarkan jika tidak ingin mengubah gambar!!!</h2>
          </div>
        ) : (
          null
        )}
        <InputField
          type="file"
          id="image"
          name="image" // Tambahkan name
          onChange={(e) => setFieldValue("image", e.target.files[0])}
          accept="image/*"
          required={id_announcement ? false : true}
        />
      </div>
      <SubmitButton submitting={submitting}/>
    </form>
  );
};

export default FormCreateAnnouncement;