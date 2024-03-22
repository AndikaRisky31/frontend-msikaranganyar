import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {formatDate} from '../../helper.js';
import ListContact from '../../contact/ListContact.jsx';

const Footer = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/announcement/recent-post`);
        console.log(response.data);
        setRecentPosts(response.data);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      }
    };

    fetchRecentPosts();
  }, []);
  return (
    <footer className="bg-gray-100">
      <div className="grid min-[320px]:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto"> 
        <div className="p-4">
          <h1 className="text-xl font-bold">Mentari Sehat Indonesia</h1>
          <span className="text-teal-500">KAB. KARANGANYAR</span>
          <p className="text-gray-700 mt-2 text-justify">Bersama kami, Anda menjadi bagian dari perjuangan melawan penyakit mematikan ini untuk mewujudkan masyarakat yang lebih sehat dan sejahtera.</p>
          <div className="flex mt-4">
            <a href="https://www.instagram.com/_msi_karanganyar?igsh=MXN1MHM0enR6eTJydg==" target="_blank" rel="noopener noreferrer" className="mr-2">
              <i className='fab fa-instagram text-white bg-teal-500 rounded-full p-2'></i>
            </a>
            <a href="https://www.tiktok.com/@msi.karanganyar?_t=8kf8aJTji1B&_r=1" target="_blank" rel="noopener noreferrer" className="mr-2">
              <i className='fab fa-tiktok text-white bg-teal-500 rounded-full p-2'></i>
            </a>
            <a href="https://www.youtube.com/@msikab.karanganyar6795?si=9Qt2hFKiZiVqcgJD" target="_blank" rel="noopener noreferrer">
              <i className='fab fa-youtube text-white bg-teal-500 rounded-full p-2'></i>
            </a>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">Recent Post</h3>
          {recentPosts.map((val) => (
            <div key={val[0]} className="mt-3 flex items-center">
              <img src={val.cover} alt='' className="w-12 h-12 object-cover rounded-lg mr-2" />
              <div>
                <span className="block text-gray-600">
                  <i className='fa fa-calendar-alt pr-1'></i>
                  <label htmlFor=''>{formatDate(val.created_at)}</label>
                </span>
                <h4 className="text-gray-800 font-medium">{val.title.slice(0, 60)}...</h4>
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