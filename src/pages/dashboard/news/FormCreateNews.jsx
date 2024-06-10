import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from '../../../components/item/inputField'
import { createNews, getNewsByUrl, updateNews } from "../../../API/NewsAPI";
import { useHistory, useParams } from "react-router-dom";
import SubmitButton from "../../../components/button/SubmitButton";

const FormCreateNews = () => {
  const [berita, setBerita] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();
  const {url} = useParams();

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Judul diperlukan")
      .max(100, "Judul tidak boleh lebih dari 100 karakter"),
    content: Yup.string().required("Konten diperlukan"),
    image: url ? Yup.mixed().notRequired() : Yup.mixed()
      .required("Gambar diperlukan")
      .test("fileFormat", "Mohon upload gambar jpg/png/jpeg/webp", (value) => {
        return value && ["image/jpeg", "image/png", "image/jpg",, "image/webp"].includes(value.type);
      }),
    source: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      image: null,
      source: "", // Tambahkan source ke initialValues
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true)
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("image", values.image);
        formData.append("source", values.source); // Tambahkan source ke formData
        if (url) {
          await updateNews(berita.id_news, formData);
        } else {
          await createNews(formData);
        }

        history.push("/dashboard/news");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setSubmitting(false)
      }
    },
  });
  const fetchNews = async () => {
    try {
      const data = await getNewsByUrl(url);
      setBerita(data);
      formik.setValues({
        title: data.title,
        content: data.content,
        image: null,
        source: data.source, // Set nilai source dari data berita
      });
    } catch (error) {
      console.error("gagal set berita ", error);
    }
  };

  useEffect(() => {
    if (url) {
      fetchNews();
    }
  }, [url]);

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-900">
          Judul
        </label>
        <InputField
          id="title"
          name="title"
          maxLength={100}
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
          rows={10}
          className="border text-xs border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400 text-justify"
        ></textarea>
        {formik.touched.content && formik.errors.content ? (
          <div className="text-red-500 text-sm">{formik.errors.content}</div>
        ) : null}
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block mb-1 text-sm font-medium text-gray-900">
          Gambar
        </label>
        {berita && berita.imageURL ? (
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
      <div className="mb-4">
        <label htmlFor="source" className="block mb-1 text-sm font-medium text-gray-900">
          Sumber
        </label>
        <InputField
          id="source"
          name="source"
          value={formik.values.source}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Masukan Sumber"
          maxLength={200}
        />
        {formik.touched.source && formik.errors.source ? (
          <div className="text-red-500 text-sm">{formik.errors.source}</div>
        ) : null}
        <h2 className="text-red-500 text-sm font-semibold">Kosongkan jika berita dibuat sendiri(tidak mengambil dari website lain)</h2>
      </div>
      <SubmitButton submitting={submitting} />
    </form>
  );
};

export default FormCreateNews;