import React from "react"

const Heading = ({ subtitle, title,centered }) => {
  return (
    <>
      <div className="text-center pt-20 pb-10">
        <h3 className="font-semibold tracking-wide uppercase text-teal-500">{subtitle} </h3>
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold my-5 capitalize">{title}</h1>
      </div>
    </>
  )
}

export default Heading
