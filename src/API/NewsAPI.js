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
    const response = await axiosInstanceAuth.delete(
      `${process.env.REACT_APP_BASE_URL}/news/${id}`
    );
    console.log(response.data);
    console.log(`Berita dengan ID ${id} berhasil dihapus`);
    return true;
  } catch (error) {
    console.error(`Gagal menghapus berita dengan ID ${id}:`, error);
    return false;
  }
};

export { getNewsByPage, deleteNews };