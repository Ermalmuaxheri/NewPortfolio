import React from "react";
import SpotlightCard from "../ReactBits/SpotlightCard/SpotlightCard";

function NameBox() {
  return (
    <>
      <div className=" bg-primary-gradient m-10 w-fit h-fit  rounded-3xl relative justify-self-end text-text ">
        <SpotlightCard spotlightColor="#525252">
          <h1 className="text-[70px] text-left border-b border-b-text">
            Hello, Im
            <br /> Ermal Muaxheri
          </h1>
          <p className="text-3xl pt-2">Computer Engineer</p>
        </SpotlightCard>
      </div>
    </>
  );
}

export default NameBox;
