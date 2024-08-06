// src/components/CharacterMarker.tsx
import React, { useState, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

interface CharacterMarkerProps {
  position: Position;
  onClick: (position: Position) => void; // Callback to handle click
}

const CharacterMarker: React.FC<CharacterMarkerProps> = ({
  position,
  onClick,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  // Handle click and trigger animation
  const handleClick = () => {
    setIsClicked(true);
    onClick(position); // Call parent click handler
    setTimeout(() => setIsClicked(false), 200); // Reset the animation state
  };

  return (
    <div
      className="character-marker"
      onClick={handleClick}
      style={{
        position: "absolute",
        left: `${position.x - (isClicked ? 35 : 30)}px`, // Adjust x position for increased size
        top: `${position.y - (isClicked ? 35 : 30) + 40}px`, // Adjust y position for increased size
        width: `${isClicked ? 70 : 60}px`, // Increase width when clicked
        height: `${isClicked ? 40 : 30}px`, // Increase height when clicked
        borderRadius: "50%",
        border: `7px solid ${isClicked ? "red" : "rgba(255, 255, 255, 0.25)"}`, // Change border color on click
        backgroundColor: "transparent",
        pointerEvents: "none", // Ensure clicks pass through this element
        transition: "all 0.2s ease-in-out", // Smooth transition for size and color changes
      }}
    />
  );
};

export default CharacterMarker;
