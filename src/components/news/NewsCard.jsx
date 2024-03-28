import React from "react";
import { formatDate, sliceContent } from "../../utils/helper";
import { useHistory } from "react-router-dom";

const NewsCard = ({ blog }) => {
  const baseimageurl = process.env.REACT_APP_IMAGE_URL;
  const history = useHistory();
  
  const onClick = () => {
    history.push(`/news/${blog.id_news}`)
  } 

  return (
    <div className='group shadow-lg m-2 w-[350px] h-[600px] hover:bg-teal-500' onClick={onClick}>
      <div>
        {blog.imageURLs[0] ? (
          <img src={baseimageurl + blog.imageURLs[0].imageURL} alt='' className=" rounded-t-md w-full h-full object-cover group-hover:brightness-75" />
        ) : (
          <p>No Image</p>
        )}
      </div>
      <div className='text p-5  group-hover:text-white'>
        <h1 className="font-bold text-xl mt-2 mb-4 text-justify">{sliceContent(blog.title,8)}</h1>
        <p className="text-gray-600 text-base text-justify group-hover:text-white">{formatDate(blog.created_at)+','+sliceContent(blog.content,20)}</p>
      </div>
    </div>
  );
};

export default NewsCard;