import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Unknown error occurred');
  }
};
