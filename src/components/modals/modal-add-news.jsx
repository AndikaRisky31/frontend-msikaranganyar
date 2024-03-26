import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Spinner,
  Input,
} from "@material-tailwind/react";

const ModalAddNews = ({
  about,
  isModalOpen,
  setIsModalOpen,
  handleFormInput,
  formik,
  isLoading,
}) => {
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
            onChange={handleFormInput}
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
            onChange={handleFormInput}
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
            onChange={handleFormInput}
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
        {isLoading ? (
          <Button color="green" disabled>
            <Spinner color="white" className="mx-3 h-4 w-4" />
          </Button>
        ) : (
          <Button
            color="green"
            onClick={formik.handleSubmit}
            className="text-white"
          >
            Confirm
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
};

export default ModalAddNews;
