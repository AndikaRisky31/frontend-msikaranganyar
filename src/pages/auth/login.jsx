import React, { useState } from "react";
import { login } from "../../API/AuthAPI";
import { Redirect, useHistory } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import {
  Card,
  Typography,
  Input,
  Button,
  Spinner,
} from "@material-tailwind/react";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { token, message, role } = await login(email, password);
      localStorage.setItem("access_token", token); // Menyimpan token ke localStorage
      localStorage.setItem("role", role);
      setIsLoggedIn(true); // Setelah pengguna berhasil login, atur isLoggedIn menjadi true
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }; 

  // Jika pengguna sudah terautentikasi, redirect ke dashboard
  if (isLoggedIn || localStorage.getItem("access_token")) {
    return <Redirect to="/dashboard/news" />;
  }

  const handleBack = () => {
    history.goBack(); // fungsi untuk kembali ke halaman sebelumnya
  };

  return (
    <section>
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-96">
          <button onClick={handleBack} className="w-1/3 text-left p-5 hover:bg-teal-500 hover:text-white"><i className="fas fa-long-arrow-alt-left pr-3"></i>Back</button>
          <form onSubmit={handleSubmit}>
            <div className="flex h-28 justify-center items-center bg-gradient-to-r from-gray-400 to-gray-600 mb-4">
              <Typography variant="h3" color="white">
                Welcome
              </Typography>
            </div>
            <div className="flex flex-col gap-4 px-6">
              <Input
                label="Email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                size="lg"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography variant="small" color="red">
                  {error}
                </Typography>
              )}
            </div>
            <div className="px-6 pt-0">
              {isLoading ? (
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
}

export default LoginPage;