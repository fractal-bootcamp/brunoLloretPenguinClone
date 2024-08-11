// import React, { useState, useEffect } from "react";

// interface CharacterAnimatorProps {
//   position: { x: number; y: number };
//   direction: number; // 0: Up, 1: Left, 2: Down, 3: Right
//   frame: number;
//   isMoving: boolean;
//   body: string;
//   head: string;
//   weapon: string;
//   spriteSheet: string;
// }

// const CharacterAnimator: React.FC<CharacterAnimatorProps> = ({
//   position,
//   direction,
//   frame,
//   isMoving,
//   body,
//   head,
//   weapon,
//   spriteSheet,
// }) => {
//   const spriteSize = 128; // Size of each sprite in the sheet
//   const spritesPerRow = 32; // Number of sprites in each row of the sheet

//   const getSpritePosition = () => {
//     const row = direction;
//     const col = isMoving ? frame : 0; // Use first frame when not moving
//     return `-${col * spriteSize}px -${row * spriteSize}px`;
//   };

//   return (
//     <div
//       style={{
//         position: "absolute",
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//         width: `${spriteSize}px`,
//         height: `${spriteSize}px`,
//         backgroundImage: `url(${spriteSheet})`,
//         backgroundPosition: getSpritePosition(),
//         backgroundSize: `${spriteSize * spritesPerRow}px ${spriteSize * 8}px`,
//         transform: "translate(-50%, -50%)",
//         zIndex: 1,
//       }}
//     />
//   );
// };

// export default CharacterAnimator;
