import React, { useState, useEffect } from "react";
import InputField from '../../../components/inputField'
import { createAnnouncement, getAnnouncementById,updateAnnouncement } from "../../../API/AnnouncementAPI";
import { useHistory, useParams } from "react-router-dom";

const FormCreateAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [pengumuman, setpengumuman] = useState([]);
  const { id_announcement } = useParams();
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

      if (id_announcement) {
        // Jika id_announcement tersedia, maka lakukan pembaruan (update) pengumuman
        await updateAnnouncement(id_announcement, formData);
      } else {
        // Jika id_announcement tidak tersedia, maka lakukan pembuatan (create) pengumuman baru
        await createAnnouncement(formData);
      }

      // Navigasi ke halaman dashboard/Announcement setelah berhasil membuat atau memperbarui pengumuman
      history.push("/dashboard/pengumuman")
    } catch (error) {
      console.error("Error:", error);
      // Handle error if needed
    }
  };

  const fetchAnnouncement = async () => {
    try {
      const data = await getAnnouncementById(id_announcement); // Panggil getAnnouncementById dengan id_announcement
      setpengumuman(data); // Set nilai pengumuman yang diterima
      setTitle(data.title); // Set nilai title dari pengumuman
      setContent(data.content); // Set nilai content dari pengumuman
      // Anda mungkin perlu menangani nilai image dari pengumuman jika diperlukan
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
          onChange={(e) => setImage(e.target.files[0])}
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