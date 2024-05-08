import React, { useState } from "react";
import { Card, CardHeader, CardBody, Button, CardFooter, Typography } from "@material-tailwind/react";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { sliceContent } from '../../utils/helper';
import { useHistory } from "react-router-dom";

const CardNews = ({
  id_news,
  title,
  content,
  imageURL,
  handleDeleteNews,
}) => {
  const history = useHistory();

  const toNews = () => {
    history.push(`/news/${id_news}`);
  };

  const toEditNews = () => {
    history.push({
      pathname: `/dashboard/news/addUpdate`,
      state: { id_news }
    });
  };

  return (
    <Card className="max-w-[24rem] overflow-hidden" key={id_news}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none h-2/6"
      >
        <img
          src={process.env.REACT_APP_IMAGE_URL + imageURL}
          alt="ui/ux review check"
          className="w-full h-full object-cover"
        />
      </CardHeader>
      <CardBody className="p-3 h-3/6">
        <Typography
          variant="h5"
          className="cursor-pointer"
          color="blue-gray"
          onClick={toNews}
        >
          {title}
        </Typography>
        <Typography variant="paragraph" color="gray" className="mt-3 font-normal">
          {sliceContent(content, 20)}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-end h-1/6">
        <Button color="red" className="ml-2" onClick={() => handleDeleteNews(id_news)}>
          <FaTrash size={8} />
        </Button>
        <Button color="green" className="ml-2" onClick={toEditNews}>
          <FaRegEdit size={8} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardNews;