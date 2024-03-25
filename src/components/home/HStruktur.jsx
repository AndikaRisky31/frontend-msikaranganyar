import React from "react";
import TeamCard from "../team/TeamCard";


const HStruktur = ()=>{
    const Data = [
        {
            imageURL: "/uploads/team/Shubuha.jpeg",
            name: "Shubuha Pilar Naredia, M.Si.",
            job_title: "Ketua Yayasan"
        },
        {
            imageURL: "/uploads/team/Najendra.jpg",
            name: "Najendra Arga Devar",
            job_title: "Bendahara Yayasan"
        },
        {
            imageURL: "/uploads/team/Efitya.jpeg",
            name: "Efitya Fitria Istifarin, S.Sos",
            job_title: "Sekretaris"
        }
    ]
    return(
        <section className="Struktur mx-auto my-10 items-center">
            <div className="text-center pb-10">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold my-5 ">Struktur SSR Mentari Sehat Indonesia</h1>
                <h3 className="font-semibold tracking-wide uppercase text-teal-500 ">Kab. Karanganyar</h3>
            </div>
            <div className="flex justify-center">
                <TeamCard val={Data[0]}></TeamCard>
            </div>
            <div className="flex justify-center py-5">
                <div className="text-center">
                    <div className="flex overflow-x-auto snap-mandatory snap-x gap-5">
                    {Data.slice(1, 3).map((val, index) => (
                        <div key={index} className="snap-start mx-2">
                        <TeamCard val={val} />
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default HStruktur