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
    if (!text || text.trim() === '') {
      return [];
    }
    const hasil = text.split(/\r?\n/).filter(line => line.trim() !== '');
    return hasil
  };

export const formatDateForInputDate = (datetimeString) => {
    const date = new Date(datetimeString); // Buat objek Date dari datetimeString
    const year = date.getFullYear(); // Ambil tahun
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ambil bulan dan pad dengan 0 jika kurang dari 10
    let day = date.getDate().toString().padStart(2, '0'); // Ambil tanggal dan pad dengan 0 jika kurang dari 10
  
    return `${year}-${month}-${day}`; // Gabungkan tahun, bulan, dan tanggal dengan tanda '-' sebagai pemisah
  };
  
export const formatDateForInputDateTime = (datetimeString) => {
    const date = new Date(datetimeString); // Buat objek Date dari datetimeString
    const year = date.getFullYear(); // Ambil tahun
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ambil bulan dan pad dengan 0 jika kurang dari 10
    const day = ('0' + date.getDate()).slice(-2); // Ambil tanggal dan pad dengan 0 jika kurang dari 10
    const hours = ('0' + date.getHours()).slice(-2); // Ambil jam dan pad dengan 0 jika kurang dari 10
    const minutes = ('0' + date.getMinutes()).slice(-2); // Ambil menit dan pad dengan 0 jika kurang dari 10
  
    return `${year}-${month}-${day}T${hours}:${minutes}`; // Gabungkan tahun, bulan, tanggal, jam, dan menit dengan tanda '-' dan 'T' sebagai pemisah
  };

export const removeEmptyLines = (text) => {
    // Memisahkan teks menjadi array baris
    const lines = text.split(/\r?\n/);
    // Menghapus baris kosong dengan menggunakan filter
    const nonEmptyLines = lines.filter(line => line.trim() !== '');
    // Menggabungkan kembali baris yang tersisa menjadi satu teks
    const result = nonEmptyLines.join('\n');
    return result;
  };
  
  