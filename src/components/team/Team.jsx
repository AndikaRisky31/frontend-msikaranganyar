import React, { useState, useEffect } from 'react';
import Back from "../common/back/Back";
import TeamCard from "./TeamCard";
import DataPasien from "../about/DataPasien";
import axios from "axios";

const Team = () => {
  const [dataTeam, setDataTeam] = useState([]);

  const fetchAllTeam = async ()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/management/all`)
      setDataTeam(response.data.data)
    } catch (error) {
      console.error('Error fetching team data:', error);
    }
  }
  useEffect(() => {
    fetchAllTeam();
  }, []);
  return (
    <>
      <Back title="Team" />
      <section className="team px-4 md:px-8 lg:px-12 py-10">
        <div className="m-auto grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dataTeam.map((val) => (
            <TeamCard key={val.id_management} val={val} />
          ))}
        </div>
      </section>
      <DataPasien />
    </>
  );
};

export default Team;