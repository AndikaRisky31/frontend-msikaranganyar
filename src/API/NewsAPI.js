import {axiosInstance,axiosInstanceAuth} from './axios'

const getNewsByPage = async (page, limit = 5) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_BASE_URL}/news/?page=${page}&limit=${limit}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

const deleteNews = async (id) => {
  try {
    await axiosInstanceAuth.delete(
      `${process.env.REACT_APP_BASE_URL}/news/${id}`
    );;
    return true;
  } catch (error) {
    console.error(`Gagal menghapus berita dengan ID ${id}:`, error);
    return false;
  }
};

const createNews = async (newsData) => {
  try {
    newsData.hidden = false;
    const response = await axiosInstanceAuth.post(
      `${process.env.REACT_APP_BASE_URL}/news/create`,
      newsData
    );
    // Handle response if needed
    console.log('News created successfully:', response.data);
    return response.data; // Return the created news data if needed
  } catch (error) {
    // Handle error if needed
    console.error('Error creating news:', error);
    throw error; // Throw the error for further handling
  }
};

export { getNewsByPage, deleteNews,createNews };