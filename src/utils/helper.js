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
    if (!fullContent) {
        return '';
    }
    const words = fullContent.split(' ');
    let slicedWords = words.slice(0, size);
  
    if (words.length > size) {
        slicedWords.push('...');
    }
    
    const slicedText = slicedWords.join(' ');
    return slicedText;
};

export const stripHtmlTags = (content) => {
    if (!content || typeof content !== 'string') {
        return '';
    }

    return content
        .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, ' ')
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ' ')
        .replace(/<\/p>|<\/div>|<\/h[1-6]>|<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/\s+\n/g, '\n')
        .replace(/\n\s+/g, '\n')
        .replace(/[ \t]+/g, ' ')
        .trim();
};

export const isProbablyHtml = (content) => {
    if (!content || typeof content !== 'string') {
        return false;
    }

    return /<\/?[a-z][\s\S]*>/i.test(content);
};

export const previewContent = (content, size = 30) => {
    return sliceContent(stripHtmlTags(content), size);
};

const escapeHtmlAttribute = (value) => {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
};

export const resolveAssetUrl = (url) => {
    if (!url || typeof url !== 'string') {
        return '';
    }

    if (/^(https?:)?\/\//i.test(url) || url.startsWith('data:') || url.startsWith('blob:')) {
        return url;
    }

    const baseUrl = process.env.REACT_APP_IMAGE_URL || process.env.REACT_APP_BASE_URL || '';
    if (!baseUrl) {
        return url;
    }

    return `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
};

export const resolveMediaEmbedSrc = (url) => {
    if (!url || typeof url !== "string") {
        return "";
    }

    const normalizedUrl = url.trim();

    const youtubeWatchMatch = normalizedUrl.match(/^(?:https?:\/\/)?(?:www\.)?(?:m\.)?youtube\.com\/watch\?v=([\w-]+)(?:.*[?&]t=(\d+))?/i);
    if (youtubeWatchMatch) {
        const videoId = youtubeWatchMatch[1];
        const start = youtubeWatchMatch[2];
        return `https://www.youtube.com/embed/${videoId}${start ? `?start=${start}` : ""}`;
    }

    const youtubeShortMatch = normalizedUrl.match(/^(?:https?:\/\/)?(?:www\.)?youtu\.be\/([\w-]+)(?:\?t=(\d+))?/i);
    if (youtubeShortMatch) {
        const videoId = youtubeShortMatch[1];
        const start = youtubeShortMatch[2];
        return `https://www.youtube.com/embed/${videoId}${start ? `?start=${start}` : ""}`;
    }

    const youtubeEmbedMatch = normalizedUrl.match(/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([\w-]+)(?:\?start=(\d+))?/i);
    if (youtubeEmbedMatch) {
        return normalizedUrl.startsWith("http") ? normalizedUrl : `https:${normalizedUrl}`;
    }

    const vimeoMatch = normalizedUrl.match(/^(?:https?:\/\/)?(?:www\.)?(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)/i);
    if (vimeoMatch) {
        const videoId = vimeoMatch[1];
        return `https://player.vimeo.com/video/${videoId}`;
    }

    return normalizedUrl;
};

const getMediaUrlFromHtml = (fragment) => {
    if (!fragment || typeof fragment !== "string") {
        return "";
    }

    const oembedMatch = fragment.match(/<oembed\b[^>]*\surl=["']([^"']+)["'][^>]*>/i);
    if (oembedMatch) {
        return oembedMatch[1];
    }

    const dataOembedMatch = fragment.match(/data-oembed-url=["']([^"']+)["']/i);
    if (dataOembedMatch) {
        return dataOembedMatch[1];
    }

    const iframeMatch = fragment.match(/<iframe\b[^>]*\ssrc=["']([^"']+)["'][^>]*>/i);
    if (iframeMatch) {
        return iframeMatch[1];
    }

    return "";
};

const buildSemanticMediaFigure = (url) => {
    const resolvedUrl = resolveMediaEmbedSrc(url);

    if (!resolvedUrl) {
        return "";
    }

    return `<figure class="media"><oembed url="${escapeHtmlAttribute(resolvedUrl)}"></oembed></figure>`;
};

