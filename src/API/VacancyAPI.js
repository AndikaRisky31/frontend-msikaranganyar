import { axiosInstance, axiosInstanceAuth } from "./axios";

export const createVacancy = async (VacancyData) => {
    try {
      const response = await axiosInstanceAuth.post(
        `/Vacancy/create`,
        VacancyData
      );
      return response.data; // Return the created Vacancy data if needed
    } catch (error) {
      // Handle error if needed
      console.error('Error creating Vacancy:', error);
      throw error; // Throw the error for further handling
    }
};

export const updateVacancy = async (id_vacancy, VacancyData) => {
    try {
      const response = await axiosInstanceAuth.patch(`Vacancy/${id_vacancy}`, VacancyData);
      return response.data;
    } catch (error) {
      console.error("gagal mengupdate berita", error);
      throw error; // Dilemparkan kembali agar dapat ditangkap oleh pemanggil fungsi
    }
};

export const getVacancyById = async(id_vacancy)=>{
    try {
        const response = await axiosInstance.get(
            `/Vacancy/${id_vacancy}`
        )
        return response.data.data
    } catch (error) {
        console.error("eror mengambil data API VacancyById",error);
    }
}
export const getVacancyByPage = async(page,limit = 9)=>{
    try {
        const response = await axiosInstance.get(
            `/vacancy/?limit=${limit}&page=${page}`
        )
        return response.data;
    } catch (error) {
        console.error("gagal mengambil data API VacancyByPage ");
    }
}
export const deleteVacancy = async(id_vacancy)=>{
    try {
        const response = await axiosInstanceAuth.delete(
            `/Vacancy/${id_vacancy}`
        )
        return response.data
    } catch (error) {
        console.error("gagal menghapus Vacancy",error);
    }
}