import React from "react";

interface CharacterProps {
  x: number;
  y: number;
  direction: number;
  frame: number;
  body: string;
  head: string;
  weapon: string;
}

const Character: React.FC<CharacterProps> = ({
  x,
  y,
  direction,
  frame,
  body,
  head,
  weapon,
}) => {
  const spriteSize = 128;

  const getSpritePosition = (index: number) => {
    const row = Math.floor(index / 8);
    const col = index % 8;
    return `-${col * spriteSize}px -${row * spriteSize}px`;
  };

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        style={{
          width: `${spriteSize}px`,
          height: `${spriteSize}px`,
          backgroundImage: `url(${body})`,
          backgroundPosition: getSpritePosition(direction * 8 + frame),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${spriteSize}px`,
          height: `${spriteSize}px`,
          backgroundImage: `url(${head})`,
          backgroundPosition: getSpritePosition(direction * 8 + frame),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${spriteSize}px`,
          height: `${spriteSize}px`,
          backgroundImage: `url(${weapon})`,
          backgroundPosition: getSpritePosition(direction * 8 + frame),
        }}
      />
    </div>
  );
};

export default Character;
