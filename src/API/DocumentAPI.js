import { axiosInstance, axiosInstanceAuth } from "./axios";

export const getDocumentByPage = async (page, limit,tipe) => {
    try {
        // Membuat panggilan API untuk mengambil data dokumen dengan halaman dan batasan tertentu
        const response = await axiosInstance.get(`/document/${tipe}`, {
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