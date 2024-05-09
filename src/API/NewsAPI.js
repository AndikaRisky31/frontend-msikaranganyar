import {axiosInstance,axiosInstanceAuth} from './axios'

const getNewsByPage = async (page, limit = 5) => {
  try {
    const response = await axiosInstance.get(
      `/news/?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

const deleteNews = async (id) => {
  try {
    await axiosInstanceAuth.delete(
      `/news/${id}`
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
      `/news/create`,
      newsData
    );
    return response.data; // Return the created news data if needed
  } catch (error) {
    // Handle error if needed
    console.error('Error creating news:', error);
    throw error; // Throw the error for further handling
  }
};

const getNewsByUrl = async ({url})=>{
  try {
    const response = await axiosInstance.get(
      `/news/${url}`
    )
    return response.data.data;
  } catch (error) {
    console.error("gagal fetch news by id",error);
  }
}
const updateNews = async (id_news, newsData) => {
  try {
    const response = await axiosInstanceAuth.patch(`news/${id_news}`, newsData);
    return response.data;
  } catch (error) {
    console.error("gagal mengupdate berita", error);
    throw error; // Dilemparkan kembali agar dapat ditangkap oleh pemanggil fungsi
  }
};

export const getSearchNews = async (keyword) => {
  try {
    const response = await axiosInstance.get(`/news/search`, {
      params: { keyword } // Mengirim kata kunci sebagai query parameter
    });
    return response.data; // Mengembalikan data berita yang ditemukan
  } catch (error) {
    console.error("Gagal fetch search berita", error);
    throw error;
  }
};

export { getNewsByPage, deleteNews,createNews,getNewsByUrl,updateNews };