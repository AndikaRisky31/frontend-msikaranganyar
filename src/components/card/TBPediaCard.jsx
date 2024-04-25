import React from "react";

const TBPediaCard = ({ Document,toPdf }) => {
    
    return (
        <div className="cursor-pointer flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="w-1/6 p-5 min-w-[150px]">
                <div className="relative aspect-[7/10]">
                    <img className="object-cover h-full" src={process.env.REACT_APP_IMAGE_URL + Document.imageURL} alt="" />
                </div>
            </div>
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{Document.nama}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">2023</p>
                <div className="my-1" onClick={toPdf}>
                    <p className="text-base md:text-xl font-avenir text-gray-500 cursor-pointer hover:tracking-widest duration-500">Selengkapnya <i className="fas fa-arrow-right fa-xs"></i></p>
                </div>
            </div>
        </div>
    );
};

export default TBPediaCard;