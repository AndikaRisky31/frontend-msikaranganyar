import { useLoginUser } from "./useLoginUser";
import { useFormik } from "formik";
import * as Yup from "yup";

export const useLoginForm = ({ onSuccess, onError }) => {
  const { mutate, isLoading } = useLoginUser({ onSuccess, onError });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      const { ...data } = formik.values;

      mutate(data);
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
  });

  return { formik, isLoading };
};
