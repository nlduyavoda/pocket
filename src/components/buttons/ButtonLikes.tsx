"use client";
import { useState } from "react";
import { Button, Flex } from "antd";

export const ButtonLikes = () => {
  const [likes, setLikes] = useState(0);
  function handleClick() {
    setLikes(likes + 1);
  }
  return (
    <Button className="rounded-sm bg-pink" onClick={handleClick}>
      Like ({likes})
    </Button>
  );
};
