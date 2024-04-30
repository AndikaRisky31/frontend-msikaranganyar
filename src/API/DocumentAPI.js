import { axiosInstance, axiosInstanceAuth } from "./axios";

export const getDocumentByPage = async (tipe,page = 1, limit=10) => {
    try {
        // Membuat panggilan API untuk mengambil data dokumen dengan halaman dan batasan tertentu
        const response = await axiosInstance.get(`/document/tipe/${tipe}`, {
            params: {
                page: page,
                limit: limit
            }
        });

        // Mengembalikan data dokumen dari respons API
        return response.data;
    } catch (error) {
        // Menangani kesalahan jika panggilan API gagal
        console.error('Error getting document data:', error);
        throw error; // Anda dapat menangani kesalahan lebih lanjut atau melemparkannya untuk ditangani di tempat lain
    }
};

export const getDocumentById = async (id) => {
    try {
        // Membuat panggilan API untuk mengambil data dokumen berdasarkan ID
        const response = await axiosInstance.get(`/document/id/${id}`);

        // Mengembalikan data dokumen dari respons API
        return response.data;
    } catch (error) {
        // Menangani kesalahan jika panggilan API gagal
        console.error('Error getting document data by ID:', error);
        throw error; // Anda dapat menangani kesalahan lebih lanjut atau melemparkannya untuk ditangani di tempat lain
    }
};

export const deleteDocument = async (id) => {
    try {
      await axiosInstanceAuth.delete(`/document/${id}`);
      console.log("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document", error);
      throw error;
    }
  };

export const searchDocument = async(title)=>{
    try {
        const response = await axiosInstance.get(`/document/search/${title}`)
        return response.data
    } catch (error) {
        console.error("Error fetching search document",error);
        throw error
    }
}
  
