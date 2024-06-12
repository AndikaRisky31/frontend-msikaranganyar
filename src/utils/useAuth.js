import { useState, useEffect } from 'react';
import { saveToken as saveTokenToCookies, getToken as getTokenFromCookies, deleteToken, getRole, isSuperAdmin } from './auth';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedToken = getTokenFromCookies();
    const storedRole = getRole();
    setToken(storedToken);
    setRole(storedRole);
  }, []);

  const login = (token, role) => {
    saveTokenToCookies(token, role);
    setToken(token);
    setRole(role);
  };

  const logout = () => {
    deleteToken();
    setToken(null);
    setRole(null);
  };

  return {
    token,
    role,
    isSuperAdmin: isSuperAdmin(),
    login,
    logout,
  };
};

export default useAuth;