import React from "react";

const HeadingOnly = ({title}) => {
  return (
    <div className="text-center pb-10">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold my-5 capitalize">{title}</h1>
    </div>
  );
};

export default HeadingOnly;
