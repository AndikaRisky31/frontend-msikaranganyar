import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {formatDate,sliceContent} from '../../helper.js';
import ListContact from '../../contact/ListContact.jsx';

const Footer = () => {
  const history = useHistory();
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const limit = 4;
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/announcement/recent-post?limit=${limit}`);
        setRecentPosts(response.data);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      }
    };

    fetchRecentPosts();
  }, []);
  const handleContainerClick = (singleData) => {
    // Lakukan sesuatu berdasarkan tipe yang dikirimkan
    const type = singleData.type

    if (type === 'announcement') {
      // Navigasi ke halaman pengumuman
      history.push(`/announcement/${singleData.id_annoucement}`);
    } else if (type === 'news') {
      // Navigasi ke halaman berita
      history.push(`/news/${singleData.id_news}`);
    } else if (type === 'vacancy') {
      // Navigasi ke halaman lowongan
      history.push(`/vacancy/${singleData.id_vacancy}`);
    }else if(type === 'scheduleInterview'){

      history.push(`/scheduleinterview/${singleData.id_schedule_interview}`);
    }
  };
  return (
    <footer className="bg-gray-100">
      <div className="grid min-[320px]:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto"> 
        <div className="p-4">
          <h1 className="text-xl font-bold">Mentari Sehat Indonesia</h1>
          <span className="text-teal-500">KAB. KARANGANYAR</span>
          <p className="text-gray-700 mt-2 text-justify">Bersama kami, Anda menjadi bagian dari perjuangan melawan penyakit mematikan ini untuk mewujudkan masyarakat yang lebih sehat dan sejahtera.</p>
          <div className="flex mt-4 gap-1">
            <a href="https://www.instagram.com/_msi_karanganyar?igsh=MXN1MHM0enR6eTJydg==" target="_blank" rel="noopener noreferrer" className="mr-2">
              <i className='fab fa-instagram text-white bg-teal-500 rounded-full p-2 hover:bg-teal-600'></i>
            </a>
            <a href="https://www.tiktok.com/@msi.karanganyar?_t=8kf8aJTji1B&_r=1" target="_blank" rel="noopener noreferrer" className="mr-2">
              <i className='fab fa-tiktok text-white bg-teal-500 rounded-full p-2 hover:bg-teal-600'></i>
            </a>
            <a href="https://www.youtube.com/@msikab.karanganyar6795?si=9Qt2hFKiZiVqcgJD" target="_blank" rel="noopener noreferrer">
              <i className='fab fa-youtube text-white bg-teal-500 rounded-full p-2 hover:bg-teal-600'></i>
            </a>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">Recent Post</h3>
          {recentPosts.map((val,index) => (
            <div key={index} className="mt-3 flex items-center" onClick={() => handleContainerClick(val)}>
              <div className="group hover:bg-teal-600 w-full pl-3 py-2">
                <h4 className="text-gray-800 font-medium group-hover:text-white ease-in-out">{val.type === 'scheduleInterview' ? sliceContent(val.description,5) :val.title }</h4>
                <span className="block text-gray-600 group-hover:text-white">
                  <label htmlFor='' className="text-sm">{formatDate(val.created_at)} ({val.type})</label>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">Have a Questions?</h3>
          <ul className="mt-3">
            <li className="flex items-center text-gray-600 mb-6">
              <i className="fa fa-map-marker mr-2"></i>
              <span>Perum PPH 06/006 Desa Ngijo, Kec. Tasikmadu, Kab. Karanganyar JAWA TENGAH</span>
            </li>
            <li className="flex items-center text-gray-600 mb-6">
              <i className='fa fa-phone-alt mr-2'></i>
              <ListContact></ListContact>
            </li>
            <li className="flex items-center text-gray-600 mb-6">
              <i className='fa fa-paper-plane mr-2'></i>
              <span className="contact-info">ssrmsi.kabkaranganyar@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;