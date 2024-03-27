import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const VacancyPage = () => {
  const { id_vacancy } = useParams();
  const [content, setContent] = useState(null);

  const getVacancyById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/vacancy/${id_vacancy}`
      );
      const data = response.data.data;
      console.log(data);
      setContent(data);
    } catch (error) {
      console.error('Failed to fetch vacancy', error);
    }
  };

  useEffect(() => {
    getVacancyById();
  }, [id_vacancy]);

  return (
    <>
        {content && (
            <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
            <p className="text-lg mb-2"><strong>Location:</strong> {content.place}</p>
            <p className="text-lg mb-2"><strong>Closing Date:</strong> {content.closing_date}</p>

            <div className="my-8">
                <h2 className="text-2xl font-bold mb-4 white">Qualifications</h2>
                <p className="text-lg whitespace-pre-line" >{content.qualification}</p>
            </div>

            <div className="my-8">
                <h2 className="text-2xl font-bold mb-4">Recruitment Requirements</h2>
                <p className="text-lg">{content.recruitment}</p>
            </div>

            <div className="my-8">
                <h2 className="text-2xl font-bold mb-4">Available Positions</h2>
                <ul>
                {content.VacancyPositions.map((position) => (
                    <li key={position.id_position} className="text-lg mb-2">
                    <strong>{position.position_name}</strong>: {position.availability} positions available
                    </li>
                ))}
                </ul>
            </div>
            </div>
        )}
    </>
  );
};

export default VacancyPage;