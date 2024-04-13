import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputField from '../../../components/item/inputField'
import { createAnnouncement, getAnnouncementById, updateAnnouncement } from "../../../API/AnnouncementAPI";
import { useHistory, useParams } from "react-router-dom";

const FormCreateAnnouncement = () => {
  const [pengumuman, setpengumuman] = useState([]);
  const { id_announcement } = useParams();
  const history = useHistory()

  const initialValues = {
    title: "",
    content: "",
    image: null
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Judul diperlukan"),
    content: yup.string().required("Konten diperlukan")
  });

  const onSubmit = async (values) => {
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

      history.push("/dashboard/pengumuman")
    } catch (error) {
      console.error("Error:", error);
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
          value={values.title}
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
          onChange={(e) => setFieldValue("image", e.target.files[0])}
          accept="image/*"
          required={id_announcement ? false : true}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default FormCreateAnnouncement;