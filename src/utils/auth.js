export const isSuperAdmin = () => {
    const role = localStorage.getItem("role");
    return role === "superadmin";
  };  

// Menyimpan token bersama waktu kadaluarsa
export const saveToken = (token, role) => {
  localStorage.setItem("access_token", token);
  localStorage.setItem("role", role);

  // Menghitung waktu kadaluarsa 5 menit dari sekarang untuk simulasi
  const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 5 menit dalam milidetik
  localStorage.setItem("token_expiration", expirationTime);
}

// Mendapatkan token, memeriksa apakah token telah kedaluwarsa
export const getToken = () => {
  const token = localStorage.getItem("access_token");
  const expirationTime = localStorage.getItem("token_expiration");

  if (!token || !expirationTime) {
    // Jika token atau waktu kadaluarsa tidak tersedia, kembalikan null
    return null;
  }

  const currentTime = new Date().getTime();
  if (currentTime > parseInt(expirationTime)) {
    // Jika waktu sekarang melewati waktu kadaluarsa, hapus token dan kembalikan null
    deleteToken();
    return null;
  }

  // Kembalikan token jika masih berlaku
  return token;
}

// Menghapus token dan peran
export const deleteToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("role");
  localStorage.removeItem("token_expiration");
}

// Mendapatkan peran dari local storage
export const getRole = () => {
  return localStorage.getItem("role");
}
