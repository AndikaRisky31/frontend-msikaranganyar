import { useFormik } from "formik";
import { Dialog,DialogHeader,DialogBody,DialogFooter } from "@material-tailwind/react";
import {Input,Button} from "@material-tailwind/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const CreateNews = ({
  about,
  isModalOpen,
  setIsModalOpen,
  handleFormInput,
  formikProps,
  isLoading,
}) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      imageUrl: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.title) {
        errors.title = "Title is required";
      }

      if (!values.content) {
        errors.content = "Content is required";
      }

      if (!values.imageUrl) {
        errors.imageUrl = "Image URL is required";
      }

      return errors;
    },
    onSubmit: (values) => {
      // Handle form submission here
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)} size="lg">
      <DialogHeader className="capitalize">
        <ShoppingBagIcon className="mr-2 h-8 w-8 rounded-full bg-green-600 p-[6px] text-white" />
        {about}
      </DialogHeader>

      <DialogBody className="flex flex-col gap-2">
        <p className="font-medium text-gray-700">
          Field the form below to {about}
        </p>
        <div className="mt-3">
          <Input
            label="Title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="rounded-md border border-gray-500 px-3 py-2"
            error={formik.errors.title && formik.touched.title && true}
          />
          {formik.errors.title && formik.touched.title && (
            <p className="mt-2 text-sm font-normal text-red-500">
              {formik.errors.title}
            </p>
          )}
        </div>
        <div className="mt-3">
          <Input
            label="Content"
            name="content"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
            className="rounded-md border border-gray-500 px-3 py-2"
            error={formik.errors.content && formik.touched.content && true}
          />
          {formik.errors.content && formik.touched.content && (
            <p className="mt-2 text-sm font-normal text-red-500">
              {formik.errors.content}
            </p>
          )}
        </div>

        <div className="mt-3">
          <Input
            label="Image URL"
            name="imageUrl"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.imageUrl}
            className="rounded-md border border-gray-500 px-3 py-2"
            error={formik.errors.imageUrl && formik.touched.imageUrl && true}
          />
          {formik.errors.imageUrl && formik.touched.imageUrl && (
            <p className="mt-2 text-sm font-normal text-red-500">
              {formik.errors.imageUrl}
            </p>
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          onClick={() => setIsModalOpen(false)}
          className="mr-1"
        >
          Cancel
        </Button>
        <Button
          color="green"
          onClick={formik.handleSubmit}
          className="text-white"
        >
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default CreateNews;