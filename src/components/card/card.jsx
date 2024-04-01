import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import { FaTrash, FaRegEdit } from "react-icons/fa";
import { sliceContent } from '../../utils/helper';
import { useHistory } from "react-router-dom";

const CardNews = ({
  id_news,
  title,
  content,
  imageURL,
  handleEditNews,
  handleDeleteNews,
}) => {
  const history = useHistory();

  const toNews = (id_news) => {
    history.push(`/news/${id_news}`);
  };

  const handleDelete = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      // Panggil fungsi handleDeleteNews
      handleDeleteNews(id_news);
    }
  };

  return (
    <Card className="max-w-[24rem] overflow-hidden" key={id_news}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <img
          src={process.env.REACT_APP_IMAGE_URL + imageURL}
          alt="ui/ux review check"
        />
      </CardHeader>
      <CardBody>
        <Typography
          variant="h5"
          className="cursor-pointer"
          color="blue-gray"
          onClick={() => toNews(id_news)}
        >
          {title}
        </Typography>
        <Typography variant="p" color="gray" className="mt-3 font-normal">
          {sliceContent(content, 20)}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-end mt-auto">
        <Button color="red" className="ml-2" onClick={handleDelete}>
          <FaTrash size={8} />
        </Button>
        <Button color="green" className="ml-2" onClick={handleEditNews}>
          <FaRegEdit size={8} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardNews;