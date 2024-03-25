import React, { useState, useEffect } from 'react';
import Back from "../common/back/Back";
import TeamCard from "./TeamCard";
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
      <div className="text-center pb-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold my-5 max-sm:text-white">Struktur SSR Mentari Sehat Indonesia</h1>
        <h3 className="font-semibold tracking-wide uppercase text-teal-500 max-sm:text-white">Kab. Karanganyar</h3>
      </div>
      <section className="px-4 md:px-8 lg:px-12">
        {/* Tingkat 1 */}
        <div className="text-center py-5">
          <div className="flex justify-center">
            {dataTeam.filter(val => val.tingkat === 1).map((val) => (
              <TeamCard key={val.id_management} val={val} />
            ))}
          </div>
        </div>

        {/* Tingkat 2 */}
        <div className="text-center py-5">
          <div className="flex justify-center gap-5">
            {dataTeam.filter(val => val.tingkat === 2).map((val) => (
              <TeamCard key={val.id_management} val={val} />
            ))}
          </div>
        </div>

        {/* Tingkat 3 */}
        <div className="text-center py-5">
          <div className="flex overflow-x-auto snap-mandatory snap-x">
            {dataTeam.filter(val => val.tingkat === 3).map((val) => (
              <div key={val.id_management} className="snap-start mx-2">
                <TeamCard val={val} />
              </div>
            ))}
          </div>
        </div>

        {/* Tingkat 4 */}
        <div className="text-center py-5">
          <h2 className="text-lg font-semibold mb-4">KADER</h2>
          <div className="grid max-sm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {dataTeam.filter(val => val.tingkat === 4).map((val) => (
              <TeamCard key={val.id_management} val={val} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;