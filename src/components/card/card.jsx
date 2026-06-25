import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { previewContent } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const CardNews = ({
  id_news,
  URL,
  title,
  content,
  imageURL,
  handleDeleteNews,
}) => {
  const navigate = useNavigate();

  const toNews = () => {
    navigate(`/news/${URL}`);
  };

  const toEditNews = () => {
    navigate(`/dashboard/news/addUpdate/${URL}`);
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
        <Typography
          variant="paragraph"
          color="gray"
          className="mt-3 font-normal"
        >
          {previewContent(content, 20)}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-end h-1/6">
        <Button
          color="red"
          className="m-1"
          onClick={() => handleDeleteNews(id_news)}
        >
          <FaTrash size={11} />
        </Button>
        <Button color="green" className="m-1" onClick={toEditNews}>
          <FaRegEdit size={11} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardNews;
