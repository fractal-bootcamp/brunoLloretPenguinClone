import React, { useState, useEffect } from "react";
import CharacterMarker from "./CharacterMarker";

interface CharacterProps {
  x: number;
  y: number;

  body: string;
  head: string;
  weapon: string;

  characterSize: number;

  direction: number;
  isMoving: boolean;
  frame: number;

  setFrame: React.Dispatch<React.SetStateAction<number>>;

  onMarkerClick: (position: Position) => void; // Add prop for click handler
}

interface Position {
  x: number;
  y: number;
}

const Character: React.FC<CharacterProps> = ({
  x,
  y,
  direction,
  frame,
  body,
  head,
  weapon,
  isMoving,
  characterSize,

  currentFrame,
  onMarkerClick,
}) => {
  const spriteSize = 128;
  const fps = 10;
  const frameInterval = 1000 / fps; // Time between frame updates in milliseconds

  // Map direction to row in the sprite sheet
  const directionToRow: { [key: number]: number } = {
    0: 0, // Right
    1: 1, // Diagonal Right-Up
    2: 2, // Up
    3: 3, // Diagonal Left-Up
    4: 4, // Left
    5: 5, // Diagonal Left-Down
    6: 6, // Down
    7: 7, // Diagonal Right-Down
  };

  const getSpritePosition = (direction: number, frame: number) => {
    const row = directionToRow[direction];
    const col = frame % 19; // 19 columns in the sprite sheet
    return `-${col * spriteSize}px -${row * spriteSize}px`;
  };

  useEffect(() => {
    let animationFrameId: number;
    let startTime = Date.now();
    let currentFrame = 0;

    const updateFrame = () => {
      if (isMoving) {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime >= frameInterval) {
          currentFrame = (currentFrame + 1) % 19; // Move to next frame
          startTime = Date.now();
        }
      } else {
        currentFrame = 0; // Reset frame when not moving
      }

      animationFrameId = requestAnimationFrame(updateFrame);
    };

    updateFrame();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isMoving, frameInterval]);

  const position: Position = { x, y };

  useEffect(() => {
    console.log("Position:", position);
    console.log("Is Moving:", isMoving);
    console.log("Frame:", frame);
    console.log("Direction:", direction);
  }, [position, isMoving, frame, direction]);

  return (
    <>
      <div
        className="character"
        style={{
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`,
          transform: `scale(${characterSize}) translate(-50%, -50%)`,
        }}
      >
        <div
          className="character-body"
          style={{
            width: `${spriteSize}px`,
            height: `${spriteSize}px`,
            backgroundImage: `url(${body})`,
            backgroundPosition: getSpritePosition(direction, frame),
          }}
        />
        <div
          className="character-head"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${spriteSize}px`,
            height: `${spriteSize}px`,
            backgroundImage: `url(${head})`,
            backgroundPosition: getSpritePosition(direction, frame),
          }}
        />
        <div
          className="character-weapon"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${spriteSize}px`,
            height: `${spriteSize}px`,
            backgroundImage: `url(${weapon})`,
            backgroundPosition: getSpritePosition(direction, frame),
          }}
        />
      </div>
      <CharacterMarker position={position} onClick={onMarkerClick} />
    </>
  );
};

export default Character;
