import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstanceAuth, axiosInstance } from "../../../lib/axios/axios";

export const useEditNews = () => {
  const [isModalEditNews, setIsModalEditNews] = useState(false);
  const [newsId, setNewsId] = useState("");

  const handleEditNews = (newsId) => {
    setNewsId(newsId);
    setIsModalEditNews(true);
  };

  const { data: getNewsDetails } = useQuery({
    queryKey: ["news", newsId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/news/${newsId}`);
      return response.data;
    },
  });

  const { mutate: editNews, isLoading: isEditNewsLoading } = useMutation({
    mutationFn: async (body) => {
      const response = await axiosInstanceAuth.patch(`/news/${newsId}`, body);
      return response.data;
    },

    onSuccess: () => {
      setIsModalEditNews(false);
      alert("News updated successfully");
    },

    onError: () => {
      alert("Failed to update news");
    },
  });

  const formikEditNews = useFormik({
    initialValues: {
      title: getNewsDetails?.title,
      content: getNewsDetails?.content,
      imageURL: getNewsDetails?.imageURL,
    },
    enableReinitialize: true,
    onSubmit: async () => {
      const { ...data } = formikEditNews.values;

      editNews(data);
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
    }),
  });

  const handleEditNEwsFormInput = (e) => {
    formikEditNews.setFieldValue(e.target.name, e.target.value);
  };

  return {
    isModalEditNews,
    setIsModalEditNews,
    handleEditNews,
    getNewsDetails,
    formikEditNews,
    handleEditNEwsFormInput,
    isEditNewsLoading,
  };
};
