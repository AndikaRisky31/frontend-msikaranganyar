import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatDate, getTime } from "../../utils/helper"
import Heading from "../../components/common/heading/Heading";
import LoadingState from "../../components/modal/LoadingState"; // Import komponen LoadingState

const AnnouncementPage = () => {
  const { id_announcement } = useParams();
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State untuk menampilkan status loading

  const getAnnouncementById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/announcement/${id_announcement}`
      );
      const data = response.data.data;
      setContent(data);
      setIsLoading(false); // Setelah data terambil, atur status loading menjadi false
    } catch (error) {
      console.error('Failed to fetch vacancy', error);
    }
  };

  useEffect(() => {
    getAnnouncementById();
  }, [id_announcement]);

  return (
    <>
        {isLoading ? ( // Jika sedang loading, tampilkan komponen LoadingState
          <LoadingState />
        ) : (
          <div className="mx-auto w-full py-10 px-4 sm:px-6 md:px-20 lg:w-3/4">
            <Heading title={content.title} subtitle="pengumuman"/>
            <div className="grid grid-cols-1 mx-5 lg:mx-24">
              <div>
              <img src={`${process.env.REACT_APP_IMAGE_URL}${content.imageURL}`} alt="gambar" className="aspect-video w-full h-auto object-cover object-center"/>
              </div>
              <div className="w-full my-5">
                        <p className="">{getTime(content.updated_at,true,true)} {formatDate(content.updated_at,true,true)}</p>
              </div>
              <div className="row-span-2">
                <p className="text-lg whitespace-pre-line text-gray-500">{content.content}</p>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default AnnouncementPage;