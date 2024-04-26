import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from '../../../components/item/inputField'
import { createNews, getNewsById, updateNews } from "../../../API/NewsAPI";
import { useHistory, useParams } from "react-router-dom";

const FormCreateNews = () => {
  const [berita, setBerita] = useState({});
  const { id_news } = useParams();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Judul diperlukan")
      .max(50, "Judul tidak boleh lebih dari 50 karakter"),
    content: Yup.string().required("Konten diperlukan"),
    image: id_news ? Yup.mixed().notRequired() : Yup.mixed()
      .required("Gambar diperlukan")
      .test("fileFormat", "Mohon upload gambar jpg/png/jpeg", (value) => {
        return value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
      }),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("image", values.image);

        if (id_news) {
          await updateNews(id_news, formData);
        } else {
          await createNews(formData);
        }

        history.push("/dashboard/news");
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNewsById(id_news);
        setBerita(data);
        formik.setValues({
          title: data.title,
          content: data.content,
          image: null,
        });
      } catch (error) {
        console.error("gagal set berita ", error);
      }
    };

    if (id_news) {
      fetchNews();
    }
  }, [id_news]);

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-900">
          Judul
        </label>
        <InputField
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Masukan Judul"
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="text-red-500 text-sm">{formik.errors.title}</div>
        ) : null}
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block mb-1 text-sm font-medium text-gray-900">
          Konten
        </label>
        <textarea
          id="content"
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={5}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
        ></textarea>
        {formik.touched.content && formik.errors.content ? (
          <div className="text-red-500 text-sm">{formik.errors.content}</div>
        ) : null}
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block mb-1 text-sm font-medium text-gray-900">
          Gambar
        </label>
        {berita.imageURL ? (
          <div>
            <img className="w-1/2" src={`${process.env.REACT_APP_IMAGE_URL}${berita.imageURL}`} alt="" />
            <h2 className="text-gray-700 text-sm my-2">Biarkan jika tidak ingin mengubah gambar!!!</h2>
          </div>
        ) : null}
        <InputField
          type="file"
          id="image"
          name="image"
          onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
          onBlur={formik.handleBlur}
          accept="image/*"
        />
        {formik.touched.image && formik.errors.image ? (
          <div className="text-red-500 text-sm">{formik.errors.image}</div>
        ) : null}
        <h2 className="text-red-500 text-sm font-semibold">Untuk hasil yang bagus gunakan foto landscape 16:9</h2>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default FormCreateNews;