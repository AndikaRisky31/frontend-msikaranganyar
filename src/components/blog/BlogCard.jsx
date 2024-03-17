import React from "react";
import { formatDate,sliceName,sliceContent } from "../helper";

const BlogCard = ({ blog }) => {
  const baseimageurl = process.env.REACT_APP_IMAGE_URL;
  return (
    <div className='items shadow'>
      <div className='img'>
        {blog.imageURLs[0] ? (
          <img src={baseimageurl+blog.imageURLs[0].imageURL} alt='' />
        ) : (
          <p>No Image</p>
        )}
      </div>
      <div className='text'>
        <div className='admin flexSB'>
        <span>
            <i className='fa fa-user'></i>
            <label htmlFor=''>{sliceName(blog.admin_name)}</label>
          </span>
          <span>
            <i className='fa fa-calendar-alt'></i>
            <label htmlFor=''>{formatDate(blog.created_at)}</label>
          </span>
        </div>
        <h1>{blog.title}</h1>
        <p>{sliceContent(blog.content)}</p>
      </div>
    </div>
  );
};

export default BlogCard;
