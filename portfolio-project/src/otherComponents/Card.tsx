import React from "react";

interface Props {
  title: string;
  text: string;
}

function Card({ text, title }: Props) {
  return (
    <>
      <div className="bg-secondary w-1/4  rounded-xl p-10 mt-10 border-b shadow-lg">
        <p className="text-3xl text-text border-b">{title}</p>
        <p className="text-xl text-text">{text}</p>
      </div>
    </>
  );
}

export default Card;
