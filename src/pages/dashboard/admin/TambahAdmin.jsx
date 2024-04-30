import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { axiosInstanceAuth } from "../../../API/axios";
import InputField from "../../../components/item/inputField";
import SubmitButton from "../../../components/button/SubmitButton"; // Sesuaikan path sesuai dengan struktur proyek Anda

const TambahAdmin = () => {
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);

  // Formik form validation schema using Yup
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors }) => {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);

      try {
        await axiosInstanceAuth.post("/admin/create", formData);
        history.push("/dashboard/admin");
      } catch (error) {
        if (error.response) {
          setErrors({ confirmPassword: error.response.data.message });
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-lg font-semibold mb-4">Tambah Admin</h1>
      <form onSubmit={formik.handleSubmit}>
        <InputField
          id="name"
          name="name" // Tambahkan name
          label="Name"
          type="text"
          placeholder="Enter name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.name && formik.errors.name ? formik.errors.name : ""
          }
          required={true}
        />
        <InputField
          id="email"
          name="email" // Tambahkan name
          label="Email"
          type="email"
          placeholder="Enter email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""
          }
          required={true}
        />
        <InputField
          id="password"
          name="password" // Tambahkan name
          label="Password"
          type="password"
          placeholder="Enter password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
          required={true}
        />
        <InputField
          id="confirmPassword"
          name="confirmPassword" // Tambahkan name
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : ""
          }
          required={true}
        />
        <SubmitButton submitting={submitting} />
      </form>
    </div>
  );
};

export default TambahAdmin;