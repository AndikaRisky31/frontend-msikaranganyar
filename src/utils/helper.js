export const formatDate = (createdAt, showDay = false) => {
    // Membuat objek Date dari string createdAt
    const date = new Date(createdAt);
  
    // Array nama-nama hari
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    
    // Mendapatkan informasi tanggal, bulan, tahun, dan hari
    const day = date.getDate();
    const month = date.toLocaleString('id-ID', { month: 'long' });
    const year = date.getFullYear();
  
    // Menggabungkan informasi hari, tanggal, bulan, dan tahun dalam format yang diinginkan
    const formattedDate = `${day} ${month} ${year}`;

    if (showDay) {
        const dayName = days[date.getDay()];
        return `${dayName}, ${formattedDate}`;
    } else {
        return formattedDate;
    }
};
export const getTime = (mysqlDateTime) => {
    const date = new Date(mysqlDateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} WIB`;
};

export const sliceName = (fullName) => {
    return fullName.split(" ")[0]
};
export const sliceContent = (fullContent,size)=>{
    const words = fullContent.split(' ');
    let slicedWords = words.slice(0, size);
  
    if (words.length > size) {
        slicedWords.push('...');
    }
    
    const slicedText = slicedWords.join(' ');
    return slicedText;
};
export const formatIntegerWithCommas = (number) => {
    // Ubah angka menjadi string
    const numberString = number.toString();

    // Pisahkan bagian desimal jika ada
    const parts = numberString.split('.');
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    // Tambahkan titik setiap tiga digit dari belakang
    let integerWithCommas = '';
    let count = 0;
    for (let i = integerPart.length - 1; i >= 0; i--) {
        integerWithCommas = integerPart[i] + integerWithCommas;
        count++;
        if (count % 3 === 0 && i !== 0) {
            integerWithCommas = '.' + integerWithCommas;
        }
    }
    const formattedNumber = integerWithCommas + decimalPart;
    return formattedNumber;
}
export const splitTextByNewLine = (text) => {
    return text.split(/\r?\n/).filter(line => line.trim() !== '');
};
  