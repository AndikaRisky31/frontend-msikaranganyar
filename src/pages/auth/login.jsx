import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "../../API/AuthAPI";
import { Redirect, useHistory } from "react-router-dom";
import { getToken,saveToken } from "../../utils/auth";
import {
  Card,
  Typography,
  Input,
  Button,
  Spinner,
} from "@material-tailwind/react";

const LoginPage = () => {
  const history = useHistory();

  // Skema validasi menggunakan yup
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  // Menggunakan useFormik untuk manajemen formulir dan validasi
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const { token, role } = await login(values.email, values.password);
        saveToken(token,role)
        history.push("/dashboard/news");
      } catch (error) {
        setErrors({ password: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Jika pengguna sudah terautentikasi, redirect ke dashboard
  if (getToken()) {
    return <Redirect to="/dashboard/news" />;
  }

  const handleBack = () => {
    history.push("/");
  };

  return (
    <section>
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-96">
          <button
            onClick={handleBack}
            className="w-1/3 text-left p-5 hover:bg-teal-500 hover:text-white"
          >
            <i className="fas fa-long-arrow-alt-left pr-3"></i>Back
          </button>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex h-28 justify-center items-center bg-gradient-to-r from-gray-400 to-gray-600 mb-4">
              <Typography variant="h3" color="white">
                Welcome
              </Typography>
            </div>
            <div className="flex flex-col gap-4 px-6">
            <Input
              label="Email"
              size="lg"
              id="email" // Tambahkan id
              name="email" // Tambahkan name
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null
              }
            />
            <Input
              label="Password"
              size="lg"
              type="password"
              id="password" // Tambahkan id
              name="password" // Tambahkan name
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null
              }
            />
              {formik.errors.password && (
                <Typography variant="small" color="red">
                  {formik.errors.password}
                </Typography>
              )}
            </div>
            <div className="px-6 pt-0">
              {formik.isSubmitting ? (
                <Button
                  type="submit"
                  disabled
                  className="mt-6 flex items-center justify-center"
                  fullWidth
                >
                  <Spinner color="green" size="sm" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="my-6"
                  fullWidth
                  variant="gradient"
                >
                  Login
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;