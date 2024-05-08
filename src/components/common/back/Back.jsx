import React, { useEffect, useState } from "react"
import Header from "../header/Header"

const Back = ({ title,narasi }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/images/bgnofull.webp",
    "/images/bg2.webp",
    "/images/ab.webp"
    // Tambahkan path gambar lain sesuai kebutuhan
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Geser ke gambar berikutnya
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Ganti angka 5000 dengan interval waktu yang diinginkan (dalam milidetik)

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <section className="h-[65vh] static overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full flex" style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: "transform 1s ease" }}>
          {images.map((image, index) => (
            <div key={index} className=" brightness-75 w-full flex-shrink-0" style={{ backgroundImage: `url('${image}')`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover"}}></div>
          ))}
        </div>
        <div className="text-white text-center pt-[45%] sm:pt-[25%] md:pt-[15%] lg:pt-[10%]">
          <h1 className="font-normal text-4xl md:text-5xl lg:text-7xl w-full text-center">{title}</h1>
          <p className="mx-5 mt-5 sm:w-2/3 text-start sm:mx-auto text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl">{narasi}</p>
        </div>
      </section>
    </>
  )
}

export default Back
