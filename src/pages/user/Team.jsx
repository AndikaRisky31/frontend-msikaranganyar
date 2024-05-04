import React, { useState, useEffect } from 'react';
import Back from "../../components/common/back/Back";
import TeamCard from "../../components/card/TeamCard";
import axios from "axios";
import LoadingState from '../../components/modal/LoadingState'; // Import komponen LoadingState
import { randomColor } from '../../utils/helper';

const Team = () => {
  const [dataTeam, setDataTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State untuk menampilkan status loading

  const fetchAllTeam = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/management/all`);
      setDataTeam(response.data.data);
      setIsLoading(false); // Setelah data terambil, atur status loading menjadi false
    } catch (error) {
      console.error('Error fetching team data:', error);
    }
  };

  useEffect(() => {
    fetchAllTeam();
  }, []);

  return (
    <>
      <Back title="Tim" />
      <div className="text-center pb-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold my-5 text-white sm:text-black">Struktur SSR Mentari Sehat Indonesia</h1>
        <h3 className="font-semibold tracking-wide uppercase  text-white sm:text-teal-500">Kab. Karanganyar</h3>
      </div>
      {isLoading ? ( // Tampilkan komponen LoadingState saat data sedang dimuat
        <LoadingState />
      ) : (
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
                <TeamCard key={val.id_management} val={val} randomColor={randomColor()} />
              ))}
            </div>
          </div>

          {/* Tingkat 3 */}
          <div className="text-center py-5">
            <div className="flex justify-start lg:justify-center overflow-x-auto snap-mandatory snap-x">
              {dataTeam.filter(val => val.tingkat === 3).map((val) => (
                <div key={val.id_management} className="snap-start mx-2">
                  <TeamCard val={val} randomColor={randomColor()} />
                </div>
              ))}
            </div>
          </div>

          {/* Tingkat 4 */}
          <div className="text-center py-5">
            <div className="grid justify-items-center grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
              {dataTeam.filter(val => val.tingkat === 4).map((val) => (
                <TeamCard key={val.id_management} val={val} randomColor={randomColor()} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Team;