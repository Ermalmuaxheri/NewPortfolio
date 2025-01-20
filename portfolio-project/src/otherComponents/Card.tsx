import React from "react";
import SpotlightCard from "../ReactBits/SpotlightCard/SpotlightCard";

interface Props {
  title: string;
  text: string;
  color?: string;
}

function Card({ text, title, color }: Props) {
  return (
    <>
      <div
        className={`bg-${
          color ? color : "secondary"
        } w-1/4  rounded-xl p-10 mt-10 border-b shadow-lg`}
      >
        <p className="text-3xl text-text border-b">{title}</p>
        <p className="text-xl text-text">{text}</p>
        {/* <button>Learn more</button> */}
        {/* </SpotlightCard> */}
      </div>
    </>
  );
}

export default Card;