const buildResponsiveMediaEmbedHtml = (url) => {
    const resolvedUrl = resolveMediaEmbedSrc(url);

    if (!resolvedUrl) {
        return "";
    }

    return `<div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="${escapeHtmlAttribute(resolvedUrl)}" style="position: absolute; inset: 0; width: 100%; height: 100%; border: 0;" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
};

export const normalizeRichTextHtmlForEditor = (content) => {
    if (!content || typeof content !== "string") {
        return content || "";
    }

    return content
        .replace(/<figure\b[^>]*class=["'][^"']*\bmedia\b[^"']*["'][^>]*>[\s\S]*?<\/figure>/gi, (fragment) => {
            const url = getMediaUrlFromHtml(fragment);
            return url ? buildSemanticMediaFigure(url) : fragment;
        })
        .replace(/<div\b[^>]*data-oembed-url=["']([^"']+)["'][^>]*>[\s\S]*?<\/div>/gi, (_, url) => buildSemanticMediaFigure(url))
        .replace(/<iframe\b[^>]*src=["']([^"']+)["'][^>]*>[\s\S]*?<\/iframe>/gi, (_, url) => buildSemanticMediaFigure(url))
        .replace(/(<img\b[^>]*\bsrc=)["'](\/[^"']*)["']/gi, (_, prefix, src) => `${prefix}"${resolveAssetUrl(src)}"`);
};

export const normalizeRichTextHtmlForDisplay = (content) => {
    if (!content || typeof content !== "string") {
        return content || "";
    }

    return content
        .replace(/<figure\b[^>]*class=["'][^"']*\bmedia\b[^"']*["'][^>]*>[\s\S]*?<\/figure>/gi, (fragment) => {
            const url = getMediaUrlFromHtml(fragment);
            return url ? buildResponsiveMediaEmbedHtml(url) : fragment;
        })
        .replace(/<oembed\b[^>]*\surl=["']([^"']+)["'][^>]*>(?:<\/oembed>)?/gi, (_, url) => buildResponsiveMediaEmbedHtml(url))
        .replace(/<div\b[^>]*data-oembed-url=["']([^"']+)["'][^>]*>[\s\S]*?<\/div>/gi, (_, url) => buildResponsiveMediaEmbedHtml(url))
        .replace(/<iframe\b[^>]*src=["']([^"']+)["'][^>]*>[\s\S]*?<\/iframe>/gi, (_, url) => buildResponsiveMediaEmbedHtml(url))
        .replace(/(<img\b[^>]*\bsrc=)["'](\/[^"']*)["']/gi, (_, prefix, src) => `${prefix}"${resolveAssetUrl(src)}"`)
        .replace(/(<iframe\b[^>]*\bsrc=)["'](\/[^"']*)["']/gi, (_, prefix, src) => `${prefix}"${resolveAssetUrl(src)}"`);
};

export const normalizeRichTextHtmlForSubmit = (content) => normalizeRichTextHtmlForDisplay(content);

export const normalizeRichTextHtml = (content) => {
    return normalizeRichTextHtmlForDisplay(content);
};
export const formatIntegerWithCommas = (number) => {
        // Handle jika number null atau undefined
    if (number == null || typeof number === 'undefined') {
        return '0';
    }
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

export const jenisPost = (text)=>{

    if(text === "scheduleInterview"){
        return "Wawancara"
    }else if(text === "news"){
        return "Berita"
    }else if(text === "announcement"){
        return "Pengumuman"
    }else if(text === "vacancy"){
        return "Lowongan"
    }
}

export const scrollToTop = () => {
    if(isBrowser()){
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling
        });
    }
  };

export const randomColor = () => {
const letters = "0123456789ABCDEF";
let color = "#";
for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
}
return color;
};
  
// utils/helper.js
export function isBrowser() {
    return typeof window !== "undefined" && typeof document !== "undefined";
  }
  
