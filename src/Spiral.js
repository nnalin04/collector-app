import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./rotateItems.css";

const Spiral = () => {
  const [rotation, setRotation] = useState(0);
  const [translationY, setTranslationY] = useState(0);

  const handleMouseMove = (event) => {
    const { clientX, clientY, currentTarget } = event;

    console.log(clientX, clientY);
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    console.log(left, top, width, height);

    // Calculate rotation based on horizontal mouse position
    const relativeX = clientX - left;
    const rotationAngle = (relativeX / width) * 360;

    // // Calculate vertical translation based on vertical mouse position
    const relativeY = clientY - top;
    const verticalTranslation = (relativeY / height - 0.5) * 200;

    setRotation(rotationAngle);
    setTranslationY(verticalTranslation);
  };

  const handleScroll = (event) => {
    console.log(event);
  };

  return (
    <div className="perspective-wrapper"  onMouseMove={handleMouseMove}>
      <div
        className="rotating-container"
       
        style={{
          transform: `rotateY(${rotation}deg) translateY(${translationY}px)`,
        }}
      >
        <div className="rotating-item item5" />
      </div>
    </div>
  );
};

export default Spiral;
