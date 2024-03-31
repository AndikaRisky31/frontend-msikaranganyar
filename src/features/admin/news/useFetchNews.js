import React from "react";
import { useQuery } from "react-query";
import { axiosInstance } from "../../../lib/axios/axios";

export const useFetchNews = () => {
  const [page, setPage] = React.useState(1);
  const {
    data: dataNews,
    isLoading,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ["news", page],
    queryFn: async () => {
      const response = await axiosInstance.get(`/news/?page=${page}&limit=8`);

      console.log(response.data);
      return response.data;
    },
    keepPreviousData: true,
  });

  return { dataNews, isLoading, isFetching, isPreviousData, page, setPage };
};
