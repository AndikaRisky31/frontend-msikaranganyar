import Cookies from 'js-cookie';

// Mengecek apakah user adalah Super Admin
export const isSuperAdmin = () => {
  const role = Cookies.get('role');
  return role === 'superadmin';
};

// Menyimpan token bersama waktu kadaluarsa
export const saveToken = (token, role) => {
  Cookies.set('access_token', token, { expires: 1 }); // Token berlaku selama 1 hari
  Cookies.set('role', role, { expires: 1 });

  // Menghitung waktu kadaluarsa 1 jam dari sekarang
  const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 jam dalam milidetik
  Cookies.set('token_expiration', expirationTime, { expires: 1 });
};

// Mendapatkan token, memeriksa apakah token telah kedaluwarsa
export const getToken = () => {
  const token = Cookies.get('access_token');
  const expirationTime = Cookies.get('token_expiration');

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
};

// Menghapus token dan peran
export const deleteToken = () => {
  Cookies.remove('access_token');
  Cookies.remove('role');
  Cookies.remove('token_expiration');
};

// Mendapatkan peran dari cookies
export const getRole = () => {
  return Cookies.get('role');
};