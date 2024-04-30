import React, {useEffect,useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputField from "../../../components/item/inputField";
import { createInterview, getInterviewById, updateInterview } from "../../../API/InterviewAPI";
import { useHistory, useParams } from "react-router-dom";
import { formatDateForInputDateTime, removeEmptyLines } from "../../../utils/helper";
import SubmitButton from "../../../components/button/SubmitButton";

const FormCreateInterview = () => {
  const { id_schedule_interview } = useParams();
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    title: "",
    place: "",
    description: "",
    timeSchedule: "",
    participants: "",
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Judul diperlukan"),
    place: yup.string().required("Tempat diperlukan"),
    description: yup.string().required("Deskripsi diperlukan"),
    timeSchedule: yup.string().required("Waktu Jadwal diperlukan"),
    participants: yup.string(),
  });

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("place", values.place);
      formData.append("description", values.description);
      formData.append("time_schedule", values.timeSchedule);
      formData.append("participants", removeEmptyLines(values.participants));

      if (id_schedule_interview) {
        await updateInterview(id_schedule_interview, formData);
      } else {
        await createInterview(formData);
      }

      history.push("/dashboard/wawancara");
    } catch (error) {
      console.error("Error:", error);
    }finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const { values, handleChange, handleSubmit, touched, errors } = formik;

  const fetchInterview = async () => {
    try {
      const data = await getInterviewById(id_schedule_interview);
      formik.setValues({
        title: data.title,
        place: data.place,
        description: data.description,
        timeSchedule: formatDateForInputDateTime(data.time_schedule),
        participants: data.participants,
      });
    } catch (error) {
      console.error("Failed to fetch interview", error);
    }
  };

  useEffect(() => {
    if (id_schedule_interview) {
      fetchInterview();
    }
  }, [id_schedule_interview]);

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-900">
          Judul
        </label>
        <InputField
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Masukkan Judul"
          required={true}
        />
        {touched.title && errors.title ? <div className="text-red-500">{errors.title}</div> : null}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="place" className="block mb-1 text-sm font-medium text-gray-900">
            Tempat
          </label>
          <InputField
            id="place"
            name="place"
            value={values.place}
            onChange={handleChange}
            placeholder="Masukkan Tempat"
            required={true}
          />
          {touched.place && errors.place ? <div className="text-red-500">{errors.place}</div> : null}
        </div>
        <div>
          <label htmlFor="timeSchedule" className="block mb-1 text-sm font-medium text-gray-900">
            Waktu Jadwal
          </label>
          <InputField
            id="timeSchedule"
            name="timeSchedule"
            type="datetime-local"
            value={values.timeSchedule}
            onChange={handleChange}
            required={true}
          />
          {touched.timeSchedule && errors.timeSchedule ? (
            <div className="text-red-500">{errors.timeSchedule}</div>
          ) : null}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-900">
          Deskripsi
        </label>
        <textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          rows={5}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
          placeholder="Masukkan Deskripsi"
          required={true}
        ></textarea>
        {touched.description && errors.description ? (
          <div className="text-red-500">{errors.description}</div>
        ) : null}
      </div>
      <div className="mb-4">
        <label htmlFor="participants" className="block mb-1 text-sm font-medium text-gray-900">
          Participants
        </label>
        <textarea
          id="participants"
          name="participants"
          value={values.participants}
          onChange={handleChange}
          rows={5}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
          placeholder="Masukkan Participants"
        ></textarea>
        {touched.participants && errors.participants ? (
          <div className="text-red-500">{errors.participants}</div>
        ) : null}
      </div>
      <SubmitButton submitting={submitting} />
    </form>
  );
};

export default FormCreateInterview;