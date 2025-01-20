import React from "react";
import Card from "../otherComponents/Card";

function FirstSection() {
  return (
    <div className="bg-primary w-full h-[100vh]  mt-[130px] relative p-10">
      <p className=" text-center  text-text text-5xl border-b">
        Where my projects would be but i got none so TO BE CONTINUED...
      </p>
      <div className="flex flex-row justify-center gap-5 h-full items-center">
        <Card
          text="it was hard but i managed to land people on the moon, so please hire me "
          title="Nasa Moon Launch Project"
        />
        <Card
          text="if i was hiring people id def hire the guy who made this portfolio"
          title="THIS PORTFOLIO"
        />
        <Card
          text="Shiny colorful balls spinnig into the void, im ready to apply for McDonalds"
          title="The Spinning Balls"
        />
      </div>
    </div>
  );
}

export default FirstSection;
