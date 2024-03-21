import React from "react";
import { Link } from "react-router-dom";

const Heading = ({ subtitle, title, link }) => {
  return (
    <div className="text-center pb-10">
      <h3 className="font-semibold tracking-wide uppercase text-teal-500">{subtitle}</h3>
      <Link to={link}>
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold my-5 capitalize cursor-pointer transition duration-300 ease-in-out hover:text-teal-700">{title}</h1>
      </Link>
    </div>
  );
};

export default Heading;
