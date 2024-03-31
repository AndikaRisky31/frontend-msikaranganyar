import React from "react";
import { Button, Typography, IconButton } from "@material-tailwind/react";

import CardNews from "../../../components/card/card";
import ModalAddNews from "../../../components/modals/modal-add-news";

import { useFetchNews } from "../../../features/admin/news/useFetchNews";
import { useEditNews } from "../../../features/admin/news/useEditNews";

import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const News = () => {
  const { dataNews, isFetching, isPreviousData, page, setPage } =
    useFetchNews();

  const { isModalEditNews, setIsModalEditNews } = useEditNews();

  const getItemProps = (index) => ({
    variant: page === index ? "filled" : "text",
    color: "gray",
    onClick: () => setPage(index),
  });

  const next = () => {
    if (page === 5) return;

    setPage(page + 1);
  };

  const prev = () => {
    if (page === 1) return;

    setPage(page - 1);
  };
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between">
        <Typography variant="h3" color="gray" className="mb-4">
          News List
        </Typography>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {isFetching ? (
          <Button variant="text" loading={true}>
            Loading
          </Button>
        ) : (
          dataNews.data.map((news) => (
            <CardNews
              key={news.id_news}
              {...news}
              // handleEditNews={() => setIsModalEditNews(true)}
            />
          ))
        )}
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outlined"
          color="white"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={page === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton {...getItemProps(1)} color="blue-gray">
            1
          </IconButton>
          <IconButton {...getItemProps(2)} color="blue-gray">
            2
          </IconButton>
          <IconButton {...getItemProps(3)} color="blue-gray">
            3
          </IconButton>
          <IconButton {...getItemProps(4)} color="blue-gray">
            4
          </IconButton>
          <IconButton {...getItemProps(5)} color="blue-gray">
            5
          </IconButton>
        </div>
        <Button
          variant="text"
          color="white"
          className="flex items-center gap-2"
          onClick={next}
          disabled={isPreviousData || !dataNews?.data?.length === 0}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>

      {/* <ModalAddNews
        about="Edit News"
        isModalOpen={isModalEditNews}
        setIsModalOpen={setIsModalEditNews}
      /> */}
    </div>
  );
};

export default News;
