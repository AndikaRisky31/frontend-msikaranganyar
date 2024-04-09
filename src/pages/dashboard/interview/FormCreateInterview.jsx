import React, { useState, useEffect } from "react";
import InputField from "../../../components/inputField";
import { createInterview, getInterviewById, updateInterview } from "../../../API/InterviewAPI";
import { useHistory, useParams } from "react-router-dom";
import { formatDateForInputDateTime,removeEmptyLines } from "../../../utils/helper";

const FormCreateInterview = () => {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [timeSchedule, setTimeSchedule] = useState("");
  const [participants, setParticipants] = useState("");
  const { id_schedule_interview } = useParams();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("place", place);
      formData.append("description", description);
      formData.append("time_schedule", timeSchedule);
      formData.append("participants",removeEmptyLines(participants))

      if (id_schedule_interview) {
        await updateInterview(id_schedule_interview, formData);
      } else {
        await createInterview(formData);
      }

      history.push("/dashboard/wawancara");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchInterview = async () => {
    try {
      const data = await getInterviewById(id_schedule_interview);
      setTitle(data.title);
      setPlace(data.place);
      setDescription(data.description);
      setTimeSchedule(data.time_schedule);
      setParticipants(data.participants)
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukkan Judul"
          required={true}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="place" className="block mb-1 text-sm font-medium text-gray-900">
            Tempat
          </label>
          <InputField
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Masukkan Tempat"
            required={true}
          />
        </div>
        <div>
          <label htmlFor="time_schedule" className="block mb-1 text-sm font-medium text-gray-900">
            Waktu Jadwal
          </label>
          <InputField
            id="time_schedule"
            type="datetime-local"
            value={formatDateForInputDateTime(timeSchedule)}
            onChange={(e) => setTimeSchedule(e.target.value)}
            required={true}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-900">
          Deskripsi
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
          placeholder="Masukkan Deskripsi"
          required={true}
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="participants" className="block mb-1 text-sm font-medium text-gray-900">
          Participants
        </label>
        <textarea
          id="participants"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          rows={5}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
          placeholder="Masukkan Participants"
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Submit
      </button>
    </form> 
  );
};

export default FormCreateInterview;