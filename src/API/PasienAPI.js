import { axiosInstance, axiosInstanceAuth } from "./axios";

export const getPasien = async ()=>{
    try {
        const response = await axiosInstance.get('announcement/tbc')
        return response.data;
    } catch (error) {
        console.error("gagal mengambil data pasien",error);
        throw error
    }
}
export const updatePasien = async(formData)=>{
    try {
        const response = await axiosInstanceAuth.put(
            'announcement/tbc',
            formData)
        return response.data
    } catch (error) {
        console.error("gagal mengupdate data pasien",error);
        throw error
    }
}