export const formatDate = (createdAt) => {
    // Membuat objek Date dari string created_at
    const date = new Date(createdAt);
  
    // Array nama-nama hari
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    
    // Mendapatkan informasi tanggal, bulan, tahun, dan hari
    const day = date.getDate();
    const month = date.toLocaleString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    const dayName = days[date.getDay()]; // Mendapatkan nama hari dari array days
  
    // Menggabungkan informasi hari, tanggal, bulan, dan tahun dalam format yang diinginkan
    const formattedDate = `${dayName}, ${day} ${month} ${year}`;
  
    return formattedDate;
};
export const sliceName = (fullName) => {
    return fullName.split(" ").slice(0, 2).join(" ");
};
export const sliceContent = (fullContent)=>{
    const words = fullContent.split(' ');
    let slicedWords = words.slice(0, 15);
  
    if (words.length > 15) {
        slicedWords.push('...');
    }
    
    const slicedText = slicedWords.join(' ');
    return slicedText;
};
  