import React from "react";
import SpotlightCard from "../ReactBits/SpotlightCard/SpotlightCard";

function AboutMeBox() {
  return (
    <>
      <div className="  justify-end bg-primary-gradient  h-fit  rounded-3xl relative w-[750px] ml-[50px] mt-[-100px]">
        <SpotlightCard spotlightColor="#525252">
          <p className="text-text text-[50px] text-center border-b border-b-light">
            A little about me
          </p>
          <p className="text-text text-2xl text-center mt-4 p-5">
            I’m a 23-year-old Computer Engineering student in my fourth year at
            International Balkan University (IBU). Over the years, I’ve taken
            side courses in full-stack development, C++, and Java, which helped
            me explore different areas of programming. I also completed a
            three-month internship in Prishtina, where I learned a lot about
            React, React Native, Tailwind CSS, and TypeScript. During the
            internship, I built my first Business Intelligence app, which the
            company still uses today. In my side projects, I’ve worked with
            frameworks like Next.js, Three.js, Expo, and others, constantly
            pushing myself to learn new technologies and create something
            unique.
          </p>
        </SpotlightCard>
      </div>
    </>
  );
}

export default AboutMeBox;
