import React from "react";
import Back from "../common/back/Back";
import AboutCard from "./AboutCard";

const About = () => {
  return (
    <>
    <section className="mt-5 max-sm:pt-[75%] max-lg:pt-[10%] items-center">
      <Back title='About Us' />
      <AboutCard />
      </section>
    </>
  );
};
export default About;