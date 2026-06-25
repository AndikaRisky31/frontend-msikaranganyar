import React from "react";
import { Link } from "react-router-dom";

const Head = () => {
  return (
    <>
      <section className="z-50 relative bg-transparent py-8">
        <div className="px-10 flex items-center">
          <div className="justify-start">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl text-white font-bold leading-7">
              MENTARI SEHAT INDONESIA
            </h1>
            <span className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold">
              KAB. KARANGANYAR
            </span>
          </div>
          <div className="hidden sm:flex justify-end ml-auto gap-2">
            <Link
              to="https://www.instagram.com/_msi_karanganyar?igsh=MXN1MHM0enR6eTJydg=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-teal-600/40 transition duration-500 hover:bg-teal-600"
              style={{ filter: "brightness(1.5)" }}
            >
              <i className="fa fa-instagram text-xl leading-none"></i>
            </Link>

            <Link
              to="https://www.tiktok.com/@msi.karanganyar?_t=8kf8aJTji1B&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-teal-600/40 transition duration-500 hover:bg-teal-600"
              style={{ filter: "brightness(1.5)" }}
            >
              <i className="fab fa-tiktok text-xl leading-none"></i>
            </Link>

            <Link
              to="https://www.youtube.com/@msikab.karanganyar6795?si=9Qt2hFKiZiVqcgJD"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-teal-600/40 transition duration-500 hover:bg-teal-600"
              style={{ filter: "brightness(1.5)" }}
            >
              <i className="fab fa-youtube text-xl leading-none"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
