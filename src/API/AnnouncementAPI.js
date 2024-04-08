import { axiosInstance, axiosInstanceAuth } from "./axios";

export const createAnnouncement = async (announcementData) => {
    try {
      const response = await axiosInstanceAuth.post(
        `/Announcement/create`,
        announcementData
      );
      return response.data; // Return the created Announcement data if needed
    } catch (error) {
      // Handle error if needed
      console.error('Error creating Announcement:', error);
      throw error; // Throw the error for further handling
    }
};

export const updateAnnouncement = async (id_announcement, announcementData) => {
    try {
      const response = await axiosInstanceAuth.patch(`announcement/${id_announcement}`, announcementData);
      return response.data;
    } catch (error) {
      console.error("gagal mengupdate pengumuman", error);
      throw error; // Dilemparkan kembali agar dapat ditangkap oleh pemanggil fungsi
    }
};

export const getAnnouncementById = async(id_announcement)=>{
    try {
        const response = await axiosInstance.get(
            `/announcement/${id_announcement}`
        )
        return response.data.data
    } catch (error) {
        console.error("eror mengambil data API announcementById",error);
    }
}
export const getAnnouncementByPage = async(page,limit = 9)=>{
    try {
        const response = await axiosInstance.get(
            `/announcement/?limit=${limit}&page=${page}`
        )
        return response.data;
    } catch (error) {
        console.error("gagal mengambil data API announcementByPage ");
    }
}
export const deleteAnnouncement = async(id_announcement)=>{
    try {
        const response = await axiosInstanceAuth.delete(
            `/announcement/${id_announcement}`
        )
        return response.data
    } catch (error) {
        console.error("gagal menghapus announcement",error);
    }
}