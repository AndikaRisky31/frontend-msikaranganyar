import { axiosInstance, axiosInstanceAuth } from "./axios";

export const createInterview = async (InterviewData) => {
    try {
      const response = await axiosInstanceAuth.post(
        `/interview/create`,
        InterviewData
      );
      return response.data; // Return the created Interview data if needed
    } catch (error) {
      // Handle error if needed
      console.error('Error creating Interview:', error);
      throw error; // Throw the error for further handling
    }
};

export const updateInterview = async (id_schedule_interview, InterviewData) => {
    try {
      const response = await axiosInstanceAuth.patch(`interview/${id_schedule_interview}`, InterviewData);
      return response.data;
    } catch (error) {
      console.error("gagal mengupdate berita", error);
      throw error; // Dilemparkan kembali agar dapat ditangkap oleh pemanggil fungsi
    }
};

export const getInterviewById = async(id_schedule_interview)=>{
    try {
        const response = await axiosInstance.get(
            `/interview/${id_schedule_interview}`
        )
        return response.data.data
    } catch (error) {
        console.error("eror mengambil data API InterviewById",error);
    }
}
export const getInterviewByPage = async(page,limit = 9)=>{
    try {
        const response = await axiosInstance.get(
            `/interview/?limit=${limit}&page=${page}`
        )
        return response.data;
    } catch (error) {
        console.error("gagal mengambil data API InterviewByPage ");
    }
}
export const deleteInterview = async(id_schedule_interview)=>{
    try {
        const response = await axiosInstanceAuth.delete(
            `/interview/${id_schedule_interview}`
        )
        return response.data
    } catch (error) {
        console.error("gagal menghapus Interview",error);
    }
}