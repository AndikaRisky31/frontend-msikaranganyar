import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  Card,
  Typography,
  Input,
  Checkbox,
  Button,
  Spinner,
} from "@material-tailwind/react";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, { email, password });
      if (response.status === 200 && response.data.token) {
        const { token, message } = response.data;
        localStorage.setItem("access_token", token); // Menyimpan token ke localStorage
        setIsLoggedIn(true); // Setelah pengguna berhasil login, atur isLoggedIn menjadi true
      } else {
        setError('Unexpected response from server');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };  

  // Jika pengguna sudah terautentikasi, redirect ke dashboard
  if (isLoggedIn || localStorage.getItem("access_token")) {
    return <Redirect to="/dashboard/news" />;
  }

  return (
    <section className="container relative">
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-96">
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
              <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
              </div>
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
                  className="mt-6"
                  fullWidth
                  variant="gradient"
                >
                  Login
                </Button>
              )}
              <Typography variant="small" className="mt-6 flex justify-center">
                Don&apos;t have an account?
                <Typography
                  as="a"
                  href="#signup"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Typography>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;