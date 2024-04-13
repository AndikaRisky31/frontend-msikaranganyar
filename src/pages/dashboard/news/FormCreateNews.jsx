import React, { useState, useEffect } from "react";
import InputField from '../../../components/item/inputField'
import { createNews, getNewsById,updateNews } from "../../../API/NewsAPI";
import { useHistory, useParams } from "react-router-dom";

const FormCreateNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [berita, setBerita] = useState([]);
  const { id_news } = useParams();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      if (id_news) {
        // Jika id_news tersedia, maka lakukan pembaruan (update) berita
        await updateNews(id_news, formData);
      } else {
        // Jika id_news tidak tersedia, maka lakukan pembuatan (create) berita baru
        await createNews(formData);
      }

      // Navigasi ke halaman dashboard/news setelah berhasil membuat atau memperbarui berita
      history.push("/dashboard/news");
    } catch (error) {
      console.error("Error:", error);
      // Handle error if needed
    }
  };

  const fetchNews = async () => {
    try {
      const data = await getNewsById(id_news); // Panggil getNewsById dengan id_news
      setBerita(data); // Set nilai berita yang diterima
      setTitle(data.title); // Set nilai title dari berita
      setContent(data.content); // Set nilai content dari berita
      // Anda mungkin perlu menangani nilai image dari berita jika diperlukan
    } catch (error) {
      console.error("gagal set berita ", error);
    }
  };

  useEffect(() => {
    if (id_news) {
      fetchNews();
    }
  }, [id_news]);

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-900">
          Judul
        </label>
        <InputField
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukan Judul"
          required={true}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block mb-1 text-sm font-medium text-gray-900">
          Konten
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
          required={true}
        ></textarea>
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
        ) : (
          null
        )}
        <InputField
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          required={id_news ? false : true}
        />
        <h2 className="text-red-500 text-sm font-semibold">Untuk hasil yang bagus gunakan foto landscape 16:9</h2>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default FormCreateNews;