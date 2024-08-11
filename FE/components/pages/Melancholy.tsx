import React, { useState, useEffect } from "react";
import "./Melancholy.css";

import {
  getPosition,
  updatePosition,
  initializePlayer,
} from "../../API endpoints/positionService";

import Character from "../common/Character";
import bodySprite from "../../src/assets/isometric-hero/clothes.png";
import headSprite from "../../src/assets/isometric-hero/male_head1.png";
import weaponSprite from "../../src/assets/isometric-hero/shortsword.png";

interface Position {
  x: number;
  y: number;
}

interface RoomProps {
  width: string;
  height: string;
  backgroundColor?: string;
  borderRadius?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

type Level = "ground" | "mid-level" | "far-level" | "distant-level";

const Melancholy: React.FC<RoomProps> = ({
  width,
  height,
  backgroundColor = "white",
  borderRadius = "0px",
  backgroundImage,
  children,
}) => {
  const [position, setPosition] = useState<Position>({ x: 528, y: 800 });
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(0);
  const [frame, setFrame] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<Level>("ground");
  const [characterSize, setCharacterSize] = useState<number>(1);

  const penguinId = "cd5f144b-af4d-46cf-8506-29cfb25aea9e";

  useEffect(() => {
    initializePlayer();
    fetchPosition();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchPosition, 100);
    return () => clearInterval(intervalId);
  }, []);

  const fetchPosition = async () => {
    try {
      const positionData = await getPosition(penguinId);
      updateCharacterPosition(positionData.x, positionData.y);
    } catch (error) {
      console.error("Error fetching position:", error);
    }
  };
  const updateCharacterPosition = (x: number, y: number) => {
    console.log("Updating position to:", x, y); // Add this line

    let newLevel: Level;
    let newSize: number;

    // Define boundaries and size adjustments for each level
    if (x < 250) {
      // Adjust these boundaries as needed
      newLevel = "distant-level";
      newSize = 0.4;
    } else if (x < 500) {
      newLevel = "far-level";
      newSize = 0.6;
    } else if (x < 750) {
      newLevel = "mid-level";
      newSize = 0.8;
    } else {
      newLevel = "ground";
      newSize = 1;
    }

    // Adjust coordinates based on the level
    switch (newLevel) {
      case "distant-level":
        x = Math.min(x, 300); // Bound x for distant-level
        y = Math.min(y, 100); // Bound y for distant-level
        break;
      case "far-level":
        x = Math.min(x, 500); // Bound x for far-level
        y = Math.min(y, 300); // Bound y for far-level
        break;
      case "mid-level":
        x = Math.min(x, 500); // Bound x for mid-level
        y = Math.min(y, 500); // Bound y for mid-level
        break;
      case "ground":
        x = Math.min(x, 1000); // Bound x for ground level
        y = Math.min(y, 1000); // Bound y for ground level
        break;
    }

    // Update state
    setPosition({ x, y });
    setCurrentLevel(newLevel);
    setCharacterSize(newSize);

    // Determine movement direction
    const dx = x - position.x;
    const dy = y - position.y;

    if (dx !== 0 || dy !== 0) {
      setIsMoving(true);
      if (Math.abs(dx) > Math.abs(dy)) {
        setDirection(dx > 0 ? 4 : 0); // Right or Left (Reversed X-axis)
      } else {
        setDirection(dy > 0 ? 2 : 6); // Down or Up
      }
    } else {
      setIsMoving(false);
    }
  };

  const handleCanvasClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);

    await updatePosition(penguinId, { x, y });
    updateCharacterPosition(x, y);
  };

  const handleMarkerClick = (markerPosition: Position) => {
    // You can implement additional logic here if needed
    console.log("Marker clicked at:", markerPosition);
  };

  return (
    <>
      <div
        className="canvas"
        onClick={handleCanvasClick}
        style={{
          width,
          height,
          backgroundColor,
          borderRadius,
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {position && (
          <div
            style={{
              transform: `scale(${characterSize})`,
              transformOrigin: "top left",
            }}
          >
            <Character
              x={position.x / characterSize}
              y={position.y / characterSize}
              direction={direction}
              frame={frame}
              isMoving={isMoving}
              body={bodySprite}
              head={headSprite}
              weapon={weaponSprite}
              setFrame={setFrame}
              onMarkerClick={handleMarkerClick}
              characterSize={characterSize}
            />
          </div>
        )}
      </div>
      <p>
        Current Position: x={position.x.toFixed(2)}, y={position.y.toFixed(2)}
      </p>
      <p>Current Level: {currentLevel}</p>
      <p>Character Size: {characterSize.toFixed(2)}</p>
    </>
  );
};

export default Melancholy;
