import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const NewsPage = () => {
  let { id_news } = useParams();
  const [newsContent, setNewsContent] = useState(null);

  useEffect(() => {
    // Menggunakan Axios untuk memuat konten berita berdasarkan ID
    axios.get(`${process.env.REACT_APP_BASE_URL}/news/${id_news}`)
      .then(response => {
        // Set konten berita ke dalam state
        setNewsContent(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching news content:', error);
      });
  }, [id_news]);

  const news = [
    {
      id: 1,
      title: 'Pembaruan Pendidikan Terbaru Membawa Perubahan Signifikan ke Sekolah',
      image: '/images/bg2.webp',
      date: '26 Maret 2024',
      admin: 'Admin 1'
    },
    {
      id: 2,
      title: 'Peneliti Mengumumkan Penemuan Baru dalam Pengobatan Kanker',
      image: '/images/bg2.webp',
      date: '25 Maret 2024',
      admin: 'Admin 2'
    },
    {
      id: 3,
      title: 'Penyelidikan Terbaru Terhadap Perubahan Iklim di Benua Antartika',
      image: '/images/bg2.webp',
      date: '25 Maret 2024',
      admin: 'Admin 2'
    },
    {
      id: 4,
      title: 'Masyarakat Dunia Terkejut dengan Temuan Arkeologis di Mesir Kuno',
      image: '/images/bg2.webp',
      date: '25 Maret 2024',
      admin: 'Admin 2'
    },
    {
      id: 5,
      title: 'Perubahan Kebijakan Pemerintah Mengenai Energi Terbarukan Menimbulkan Kontroversi',
      image: '/images/bg2.webp',
      date: '25 Maret 2024',
      admin: 'Admin 2'
    }
  ];  

  return (
    <>
    {/* <Back title='Blog Posts' /> */}
    <div className="flex">
      <div className="w-4/6 shadow-md">
        {/* Bagian kiri dengan gambar besar */}
          <img src="/images/bg2.webp" alt="Large News" className="w-full max-h-[80%] object-cover" />
          <div className="p-3">
            <p className="text-sm text-gray-500">{news[0].date} <FontAwesomeIcon icon={faCircle} size="xs" className="pl-2"/> by, {news[0].admin} </p>
            <h2 className="text-xl font-semibold">{news[0].title}</h2>
          </div>
      </div>
      <div className="w-2/6 p-2 overflow-y-auto shadow-md">
        {news.map(item => (
            <div key={item.id} className="flex mb-4 snap-start">
            <img src={item.image} alt={item.title} className="w-24 h-24 mr-2 object-cover" />
            <div className="justify-between flex flex-col">
                <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                </div>
                <div className="mt-auto">
                <p className="text-sm text-gray-500">{item.date} <FontAwesomeIcon icon={faCircle} size="xs" className="pl-2"/> by, {item.admin} </p>
                </div>
            </div>
            </div>
        ))}
        </div>
    </div>
    </>
  );
};

export default NewsPage;