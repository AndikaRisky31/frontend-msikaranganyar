import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosInstanceAuth } from "../../../API/axios";
import InputField from "../../../components/item/inputField";

const FormTeam = () => {
  const [formData, setFormData] = useState({
    images: null,
    name: "",
    job_title: "",
    penempatan: "",
    tingkat: 1,
    whatsapp: ""
  });
  const history = useHistory();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, images: file });
    const reader = new FileReader();
    reader.onload = function(event) {
      document.getElementById('preview_img').src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handlePositionChange = (e) => {
    setFormData({ ...formData, job_title: e.target.value });
  };

  const handlePlacementChange = (e) => {
    setFormData({ ...formData, penempatan: e.target.value });
  };

  const handleLevelChange = (e) => {
    setFormData({ ...formData, tingkat: e.target.value });
  };

  const handleWhatsAppChange = (e) => {
    setFormData({ ...formData, whatsapp: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.name || !formData.job_title || !formData.penempatan || !formData.tingkat || !formData.whatsapp) {
      alert("Please fill in all fields");
      return;
    }
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('job_title', formData.job_title);
      formDataToSend.append('penempatan', formData.penempatan);
      formDataToSend.append('tingkat', formData.tingkat);
      formDataToSend.append('whatsapp', formData.whatsapp);
      formDataToSend.append('images', formData.images);
      
      const response = await axiosInstanceAuth.post('/management/create', formDataToSend);
      history.push('/dashboard/tim');
    } catch (error) {
      console.error("gagal menambahkan tim ke server", error.response.message);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <InputField
          id="name"
          label="Nama"
          type="text"
          placeholder="Masukkan Nama"
          value={formData.name}
          onChange={handleNameChange}
          required
        />
        <InputField
          id="position"
          label="Jabatan"
          type="text"
          placeholder="Masukkan Jabatan"
          value={formData.job_title}
          onChange={handlePositionChange}
          required
        />
        <InputField
          id="placement"
          label="Penempatan"
          type="text"
          placeholder="Masukkan Penempatan"
          value={formData.penempatan}
          onChange={handlePlacementChange}
          required
        />
        <div className="mb-3">
          <label htmlFor="level" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Level
          </label>
          <select
            id="level"
            name="level"
            value={formData.tingkat}
            onChange={handleLevelChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <InputField
          id="whatsapp"
          label="WhatsApp"
          type="text"
          placeholder="Masukkan Nomor WhatsApp"
          value={formData.whatsapp}
          onChange={handleWhatsAppChange}
          required
        />
        <div className="flex items-center space-x-6 mt-4">
          <div className="shrink-0">
            <img id='preview_img' className="h-16 w-16 object-cover rounded-full" src={formData.images ? URL.createObjectURL(formData.images) : "https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c"} alt="" />
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input type="file" onChange={handleImageChange} className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
            />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormTeam;