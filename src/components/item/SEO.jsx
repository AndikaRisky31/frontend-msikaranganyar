import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords, image, url }) => {
    const defaultImage = "https://api.msikaranganyar.com/uploads/logo.jpeg"; // Ganti dengan URL gambar default Anda
    const imageUrl = image || defaultImage;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph Meta Tags for Social Media including WhatsApp */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />

            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
        </Helmet>
    );
};

export default SEO;