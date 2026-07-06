import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/item/inputField";
import { createNews, getNewsByUrl, updateNews } from "../../../API/NewsAPI";
import { useNavigate, useParams } from "react-router-dom";
import SubmitButton from "../../../components/button/SubmitButton";
import RichTextEditor from "../../../components/item/RichTextEditor";
import {
  formatDateForInputDateTime,
  normalizeRichTextHtmlForSubmit,
} from "../../../utils/helper";

const FormCreateNews = () => {
  const [berita, setBerita] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { url } = useParams();

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Judul diperlukan")
      .max(100, "Judul tidak boleh lebih dari 100 karakter"),
    content: Yup.string().required("Konten diperlukan"),
    image: url
      ? Yup.mixed().notRequired()
      : Yup.mixed()
          .required("Gambar diperlukan")
          .test(
            "fileFormat",
            "Mohon upload gambar jpg/png/jpeg/webp",
            (value) => {
              return (
                value &&
                ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
                  value.type,
                )
              );
            },
          ),
    source: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      image: null,
      hidden: false,
      source: "",
      createdAt: formatDateForInputDateTime(new Date()),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);

      try {
        const rawContent = values.content;
        const normalizedContent = normalizeRichTextHtmlForSubmit(
          values.content,
        );

        console.log("RAW CONTENT:", rawContent);
        console.log("NORMALIZED CONTENT:", normalizedContent);

        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("content", normalizedContent);
        formData.append("hidden", values.hidden ? "true" : "false");
        formData.append("source", values.source);
        if (values.createdAt) {
          formData.append("created_at", values.createdAt);
        }

        if (values.image) {
          formData.append("image", values.image);
        }

        console.log("FORMDATA CONTENT:", formData.get("content"));

        if (url) {
          await updateNews(berita.id_news, formData);
        } else {
          await createNews(formData);
        }

        navigate("/dashboard/news");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  const fetchNews = async () => {
    try {
      const data = await getNewsByUrl(url);
      setBerita(data);
      formik.setValues({
        title: data.title,
        content: data.content || "",
        image: null,
        hidden: data.hidden ?? false,
        source: data.source,
        createdAt: data.created_at
          ? formatDateForInputDateTime(data.created_at)
          : "",
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
    <form onSubmit={formik.handleSubmit} className="mx-auto">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
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
        <label
          htmlFor="createdAt"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Tanggal Publish
        </label>
        <InputField
          id="createdAt"
          name="createdAt"
          type="datetime-local"
          value={formik.values.createdAt}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="content"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Konten
        </label>
        <RichTextEditor
          id="content"
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.content && formik.errors.content ? (
          <div className="text-red-500 text-sm">{formik.errors.content}</div>
        ) : null}
      </div>
      <div className="mb-4">
        <label
          htmlFor="image"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Cover
        </label>
        {berita && berita.imageURL ? (
          <div>
            <img
              className="w-1/2"
              src={`${process.env.REACT_APP_IMAGE_URL}${berita.imageURL}`}
              alt=""
            />
            <h2 className="text-gray-700 text-sm my-2">
              Biarkan jika tidak ingin mengubah gambar!!!
            </h2>
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
        <h2 className="text-red-500 text-sm font-semibold">
          Untuk hasil yang bagus gunakan foto landscape 16:9
        </h2>
      </div>
      <div className="mb-4">
        <label
          htmlFor="source"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
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
        <h2 className="text-red-500 text-sm font-semibold">
          Kosongkan jika berita dibuat sendiri(tidak mengambil dari website
          lain)
        </h2>
      </div>

      <SubmitButton submitting={submitting} />
    </form>
  );
};

export default FormCreateNews;
