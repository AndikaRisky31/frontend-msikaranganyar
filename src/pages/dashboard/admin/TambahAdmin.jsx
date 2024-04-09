import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosInstanceAuth } from "../../../API/axios";
import InputField from "../../../components/inputField";

const TambahAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    // Validasi langsung saat ada perubahan pada field confirmPassword
    if (value !== password) {
      setMessage("Password and confirm password do not match");
    } else {
      setMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password and confirm password do not match");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      await axiosInstanceAuth.post('/admin/create', formData);
      history.push('/dashboard/admin')
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-lg font-semibold mb-4">Tambah Admin</h1>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <InputField
          id="name"
          label="Name"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={handleNameChange}
          required={true}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
          required={true}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
          required={true}
        />
        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required={true}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Create Admin
        </button>
      </form>
    </div>
  );
};

export default TambahAdmin;