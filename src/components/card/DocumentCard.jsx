import React from "react";

const DocumentCard = ({ Document, toPdf }) => {
  return (
    <div className="document-card h-full flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow md:max-w-xl dark:border-gray-700 dark:bg-gray-800">
      <div className="w-full md:w-1/3">
        <div className="aspect-w-10 aspect-h-7">
          <img className="object-cover w-full h-full" src={process.env.REACT_APP_IMAGE_URL + Document.imageURL} alt="" />
        </div>
      </div>
      <div className="h-full flex flex-col justify-between p-4 md:p-5 md:w-2/3">
        <h5 className="mb-1 md:mb-2 text-lg md:text-xl font-bold tracking-tight text-gray-900 dark:text-white">{Document.nama}</h5>
        <button type="button" onClick={toPdf} className="text-white mb-5 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium font-avenir rounded-full text-sm md:text-base px-3 md:px-5 py-1.5 md:py-2 mt-1 md:mt-2 md:self-start dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Download PDF<i className="fas fa-download"></i></button>
      </div>
    </div>
  );
};

export default DocumentCard;