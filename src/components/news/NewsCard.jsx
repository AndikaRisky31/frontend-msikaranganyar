import React from "react";
import { formatDate, sliceContent } from "../helper";

const NewsCard = ({ blog }) => {
  const baseimageurl = process.env.REACT_APP_IMAGE_URL;
  return (
    <div className='rounded-md shadow-md m-2 w-[350px] h-[600px]'  >
      <div>
        {blog.imageURLs[0] ? (
          <img src={baseimageurl + blog.imageURLs[0].imageURL} alt='' className=" rounded-t-md w-full h-full object-cover" />
        ) : (
          <p>No Image</p>
        )}
      </div>
      <div className='text p-3'>
        <h1 className="font-bold text-xl mt-2 mb-4 text-justify">{sliceContent(blog.title,8)}</h1>
        <p className="text-gray-600 text-base text-justify">{formatDate(blog.created_at)+sliceContent(blog.content,20)}</p>
      </div>
    </div>
  );
};

export default NewsCard;