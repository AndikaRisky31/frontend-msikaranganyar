import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import { FaTrash, FaRegEdit } from "react-icons/fa";

const CardNews = ({
  id_news,
  title,
  content,
  imageURLs,
  imageURL,
  handleEditNews,
  handleDeleteNews,
}) => {
  return (
    <Card className="max-w-[24rem] overflow-hidden" key={id_news}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="ui/ux review check"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray">
          {title}
        </Typography>
        <Typography variant="lead" color="gray" className="mt-3 font-normal">
          {content}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-end">
        <Button color="red" className="ml-2" onClick={handleDeleteNews}>
          <FaTrash size={20} />
        </Button>
        <Button color="green" className="ml-2" onClick={handleEditNews}>
          <FaRegEdit size={20} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardNews;
