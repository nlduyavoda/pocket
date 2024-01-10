"use client";
import { useState } from "react";

export const ButtonLikes = () => {
  const [likes, setLikes] = useState(0);
  function handleClick() {
    setLikes(likes + 1);
  }
  return (
    <button className="rounded-sm bg-pink" onClick={handleClick}>
      Like ({likes})
    </button>
  );
};
